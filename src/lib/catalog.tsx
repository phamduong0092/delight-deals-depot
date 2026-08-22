import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { categories as codeCategories, type Category, type Product } from "@/lib/products";
import { getIconComponent } from "@/lib/iconRegistry";

type CatalogCategoryRow = {
  id: string;
  title: string;
  subtitle: string | null;
  sort_order: number | null;
};

type CatalogProductRow = {
  id: string;
  category_id: string;
  title: string;
  tag: string | null;
  price: number | string;
  icon: string | null;
  image_url: string | null;
  available: boolean | null;
  bestseller: boolean | null;
  contact_only: boolean | null;
  short_desc: string | null;
  long_desc: string | null;
  features: string[] | null;
  sort_order: number | null;
};

type ExtraCatalog = { categories: CatalogCategoryRow[]; products: CatalogProductRow[] };

const EMPTY: ExtraCatalog = { categories: [], products: [] };
const CatalogContext = createContext<ExtraCatalog>(EMPTY);

/**
 * Sảnh/sản phẩm thêm mới ngoài 6 sảnh có sẵn trong code — chủ shop tự thêm dòng trên Supabase
 * (bảng catalog_categories, catalog_products), không cần sửa code hay nhờ lập trình. 6 sảnh cũ
 * và 36 sản phẩm cũ không đụng tới, vẫn hoạt động y như trước (sửa nội dung qua product_content
 * như cũ). Chỉ tải 1 lần khi mở app, giống các Provider khác trong app.
 */
export function CatalogProvider({ children }: { children: ReactNode }) {
  const [extra, setExtra] = useState<ExtraCatalog>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      supabase
        .from("catalog_categories")
        .select("id, title, subtitle, sort_order")
        .eq("active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("catalog_products")
        .select(
          "id, category_id, title, tag, price, icon, image_url, available, bestseller, contact_only, short_desc, long_desc, features, sort_order",
        )
        .eq("active", true)
        .order("sort_order", { ascending: true }),
    ]).then(([catRes, prodRes]) => {
      if (cancelled) return;
      setExtra({
        categories: (catRes.data as CatalogCategoryRow[] | null) ?? [],
        products: (prodRes.data as CatalogProductRow[] | null) ?? [],
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <CatalogContext.Provider value={extra}>{children}</CatalogContext.Provider>;
}

function rowToProduct(row: CatalogProductRow): Product {
  return {
    id: row.id,
    categoryId: row.category_id,
    title: row.title,
    tag: row.tag || "",
    price: Number(row.price) || 0,
    icon: getIconComponent(row.icon),
    image: row.image_url || undefined,
    available: row.available ?? false,
    bestseller: row.bestseller ?? false,
    contactOnly: row.contact_only ?? false,
    shortDesc: row.short_desc || "",
    longDesc: row.long_desc || "",
    features: row.features && row.features.length > 0 ? row.features : [],
  };
}

/**
 * 6 sảnh có sẵn trong code + mọi sảnh/sản phẩm mới thêm qua Supabase, đã gộp và sắp đúng thứ tự.
 * Sản phẩm mới gắn vào category_id trùng 1 trong 6 sảnh có sẵn (ready, poster, lifestyle, video,
 * landing, course) sẽ nối vào cuối sảnh đó; category_id không trùng sảnh nào sẽ tạo thành 1 sảnh
 * mới, xếp sau 6 sảnh có sẵn.
 */
export function useCatalog(): Category[] {
  const extra = useContext(CatalogContext);

  return useMemo(() => {
    const codeIds = new Set(codeCategories.map((c) => c.id));
    const merged: Category[] = codeCategories.map((c) => ({ ...c, products: [...c.products] }));

    for (const row of extra.products) {
      const target = merged.find((c) => c.id === row.category_id);
      if (target && !target.products.some((p) => p.id === row.id)) {
        target.products.push(rowToProduct(row));
      }
    }

    for (const catRow of extra.categories) {
      if (codeIds.has(catRow.id)) continue;
      const products = extra.products.filter((p) => p.category_id === catRow.id).map(rowToProduct);
      merged.push({
        id: catRow.id,
        title: catRow.title,
        subtitle: catRow.subtitle || "",
        products,
      });
    }

    return merged;
  }, [extra]);
}

/** Danh sách phẳng toàn bộ sản phẩm (code + Supabase) — dùng cho giỏ hàng, thanh toán, tra id. */
export function useAllCatalogProducts(): Product[] {
  const cats = useCatalog();
  return useMemo(() => cats.flatMap((c) => c.products), [cats]);
}

export function useCatalogProduct(id: string): Product | undefined {
  const products = useAllCatalogProducts();
  return products.find((p) => p.id === id);
}

export function useCatalogCategory(id: string | undefined): Category | undefined {
  const cats = useCatalog();
  if (!id) return undefined;
  return cats.find((c) => c.id === id);
}
