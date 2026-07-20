import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useState } from "react";
import image from "../../public/images/logo.png";
import { XCircleIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../redux/cartSlice";
import { useRouter } from "next/router";

export default function Product({
  id,
  image,
  title,
  price,
  quantity,
  currency,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  function GraphCMSImageLoader({ src }) {
    return `https://api.sedihisham.com/${src}`;
  }

  return (
    <div className="flex flex-col mt-3 z-40">
      <div className="md:w-[90%] opacity-10 mb-2 md:mx-[5%] h-0 border-[1px] bg-black border-black text-black " />

      <div className="flex  md:flex-row md:space-y-0 space-y-4  flex-col justify-center items-center md:w-[90%] py-2 mx-5 md:mx-[5%]">
        <div
          onClick={() => dispatch(removeItem(id))}
          className="h-6  w-6 opacity-50 md:flex-[5%] cursor-pointer justify-center flex "
        >
          <XCircleIcon color="red" />
        </div>
        <div className="md:flex-[50%]   justify-center md:mx-6 w-full flex  md:px-3 ">
          <div className="flex-[0.20] font-semibold text-[12px] flex flex-col">
            <p className="text-center font-arabicMedium opacity-50">
              {local === "ar" ? " السعر الكلي" : "Total"}
            </p>
            <p className="mt-6 opacity-90  text-[14px] text-center text-green-700  font-bold ">
              {price * quantity} {currency}
            </p>
          </div>
          <div className="flex-[0.30] opacity-50 font-semibold text-[12px] flex flex-col">
            <p className="text-center font-arabicMedium">
              {local === "ar" ? "الكمية" : "Quantity"}
            </p>
            <div className="flex justify-center mt-4  items-center">
              <button
                onClick={() => dispatch(decrementQuantity(id))}
                className="text-[20px] cursor-pointer font-bold px-[5px] border-[2px] rounded-[7px] border-gray-500"
              >
                -
              </button>
              <p className="px-3 -mx-[2px]  py-[6px] border-[2.5px] font-bold rounded-[7px] border-gray-500">
                {quantity}
              </p>
              <button
                onClick={() => dispatch(incrementQuantity(id))}
                className="text-[20px] cursor-pointer font-bold px-[2px] border-[2px] rounded-[7px] border-gray-500"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex-[0.25] opacity-50 font-semibold text-[12px] flex flex-col">
            <p className="text-center font-arabicMedium">
              {local === "ar" ? "سعر القطعة الواحدة" : "Price per piece"}
            </p>
            <p className="mt-6 text-[13px] text-center text-gray-800  font-bold">
              {price} {currency}
            </p>
          </div>
        </div>
        <div
          onClick={() =>
            router.push(`/categories/product-content/product-details/${id}`)
          }
          className="md:flex-[45%] cursor-pointer  justify-center w-full md:justify-end  flex flex-col md:flex-row"
        >
          <p className=" flex justify-center  text-center opacity-70 font-arabicMedium items-center md:mx-10">
            {title}
          </p>

          <div className=" w-full h-full flex justify-center  hover:scale-100 duration-75  ">
            {" "}
            <OptimizedImage  alt="صورة سيدي هشام" loader={GraphCMSImageLoader}
              src={image}
              height={50}
              width={50}
              quality={90}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
