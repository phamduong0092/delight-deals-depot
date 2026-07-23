import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import kolGraduation from "@/assets/kol-graduation.asset.json";
import kolGym from "@/assets/kol-gym.asset.json";
import kolGymVideo from "@/assets/kol-gym-video.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KOL AI Go Global — Ảnh bán hàng chuyên nghiệp chỉ $2" },
      {
        name: "description",
        content:
          "Bộ ảnh KOL AI Go Global chất lượng cao dành cho affiliate & bán hàng. Chỉ $2 mỗi ảnh, tải về ngay.",
      },
      { property: "og:title", content: "KOL AI Go Global — Ảnh bán hàng chuyên nghiệp $2" },
      {
        property: "og:description",
        content: "Ảnh sản phẩm KOL AI dành cho affiliate. $2 / ảnh. Tải về ngay.",
      },
      { property: "og:type", content: "product" },
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
  desc: string;
  image: string;
  video?: string;
};

const products: Product[] = [
  {
    id: "graduation",
    title: "KOL AI System — Lễ Tốt Nghiệp",
    tag: "Poster Sự Kiện",
    desc: "Poster graduation phong cách sang trọng, cờ đỏ sao vàng, khung vàng gold — sẵn sàng cho chiến dịch KOL AI Go Global.",
    image: kolGraduation.url,
  },
  {
    id: "gym",
    title: "KOL AI Go Global — Gym Selfie",
    tag: "Ảnh Lifestyle",
    desc: "Ảnh lifestyle selfie phòng gym với áo KOL AI Go Global — hoàn hảo cho affiliate, ads và bán hàng social.",
    image: kolGym.url,
  },
];

function Landing() {
  const [cart, setCart] = useState<string[]>([]);
  const add = (id: string) => setCart((c) => (c.includes(id) ? c : [...c, id]));
  const total = cart.length * 2;

  return (
    <main className="min-h-screen bg-soft-gradient">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-gradient shadow-brand" />
          <span className="font-display text-2xl">KOL AI <span className="text-gradient">Store</span></span>
        </div>
        <a
          href="#products"
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:opacity-90"
        >
          Mua ngay
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Bộ ảnh KOL AI Go Global · Bản quyền sử dụng thương mại
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          Ảnh bán hàng <em className="text-gradient not-italic">chuyên nghiệp</em>,
          <br className="hidden sm:block" /> chỉ với <span className="text-gradient">$2</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          Hai mẫu ảnh cao cấp cho chiến dịch affiliate & KOL. Tải về ngay, dùng liền cho ads,
          landing page và mạng xã hội.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#products"
            className="rounded-full bg-brand-gradient px-7 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
          >
            Xem sản phẩm →
          </a>
          <a
            href="#faq"
            className="rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-4xl sm:text-5xl">Sản phẩm</h2>
          <p className="text-sm text-muted-foreground">2 mẫu · $2 mỗi ảnh</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {products.map((p) => {
            const inCart = cart.includes(p.id);
            return (
              <article
                key={p.id}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-brand"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur">
                    {p.tag}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-primary-foreground shadow-brand">
                    $2
                  </span>
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <button
                    onClick={() => add(p.id)}
                    disabled={inCart}
                    className="w-full rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
                  >
                    {inCart ? "✓ Đã thêm vào giỏ" : "Thêm vào giỏ — $2"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Cart summary */}
        {cart.length > 0 && (
          <div className="sticky bottom-6 mx-auto mt-10 flex max-w-md items-center justify-between rounded-full bg-foreground px-6 py-4 text-background shadow-brand">
            <span className="text-sm">
              {cart.length} sản phẩm · <strong>${total}</strong>
            </span>
            <button className="rounded-full bg-brand-gradient px-5 py-2 text-sm font-semibold text-primary-foreground">
              Thanh toán →
            </button>
          </div>
        )}
      </section>

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
      <section id="faq" className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="text-4xl sm:text-5xl">Sẵn sàng nâng cấp <span className="text-gradient">ảnh bán hàng</span>?</h2>
        <p className="mt-4 text-muted-foreground">
          Chỉ $2 mỗi ảnh — đầu tư nhỏ, chuyển đổi lớn cho chiến dịch KOL AI Go Global.
        </p>
        <a
          href="#products"
          className="mt-8 inline-block rounded-full bg-brand-gradient px-8 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
        >
          Chọn ảnh của tôi →
        </a>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 KOL AI Store · Uyên Linh</p>
          <p>Made with love · KOL AI System</p>
        </div>
      </footer>
    </main>
  );
}
