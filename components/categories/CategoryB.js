import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import categoryImage from "../../public/images/cat2.png";

export default function CategoryB() {
  return (
    <div className="flex mt-5 space-x-5">
      {" "}
      <div className="mr-2">
        <OptimizedImage  alt="صورة سيدي هشام" width={80} height={80} src={categoryImage} />
      </div>
      <div className="flex flex-col space-y-2">
        {" "}
        <p className="font-arabicMedium text-[18px] text-start">زيوت</p>
        <p className="max-w-[190px] text-start font-arabicLight text-[15px] h-auto">
          زيت زيتون زيت نباتي
        </p>
        <div className="flex justify-start">
          {" "}
          <button className="bg-red-600 py-1.5  text-sm my-6  rounded-full w-24 text-white">
            عرض المزيد
          </button>
        </div>
      </div>{" "}
    </div>
  );
}
