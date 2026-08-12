import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { loadRememberedInfo, saveRememberedInfo } from "@/lib/rememberedInfo";

export const Route = createFileRoute("/dang-ky")({
  head: () => ({
    meta: [{ title: "Đăng ký · KOL AI Skill World" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(() => loadRememberedInfo().name || "");
  const [email, setEmail] = useState(() => loadRememberedInfo().email || "");
  const [phone, setPhone] = useState(() => loadRememberedInfo().phone || "");
  const [note, setNote] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Mật khẩu cần tối thiểu 6 ký tự.");
      return;
    }
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }

    setSubmitting(true);
    const { error: signUpError } = await signUp(
      phone.trim(),
      password,
      fullName.trim(),
      email.trim() || undefined,
      note.trim() || undefined,
    );
    setSubmitting(false);

    if (signUpError) {
      setError(
        signUpError.includes("already registered") || signUpError.includes("already exists")
          ? "Số điện thoại này đã có tài khoản — thử đăng nhập."
          : signUpError,
      );
      return;
    }
    saveRememberedInfo({ name: fullName.trim(), phone: phone.trim(), email: email.trim() });
    navigate({ to: "/" });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-soft-gradient px-6 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-gradient shadow-brand" />
          <span className="font-display text-2xl">
            KOL AI <span className="text-gradient">Skill World</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <h1 className="text-2xl">Tạo tài khoản</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Đăng ký để lưu Skill Pack và theo dõi đơn hàng của bạn.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm">
              Họ và tên
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={(e) => saveRememberedInfo({ name: e.target.value.trim() })}
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="Nguyễn Văn A"
              />
            </label>
            <label className="block text-sm">
              Số điện thoại <span className="text-primary">*</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={(e) => saveRememberedInfo({ phone: e.target.value.trim() })}
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="09xx xxx xxx"
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                Dùng số này để đăng nhập lần sau.
              </span>
            </label>
            <label className="block text-sm">
              Email (tuỳ chọn)
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => saveRememberedInfo({ email: e.target.value.trim() })}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="ban@email.com"
              />
            </label>
            <label className="block text-sm">
              Ghi chú (tuỳ chọn)
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="Yêu cầu thêm nếu có..."
              />
            </label>
            <label className="block text-sm">
              Mật khẩu
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="Tối thiểu 6 ký tự"
              />
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="shimmer w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Đang tạo tài khoản…" : "Đăng ký"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/dang-nhap" className="font-medium text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-muted-foreground transition hover:text-foreground"
        >
          ← Về trang chủ
        </Link>
      </div>
    </main>
  );
}
