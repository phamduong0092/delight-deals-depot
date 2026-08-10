import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Building2, ShoppingBag, Trash2 } from "lucide-react";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductArt } from "@/components/ProductArt";
import { generateOrderId, saveOrder, type Order } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Thanh toán · KOL AI Skill World" }],
  }),
  component: Checkout,
});

type PaymentMethod = Order["paymentMethod"];

function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("bank_transfer");
  const [error, setError] = useState<string | null>(null);

  const items = cart.itemIds
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    if (items.length === 0) {
      setError("Giỏ hàng của bạn đang trống.");
      return;
    }

    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: items.map((p) => ({ id: p.id, title: p.title, price: p.price })),
      total: cart.total,
      customer: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        note: note.trim() || undefined,
      },
      paymentMethod: payment,
      status: "pending_payment",
    };

    saveOrder(order);
    cart.clear();
    navigate({ to: "/order/$id", params: { id: order.id } });
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl">Giỏ hàng đang trống</h1>
        <p className="text-muted-foreground">Chọn vài Skill Pack yêu thích rồi quay lại đây nhé.</p>
        <Link to="/" className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
          ← Về Sàn Skill
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-soft-gradient">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
            <span className="truncate font-display text-2xl">
              KOL AI <span className="text-gradient">Skill World</span>
            </span>
          </Link>
          <span className="text-sm text-muted-foreground">Thanh toán</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        <h1 className="text-3xl sm:text-4xl">Hoàn tất đơn hàng</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {/* Customer info */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold">Thông tin liên hệ</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Dùng để gửi Skill Pack và xác nhận đơn hàng cho bạn.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  Họ và tên <span className="text-primary">*</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    placeholder="Nguyễn Văn A"
                  />
                </label>
                <label className="block text-sm">
                  Số điện thoại <span className="text-primary">*</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    placeholder="09xx xxx xxx"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    placeholder="ban@email.com"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  Ghi chú (tuỳ chọn)
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    placeholder="Yêu cầu thêm nếu có..."
                  />
                </label>
              </div>
            </div>

            {/* Payment method */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
              <h2 className="text-lg font-semibold">Phương thức thanh toán</h2>
              <div className="mt-4 space-y-3">
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    payment === "bank_transfer" ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "bank_transfer"}
                    onChange={() => setPayment("bank_transfer")}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Building2 className="h-4 w-4 text-primary" /> Chuyển khoản ngân hàng / VietQR
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Bạn sẽ nhận mã đơn hàng và thông tin chuyển khoản ở bước xác nhận tiếp theo.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-not-allowed items-start gap-3 rounded-xl border border-border p-4 opacity-50">
                  <input type="radio" name="payment" disabled className="mt-1" />
                  <div>
                    <div className="text-sm font-medium">Thẻ quốc tế (Visa/Mastercard)</div>
                    <p className="mt-1 text-xs text-muted-foreground">Sắp ra mắt.</p>
                  </div>
                </label>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          {/* Order summary */}
          <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
            <h2 className="text-lg font-semibold">Đơn hàng của bạn</h2>
            <ul className="space-y-3">
              {items.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <ProductArt product={p} iconClassName="h-5 w-5" autoPlay={false} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-muted-foreground">${p.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.remove(p.id)}
                    className="shrink-0 text-muted-foreground transition hover:text-red-500"
                    aria-label={`Xoá ${p.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
              <span className="text-muted-foreground">Tổng cộng</span>
              <span className="text-xl font-semibold text-gradient">${cart.total}</span>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
            >
              Đặt hàng · ${cart.total}
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}
