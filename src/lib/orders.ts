import { supabase } from "@/lib/supabase";

export type OrderItem = {
  id: string;
  title: string;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    note?: string;
  };
  paymentMethod: "bank_transfer" | "card_soon";
  status: "pending_payment";
};

const STORAGE_KEY = "kol-skill-orders";

function readOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function slugifyName(name: string) {
  const noAccents = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d");
  const clean = noAccents.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return clean.slice(0, 8) || "KH";
}

/**
 * Mã đơn hàng tự đọc được: TÊN-MÃSKILL(+SỐ CÒN LẠI)-NGÀYTHÁNGNĂM(2 số)-MÃNGẪUNHIÊN.
 * Vd: khách "Lê Lam" mua S0301 (+1 skill khác) ngày 12/08/2026 → LELAM-S0301+1-120826-X7K2.
 * Giúp chủ shop nhìn nội dung chuyển khoản là đoán ngay được ai mua skill gì, ngày nào.
 */
export function generateOrderId(customerName: string, itemIds: string[]) {
  const namePart = slugifyName(customerName);
  const firstSkill = itemIds[0] ?? "SKL";
  const skillPart = itemIds.length > 1 ? `${firstSkill}+${itemIds.length - 1}` : firstSkill;
  const now = new Date();
  const datePart = `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getFullYear()).slice(-2)}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${namePart}-${skillPart}-${datePart}-${rand}`;
}

export function saveOrder(order: Order) {
  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
}

export function getOrder(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}

/**
 * Lưu bản sao đơn hàng lên Supabase để chủ shop xem được (Table Editor → orders)
 * và để khách "nhận" đơn bằng mã sau khi đăng nhập ở trang /tai-skill.
 * Best-effort: nếu lỗi mạng/Supabase thì bỏ qua, không chặn luồng đặt hàng
 * (nguồn dữ liệu chính vẫn là localStorage cho trang xác nhận đơn hàng).
 */
export async function saveOrderToSupabase(order: Order, userId?: string) {
  try {
    await supabase.from("orders").insert({
      id: order.id,
      user_id: userId || null,
      customer_name: order.customer.name,
      customer_phone: order.customer.phone,
      customer_email: order.customer.email || null,
      customer_note: order.customer.note || null,
      items: order.items,
      total: order.total,
      payment_method: order.paymentMethod,
      status: order.status,
    });
  } catch {
    // Bỏ qua lỗi mạng — đơn hàng vẫn hiển thị được nhờ localStorage.
  }
}
