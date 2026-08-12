import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    phone: string,
    password: string,
    fullName: string,
    email?: string,
    note?: string,
  ) => Promise<{ error: string | null }>;
  signIn: (phone: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Supabase Auth cần định dạng "email" để đăng nhập bằng mật khẩu — ta ghép số điện
// thoại thành 1 địa chỉ nội bộ, không gửi mail thật, để khách chỉ cần nhớ số điện thoại.
function phoneToAuthEmail(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `p${digits}@phone.kolaiskillworld.com`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stopLoading = false;
    const finishLoading = () => {
      if (stopLoading) return;
      stopLoading = true;
      setLoading(false);
    };

    // Không để người dùng kẹt mãi ở "Đang tải…" nếu mạng chập chờn/Supabase không phản hồi.
    const timeout = setTimeout(finishLoading, 8000);

    supabase.auth
      .getSession()
      .then(({ data }) => {
        clearTimeout(timeout);
        setSession(data.session);
        finishLoading();
      })
      .catch(() => {
        clearTimeout(timeout);
        finishLoading();
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      clearTimeout(timeout);
      setSession(newSession);
      finishLoading();
    });

    return () => {
      clearTimeout(timeout);
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp: AuthContextValue["signUp"] = async (phone, password, fullName, email, note) => {
    const { error } = await supabase.auth.signUp({
      email: phoneToAuthEmail(phone),
      password,
      options: { data: { full_name: fullName, phone, email: email || null, note: note || null } },
    });
    return { error: error?.message ?? null };
  };

  const signIn: AuthContextValue["signIn"] = async (phone, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: phoneToAuthEmail(phone),
      password,
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, session, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
