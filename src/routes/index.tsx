import { createFileRoute, Link } from "@tanstack/react-router";
import { Facebook, MessageCircleMore, ShoppingCart, Sparkles, Youtube } from "lucide-react";
import sanh1Graduation from "@/assets/sanh-1/graduation.webp";
import { categories, type Category, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { FACEBOOK_PAGE_LINK, YOUTUBE_CHANNEL_LINK, ZALO_GROUP_LINK } from "@/lib/payment";
import { useMergedProduct } from "@/lib/productContent";
import { ProductArt } from "@/components/ProductArt";
import { Reveal } from "@/components/Reveal";
import { AuthStatus } from "@/components/AuthStatus";
import { HomeVideoSection } from "@/components/HomeVideoSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KOL AI Skill World — Sàn kỹ năng bán hàng đẳng cấp $2" },
      {
        name: "description",
        content:
          "Skill World by KOL AI — Sàn giao dịch kỹ năng bán hàng chuyên nghiệp. 6 sảnh Skill: Sẵn Sàng Dùng Ngay, Thương Hiệu, Hình Ảnh Cá Nhân, Video & TVC, Trang Bán Hàng, Khóa Học. Mỗi Skill Pack chỉ $2.",
      },
      { property: "og:title", content: "KOL AI Skill World — Sàn Skill bán hàng $2" },
      {
        property: "og:description",
        content: "Sàn Skill bán hàng chuyên nghiệp. 6 sảnh Skill đẳng cấp. $2 mỗi Skill Pack.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: sanh1Graduation },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: sanh1Graduation },
    ],
  }),
  component: Landing,
});

function Landing() {
  const cart = useCart();

  return (
    <main className="min-h-screen bg-soft-gradient">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
            <span className="truncate font-display text-2xl">
              KOL AI <span className="text-gradient">Skill World</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-3 text-sm">
            <a
              href="#gian-1"
              className="hidden rounded-full px-3 py-2 font-semibold text-foreground transition hover:text-primary sm:inline"
            >
              Vào sàn Skill
            </a>
            <AuthStatus />
            <Link
              to="/checkout"
              className="relative flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-medium text-background transition hover:opacity-90"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">
                {cart.count} skill · ${cart.total}
              </span>
              {cart.count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground sm:hidden">
                  {cart.count}
                </span>
              )}
            </Link>
          </div>
        </div>
        {/* Category quick nav */}
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 pb-3 text-xs">
          {categories.map((cat, idx) => (
            <a
              key={cat.id}
              href={`#gian-${idx + 1}`}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              {cat.title.split("·")[1]?.trim() ?? cat.title}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <Sparkles className="sparkle-twinkle h-3.5 w-3.5" />
          Sàn giao dịch Skill · 6 Sảnh đẳng cấp · 36 Skill Pack
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl md:text-6xl">
          Thế giới <em className="text-gradient not-italic">Skill bán hàng</em> chuyên nghiệp.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          Chúng tôi không bán ảnh — chúng tôi trao bạn <strong>kỹ năng</strong>. Chọn Skill, kích
          hoạt và bán hàng như một KOL thực thụ.
        </p>
      </section>

      <HomeVideoSection />

      {/* 6 Sảnh Skill */}
      <div className="mx-auto max-w-6xl space-y-14 px-6 pb-24">
        {categories.map((cat, idx) => (
          <CategoryRow key={cat.id} anchorId={`gian-${idx + 1}`} category={cat} />
        ))}
      </div>

      {/* Features */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 rounded-3xl bg-card p-8 shadow-card sm:grid-cols-3 sm:p-12">
            {[
              { t: "Đẳng cấp KOL", d: "Skill Pack được đúc kết từ hệ thống KOL AI Go Global." },
              {
                t: "Kích hoạt tức thì",
                d: "Nhận Skill ngay sau thanh toán — dùng được trong 5 phút.",
              },
              {
                t: "Bản quyền thương mại",
                d: "Toàn quyền dùng cho ads, affiliate và đào tạo nội bộ.",
              },
            ].map((f) => (
              <div key={f.t}>
                <div className="mb-3 h-10 w-10 rounded-xl bg-brand-gradient shadow-brand" />
                <h3 className="text-xl">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

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
          className="shimmer glow-pulse mt-8 inline-block rounded-full bg-brand-gradient px-8 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
        >
          Khám phá Sàn Skill →
        </a>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 KOL AI Skill World · Lan Linh</p>
          <div className="flex items-center gap-3">
            <a
              href={FACEBOOK_PAGE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fanpage Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:border-primary hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nhóm Zalo"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:border-primary hover:text-primary"
            >
              <MessageCircleMore className="h-4 w-4" />
            </a>
            <a
              href={YOUTUBE_CHANNEL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kênh YouTube"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:border-primary hover:text-primary"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
          <p>Made with love · KOL AI System</p>
        </div>
      </footer>

      {/* Cart sticky */}
      {cart.count > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 mx-auto flex max-w-sm items-center justify-between rounded-full bg-foreground px-5 py-3 text-background shadow-brand">
          <span className="text-sm">
            ⚡ {cart.count} skill · <strong>${cart.total}</strong>
          </span>
          <Link
            to="/checkout"
            className="rounded-full bg-brand-gradient px-4 py-1.5 text-sm font-semibold text-primary-foreground"
          >
            Thanh toán →
          </Link>
        </div>
      )}
    </main>
  );
}

function CategoryRow({ anchorId, category }: { anchorId: string; category: Category }) {
  return (
    <section id={anchorId}>
      <Reveal>
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
      </Reveal>

      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-6">
        {category.products.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 5) * 60} className="w-[220px] shrink-0 sm:w-auto">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product: rawProduct }: { product: Product }) {
  const product = useMergedProduct(rawProduct);
  const cart = useCart();
  const inCart = cart.has(product.id);
  const available = product.available === true;
  const contactOnly = product.contactOnly === true;

  return (
    <article className="group w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-brand">
      <Link to="/skill/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <ProductArt product={product} className="transition duration-700 group-hover:scale-105" />
          {!available && !contactOnly && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-white/30 bg-black/45 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-card backdrop-blur-sm">
                  Coming Soon
                </span>
              </div>
            </>
          )}
          {product.bestseller && available && (
            <span className="absolute left-2 top-2 rounded-full bg-wood-gradient px-2 py-0.5 text-[10px] font-medium text-white shadow-wood backdrop-blur">
              Bán chạy
            </span>
          )}
          <span
            className={`absolute ${
              product.bestseller && available ? "left-2 top-8" : "left-2 top-2"
            } rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium backdrop-blur`}
          >
            {product.tag}
          </span>
          <span className="absolute right-2 top-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-brand">
            {contactOnly ? "Liên hệ" : `$${product.price}`}
          </span>
        </div>
      </Link>
      <div className="space-y-2 p-3">
        <Link to="/skill/$id" params={{ id: product.id }}>
          <h3 className="truncate font-display text-lg leading-tight transition group-hover:text-primary">
            {product.title}
          </h3>
        </Link>
        {contactOnly ? (
          <a
            href={ZALO_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-foreground px-3 py-2 text-center text-xs font-semibold text-background transition hover:opacity-90"
          >
            Liên hệ tư vấn →
          </a>
        ) : (
          <button
            onClick={() => cart.toggle(product.id)}
            disabled={!available}
            className="w-full rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {!available
              ? "Sắp ra mắt"
              : inCart
                ? "✓ Đã thêm vào giỏ"
                : `Thêm vào giỏ · $${product.price}`}
          </button>
        )}
      </div>
    </article>
  );
}
