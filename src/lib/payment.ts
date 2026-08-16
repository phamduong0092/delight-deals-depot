// Quy đổi tạm thời cho hiển thị QR chuyển khoản VND: $2 = 53.000đ (theo yêu cầu chủ shop).
export const VND_PER_USD = 26500;

export function usdToVnd(usd: number) {
  return Math.round(usd * VND_PER_USD);
}

export function formatVnd(vnd: number) {
  return `${vnd.toLocaleString("vi-VN")}đ`;
}

export const BANK_INFO = {
  bin: "970407", // Techcombank (Napas BIN)
  bankName: "Techcombank",
  accountNumber: "6909357553",
  accountHolder: "DUONG CUU LONG",
};

export const ZALO_PHONE = "0909357553";
export const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;

// Kênh cộng đồng — dùng cho icon mạng xã hội ở footer (khác với ZALO_LINK ở trên,
// vốn là chat hỗ trợ 1-1 riêng, dùng cho nút "Nhắn Zalo ngay").
export const ZALO_GROUP_LINK = "https://zalo.me/g/eticqx111";
export const FACEBOOK_PAGE_LINK = "https://www.facebook.com/9RCongNgheAI/";
export const YOUTUBE_CHANNEL_LINK = "https://www.youtube.com/channel/UCrU-56JQyWqqART9GSofnmQ";

export function buildVietQrUrl(amountVnd: number, addInfo: string) {
  const params = new URLSearchParams({
    amount: String(amountVnd),
    addInfo,
    accountName: BANK_INFO.accountHolder,
  });
  return `https://img.vietqr.io/image/${BANK_INFO.bin}-${BANK_INFO.accountNumber}-compact2.png?${params.toString()}`;
}
