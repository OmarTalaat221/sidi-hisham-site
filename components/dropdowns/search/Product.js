import OptimizedImage from "@/components/common/OptimizedImage";
import { useRouter } from "next/router";
import React from "react";
import image from "../../../public/images/logo.png";
import Link from "next/link";

export default function Product({ id, title, desc, image }) {
  function GraphCMSImageLoader({ src }) {
    return `https://api.sedihisham.com/${src}`;
  }

  const router = useRouter();
  return (
    <Link href={`/categories/product-content/product-details/${id}`}>
      <div className="-m-3  flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 ">
        <div className="flex flex-[30%]   h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
          <OptimizedImage width={30}
            height={30}
            alt="No image"
            loader={GraphCMSImageLoader}
            src={image}
          />
        </div>
        <div className=" flex flex-[70%]  pr-2 justify-end items-end flex-col">
          <p className="text-xs w-32 flex justify-end items-end font-arabicMedium text-gray-900">
            {title}
          </p>
          <p className="text-xs text-center  md:h-8 md:max-h-8 md:w-40 w-32 truncate flex justify-end items-end font-arabicLight text-gray-500">
            {desc}
          </p>
        </div>
      </div>
    </Link>
  );
}
