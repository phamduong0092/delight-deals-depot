import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, MessageCircleMore, PartyPopper } from "lucide-react";
import { getOrder, type Order } from "@/lib/orders";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [{ title: "Xác nhận đơn hàng · KOL AI Skill World" }],
  }),
  component: OrderConfirmation,
});

// TODO: thay bằng thông tin tài khoản ngân hàng / VietQR thật trước khi vận hành chính thức.
const BANK_INFO = {
  bankName: "Chưa cấu hình — cập nhật trong src/routes/order.$id.tsx",
  accountNumber: "—",
  accountHolder: "—",
};

function OrderConfirmation() {
  const { id } = Route.useParams();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrder(getOrder(id) ?? null);
  }, [id]);

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore silently
    }
  };

  if (order === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <p className="text-sm text-muted-foreground">Đang tải đơn hàng…</p>
      </main>
    );
  }

  if (order === null) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl">Không tìm thấy đơn hàng</h1>
        <p className="text-sm text-muted-foreground">
          Đơn hàng có thể đã được tạo trên thiết bị hoặc trình duyệt khác.
        </p>
        <Link to="/" className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
          ← Về Sàn Skill
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-soft-gradient">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient shadow-brand">
            <PartyPopper className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="mt-5 text-3xl sm:text-4xl">Đặt hàng thành công!</h1>
          <p className="mt-2 text-muted-foreground">
            Cảm ơn bạn — hoàn tất chuyển khoản để Skill Pack được kích hoạt.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Mã đơn hàng</p>
              <p className="font-mono text-lg font-semibold">{order.id}</p>
            </div>
            <button
              onClick={copyOrderId}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-accent"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Đã sao chép" : "Sao chép"}
            </button>
          </div>

          <ul className="mt-5 space-y-2 border-t border-border pt-4">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.title}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold">
            <span>Tổng cộng</span>
            <span className="text-gradient">${order.total}</span>
          </div>
        </div>

        {order.paymentMethod === "bank_transfer" && (
          <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              Thông tin chuyển khoản
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Ngân hàng</dt>
                <dd className="text-right">{BANK_INFO.bankName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Số tài khoản</dt>
                <dd>{BANK_INFO.accountNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Chủ tài khoản</dt>
                <dd>{BANK_INFO.accountHolder}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Nội dung chuyển khoản</dt>
                <dd className="font-mono">{order.id}</dd>
              </div>
            </dl>
            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <MessageCircleMore className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Sau khi chuyển khoản, vui lòng gửi ảnh chụp màn hình kèm mã đơn hàng qua Zalo/Facebook
              để được kích hoạt Skill trong vòng 5 phút.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            ← Tiếp tục khám phá Sàn Skill
          </Link>
        </div>
      </div>
    </main>
  );
}
