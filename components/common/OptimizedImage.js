import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function OptimizedImage({
  src,
  alt = "",
  width,
  height,
  className = "",
  wrapperClassName = "",
  loader,
  priority = false,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  sizes = "100vw",
  quality = 75,
  fill = false,
  objectFit = "contain",
  objectPosition = "center",
  showSkeleton = true,
  skeletonClassName = "",
  style = {},
  onLoad,
  onError,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sourceValue = useMemo(() => {
    if (typeof src === "string") return src;
    return src?.src || "";
  }, [src]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [sourceValue]);

  const altText = useMemo(() => {
    if (alt?.trim()) return alt;

    if (!sourceValue) {
      return "صورة سيدي هشام";
    }

    const filename =
      sourceValue.split("/").pop()?.split(".")[0]?.toLowerCase() || "";

    if (filename.includes("logo") || filename.includes("brand")) {
      return "شعار سيدي هشام";
    }

    if (filename.includes("product") || filename.includes("item")) {
      return "منتج سيدي هشام";
    }

    if (filename.includes("news")) {
      return "صورة أخبار سيدي هشام";
    }

    if (filename.includes("icon")) {
      return "أيقونة سيدي هشام";
    }

    return "صورة سيدي هشام";
  }, [alt, sourceValue]);

  if (!src) return null;

  const staticWidth =
    typeof src === "object" && src?.width ? src.width : undefined;

  const staticHeight =
    typeof src === "object" && src?.height ? src.height : undefined;

  const resolvedWidth = width || staticWidth;
  const resolvedHeight = height || staticHeight;

  const shouldFill = fill || !resolvedWidth || !resolvedHeight;
  const isSvg = sourceValue.toLowerCase().endsWith(".svg");

  const handleLoad = (event) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setHasError(true);
    setIsLoading(false);
    onError?.(event);
  };

  return (
    <div
      className={`relative overflow-hidden ${
        shouldFill ? "h-full w-full" : ""
      } ${wrapperClassName}`}
      style={
        shouldFill
          ? style
          : {
              width: resolvedWidth,
              height: resolvedHeight,
              ...style,
            }
      }
    >
      {!hasError && (
        <Image
          src={src}
          alt={altText}
          width={shouldFill ? undefined : resolvedWidth}
          height={shouldFill ? undefined : resolvedHeight}
          fill={shouldFill}
          loader={loader}
          priority={priority}
          placeholder={isSvg ? "empty" : placeholder}
          blurDataURL={isSvg ? undefined : blurDataURL}
          sizes={sizes}
          quality={quality}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{
            objectFit,
            objectPosition,
          }}
          {...props}
        />
      )}

      {showSkeleton && isLoading && !hasError && (
        <div
          className={`absolute inset-0 animate-pulse bg-white/10 ${skeletonClassName}`}
        />
      )}
    </div>
  );
}
