import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  LogIn,
  PackageOpen,
  RefreshCw,
  Search,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { formatVnd, usdToVnd } from "@/lib/payment";
import { getProduct } from "@/lib/products";
import { useProductContent, mergeProductContent } from "@/lib/productContent";

export const Route = createFileRoute("/tai-skill")({
  head: () => ({
    meta: [{ title: "Skill của tôi · KOL AI Skill World" }],
  }),
  component: TaiSkillPage,
});

type OrderRow = {
  id: string;
  is_paid: boolean;
  items: { id: string; title: string; price: number }[];
  total: number;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Tên mới nhất của Skill (đã áp dụng chỉnh sửa trên Supabase), thay vì tên lưu lúc mua. */
function useLiveTitle(productId: string, fallbackTitle: string) {
  const content = useProductContent();
  const rawProduct = getProduct(productId);
  if (!rawProduct) return fallbackTitle;
  return mergeProductContent(rawProduct, content[productId]).title;
}

function PurchasedItemRow({
  item,
  fileUrl,
}: {
  item: { id: string; title: string; price: number };
  fileUrl: string | undefined;
}) {
  const title = useLiveTitle(item.id, item.title);

  return (
    <li className="flex items-center justify-between gap-4 rounded-xl bg-background/60 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">${item.price}</p>
      </div>
      {fileUrl ? (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
        >
          <Download className="h-3.5 w-3.5" />
          Tải xuống
        </a>
      ) : (
        <span className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
          Đang cập nhật nội dung
        </span>
      )}
    </li>
  );
}

function TaiSkillPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [fileLinks, setFileLinks] = useState<Record<string, string>>({});
  const [fetching, setFetching] = useState(true);

  // Nhận đơn bằng mã (dành cho đơn đặt trước khi có tài khoản, chưa gắn với user_id).
  const [claimOpen, setClaimOpen] = useState(false);
  const [code, setCode] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const loadOrders = async (userId: string) => {
    setFetching(true);
    const [{ data: orderData }, { data: fileData }] = await Promise.all([
      supabase
        .from("orders")
        .select("id, is_paid, items, total, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      supabase.from("skill_files").select("product_id, file_url"),
    ]);
    setOrders((orderData as OrderRow[] | null) ?? []);
    setFileLinks(
      Object.fromEntries(
        ((fileData as { product_id: string; file_url: string }[] | null) ?? []).map((f) => [
          f.product_id,
          f.file_url,
        ]),
      ),
    );
    setFetching(false);
  };

  // Chỉ tải dữ liệu 1 lần khi vào trang (theo user.id, không tự tải lại ngầm khi
  // session làm mới token). Muốn tải lại thì bấm nút "Làm mới" hoặc F5 trình duyệt.
  useEffect(() => {
    if (!user) return;
    void loadOrders(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleClaim = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setClaimError(null);
    setClaiming(true);

    const orderId = code.trim().toUpperCase();
    const { data, error } = await supabase
      .from("orders")
      .update({ user_id: user.id })
      .eq("id", orderId)
      .is("user_id", null)
      .select("id");

    setClaiming(false);

    if (error || !data || data.length === 0) {
      setClaimError("Không tìm thấy mã đơn này, hoặc đơn đã được liên kết với tài khoản khác.");
      return;
    }
    setCode("");
    setClaimOpen(false);
    void loadOrders(user.id);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-soft-gradient">
        <p className="text-sm text-muted-foreground">Đang tải…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-soft-gradient px-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <LogIn className="mx-auto h-8 w-8 text-primary" />
          <h1 className="mt-4 text-2xl">Cần đăng nhập</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Đăng nhập để xem Skill Pack và dịch vụ bạn đã mua.
          </p>
          <Link
            to="/dang-nhap"
            className="mt-6 inline-block rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </main>
    );
  }

  const paidOrders = (orders ?? []).filter((o) => o.is_paid);
  const pendingOrders = (orders ?? []).filter((o) => !o.is_paid);

  return (
    <main className="min-h-screen bg-soft-gradient">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
            <span className="truncate font-display text-2xl">
              KOL AI <span className="text-gradient">Skill World</span>
            </span>
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            ← Trang chủ
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl">Skill & dịch vụ của tôi</h1>
            <p className="mt-2 text-muted-foreground">
              Toàn bộ Skill Pack và kết quả dịch vụ bạn đã mua, sẵn sàng tải về.
            </p>
          </div>
          <button
            onClick={() => void loadOrders(user.id)}
            disabled={fetching}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${fetching ? "animate-spin" : ""}`} />
            Làm mới
          </button>
        </div>

        <Link
          to="/huong-dan-skill"
          className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 transition hover:bg-primary/10"
        >
          <span className="flex items-center gap-2.5 text-sm font-medium">
            <BookOpen className="h-4 w-4 shrink-0 text-primary" />
            Chưa biết cách cài & dùng Skill? Xem hướng dẫn từng bước
          </span>
          <span className="shrink-0 text-sm font-semibold text-primary">Xem ngay →</span>
        </Link>

        {fetching && <p className="mt-8 text-sm text-muted-foreground">Đang tải đơn hàng…</p>}

        {!fetching && (orders?.length ?? 0) === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <PackageOpen className="mx-auto h-9 w-9 text-muted-foreground" />
            <p className="mt-3 font-medium">Chưa có đơn hàng nào gắn với tài khoản này</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Đơn đặt trước khi đăng nhập? Bấm "Nhập mã đơn hàng" bên dưới để liên kết.
            </p>
            <Link
              to="/"
              className="mt-5 inline-block rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand"
            >
              Khám phá Skill →
            </Link>
          </div>
        )}

        {!fetching && paidOrders.length > 0 && (
          <section className="mt-8 space-y-4">
            {paidOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-sm font-semibold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-wood/15 px-3 py-1 text-xs font-medium text-wood">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Đã thanh toán
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                  {order.items.map((item) => (
                    <PurchasedItemRow key={item.id} item={item} fileUrl={fileLinks[item.id]} />
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {!fetching && pendingOrders.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Đang chờ xác nhận thanh toán
            </h2>
            <div className="mt-3 space-y-3">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/60 px-5 py-4"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.created_at)} · {formatVnd(usdToVnd(order.total))}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Clock3 className="h-3.5 w-3.5" />
                    Chờ xác nhận
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Sau khi shop xác nhận đã nhận chuyển khoản (qua Zalo), Skill sẽ tự động hiện link tải
              ở đây — không cần làm gì thêm.
            </p>
          </section>
        )}

        <div className="mt-10 border-t border-border pt-6">
          {!claimOpen ? (
            <button
              onClick={() => setClaimOpen(true)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              Có mã đơn hàng đặt trước khi đăng nhập? Nhập mã để liên kết
            </button>
          ) : (
            <form onSubmit={handleClaim} className="flex flex-wrap gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="LELAM-S0301-120826-X7K2"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3.5 py-2.5 font-mono text-sm outline-none ring-primary/30 transition focus:ring-2"
              />
              <button
                type="submit"
                disabled={claiming}
                className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
              >
                {claiming ? "Đang kiểm tra…" : "Liên kết"}
              </button>
            </form>
          )}
          {claimError && <p className="mt-2 text-sm text-red-400">{claimError}</p>}
        </div>
      </div>
    </main>
  );
}
