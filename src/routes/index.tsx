import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import kolGraduation from "@/assets/kol-graduation.asset.json";
import kolGym from "@/assets/kol-gym.asset.json";
import kolGymVideo from "@/assets/kol-gym-video.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KOL AI Store — Gian hàng ảnh bán hàng chỉ $2" },
      {
        name: "description",
        content:
          "Chợ ảnh KOL AI Go Global — 3 gian hàng Poster, Lifestyle, Ads. Mỗi sản phẩm chỉ $2. Tải về ngay dùng cho affiliate & KOL.",
      },
      { property: "og:title", content: "KOL AI Store — Chợ ảnh bán hàng $2" },
      {
        property: "og:description",
        content: "3 gian hàng ảnh KOL AI Go Global. $2 mỗi sản phẩm. Tải về ngay.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: kolGraduation.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: kolGraduation.url },
    ],
  }),
  component: Landing,
});

type Product = {
  id: string;
  title: string;
  tag: string;
  image?: string;
  video?: string;
  emoji?: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
};

const categories: Category[] = [
  {
    id: "poster",
    title: "Poster Sự Kiện KOL AI",
    subtitle: "Ảnh sự kiện sang trọng, dùng ngay cho fanpage & ads",
    products: [
      {
        id: "graduation",
        title: "Lễ Tốt Nghiệp",
        tag: "Best seller",
        image: kolGraduation.url,
      },
      { id: "launch", title: "Poster Ra Mắt", tag: "Mới", emoji: "🎉" },
      { id: "honor", title: "Poster Vinh Danh", tag: "Hot", emoji: "🏆" },
      { id: "workshop", title: "Poster Workshop", tag: "Chuyên nghiệp", emoji: "🎤" },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle & Gym",
    subtitle: "Ảnh & video selfie chân thực cho content cá nhân",
    products: [
      {
        id: "gym",
        title: "Gym Selfie Video",
        tag: "Video",
        image: kolGym.url,
        video: kolGymVideo.url,
      },
      { id: "outfit", title: "Gym Outfit", tag: "Trendy", emoji: "💪" },
      { id: "street", title: "Street Style", tag: "Casual", emoji: "🕶️" },
      { id: "studio", title: "Studio Portrait", tag: "Cao cấp", emoji: "📸" },
    ],
  },
  {
    id: "ads",
    title: "Ads & Affiliate Pack",
    subtitle: "Bộ hình ads đa nền tảng, sẵn kích thước chuẩn",
    products: [
      { id: "fb", title: "Banner Facebook Ads", tag: "1200×628", emoji: "📘" },
      { id: "ig", title: "Story Instagram", tag: "1080×1920", emoji: "📷" },
      { id: "tt", title: "TikTok Cover", tag: "1080×1920", emoji: "🎵" },
      { id: "hero", title: "Landing Hero", tag: "1920×1080", emoji: "🚀" },
    ],
  },
];

function Landing() {
  const [cart, setCart] = useState<string[]>([]);
  const add = (id: string) => setCart((c) => (c.includes(id) ? c : [...c, id]));
  const total = cart.length * 2;

  return (
    <main className="min-h-screen bg-soft-gradient">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex min-w-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
            <span className="truncate font-display text-2xl">
              KOL AI <span className="text-gradient">Store</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm">
            <span className="hidden text-muted-foreground sm:inline">
              {cart.length} sp · ${total}
            </span>
            <a
              href="#gian-1"
              className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition hover:opacity-90"
            >
              Vào chợ →
            </a>
          </div>
        </div>
      </header>

      {/* Hero rút gọn */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Chợ ảnh KOL AI Go Global · 3 gian hàng · $2 / sản phẩm
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
          Chợ ảnh bán hàng <em className="text-gradient not-italic">chuyên nghiệp</em>,
          mỗi món chỉ <span className="text-gradient">$2</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          Lướt qua 3 gian hàng, chọn nhanh, thanh toán gọn — dùng liền cho affiliate, ads & social.
        </p>
      </section>

      {/* 3 Gian hàng */}
      <div className="mx-auto max-w-6xl space-y-14 px-6 pb-24">
        {categories.map((cat, idx) => (
          <CategoryRow
            key={cat.id}
            anchorId={`gian-${idx + 1}`}
            category={cat}
            cart={cart}
            onAdd={add}
          />
        ))}
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 rounded-3xl bg-card p-8 shadow-card sm:grid-cols-3 sm:p-12">
          {[
            { t: "Chất lượng cao", d: "Ảnh độ phân giải cao, sẵn sàng cho in ấn & quảng cáo." },
            { t: "Tải về tức thì", d: "Nhận link tải ngay sau khi thanh toán thành công." },
            { t: "Dùng thương mại", d: "Bản quyền sử dụng cho ads, affiliate và social." },
          ].map((f) => (
            <div key={f.t}>
              <div className="mb-3 h-10 w-10 rounded-xl bg-brand-gradient shadow-brand" />
              <h3 className="text-xl">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / CTA */}
      <section id="faq" className="mx-auto max-w-3xl px-6 pb-32 text-center">
        <h2 className="text-4xl sm:text-5xl">
          Sẵn sàng nâng cấp <span className="text-gradient">ảnh bán hàng</span>?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Chỉ $2 mỗi ảnh — đầu tư nhỏ, chuyển đổi lớn cho chiến dịch KOL AI Go Global.
        </p>
        <a
          href="#gian-1"
          className="mt-8 inline-block rounded-full bg-brand-gradient px-8 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
        >
          Vào chợ chọn ảnh →
        </a>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 KOL AI Store · Uyên Linh</p>
          <p>Made with love · KOL AI System</p>
        </div>
      </footer>

      {/* Cart sticky */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 mx-auto flex max-w-sm items-center justify-between rounded-full bg-foreground px-5 py-3 text-background shadow-brand">
          <span className="text-sm">
            🛒 {cart.length} sp · <strong>${total}</strong>
          </span>
          <button className="rounded-full bg-brand-gradient px-4 py-1.5 text-sm font-semibold text-primary-foreground">
            Thanh toán →
          </button>
        </div>
      )}
    </main>
  );
}

function CategoryRow({
  anchorId,
  category,
  cart,
  onAdd,
}: {
  anchorId: string;
  category: Category;
  cart: string[];
  onAdd: (id: string) => void;
}) {
  return (
    <section id={anchorId}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-2xl sm:text-3xl">{category.title}</h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">{category.subtitle}</p>
        </div>
        <a
          href="#faq"
          className="shrink-0 text-sm font-medium text-primary transition hover:opacity-80"
        >
          Xem tất cả →
        </a>
      </div>

      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-4">
        {category.products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            inCart={cart.includes(p.id)}
            onAdd={() => onAdd(p.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  inCart,
  onAdd,
}: {
  product: Product;
  inCart: boolean;
  onAdd: () => void;
}) {
  return (
    <article className="group w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-brand sm:w-auto">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {product.video ? (
          <video
            src={product.video}
            poster={product.image}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-gradient text-5xl">
            <span className="drop-shadow-md">{product.emoji ?? "✨"}</span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium backdrop-blur">
          {product.tag}
        </span>
        <span className="absolute right-2 top-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-brand">
          $2
        </span>
      </div>
      <div className="space-y-2 p-3">
        <h3 className="truncate font-display text-lg leading-tight">{product.title}</h3>
        <button
          onClick={onAdd}
          disabled={inCart}
          className="w-full rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
        >
          {inCart ? "✓ Đã thêm" : "+ Thêm — $2"}
        </button>
      </div>
    </article>
  );
}
