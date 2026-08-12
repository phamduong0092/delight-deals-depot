// Nhớ lại Họ tên/SĐT/Email đã nhập trên CHÍNH thiết bị/trình duyệt này (localStorage),
// để khách đỡ phải gõ lại ở những lần ghé sau — kể cả khi chưa đăng nhập tài khoản.
const KEY = "kol-skill-remembered-info";

export type RememberedInfo = {
  name?: string;
  phone?: string;
  email?: string;
};

export function loadRememberedInfo(): RememberedInfo {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as RememberedInfo) : {};
  } catch {
    return {};
  }
}

export function saveRememberedInfo(info: RememberedInfo) {
  if (typeof window === "undefined") return;
  try {
    const existing = loadRememberedInfo();
    window.localStorage.setItem(KEY, JSON.stringify({ ...existing, ...info }));
  } catch {
    // localStorage không khả dụng — bỏ qua, không chặn luồng chính.
  }
}
