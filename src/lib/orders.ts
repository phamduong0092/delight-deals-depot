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

export function generateOrderId() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `KOL-${stamp}-${rand}`;
}

export function saveOrder(order: Order) {
  const orders = readOrders();
  orders.unshift(order);
  writeOrders(orders);
}

export function getOrder(id: string): Order | undefined {
  return readOrders().find((o) => o.id === id);
}
