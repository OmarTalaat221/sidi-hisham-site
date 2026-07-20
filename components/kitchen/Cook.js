import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";

import grots from "../../public/images/grots.png";

export default function Cook({ image }) {
  return (
    <div className="flex  relative w-[80%] mx-[10%] bg-white -mt-32">
      <div className="flex flex-col ml-[15%] flex-[0.5] mt-6">
        <p className="font-arabicBold text-3xl ">مطبخ سيدي هشام</p>
        <p className="my-5  font-arabicLight">
          نقدم لكم طرق و وصفات اشهى الوجبات <br /> مع جميع الاحتياجات والمقادير
        </p>
        <p className="font-arabicMedium text-xl ">
          وصفة الكبة المقلية من برغل سيدي هشام
        </p>{" "}
        <button className="bg-[#D40017] font-arabicMedium text-center my-10 rounded-full w-40 py-2 text-white">
          عرض المزيد
        </button>
      </div>
      <div className="w-80 h-80 -mt-7 flex-[0.4] ">
        <OptimizedImage  alt="صورة سيدي هشام" src={image} width={320} height={320} />
      </div>
    </div>
  );
}
