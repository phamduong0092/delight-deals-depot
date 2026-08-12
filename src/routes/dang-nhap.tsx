import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { loadRememberedInfo, saveRememberedInfo } from "@/lib/rememberedInfo";

export const Route = createFileRoute("/dang-nhap")({
  head: () => ({
    meta: [{ title: "Đăng nhập · KOL AI Skill World" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(() => loadRememberedInfo().phone || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(phone.trim(), password);
    setSubmitting(false);

    if (signInError) {
      setError(
        signInError === "Invalid login credentials"
          ? "Số điện thoại hoặc mật khẩu không đúng."
          : signInError,
      );
      return;
    }
    saveRememberedInfo({ phone: phone.trim() });
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
          <h1 className="text-2xl">Đăng nhập</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Vào tài khoản để xem Skill Pack và đơn hàng của bạn.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-sm">
              Số điện thoại
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={(e) => saveRememberedInfo({ phone: e.target.value.trim() })}
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="09xx xxx xxx"
              />
            </label>
            <label className="block text-sm">
              Mật khẩu
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                placeholder="••••••••"
              />
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="shimmer w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
            >
              {submitting ? "Đang đăng nhập…" : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link to="/dang-ky" className="font-medium text-primary hover:underline">
              Đăng ký
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
