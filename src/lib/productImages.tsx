import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

const ProductImagesContext = createContext<Record<string, string>>({});

export function ProductImagesProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("product_images")
      .select("product_id, image_url")
      .then(({ data }) => {
        if (cancelled || !data) return;
        setImages(Object.fromEntries(data.map((row) => [row.product_id, row.image_url])));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ProductImagesContext.Provider value={images}>{children}</ProductImagesContext.Provider>;
}

/** Trả về link ảnh do chủ shop tự đăng qua Supabase, nếu chưa có thì dùng ảnh mặc định trong code. */
export function useProductImages() {
  return useContext(ProductImagesContext);
}
