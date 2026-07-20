import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";

export default function NumberTwo({ title, image, desc, imageB }) {
  return (
    <div className="flex  bg-white">
      <div className="w-60 flex-[25%] h-44 mt-2 ">
        <OptimizedImage  alt="صورة سيدي هشام" src={imageB} />
      </div>
      <div className="flex flex-[25%] flex-col">
        <p className=" text-2xl text-end  font-arabicMedium">{title}</p>
        <p className="my-3  font-arabicLight w-[300px] text-end">{desc}</p>
      </div>{" "}
      <div className="w-32 flex-[25%] h-40 mt-2 ">
        <OptimizedImage  alt="صورة سيدي هشام" src={image} />
      </div>
    </div>
  );
}
