import { useState } from "react";
import type { Product } from "@/lib/products";
import { getCategoryGradient } from "@/lib/products";
import { useProductImages } from "@/lib/productImages";
import { cn } from "@/lib/utils";

function GradientFallback({
  product,
  className,
  iconClassName,
}: {
  product: Product;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = product.icon;
  const gradient = getCategoryGradient(product.categoryId);

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        gradient,
        className,
      )}
    >
      <Icon
        className={cn("h-10 w-10 text-white/90 drop-shadow", iconClassName)}
        strokeWidth={1.5}
      />
    </div>
  );
}

export function ProductArt({
  product,
  className,
  iconClassName,
  autoPlay = true,
}: {
  product: Product;
  className?: string;
  iconClassName?: string;
  autoPlay?: boolean;
}) {
  const [mediaFailed, setMediaFailed] = useState(false);
  const customImages = useProductImages();
  const image = customImages[product.id] ?? product.image;

  if (!mediaFailed && product.video) {
    return (
      <video
        src={product.video}
        poster={image}
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        onError={() => setMediaFailed(true)}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  if (!mediaFailed && image) {
    return (
      <img
        src={image}
        alt={product.title}
        loading="lazy"
        onError={() => setMediaFailed(true)}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return <GradientFallback product={product} className={className} iconClassName={iconClassName} />;
}
