import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { KeyRound, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/doi-mat-khau")({
  head: () => ({
    meta: [{ title: "Đổi mật khẩu · KOL AI Skill World" }],
  }),
  component: DoiMatKhauPage,
});

function DoiMatKhauPage() {
  const { user, loading } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("Mật khẩu mới cần tối thiểu 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu mới không khớp.");
      return;
    }
    if (!user?.email) return;

    setSubmitting(true);

    // Xác minh lại mật khẩu hiện tại trước khi cho đổi — tránh trường hợp máy
    // đang đăng nhập sẵn bị người khác lợi dụng đổi mật khẩu.
    const { error: reAuthError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (reAuthError) {
      setSubmitting(false);
      setError("Mật khẩu hiện tại không đúng.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setDone(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
            Đăng nhập để đổi mật khẩu tài khoản của bạn.
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
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            <h1 className="text-2xl">Đổi mật khẩu</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Nhập mật khẩu hiện tại để xác nhận, rồi đặt mật khẩu mới.
          </p>

          {done ? (
            <div className="mt-6 rounded-xl border border-wood/30 bg-wood/10 p-4 text-center">
              <p className="text-sm font-medium text-wood">Đổi mật khẩu thành công!</p>
              <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
                Về trang chủ
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm">
                Số điện thoại (tài khoản)
                <input
                  value={(user.user_metadata?.phone as string | undefined) || ""}
                  readOnly
                  disabled
                  className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-border bg-muted px-3.5 py-2.5 text-sm text-muted-foreground outline-none"
                />
              </label>
              <label className="block text-sm">
                Mật khẩu hiện tại
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                Mật khẩu mới
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Tối thiểu 6 ký tự"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                />
              </label>
              <label className="block text-sm">
                Xác nhận mật khẩu mới
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
                />
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
              >
                {submitting ? "Đang đổi…" : "Đổi mật khẩu"}
              </button>
            </form>
          )}
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
