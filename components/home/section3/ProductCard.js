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
  const isAr = local === "ar";

  const [quantity, setQuantity] = useState(1);
  const [src, setSrc] = useState(product_image || "/images/eim.png");

  useEffect(() => {
    setSrc(product_image || "/images/eim.png");
  }, [product_image]);

  const { favorites } = useSelector((state) => state.favorites);
  const isFavorized = favorites?.some((item) => item.product_id === product_id);

  const { cart } = useSelector((state) => state.cart);
  const isAdded = cart?.some((item) => item.product_id === product_id);

  const [rate, setRate] = useState(1);
  useEffect(() => {
    if (currency !== "SYP" && conversion?.length) {
      const conv = conversion.find((c) => c.to_currency === currency);
      if (conv) setRate(conv.rate);
    } else {
      setRate(1);
    }
  }, [currency, conversion]);

  const finalPrice = useMemo(() => {
    let price = product?.price || 0;
    if (percentage) {
      price = price - (percentage * price) / 100;
    }
    return (Math.round(price * rate * 100) / 100).toFixed(2);
  }, [product?.price, percentage, rate]);

  const handleFavorite = (e) => {
    e.stopPropagation();
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

  const handleCart = (e) => {
    e.stopPropagation();
    if (isAdded) {
      dispatch(removeItem(product_id));
    } else {
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
    }
  };

  return (
    <div
      onClick={() =>
        router.push(`/categories/product-content/product-details/${product_id}`)
      }
      className="group relative flex flex-col w-full h-[400px] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden border border-gray-50"
    >
      <div className="relative w-full h-[200px] bg-gray-50/50 flex items-center justify-center p-4">
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={src}
            alt={typeof product_name === "string" ? product_name : "Product"}
            layout="fill"
            objectFit="contain"
            onError={() => setSrc("/images/eim.png")}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 justify-between bg-white z-10">
        <div>
          <h3
            className="font-arabicBold text-gray-800 text-base md:text-lg line-clamp-1 mb-1"
            title={product_name}
          >
            {product_name}
          </h3>
          <div className="text-gray-500 text-xs md:text-sm font-arabicLight line-clamp-2 leading-relaxed min-h-[40px]">
            {desc}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-1 text-primary">
              <span className="text-lg md:text-xl font-bold">{finalPrice}</span>
              <span className="text-xs font-arabicMedium font-bold">
                {currency}
              </span>
            </div>

            <div className="flex items-center bg-gray-50 rounded-full border border-gray-100 px-2 py-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary transition-colors text-lg"
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-arabicMedium">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary transition-colors text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCart}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-arabicMedium transition-all duration-300 ${
                isAdded
                  ? "bg-red-50 text-primary border border-red-100"
                  : "bg-primary text-white hover:bg-red-800 shadow-md hover:shadow-lg shadow-red-500/20"
              }`}
            >
              <ShoppingCartIcon className="w-4 h-4" />
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
              onClick={handleFavorite}
              className="w-10 h-10 flex items-center justify-center shrink-0 rounded-xl bg-gray-50 border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
            >
              {isFavorized ? (
                <HeartSolid className="w-5 h-5 text-red-500" />
              ) : (
                <HeartOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
