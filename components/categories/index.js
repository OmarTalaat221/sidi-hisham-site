import React from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import path from "../../public/images/path.png";
import grots from "../../public/images/grots.png";
import product from "../../public/images/product-m.png";
import productImg from "../../public/images/productImg.png";
import oilKitchen from "../../public/images/oilKetchen.png";
import rise from "../../public/images/rise.png";
import oil from "../../public/images/oil.png";
import Category from "./Category";
import CategoryB from "./CategoryB";

export default function index() {
  return (
    <div className=" ">
      <div className="absolute ml-[7%] mr-[3%] w-[90%]  py-10 h-auto flex-col bg-white -mt-24 items-center mx-[24%]  top-24 flex justify-center">
        {" "}
        {/* <div className="flex justify-center">
          <p className="font-bold text-xl">منتجات سيدي هشام</p>
        </div> */}
        <OptimizedImage  alt="صورة سيدي هشام" width={700} height={500} src={product} />
      </div>

      <div className="absolute flex z-40   w-[60%] mx-[20%] space-x-64  bg-white top-[620px] justify-between">
        <OptimizedImage  alt="صورة سيدي هشام" width={250} height={250} src={grots} />
        <Category />
      </div>

      <div className="absolute flex z-40  ml-[36%] space-x-64  bg-white top-[980px] justify-between">
        {" "}
        <CategoryB />
      </div>
      <div className="absolute flex z-40  ml-[70%] space-x-64  bg-white top-[910px] justify-between">
        {" "}
        <OptimizedImage  alt="صورة سيدي هشام" width={200} height={200} src={oil} />
      </div>

      <div className="absolute flex z-40 mx-[20%] space-x-64  bg-white top-[1200px] justify-between">
        {" "}
        <OptimizedImage  alt="صورة سيدي هشام" width={270} height={270} src={productImg} />
        <Category />
      </div>

      <div className="absolute flex z-40 mx-[40%] space-x-64  bg-white top-[1500px] justify-between">
        {" "}
        <CategoryB />
      </div>

      <div className="relative object-cover z-20  flex justify-center mt-[300px]  w-[70%] mx-[15%] rounded-xl">
        <OptimizedImage  alt="صورة سيدي هشام" height={4000} src={path} />
      </div>
    </div>
  );
}
