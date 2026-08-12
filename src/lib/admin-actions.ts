import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

// Chỉ chạy ở server (Nitro) — service_role key không bao giờ được gửi ra trình
// duyệt, khác hẳn client anon key trong src/lib/supabase.ts.
function getAdminClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Thiếu VITE_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local (xem hướng dẫn setup admin).",
    );
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function assertAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    throw new Error("Sai mật khẩu quản trị.");
  }
}

export type AdminProfile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  note: string | null;
  created_at: string;
};

export const listProfilesFn = createServerFn({ method: "POST" })
  .validator((data: { adminPassword: string }) => data)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    const admin = getAdminClient();
    const { data: rows, error } = await admin
      .from("profiles")
      .select("id, full_name, phone, email, note, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (rows ?? []) as AdminProfile[];
  });

export const resetPasswordFn = createServerFn({ method: "POST" })
  .validator((data: { adminPassword: string; phone: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    if (data.newPassword.length < 6) {
      throw new Error("Mật khẩu mới cần tối thiểu 6 ký tự.");
    }
    const admin = getAdminClient();
    const digits = data.phone.replace(/\D/g, "");

    const { data: rows, error: findError } = await admin.from("profiles").select("id, phone");
    if (findError) throw new Error(findError.message);
    const match = (rows ?? []).find((r) => (r.phone ?? "").replace(/\D/g, "") === digits);
    if (!match) {
      throw new Error("Không tìm thấy tài khoản với số điện thoại này.");
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(match.id, {
      password: data.newPassword,
    });
    if (updateError) throw new Error(updateError.message);
    return { ok: true };
  });
