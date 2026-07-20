import OptimizedImage from "@/components/common/OptimizedImage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "../../../redux/cartSlice";

export default function Product({
  id,
  title,
  totalItems,
  quantity,
  image,
  price,
  product
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  function GraphCMSImageLoader({ src }) {
    return `https://api.sedihisham.com/${src}`;
  }
  const {local} = useSelector((state)=>state.language)

  return (
    <div>
      {" "}
      <div className="flex flex-col ">
        <div className="flex justify-center items-center  rounded-md h-16 ">
          <div
            onClick={() =>
              router.push(`/categories/product-content/product-details/${id}`)
            }
            className="flex-[20%] relative object-contain justify-center cursor-pointer rounded-md  items-center flex "
          >
            <OptimizedImage  alt="صورة سيدي هشام" loader={GraphCMSImageLoader}
              src={image}
              width={50}
              height={50}
            />
            <b style={{fontSize:"13px", width:"160px"}}>
              {product?.product_translations?.find(
                (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
              )?.nameProduct || product?.product_translations?.[0]?.nameProduct || ""}
            </b>
          </div>
          <div className="flex-[50%] flex-col flex py-2 px-5 ">
            <p
              onClick={() =>
                router.push(`/categories/product-content/product-details/${id}`)
              }
              className="text-sm font-arabicLight h-4 w-32 truncate cursor-pointer  opacity-75 ml-1 mt-1 tracking-wide"
            >
              {title}
            </p>
            {/* <div className="flex mt-2">
            <p
              onClick={() => dispatch(decrementQuantity(id))}
              className="text-[20px] text-red-500 cursor-pointer font-bold px-[5px]  rounded-[7px] "
            >
              -
            </p>
            <p className="px-3 -mx-[2px] opacity-75 text-black  py-[4px]  font-bold rounded-[7px] ">
              {quantity}
            </p>
            <p
              onClick={() => dispatch(incrementQuantity(id))}
              className="text-[20px] text-red-500 cursor-pointer font-bold px-[2px]  rounded-[7px] "
            >
              +
            </p>
          </div> */}
          </div>
          <div
            onClick={() =>
              router.push(`/categories/product-content/product-details/${id}`)
            }
            className="flex-[30%] font-bold text-[16px] opacity-75  justify-center items-center flex"
          >
            الكمية: {quantity}
          </div>
        </div>
        <span className=" p-[1px] flex justify-center w-full mb-2 items-center bg-gray-300 "></span>
      </div>
    </div>
  );
}
