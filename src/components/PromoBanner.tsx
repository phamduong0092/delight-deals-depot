import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Flame, Sparkles, X } from "lucide-react";
import { useSiteBanners, type SiteBannerRow } from "@/lib/siteBanner";

const DISMISS_KEY_PREFIX = "kol-skill-banner-dismissed:";
const FALLBACK_SIZE = { width: 320, height: 180 };
const EDGE_MARGIN = 12;
const STACK_OFFSET = 24;

const SIZE_STYLES = {
  sm: { width: "w-[min(88vw,18rem)]", padding: "p-4", title: "text-lg sm:text-xl" },
  md: { width: "w-[min(92vw,26rem)]", padding: "p-6", title: "text-xl sm:text-2xl" },
  lg: { width: "w-[min(95vw,34rem)]", padding: "p-8", title: "text-2xl sm:text-3xl" },
} as const;

function FloatingBadge({ banner, index }: { banner: SiteBannerRow; index: number }) {
  const [dismissed, setDismissed] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  const dismissKey = `${DISMISS_KEY_PREFIX}${banner.id}`;

  useEffect(() => {
    setDismissed(window.sessionStorage.getItem(dismissKey) === "1");
  }, [dismissKey]);

  // Vị trí khởi đầu: góc dưới phải màn hình, các ô sau xếp chồng lệch lên trên ô trước.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = cardRef.current?.offsetWidth ?? FALLBACK_SIZE.width;
    const h = cardRef.current?.offsetHeight ?? FALLBACK_SIZE.height;
    setPos({
      x: window.innerWidth - w - 20,
      y: window.innerHeight - h - 20 - index * (h + STACK_OFFSET),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner.id]);

  const clamp = (x: number, y: number) => {
    const w = cardRef.current?.offsetWidth ?? FALLBACK_SIZE.width;
    const h = cardRef.current?.offsetHeight ?? FALLBACK_SIZE.height;
    return {
      x: Math.min(Math.max(x, EDGE_MARGIN), window.innerWidth - w - EDGE_MARGIN),
      y: Math.min(Math.max(y, EDGE_MARGIN), window.innerHeight - h - EDGE_MARGIN),
    };
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-no-drag]") || !pos) return;
    dragRef.current = { dragging: true, offsetX: e.clientX - pos.x, offsetY: e.clientY - pos.y };
    cardRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    setPos(clamp(e.clientX - dragRef.current.offsetX, e.clientY - dragRef.current.offsetY));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current.dragging = false;
    cardRef.current?.releasePointerCapture(e.pointerId);
  };

  if (!banner.message || dismissed || !pos) return null;

  const sizeStyle = SIZE_STYLES[banner.size ?? "md"];

  return (
    <div
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        left: pos.x,
        top: pos.y,
        background:
          "linear-gradient(135deg, oklch(0.58 0.20 25), oklch(0.72 0.19 45) 55%, oklch(0.84 0.16 75))",
      }}
      className={`shimmer glow-pulse fixed z-50 ${sizeStyle.width} cursor-grab touch-none select-none overflow-hidden rounded-3xl border border-white/25 ${sizeStyle.padding} shadow-brand active:cursor-grabbing`}
    >
      <Sparkles className="sparkle-twinkle pointer-events-none absolute right-5 top-14 h-4 w-4 text-white/70" />
      <Sparkles
        className="sparkle-twinkle pointer-events-none absolute bottom-5 left-5 h-3 w-3 text-white/50"
        style={{ animationDelay: "0.6s" }}
      />
      <span className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-white/10" />
      <span className="pointer-events-none absolute -right-6 -top-16 h-24 w-24 rotate-12 bg-white/5" />

      <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[oklch(0.58_0.20_25)] shadow-sm">
        <Flame className="h-3.5 w-3.5" />
        Hot
      </span>
      <p
        className={`whitespace-pre-line font-display font-semibold leading-snug text-white drop-shadow-[0_2px_10px_oklch(0.3_0.15_30/0.6)] ${sizeStyle.title}`}
      >
        {banner.message}
      </p>
      {banner.link_url && (
        <a
          href={banner.link_url}
          target="_blank"
          rel="noopener noreferrer"
          data-no-drag
          className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/25"
        >
          {banner.link_label || "Xem ngay →"}
        </a>
      )}
      <button
        data-no-drag
        onClick={() => {
          window.sessionStorage.setItem(dismissKey, "1");
          setDismissed(true);
        }}
        aria-label="Đóng thông báo"
        className="absolute right-3 top-3 rounded-full bg-white/10 p-1.5 text-white/90 transition hover:bg-white/25 hover:text-white"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

/** Hiện tất cả ô nổi đang bật (active) trong bảng site_banner — mỗi dòng 1 ô kéo thả riêng. */
export function PromoBanner() {
  const banners = useSiteBanners();
  const active = banners.filter((b) => b.active);

  return (
    <>
      {active.map((banner, index) => (
        <FloatingBadge key={banner.id} banner={banner} index={index} />
      ))}
    </>
  );
}
