import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { HeartIcon as Heart } from "@heroicons/react/solid";
import AddToCart from "./AddToCart";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTofavorites } from "../../../redux/favoritesSlice";
import errImage from "../../../public/images/eim.png";
import { set } from "date-fns";
import axios from "axios";

export default function ProductCardFavori({
  product_id,
  product_name,
  order_number,
  translations,
  desc,
  product_image,
  price,
  product,
  discount,
  points,
  currency,
  rate,
  percentage,
}) {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  const [favorized, setFavorized] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const [src, setSrc] = useState(product_image);
  useEffect(() => {
    setSrc(product_image);
  }, [product_image]);

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  //Add and remove product

  //Is product exists in favoris
  const { favorites } = useSelector((state) => state.favorites);
  const isFavorized =
    favorites?.length !== 0
      ? favorites?.find((item) => item.product_id === product_id)
      : false;
  //is product exists in cart
  const { cart } = useSelector((state) => state.cart);
  const isAdded =
    cart?.length !== 0
      ? cart?.find((item) => item.product_id === product_id)
      : false;

  useEffect(() => {
    isFavorized ? setFavorized(true) : setFavorized(false);
    isAdded ? setAddedToCart(true) : setAddedToCart(false);
  }, [isFavorized, isAdded]);

  const handleClick = (e) => {
    e?.stopPropagation();
    dispatch(
      addTofavorites({
        product_id,
        product_name,
        order_number,
        translations,
        desc,
        product_image,
        price,
        discount,
        points,
      })
    );
    setFavorized(!favorized);
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation();
    if (isAdded) {
      dispatch(removeItem(product_id));
    } else {
      addItemToCart();
    }
  };

  let [quantity, setQuantity] = useState(1);
  //Get product Details and add to cart

  //Get coupon by Id
  const [coupon, setCoupon] = useState({});
  const getCoupon = async (e) => {
    if (
      product &&
      product.couponId !== null &&
      product.couponId !== undefined
    ) {
      await axios
        .get("https://api.sedihisham.com/coupons/" + product?.couponId)
        .then((response) => {
          setCoupon(response?.data);
          // console.log("Coupon " + JSON.stringify(coupon));
        });
    }
  };

  //Add item to cart
  const [cartItem, setCartItem] = useState(null);

  const addItemToCart = () => {
    console.log({
      product_id: product.product_id,
      product_name: product.product_name,
      price:
        percentage !== 0
          ? percentage
            ? product.price - (percentage * product.price) / 100
            : product.price
          : product.price,
      order_number: quantity,
      product_image:
        product.product_images.length > 0
          ? product.product_images[0]?.image_url
          : "",
      feature_names: [""],
      points: product.points,
      discount: percentage !== 0 ? (percentage * product.price) / 100 : 0,
      //  (coupon.value !== 0 && product.couponId !== null ?
      //   (coupon.value * product.price) / 100 : 0)
    });
    dispatch(
      addToCart({
        product_id: product.product_id,
        product_name: product.product_name,
        price:
          percentage !== 0
            ? percentage
              ? product.price - (percentage * product.price) / 100
              : product.price
            : product.price,
        order_number: quantity,
        product_image:
          product.product_images.length > 0
            ? product.product_images[0]?.image_url
            : "",
        feature_names: [""],
        points: product.points,
        discount: percentage !== 0 ? (percentage * product.price) / 100 : 0,
        //  (coupon.value !== 0 && product.couponId !== null ?
        //   (coupon.value * product.price) / 100 : 0)
      })
    );
  };

  useEffect(() => {
    getCoupon();
  }, [product]);

  const { local } = useSelector((state) => state.language);
  return (
    <div>
      <div
        onClick={() =>
          router.push(
            `/categories/product-content/product-details/${product_id}`
          )
        }
        className="group container cursor-pointer  my-5 mx-1 "
      >
        <div className="flex  flex-col w-56 sm:w-[200px]  h-[280px]  hover:border-[3px] hover:border-green-700 duration-300 shadow-md rounded-xl bg-white">
          <div className="w-full carousalProductsContainerImage flex-[45%] h-full  relative  z-40  justify-center items-center  duration-300 scale-125  hover:scale-100   -mt-20 flex ">
            <div className="flex justify-center items-center">
              <OptimizedImage loader={GraphCMSImageLoader}
                // height={200}
                // width={200}
                layout="fill"
                objectFit="contain"
                src={src || "/images/eim.png"}
                onError={() => setSrc("../../../public/images/eim.png")}
                alt="صورة سيدي هشام"
              />
            </div>
          </div>
          <div className="flex flex-[55%] mb-3 h-auto space-y-2  justify-center flex-col">
            <p className="font-arabicBold mx-[5%] tracking-wide  text-[18px] truncate h-6 ">
              {product_name}
            </p>
            {local === "ar" ? (
              <p
                className="text-sm truncate overflow-hidden h-[60px] font-arabicMedium tracking-wide mx-[10%] w-[80%]"
              >
                {desc}
              </p>
            ) : (
              <p
                className="text-sm truncate overflow-hidden h-[60px] font-medium tracking-wide mx-[10%] w-[80%]"
              >
                {desc}
              </p>
            )}
            <div className="text-green-600 flex w-[80%] items-center mx-[10%]   relative  justify-center h-6 text-[18px] ">
              <p className="order-2 text-md   mt-[1px] font-bold pl-1">
                {" "}
                {currency}{" "}
              </p>
              <p className={`order-1 text-xl   text-center truncate font-bold`}>
                {percentage === 0 || rate
                  ? rate
                    ? (
                        Math.round(product.price * (rate ? rate : 0) * 100) /
                        100
                      ).toFixed(2)
                      ? (
                          Math.round(product.price * (rate ? rate : 0) * 100) /
                          100
                        ).toFixed(2)
                      : 0
                    : rate
                    ? (
                        Math.round(
                          (product.price * (rate ? rate : 0) -
                            ((percentage ? percentage : 0) *
                              product.price *
                              (rate ? rate : 1)) /
                              100) *
                            100
                        ) / 100
                      ).toFixed(2)
                      ? (
                          Math.round(
                            (product.price * (rate ? rate : 0) -
                              ((percentage ? percentage : 0) *
                                product.price *
                                (rate ? rate : 1)) /
                                100) *
                              100
                          ) / 100
                        ).toFixed(2)
                      : 0
                    : product.price
                    ? product.price
                    : 0
                  : product.price
                  ? product.price
                  : 0}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="text-[24px]  font-arabicMedium  text-red-500"
              >
                -
              </button>
              <p className="mx-4 text-[24px] font-medium">{quantity}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuantity(quantity + 1);
                }}
                className="text-[24px] font-bold text-red-500"
              >
                +
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="flex -mt-9 space-x-6 ">
        <div className="">
          <button
            onClick={handleAddToCart}
            className={`${isAdded ? 'bg-red-500' : 'bg-[#007530]'} space-x-1 w-full justify-between text-sm font-arabicLight text-white flex rounded-full p-2`}
          >
            <div className="ml-2 flex justify-center items-center mt-1 text-center whitespace-nowrap">
              {isAdded
                ? local === "en"
                  ? " Remove "
                  : "إزالة من السلة"
                : local === "ar"
                ? " إضافة الى السلة"
                : "Add to cart"}
            </div>
            <div className="mt-[2px] mx-1">
              <ShoppingCartIcon color="white" height={19} width={19} />
            </div>
          </button>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
          className="rounded-full cursor-pointer bg-white border-red-500 border-[1px] px-2 flex justify-center items-center"
        >
          {favorized ? (
            <Heart height={20} width={20} color="red" />
          ) : (
            <HeartIcon height={20} width={20} color="red" />
          )}
        </div>
      </div>
    </div>
  );
}
