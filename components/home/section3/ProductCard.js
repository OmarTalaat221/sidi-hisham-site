import {
  HeartIcon as HeartOutline,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../../../redux/cartSlice";
import { addTofavorites } from "../../../redux/favoritesSlice";

export default function ProductCard({
  product_id,
  product_name,
  desc,
  product_image,
  product,
  percentage,
  currency,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { local, conversion } = useSelector((state) => state.language);
  const { favorites } = useSelector((state) => state.favorites);
  const { cart } = useSelector((state) => state.cart);

  const isAr = local === "ar";

  const [quantity, setQuantity] = useState(1);
  const [src, setSrc] = useState(product_image || "/images/eim.png");
  const [rate, setRate] = useState(1);

  useEffect(() => {
    setSrc(product_image || "/images/eim.png");
  }, [product_image]);

  const isFavorized = favorites?.some((item) => item.product_id === product_id);

  const isAdded = cart?.some((item) => item.product_id === product_id);

  useEffect(() => {
    if (currency !== "SYP" && conversion?.length) {
      const selectedConversion = conversion.find(
        (item) => item.to_currency === currency,
      );

      setRate(selectedConversion ? Number(selectedConversion.rate) || 1 : 1);
      return;
    }

    setRate(1);
  }, [currency, conversion]);

  const finalPrice = useMemo(() => {
    let price = Number(product?.price) || 0;

    if (percentage) {
      price -= (Number(percentage) * price) / 100;
    }

    const convertedPrice = price * rate;

    return (Math.round((convertedPrice + Number.EPSILON) * 100) / 100).toFixed(
      2,
    );
  }, [product?.price, percentage, rate]);

  const handleFavorite = (event) => {
    event.stopPropagation();

    dispatch(
      addTofavorites({
        product_id: product.id,
        product_name: product.product_translations,
        translations: product.product_translations,
        product_image,
        product_images: product?.product_images,
        price: finalPrice,
        order_number: quantity,
        feature_names: [""],
        points: product.points,
        discount: percentage ? (percentage * product.price) / 100 : 0,
      }),
    );
  };

  const handleCart = (event) => {
    event.stopPropagation();

    if (isAdded) {
      dispatch(removeItem(product_id));
      return;
    }

    dispatch(
      addToCart({
        product_id: product.id,
        product_name: product.product_translations,
        price: finalPrice,
        order_number: quantity,
        product_image: product.product_images?.length
          ? product.product_images[0]?.image_url
          : "",
        feature_names: [""],
        points: product.points,
        discount: percentage ? (percentage * product.price) / 100 : 0,
      }),
    );
  };

  const handleDecreaseQuantity = (event) => {
    event.stopPropagation();

    setQuantity((currentQuantity) =>
      currentQuantity > 1 ? currentQuantity - 1 : 1,
    );
  };

  const handleIncreaseQuantity = (event) => {
    event.stopPropagation();

    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const productAlt =
    typeof product_name === "string" && product_name.trim()
      ? product_name
      : isAr
        ? "صورة المنتج"
        : "Product image";

  return (
    <article
      dir={isAr ? "rtl" : "ltr"}
      onClick={() =>
        router.push(`/categories/product-content/product-details/${product_id}`)
      }
      className="
        product-card relative flex h-[400px] w-full
        cursor-pointer flex-col overflow-hidden
        rounded-2xl border border-[rgba(117,0,11,0.08)]
        bg-white
        shadow-[0_8px_24px_rgba(0,0,0,0.10)]
        transition-[transform,box-shadow,border-color]
        duration-300
        hover:-translate-y-1
        hover:border-[rgba(212,0,23,0.16)]
        hover:shadow-[0_15px_35px_rgba(0,0,0,0.15)]
      "
    >
      <div
        className="
          relative flex h-[200px] w-full
          items-center justify-center overflow-hidden
          bg-white p-4
        "
      >
        <div
          className="
            product-card-image relative h-full w-full
            transition-transform duration-500 ease-out
          "
        >
          <Image
            src={src}
            alt={productAlt}
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 639px) 78vw, (max-width: 767px) 260px, 280px"
            draggable={false}
            onError={() => setSrc("/images/eim.png")}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between bg-white p-4">
        <div className="text-start">
          <h3
            className="
              mb-1 line-clamp-1 text-base
              font-arabicBold text-gray-800
              md:text-lg
            "
            title={typeof product_name === "string" ? product_name : ""}
          >
            {product_name}
          </h3>

          <div
            className="
              min-h-[40px] line-clamp-2
              text-xs leading-relaxed text-gray-500
              font-arabicLight md:text-sm
            "
          >
            {desc}
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-baseline gap-1 text-primary">
              <span className="text-lg font-bold md:text-xl">{finalPrice}</span>

              <span className="text-xs font-bold font-arabicMedium">
                {currency}
              </span>
            </div>

            <div
              className="
                flex shrink-0 items-center rounded-full
                border border-gray-100 bg-gray-50
                px-2 py-0.5
              "
            >
              <button
                type="button"
                aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"}
                onClick={handleDecreaseQuantity}
                className="
                  flex h-6 w-6 items-center justify-center
                  text-lg text-gray-500
                  transition-colors hover:text-primary
                  focus:outline-none focus-visible:text-primary
                "
              >
                -
              </button>

              <span className="w-6 text-center text-sm font-arabicMedium">
                {quantity}
              </span>

              <button
                type="button"
                aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
                onClick={handleIncreaseQuantity}
                className="
                  flex h-6 w-6 items-center justify-center
                  text-lg text-gray-500
                  transition-colors hover:text-primary
                  focus:outline-none focus-visible:text-primary
                "
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCart}
              className={`
                flex flex-1 items-center justify-center
                gap-2 rounded-xl py-2.5
                text-sm font-arabicMedium
                transition-all duration-300
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                ${
                  isAdded
                    ? "border border-red-100 bg-red-50 text-primary hover:bg-red-100"
                    : "bg-primary text-white shadow-[0_5px_14px_rgba(212,0,23,0.22)] hover:bg-[#B80014]"
                }
              `}
            >
              <ShoppingCartIcon className="h-4 w-4 shrink-0" />

              <span>
                {isAdded
                  ? isAr
                    ? "إزالة"
                    : "Remove"
                  : isAr
                    ? "أضف للسلة"
                    : "Add to Cart"}
              </span>
            </button>

            <button
              type="button"
              aria-label={
                isFavorized
                  ? isAr
                    ? "إزالة من المفضلة"
                    : "Remove from favorites"
                  : isAr
                    ? "إضافة إلى المفضلة"
                    : "Add to favorites"
              }
              onClick={handleFavorite}
              className="
                flex h-10 w-10 shrink-0 items-center
                justify-center rounded-xl
                border border-gray-100 bg-gray-50
                text-gray-400
                transition-all duration-300
                hover:border-red-100 hover:bg-red-50
                hover:text-red-500
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
              "
            >
              {isFavorized ? (
                <HeartSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartOutline className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover .product-card-image {
          transform: scale(1.05);
        }

        @media (hover: none) {
          .product-card:hover .product-card-image {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-card,
          .product-card-image {
            transition: none;
          }

          .product-card:hover .product-card-image {
            transform: none;
          }
        }
      `}</style>
    </article>
  );
}
