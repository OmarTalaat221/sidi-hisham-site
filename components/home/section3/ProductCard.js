import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://api.sedihisham.com/";
const FALLBACK_IMAGE = "/images/eim.png";

function resolveProductImage(value) {
  if (!value || typeof value !== "string") {
    return FALLBACK_IMAGE;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return FALLBACK_IMAGE;
  }

  if (
    normalizedValue.startsWith("http://") ||
    normalizedValue.startsWith("https://") ||
    normalizedValue.startsWith("/images/")
  ) {
    return normalizedValue;
  }

  return `${API_BASE_URL}${normalizedValue.replace(/^\/+/, "")}`;
}

export default function ProductCard({
  product_id,
  product_name,
  desc,
  product_image,
  index = 0,
}) {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [src, setSrc] = useState(() => resolveProductImage(product_image));

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setSrc(resolveProductImage(product_image));
    setImageLoaded(false);
  }, [product_image]);

  const handleCardNavigation = () => {
    if (!product_id) {
      return;
    }

    router.push(`/categories/product-content/product-details/${product_id}`);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardNavigation();
    }
  };

  const productAlt =
    typeof product_name === "string" && product_name.trim()
      ? product_name
      : isAr
        ? "صورة المنتج"
        : "Product image";

  const ArrowIcon = isAr ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      style={{
        "--product-card-delay": `${Math.min(index, 8) * 65}ms`,
      }}
      className="product-card-wrapper relative w-full pt-[118px] sm:pt-[138px] lg:pt-[145px]"
    >
      <div
        onClick={handleCardNavigation}
        className="product-card-image-wrapper absolute left-1/2 top-0 z-20 flex h-[205px] w-[205px] -translate-x-1/2 cursor-pointer items-center justify-center sm:h-[235px] sm:w-[235px] lg:h-[250px] lg:w-[250px]"
      >
        <span
          aria-hidden="true"
          className="product-card-image-glow absolute bottom-[7%] left-1/2 h-[25%] w-[72%] -translate-x-1/2 rounded-full bg-black/10 opacity-0 blur-2xl"
        />

        <div className="product-card-image relative h-full w-full">
          <div
            className={`absolute inset-[14%] rounded-full bg-gray-100 transition-opacity duration-300 ${
              imageLoaded ? "opacity-0" : "animate-pulse opacity-100"
            }`}
          />

          <Image
            src={src}
            alt={productAlt}
            fill
            priority={false}
            draggable={false}
            sizes="(max-width: 639px) 205px, (max-width: 1023px) 235px, 250px"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setSrc(FALLBACK_IMAGE);
              setImageLoaded(true);
            }}
            className={`object-contain transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleCardNavigation();
          }}
          className="product-card-image-cta group absolute bottom-3 left-1/2 z-30 hidden min-h-[40px] -translate-x-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-primary/95 px-5 py-2 font-arabicMedium text-xs text-white opacity-0 shadow-[0_10px_25px_rgba(74,0,6,0.25)] backdrop-blur-md transition-[opacity,transform,background-color,box-shadow] duration-300"
        >
          <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>

          <ArrowIcon
            className={`h-4 w-4 shrink-0 text-[white] transition-transform duration-300 ${
              isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
          />
        </button>
      </div>

      <article
        role="link"
        tabIndex={0}
        aria-label={
          isAr ? `عرض تفاصيل ${productAlt}` : `View details for ${productAlt}`
        }
        onClick={handleCardNavigation}
        onKeyDown={handleCardKeyDown}
        className="product-card relative flex h-[300px] w-full cursor-pointer flex-col overflow-hidden rounded-[22px] bg-white outline-none sm:h-[315px] lg:h-[250px]"
      >
        <span
          aria-hidden="true"
          className="product-card-border pointer-events-none absolute inset-0 z-20 rounded-[22px]"
        />

        <span
          aria-hidden="true"
          className="product-card-light pointer-events-none absolute -left-[45%] top-0 z-[1] h-full w-[30%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0"
        />

        <div className="product-card-content relative z-10 flex h-full flex-col px-4 pb-5 pt-[94px] sm:px-5 sm:pt-[106px] lg:pt-[112px]">
          <h3
            title={typeof product_name === "string" ? product_name : ""}
            className="mb-2 line-clamp-1 text-center font-arabicBold text-base text-gray-800 transition-colors duration-300 sm:text-lg"
          >
            {product_name}
          </h3>

          <div className="line-clamp-3 min-h-[54px] text-center font-arabicLight text-xs leading-[18px] text-gray-500 sm:min-h-[60px] sm:text-sm sm:leading-5">
            {desc}
          </div>

          <div className="product-card-body-cta mt-auto flex justify-center pt-4">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleCardNavigation();
              }}
              className="product-card-cta group flex min-h-[42px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-arabicMedium text-[12px] text-white transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#B80014] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.97] sm:px-6 sm:text-sm"
            >
              <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>

              <ArrowIcon
                className={`h-4 w-4 shrink-0 text-[white] transition-transform duration-300 ${
                  isAr
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </article>

      <style jsx global>{`
        @keyframes productCardReveal {
          from {
            opacity: 0;
            transform: translate3d(0, 28px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes productCardLightSweep {
          from {
            transform: translate3d(0, 0, 0) skewX(-18deg);
            opacity: 0;
          }

          22% {
            opacity: 0.72;
          }

          to {
            transform: translate3d(560%, 0, 0) skewX(-18deg);
            opacity: 0;
          }
        }

        .product-card-wrapper {
          isolation: isolate;
          opacity: 0;
          animation: productCardReveal 720ms cubic-bezier(0.22, 1, 0.36, 1)
            var(--product-card-delay) forwards;
        }

        .product-card {
          border: 1px solid rgba(229, 231, 235, 0.8);
          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.11),
            0 4px 10px rgba(0, 0, 0, 0.06);
          transition:
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 420ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .product-card-image-wrapper {
          transition:
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 420ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .product-card-image {
          transform-origin: center bottom;
          transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .product-card-image-glow {
          transition:
            opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-card-border {
          border: 2px solid white;
          opacity: 0;
          transition: opacity 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .product-card-light {
          will-change: transform;
        }

        .product-card-cta {
          box-shadow: 0 7px 18px rgba(212, 0, 23, 0.15);
        }

        .product-card-wrapper:focus-within .product-card {
          border-color: rgba(255, 214, 45, 0.8);
        }

        @media (min-width: 1024px) and (hover: hover) and (pointer: fine) {
          .product-card-image-cta {
            display: flex;
            transform: translate3d(-50%, 18px, 0) scale(0.94);
            pointer-events: none;
          }

          .product-card-body-cta {
            display: none;
          }

          .product-card-wrapper:hover .product-card,
          .product-card-wrapper:focus-within .product-card {
            transform: translate3d(0, -5px, 0);
            border-color: transparent;
            box-shadow:
              0 24px 48px rgba(0, 0, 0, 0.16),
              0 10px 20px rgba(0, 0, 0, 0.09);
          }

          .product-card-wrapper:hover .product-card-image-wrapper,
          .product-card-wrapper:focus-within .product-card-image-wrapper {
            transform: translate3d(-50%, -10px, 0);
            filter: saturate(1.035);
          }

          .product-card-wrapper:hover .product-card-image,
          .product-card-wrapper:focus-within .product-card-image {
            transform: scale(1.065);
          }

          .product-card-wrapper:hover .product-card-image-glow,
          .product-card-wrapper:focus-within .product-card-image-glow {
            opacity: 1;
            transform: translate3d(-50%, 7px, 0) scaleX(1.08);
          }

          .product-card-wrapper:hover .product-card-image-cta,
          .product-card-wrapper:focus-within .product-card-image-cta {
            transform: translate3d(-50%, 0, 0) scale(1);
            opacity: 1;
            pointer-events: auto;
          }

          .product-card-wrapper:hover .product-card-border,
          .product-card-wrapper:focus-within .product-card-border {
            opacity: 1;
          }

          .product-card-wrapper:hover .product-card-light {
            animation: productCardLightSweep 850ms
              cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          .product-card-wrapper:hover h3,
          .product-card-wrapper:focus-within h3 {
            color: #d40017;
          }

          .product-card-image-cta:hover {
            background-color: #b80014;
            box-shadow: 0 13px 28px rgba(74, 0, 6, 0.32);
          }
        }

        @media (max-width: 1023px) {
          .product-card:active {
            transform: scale(0.987);
            box-shadow:
              0 7px 18px rgba(0, 0, 0, 0.1),
              0 3px 8px rgba(0, 0, 0, 0.06);
          }

          .product-card-image-wrapper:active .product-card-image {
            transform: scale(0.97);
          }
        }

        @media (max-width: 359px) {
          .product-card-wrapper {
            padding-top: 108px;
          }

          .product-card-image-wrapper {
            width: 188px;
            height: 188px;
          }

          .product-card {
            height: 290px;
          }

          .product-card-content {
            padding-top: 86px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-card-wrapper {
            opacity: 1;
            animation: none !important;
          }

          .product-card,
          .product-card-image-wrapper,
          .product-card-image,
          .product-card-image-glow,
          .product-card-image-cta,
          .product-card-border,
          .product-card-light,
          .product-card-cta {
            transition: none !important;
            animation: none !important;
          }

          .product-card-wrapper:hover .product-card,
          .product-card-wrapper:hover .product-card-image-wrapper,
          .product-card-wrapper:hover .product-card-image,
          .product-card-wrapper:hover .product-card-image-glow,
          .product-card-wrapper:hover .product-card-image-cta {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
