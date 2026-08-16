import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type HomeVideoRow = {
  title: string | null;
  youtube_url: string | null;
  active: boolean | null;
};

const HomeVideoContext = createContext<HomeVideoRow | null>(null);

export function HomeVideoProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<HomeVideoRow | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("home_video")
      .select("title, youtube_url, active")
      .eq("id", "main")
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setVideo((data as HomeVideoRow | null) ?? null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <HomeVideoContext.Provider value={video}>{children}</HomeVideoContext.Provider>;
}

/** Video hướng dẫn hiện trên trang chủ, do chủ shop tự đổi qua Supabase — chỉ tải 1 lần khi mở app. */
export function useHomeVideo() {
  return useContext(HomeVideoContext);
}
