import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export type SiteBannerRow = {
  id: string;
  message: string | null;
  link_url: string | null;
  link_label: string | null;
  active: boolean | null;
  size: "sm" | "md" | "lg" | null;
};

const SiteBannerContext = createContext<SiteBannerRow[]>([]);

export function SiteBannerProvider({ children }: { children: ReactNode }) {
  const [banners, setBanners] = useState<SiteBannerRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("site_banner")
      .select("id, message, link_url, link_label, active, size")
      .then(({ data }) => {
        if (cancelled || !data) return;
        setBanners(data as SiteBannerRow[]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteBannerContext.Provider value={banners}>{children}</SiteBannerContext.Provider>;
}

/**
 * Toàn bộ ô nổi (banner khuyến mãi, link ngoài...) do chủ shop tự thêm/bật/tắt qua Supabase —
 * mỗi dòng trong bảng site_banner là 1 ô riêng, chỉ tải 1 lần khi mở app.
 */
export function useSiteBanners() {
  return useContext(SiteBannerContext);
}
