import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";

export default function NumberOne({ title, image, desc }) {
  return (
    <div className="flex  bg-white">
      <div className="flex flex-col">
        <p className=" text-2xl text-end  font-arabicMedium">{title}</p>
        <p className="my-3  font-arabicLight w-[350px] text-end">{desc}</p>
      </div>{" "}
      <div className="w-40 h-40 mt-2 ">
        <OptimizedImage  alt="صورة سيدي هشام" src={image} />
      </div>
    </div>
  );
}
