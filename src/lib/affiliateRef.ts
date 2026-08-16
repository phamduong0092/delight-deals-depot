const STORAGE_KEY = "kol-skill-affiliate-ref";
const EXPIRY_DAYS = 30;

type StoredRef = { code: string; savedAt: number };

/**
 * Đọc mã "?ref=" trên URL hiện tại (nếu có) và lưu vào máy khách, tối đa 30 ngày.
 * Gọi 1 lần khi mở app — khách bấm link giới thiệu ở bất kỳ trang nào cũng được ghi nhận.
 */
export function captureAffiliateRef() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref")?.trim();
  if (!ref) return;
  const value: StoredRef = { code: ref, savedAt: Date.now() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

/** Trả về mã affiliate đang lưu (nếu còn hạn 30 ngày), dùng lúc tạo đơn hàng. */
export function getStoredAffiliateCode(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRef;
    const ageMs = Date.now() - parsed.savedAt;
    if (ageMs > EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.code || null;
  } catch {
    return null;
  }
}
