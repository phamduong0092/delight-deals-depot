import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type SiteBannerRow = {
  message: string | null;
  link_url: string | null;
  link_label: string | null;
  active: boolean | null;
};

const SiteBannerContext = createContext<SiteBannerRow | null>(null);

export function SiteBannerProvider({ children }: { children: ReactNode }) {
  const [banner, setBanner] = useState<SiteBannerRow | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("site_banner")
      .select("message, link_url, link_label, active")
      .eq("id", "main")
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setBanner((data as SiteBannerRow | null) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteBannerContext.Provider value={banner}>{children}</SiteBannerContext.Provider>;
}

/** Nội dung banner khuyến mãi do chủ shop tự bật/tắt qua Supabase — chỉ tải 1 lần khi mở app. */
export function useSiteBanner() {
  return useContext(SiteBannerContext);
}
