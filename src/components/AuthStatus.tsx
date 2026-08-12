import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function AuthStatus() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div className="h-9 w-20" />;

  if (!user) {
    return (
      <Link
        to="/dang-nhap"
        className="rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
      >
        Đăng nhập
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden items-center gap-1.5 font-medium text-foreground sm:flex">
        <User className="h-3.5 w-3.5 text-primary" />
        {user.user_metadata?.full_name || user.user_metadata?.phone || "Tài khoản"}
      </span>
      <Link
        to="/tai-skill"
        className="rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-brand transition hover:scale-[1.02]"
      >
        Tải Skill
      </Link>
      <Link
        to="/doi-mat-khau"
        className="hidden text-xs font-medium text-muted-foreground transition hover:text-foreground sm:inline"
      >
        Đổi mật khẩu
      </Link>
      <button
        onClick={() => signOut()}
        className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
      >
        Đăng xuất
      </button>
    </div>
  );
}
