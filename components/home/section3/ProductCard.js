import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductCard({
  product_id,
  product_name,
  desc,
  product_image,
}) {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const [src, setSrc] = useState(product_image || "/images/eim.png");

  useEffect(() => {
    setSrc(product_image || "/images/eim.png");
  }, [product_image]);

  const handleCardNavigation = () => {
    router.push(`/categories/product-content/product-details/${product_id}`);
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
      className="product-card-wrapper relative w-full pt-[130px] sm:pt-[150px]"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* الصورة الطايرة برة الكارت */}
      <div
        onClick={handleCardNavigation}
        className="
          product-card-image-wrapper
          absolute left-1/2 top-0 z-20
          flex h-[220px] w-[220px]
          -translate-x-1/2 items-center justify-center
          cursor-pointer
          sm:h-[250px] sm:w-[250px]
        "
      >
        <div className="product-card-image relative h-full w-full">
          <Image
            src={src}
            alt={productAlt}
            fill
            sizes="(max-width: 639px) 220px, 250px"
            draggable={false}
            onError={() => setSrc("/images/eim.png")}
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* الكارت */}
      <article
        onClick={handleCardNavigation}
        className="
          product-card
          relative flex w-full cursor-pointer
          flex-col rounded-[22px] bg-white
          h-[300px] sm:h-[315px]
        "
      >
        {/* الـ Gold Border على الـ Hover */}
        <span
          aria-hidden="true"
          className="product-card-border pointer-events-none absolute inset-0 rounded-[22px]"
        />

        <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-[95px] sm:pt-[110px]">
          {/* الاسم */}
          <h3
            className="
              line-clamp-1 mb-2 text-center
              text-base font-arabicBold text-gray-800
              sm:text-lg
            "
            title={typeof product_name === "string" ? product_name : ""}
          >
            {product_name}
          </h3>

          {/* الوصف */}
          <div
            className="
              line-clamp-3 min-h-[54px] text-center
              text-xs leading-[18px] text-gray-500 font-arabicLight
              sm:text-sm sm:leading-5 sm:min-h-[60px]
            "
          >
            {desc}
          </div>

          {/* زرار عرض التفاصيل */}
          <div className="mt-auto flex justify-center pt-4">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleCardNavigation();
              }}
              className="
                product-card-cta
                group flex items-center justify-center gap-2
                rounded-full bg-primary px-6 py-2.5
                text-[13px] font-arabicMedium text-white
                transition-all duration-300
                hover:bg-[#B80014]
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                sm:text-sm
              "
            >
              <span>{isAr ? "عرض التفاصيل" : "View Details"}</span>
              <ArrowIcon
                className={`
                  h-4 w-4 shrink-0
                  transition-transform duration-300
                  ${
                    isAr
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }
                `}
              />
            </button>
          </div>
        </div>
      </article>

      <style jsx>{`
        .product-card-wrapper {
          isolation: isolate;
        }

        .product-card {
          transition:
            transform 350ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 350ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
        }

        .product-card-image {
          transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        /* ═══ Gold Border on Hover ═══ */
        .product-card-border {
          border: 2px solid #ffd62d;
          opacity: 0;
          transition: opacity 350ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .product-card-wrapper:hover .product-card {
            transform: translate3d(0, -4px, 0);
            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.14);
          }

          .product-card-wrapper:hover .product-card-image {
            transform: scale(1.08);
          }

          .product-card-wrapper:hover .product-card-border {
            opacity: 1;
          }
        }

        @media (hover: none) {
          .product-card-wrapper:hover .product-card {
            transform: none;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
          }

          .product-card-wrapper:hover .product-card-image {
            transform: none;
          }

          .product-card-wrapper:hover .product-card-border {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-card,
          .product-card-image,
          .product-card-border {
            transition: none !important;
          }

          .product-card-wrapper:hover .product-card,
          .product-card-wrapper:hover .product-card-image {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
