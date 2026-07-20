import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import { HeartIcon as Heart } from '@heroicons/react/solid';
import AddToCart from './AddToCart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from '../../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addTofavorites } from '../../../redux/favoritesSlice';
import errImage from '../../../public/images/eim.png';
import { set } from 'date-fns';
import axios from 'axios';

export default function ProductCardCate({
  product_id,
  product_name,
  order_number,
  desc,
  translations,
  product_image,
  price,
  product,
  discount,
  points,
  currency,
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
    if (src.startsWith('uploads/products/images/')) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return '/images/eim.png';
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
  }, [dispatch]);

  const handleClick = (e) => {
    dispatch(
      addTofavorites({
        product_id,
        product_name,
        order_number,
        desc,
        product_image,
        translations,
        price,
        discount,
        points,
      })
    );
    setFavorized(!favorized);
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
        .get('https://api.sedihisham.com/coupons/' + product?.couponId)
        .then((response) => {
          setCoupon(response?.data);
          // console.log("Coupon " + JSON.stringify(coupon));
        });
    }
  };

  //Add item to cart
  const [cartItem, setCartItem] = useState(null);

  const addItemToCart = (product) => {
    dispatch(
      addToCart({
        product_id,
        product_name,
        order_number,
        desc,
        product_image: product_image.startsWith("https://api.sedihisham.com")
          ? product_image
          : "https://api.sedihisham.com/" + product_image,
        translations,
        price,
        discount,
        points,
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
        <div className="flex flex-col  w-[200px]  h-[280px]  hover:border-[3px] hover:border-green-700 duration-300 shadow-md rounded-xl bg-white">
          <div className="w-full flex-[45%] h-full  relative  z-40  justify-center items-center  duration-300 scale-125  hover:scale-100   -mt-20 flex ">
            <div className="flex justify-center items-center">
              <OptimizedImage loader={GraphCMSImageLoader}
                // height={200}
                // width={200}
                layout="fill"
                objectFit="contain"
                src={src || '/images/eim.png'}
                onError={() => setSrc('../../../public/images/eim.png')}
                alt="صورة سيدي هشام"
              />
            </div>
          </div>
          <div className="flex flex-[55%] mb-3 h-auto space-y-2  justify-center flex-col">
            <p className="font-arabicBold mx-[5%] tracking-wide  text-[18px] truncate h-6 ">
              {product_name}
            </p>
            <p className="text-sm truncate h-[50px] overflow-hidden  font-arabicMedium tracking-wide  mx-[10%] w-[80%]">
              {desc}
            </p>
            <div className="text-green-600 flex w-[80%] items-center mx-[10%]   relative  justify-center h-6 text-[18px] ">
              <p className="order-2 text-md   mt-[1px] font-bold pl-1">
                {" "}
                {currency}{" "}
              </p>
              <p className={`order-1 text-xl   text-center truncate font-bold`}>
                {" "}
                {(Math.round(price * 100) / 100).toFixed(2)}
              </p>
            </div>
            {/* <div className="flex justify-center">
              <button
              onClick={() => {
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
                onClick={ () => setQuantity(quantity + 1)}
                className="text-[24px] font-bold text-red-500"
              >
                +
              </button>
            </div> */}
          </div>
        </div>{" "}
      </div>
      <div className="flex w-[80%] -mt-9 mx-[10%] space-x-1 carousalDetails-x-1">
        <div className="">
          <button
            onClick={() => {
              isAdded ? dispatch(removeItem(product_id)) : addItemToCart();
            }}
            className={`bg-${
              isAdded ? 'red-500' : '[#007530]'
            } space-x-1 justify-between   text-sm font-arabicLight text-white flex rounded-full p-2`}
          >
            <div
              className={`${
                isAdded && local === 'ar'
                  ? 'ml-2 flex justify-center items-center mt-1 text-center whitespace-nowrap'
                  : 'ml-2 flex justify-center items-center mt-1 text-center whitespace-nowrap'
              }`}
            >
              {isAdded
                ? local === 'en'
                  ? ' Remove '
                  : 'إزالة من السلة'
                : local === 'ar'
                ? ' إضافة الى السلة'
                : 'Add to cart'}
            </div>
            <div className="mt-[2px] mx-1">
              <ShoppingCartIcon color="white" height={19} width={19} />
            </div>
          </button>
        </div>
        <div
          onClick={handleClick}
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
