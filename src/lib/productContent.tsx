import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/products";

type ProductContentRow = {
  product_id: string;
  title: string | null;
  tag: string | null;
  short_desc: string | null;
  long_desc: string | null;
  features: string[] | null;
  available: boolean | null;
};

const ProductContentContext = createContext<Record<string, ProductContentRow>>({});

export function ProductContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, ProductContentRow>>({});

  useEffect(() => {
    let cancelled = false;
    void supabase
      .from("product_content")
      .select("product_id, title, tag, short_desc, long_desc, features, available")
      .then(({ data }) => {
        if (cancelled || !data) return;
        setContent(
          Object.fromEntries((data as ProductContentRow[]).map((row) => [row.product_id, row])),
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ProductContentContext.Provider value={content}>{children}</ProductContentContext.Provider>
  );
}

/** Nội dung do chủ shop tự sửa qua Supabase (chỉ tải 1 lần khi mở app), theo mã sản phẩm. */
export function useProductContent() {
  return useContext(ProductContentContext);
}

/**
 * Gộp sản phẩm gốc trong code với nội dung tùy chỉnh từ Supabase (nếu có) — text, mô tả,
 * tính năng và trạng thái "available" đều có thể sửa trực tiếp trên Supabase mà không cần
 * đổi code hay deploy lại. Giá bán vẫn luôn lấy từ code để đảm bảo khớp với giỏ hàng/thanh toán.
 * Hàm thuần (không phải hook) — dùng được cả trong nhánh điều kiện (ví dụ sau khi kiểm tra
 * sản phẩm có tồn tại hay không).
 */
export function mergeProductContent(
  product: Product,
  override: ProductContentRow | undefined,
): Product {
  if (!override) return product;

  return {
    ...product,
    title: override.title || product.title,
    tag: override.tag || product.tag,
    shortDesc: override.short_desc || product.shortDesc,
    longDesc: override.long_desc || product.longDesc,
    features:
      override.features && override.features.length > 0 ? override.features : product.features,
    available: override.available ?? product.available,
  };
}

/** Tiện dùng khi chắc chắn `product` luôn tồn tại (ví dụ nhận qua prop bắt buộc). */
export function useMergedProduct(product: Product): Product {
  const content = useProductContent();
  return mergeProductContent(product, content[product.id]);
}
