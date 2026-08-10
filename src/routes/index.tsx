import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import kolGraduation from "@/assets/kol-graduation.asset.json";
import kolGym from "@/assets/kol-gym.asset.json";
import kolGymVideo from "@/assets/kol-gym-video.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KOL AI Skill World — Sàn kỹ năng bán hàng đẳng cấp $2" },
      {
        name: "description",
        content:
          "Skill World by KOL AI — Sàn giao dịch kỹ năng bán hàng chuyên nghiệp. 3 sảnh Skill: Thương Hiệu, Hình Ảnh Cá Nhân, Chuyển Đổi. Mỗi Skill Pack chỉ $2.",
      },
      { property: "og:title", content: "KOL AI Skill World — Sàn Skill bán hàng $2" },
      {
        property: "og:description",
        content: "Sàn Skill bán hàng chuyên nghiệp. 3 sảnh Skill đẳng cấp. $2 mỗi Skill Pack.",
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
    title: "Sảnh I · Skill Thương Hiệu Cá Nhân",
    subtitle: "Bộ kỹ năng xây dựng hình ảnh KOL đẳng cấp — từ định vị đến sân khấu",
    products: [
      {
        id: "graduation",
        title: "Skill · Sân Khấu Vinh Danh",
        tag: "Signature",
        image: kolGraduation.url,
      },
      { id: "launch", title: "Skill · Ra Mắt Thương Hiệu", tag: "Premium", emoji: "🎉" },
      { id: "honor", title: "Skill · Định Vị Chuyên Gia", tag: "Advanced", emoji: "🏆" },
      { id: "workshop", title: "Skill · Diễn Thuyết Workshop", tag: "Master", emoji: "🎤" },
      { id: "story-brand", title: "Skill · Kể Chuyện Thương Hiệu", tag: "Story", emoji: "📖" },
      { id: "pr-media", title: "Skill · Xuất Hiện Truyền Thông", tag: "PR", emoji: "📰" },
    ],
  },
  {
    id: "lifestyle",
    title: "Sảnh II · Skill Hình Ảnh Cá Nhân",
    subtitle: "Kỹ năng dựng chân dung đời thực — bán hàng bằng sự tin cậy",
    products: [
      {
        id: "gym",
        title: "Skill · Selfie Chuyển Động",
        tag: "Video Pack",
        image: kolGym.url,
        video: kolGymVideo.url,
      },
      { id: "outfit", title: "Skill · Phối Đồ Bán Hàng", tag: "Style", emoji: "💪" },
      { id: "street", title: "Skill · Street Storytelling", tag: "Story", emoji: "🕶️" },
      { id: "studio", title: "Skill · Chân Dung Cao Cấp", tag: "Luxury", emoji: "📸" },
      { id: "travel", title: "Skill · Lifestyle Du Lịch", tag: "Journey", emoji: "🌴" },
      { id: "daily", title: "Skill · Nhật Ký Đời Thường", tag: "Daily", emoji: "☕" },
    ],
  },
  {
    id: "video",
    title: "Sảnh III · Skill Video & TVC",
    subtitle: "Kỹ năng dựng video quảng cáo — từ kịch bản đến TVC chuẩn thương hiệu",
    products: [
      { id: "tvc-brand", title: "Skill · TVC Thương Hiệu", tag: "Cinematic", emoji: "🎬" },
      { id: "script", title: "Skill · Kịch Bản 30 Giây", tag: "Script", emoji: "📝" },
      { id: "reels", title: "Skill · Reels Chuyển Cảnh", tag: "Reels", emoji: "🎞️" },
      { id: "unbox", title: "Skill · Video Review Sản Phẩm", tag: "Review", emoji: "📦" },
      { id: "livestream", title: "Skill · Livestream Bán Hàng", tag: "Live", emoji: "🔴" },
      { id: "voice", title: "Skill · Giọng Đọc & Lồng Tiếng", tag: "Audio", emoji: "🎙️" },
    ],
  },
  {
    id: "landing",
    title: "Sảnh IV · Skill Trang Bán Hàng",
    subtitle: "Bộ kỹ năng dựng landing page chốt đơn — thiết kế, copy và chuyển đổi",
    products: [
      { id: "hero", title: "Skill · Landing Chốt Đơn", tag: "Funnel", emoji: "🚀" },
      { id: "copy", title: "Skill · Copywriting Bán Hàng", tag: "Copy", emoji: "✍️" },
      { id: "offer", title: "Skill · Thiết Kế Offer", tag: "Offer", emoji: "🎁" },
      { id: "checkout", title: "Skill · Tối Ưu Thanh Toán", tag: "Checkout", emoji: "💳" },
      { id: "upsell", title: "Skill · Upsell & Combo", tag: "Growth", emoji: "📈" },
      { id: "trust", title: "Skill · Chứng Thực Khách Hàng", tag: "Trust", emoji: "⭐" },
    ],
  },
  {
    id: "course",
    title: "Sảnh V · Skill Khóa Học",
    subtitle: "Kỹ năng đóng gói tri thức thành khóa học và bán hàng tự động",
    products: [
      { id: "curriculum", title: "Skill · Thiết Kế Giáo Trình", tag: "Blueprint", emoji: "🧭" },
      { id: "slide", title: "Skill · Slide Giảng Dạy", tag: "Deck", emoji: "🖥️" },
      { id: "record", title: "Skill · Quay Bài Giảng", tag: "Studio", emoji: "🎥" },
      { id: "community", title: "Skill · Vận Hành Cộng Đồng", tag: "Community", emoji: "🤝" },
      { id: "webinar", title: "Skill · Webinar Chốt Học Viên", tag: "Webinar", emoji: "📡" },
      { id: "affiliate", title: "Skill · Hệ Thống Affiliate", tag: "Scale", emoji: "🌐" },
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
              KOL AI <span className="text-gradient">Skill World</span>
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm">
            <span className="hidden text-muted-foreground sm:inline">
              {cart.length} skill · ${total}
            </span>
            <a
              href="#gian-1"
              className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition hover:opacity-90"
            >
              Vào sàn Skill →
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Sàn giao dịch Skill · 5 Sảnh đẳng cấp · 30 Skill Pack
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">
          Thế giới <em className="text-gradient not-italic">Skill bán hàng</em> chuyên nghiệp.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          Chúng tôi không bán ảnh — chúng tôi trao bạn <strong>kỹ năng</strong>. Chọn Skill, kích
          hoạt và bán hàng như một KOL thực thụ.
        </p>
      </section>

      {/* 3 Sảnh Skill */}
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
            { t: "Đẳng cấp KOL", d: "Skill Pack được đúc kết từ hệ thống KOL AI Go Global." },
            { t: "Kích hoạt tức thì", d: "Nhận Skill ngay sau thanh toán — dùng được trong 5 phút." },
            { t: "Bản quyền thương mại", d: "Toàn quyền dùng cho ads, affiliate và đào tạo nội bộ." },
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
          Nâng cấp <span className="text-gradient">Skill bán hàng</span> của bạn hôm nay
        </h2>
        <p className="mt-4 text-muted-foreground">
          $2 cho một Skill — đầu tư nhỏ nhất cho bước nhảy lớn nhất trong sự nghiệp KOL.
        </p>
        <a
          href="#gian-1"
          className="mt-8 inline-block rounded-full bg-brand-gradient px-8 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
        >
          Khám phá Sàn Skill →
        </a>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 KOL AI Skill World · Uyên Linh</p>
          <p>Made with love · KOL AI System</p>
        </div>
      </footer>

      {/* Cart sticky */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 mx-auto flex max-w-sm items-center justify-between rounded-full bg-foreground px-5 py-3 text-background shadow-brand">
          <span className="text-sm">
            ⚡ {cart.length} skill · <strong>${total}</strong>
          </span>
          <button className="rounded-full bg-brand-gradient px-4 py-1.5 text-sm font-semibold text-primary-foreground">
            Kích hoạt →
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
            Skill Hall
          </p>
          <h2 className="mt-1 truncate text-2xl sm:text-3xl">{category.title}</h2>
          <p className="mt-1 truncate text-sm text-muted-foreground">{category.subtitle}</p>
        </div>
        <a
          href="#faq"
          className="shrink-0 text-sm font-medium text-primary transition hover:opacity-80"
        >
          Toàn bộ Skill →
        </a>
      </div>

      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-6">
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
          {inCart ? "✓ Đã kích hoạt" : "Kích hoạt Skill · $2"}
        </button>
      </div>
    </article>
  );
}
