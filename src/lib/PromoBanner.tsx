import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Flame, X } from "lucide-react";
import { useSiteBanner } from "@/lib/siteBanner";

const DISMISS_KEY_PREFIX = "kol-skill-banner-dismissed:";
const FALLBACK_SIZE = { width: 320, height: 180 };
const EDGE_MARGIN = 12;

export function PromoBanner() {
  const banner = useSiteBanner();
  const [dismissed, setDismissed] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, offsetX: 0, offsetY: 0 });

  const dismissKey = banner?.message ? `${DISMISS_KEY_PREFIX}${banner.message}` : null;

  useEffect(() => {
    if (!dismissKey) return;
    setDismissed(window.sessionStorage.getItem(dismissKey) === "1");
  }, [dismissKey]);

  // Vị trí khởi đầu: góc dưới phải màn hình.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = cardRef.current?.offsetWidth ?? FALLBACK_SIZE.width;
    const h = cardRef.current?.offsetHeight ?? FALLBACK_SIZE.height;
    setPos({
      x: window.innerWidth - w - 20,
      y: window.innerHeight - h - 20,
    });
  }, [banner?.message]);

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

  if (!banner?.active || !banner.message || dismissed || !pos) return null;

  return (
    <div
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ left: pos.x, top: pos.y }}
      className="shimmer glow-pulse fixed z-50 w-[min(92vw,26rem)] cursor-grab touch-none select-none overflow-hidden rounded-3xl bg-brand-gradient p-6 shadow-brand active:cursor-grabbing"
    >
      <span className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rotate-45 bg-white/10" />
      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-foreground/90">
        <Flame className="sparkle-twinkle h-4 w-4" />
        Hot
      </span>
      <p className="text-lg font-bold leading-snug text-primary-foreground sm:text-xl">
        {banner.message}
      </p>
      {banner.link_url && (
        <a
          href={banner.link_url}
          data-no-drag
          className="mt-3 inline-block text-sm font-bold text-primary-foreground underline underline-offset-2 hover:opacity-90"
        >
          {banner.link_label || "Xem ngay →"}
        </a>
      )}
      <button
        data-no-drag
        onClick={() => {
          if (dismissKey) window.sessionStorage.setItem(dismissKey, "1");
          setDismissed(true);
        }}
        aria-label="Đóng thông báo"
        className="absolute right-3 top-3 rounded-full p-1.5 text-primary-foreground/80 transition hover:bg-white/15 hover:text-primary-foreground"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
