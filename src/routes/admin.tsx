import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { KeyRound, RefreshCw, ShieldCheck } from "lucide-react";
import { listProfilesFn, resetPasswordFn, type AdminProfile } from "@/lib/admin-actions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Quản trị · KOL AI Skill World" }],
  }),
  component: AdminPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [profiles, setProfiles] = useState<AdminProfile[] | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(false);

  const [resetPhone, setResetPhone] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [resetErr, setResetErr] = useState<string | null>(null);

  const loadProfiles = async (pwd: string) => {
    setLoadingList(true);
    setLoginError(null);
    try {
      const rows = await listProfilesFn({ data: { adminPassword: pwd } });
      setProfiles(rows);
      setUnlocked(true);
    } catch (e) {
      setLoginError(e instanceof Error ? e.message : "Sai mật khẩu quản trị.");
    } finally {
      setLoadingList(false);
    }
  };

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    void loadProfiles(adminPassword);
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setResetErr(null);
    setResetMsg(null);
    setResetting(true);
    try {
      await resetPasswordFn({
        data: { adminPassword, phone: resetPhone.trim(), newPassword: resetPassword },
      });
      setResetMsg(`Đã đặt mật khẩu mới cho SĐT ${resetPhone.trim()}.`);
      setResetPhone("");
      setResetPassword("");
    } catch (err) {
      setResetErr(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    } finally {
      setResetting(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-soft-gradient px-6">
        <form
          onSubmit={handleUnlock}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
          <h1 className="mt-4 text-center text-2xl">Trang quản trị</h1>
          <label className="mt-6 block text-sm">
            Mật khẩu quản trị
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
            />
          </label>
          {loginError && <p className="mt-3 text-sm text-red-400">{loginError}</p>}
          <button
            type="submit"
            disabled={loadingList}
            className="mt-6 w-full rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
          >
            {loadingList ? "Đang kiểm tra…" : "Vào trang quản trị"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-soft-gradient">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl">Quản trị tài khoản</h1>
          <button
            onClick={() => void loadProfiles(adminPassword)}
            disabled={loadingList}
            className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition hover:bg-accent disabled:pointer-events-none disabled:opacity-60"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingList ? "animate-spin" : ""}`} />
            Làm mới
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <KeyRound className="h-4 w-4 text-primary" />
            Đặt lại mật khẩu cho khách
          </h2>
          <form onSubmit={handleReset} className="mt-4 flex flex-wrap items-end gap-3">
            <label className="text-sm">
              Số điện thoại
              <input
                value={resetPhone}
                onChange={(e) => setResetPhone(e.target.value)}
                required
                placeholder="09xx xxx xxx"
                className="mt-1.5 block rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
              />
            </label>
            <label className="text-sm">
              Mật khẩu mới
              <input
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Tối thiểu 6 ký tự"
                className="mt-1.5 block rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none ring-primary/30 transition focus:ring-2"
              />
            </label>
            <button
              type="submit"
              disabled={resetting}
              className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
            >
              {resetting ? "Đang đặt…" : "Đặt mật khẩu"}
            </button>
          </form>
          {resetMsg && <p className="mt-3 text-sm text-wood">{resetMsg}</p>}
          {resetErr && <p className="mt-3 text-sm text-red-400">{resetErr}</p>}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">SĐT</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Ghi chú</th>
                <th className="px-4 py-3">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {(profiles ?? []).map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3">{p.full_name || "—"}</td>
                  <td className="px-4 py-3 font-mono">{p.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.email || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.note || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(p.created_at)}</td>
                </tr>
              ))}
              {(profiles ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Chưa có tài khoản nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
