import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, PlayCircle, ShieldCheck, Zap } from "lucide-react";
import { getProduct, getCategory, categories } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useProductContent, mergeProductContent } from "@/lib/productContent";
import { extractYoutubeId } from "@/lib/youtube";
import { ZALO_GROUP_LINK } from "@/lib/payment";
import { ProductArt } from "@/components/ProductArt";
import { Reveal } from "@/components/Reveal";
import { AuthStatus } from "@/components/AuthStatus";

export const Route = createFileRoute("/skill/$id")({
  head: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) return {};
    return {
      meta: [
        { title: `${product.title} — KOL AI Skill World` },
        { name: "description", content: product.shortDesc },
        { property: "og:title", content: product.title },
        { property: "og:description", content: product.shortDesc },
        ...(product.image ? [{ property: "og:image", content: product.image }] : []),
      ],
    };
  },
  component: SkillDetail,
});

function NotFoundSkill() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl">Không tìm thấy Skill này</h1>
      <p className="text-muted-foreground">Có thể Skill đã đổi tên hoặc đường dẫn không đúng.</p>
      <Link to="/" className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
        ← Về trang chủ
      </Link>
    </main>
  );
}

function SkillDetail() {
  const { id } = Route.useParams();
  const rawProduct = getProduct(id);
  const cart = useCart();
  const navigate = useNavigate();
  const content = useProductContent();

  if (!rawProduct) return <NotFoundSkill />;

  const product = mergeProductContent(rawProduct, content[rawProduct.id]);
  const category = getCategory(product.categoryId);
  const inCart = cart.has(product.id);
  const available = product.available === true;
  const contactOnly = product.contactOnly === true;
  const reviewVideoUrl = content[rawProduct.id]?.video_url;
  const reviewVideoId = reviewVideoUrl ? extractYoutubeId(reviewVideoUrl) : null;

  const related = category ? category.products.filter((p) => p.id !== product.id).slice(0, 6) : [];

  const buyNow = () => {
    cart.add(product.id);
    navigate({ to: "/checkout" });
  };

  return (
    <main className="min-h-screen bg-soft-gradient">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
            <span className="truncate font-display text-2xl">
              KOL AI <span className="text-gradient">Skill World</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent sm:inline-block"
            >
              ← Trang chủ
            </Link>
            <AuthStatus />
            <Link
              to="/checkout"
              className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
            >
              {cart.count} skill · ${cart.total}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <a
                href={`/#gian-${categories.findIndex((c) => c.id === category.id) + 1}`}
                className="hover:text-foreground"
              >
                {category.title}
              </a>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="relative aspect-square">
              <ProductArt product={product} iconClassName="h-20 w-20" />
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
                <span className="absolute left-4 top-4 rounded-full bg-wood-gradient px-3 py-1 text-xs font-medium text-white shadow-wood">
                  Bán chạy
                </span>
              )}
            </div>
          </div>

          <div>
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {product.tag}
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl">{product.title}</h1>
            <p className="mt-3 text-muted-foreground">{product.shortDesc}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-display text-gradient">
                {contactOnly ? "Liên hệ" : `$${product.price}`}
              </span>
              <span className="text-sm text-muted-foreground">
                {contactOnly ? "báo giá theo yêu cầu" : "/ Skill Pack · trọn đời"}
              </span>
            </div>

            {!available && !contactOnly && (
              <p className="mt-6 text-sm text-muted-foreground">
                Skill này đang được hoàn thiện nội dung, sẽ mở bán sớm.
              </p>
            )}

            {contactOnly ? (
              <div className="mt-6">
                <a
                  href={ZALO_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer flex w-full items-center justify-center rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
                >
                  Liên hệ tư vấn qua Zalo →
                </a>
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={buyNow}
                  disabled={!available}
                  className="shimmer flex-1 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:after:hidden"
                >
                  {available ? `Mua ngay · $${product.price}` : "Sắp ra mắt"}
                </button>
                <button
                  onClick={() => cart.toggle(product.id)}
                  disabled={!available}
                  className="flex-1 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
                >
                  {inCart ? "✓ Đã có trong giỏ" : "Thêm vào giỏ"}
                </button>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" /> Kích hoạt tức thì
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Bản quyền thương mại
              </span>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-5 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Bạn nhận được gì
              </h2>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Long description */}
        <Reveal>
          <section className="mt-14 max-w-3xl">
            <h2 className="text-2xl">Mô tả chi tiết</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{product.longDesc}</p>
          </section>
        </Reveal>

        {/* Video demo thực tế — chỉ hiện khi Skill có gắn link YouTube trong Supabase */}
        {reviewVideoId && (
          <Reveal>
            <section className="mt-14 max-w-3xl">
              <h2 className="flex items-center gap-2 text-2xl">
                <PlayCircle className="h-5 w-5 text-primary" />
                Xem demo thực tế
              </h2>
              <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${reviewVideoId}`}
                    title={`Demo thực tế — ${product.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
            </section>
          </Reveal>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl">Skill cùng sảnh</h2>
            <div className="-mx-6 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-6">
              {related.map((rawRelated) => {
                const p = mergeProductContent(rawRelated, content[rawRelated.id]);
                const relatedAvailable = p.available === true;
                const relatedContactOnly = p.contactOnly === true;
                return (
                  <Link
                    key={p.id}
                    to="/skill/$id"
                    params={{ id: p.id }}
                    className="group w-[180px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-brand sm:w-auto"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <ProductArt
                        product={p}
                        className="transition duration-700 group-hover:scale-105"
                      />
                      {!relatedAvailable && !relatedContactOnly && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-card backdrop-blur-sm">
                              Coming Soon
                            </span>
                          </div>
                        </>
                      )}
                      <span className="absolute right-2 top-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow-brand">
                        {relatedContactOnly ? "Liên hệ" : `$${p.price}`}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="truncate font-display text-sm leading-tight">{p.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
