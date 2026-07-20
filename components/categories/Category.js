import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";
import React from "react";
import categoryImage from "../../public/images/cat1.png";

export default function Category({ image }) {
  return (
    <div className="flex mt-10 space-x-5">
      <div className="flex flex-col space-y-2">
        <p className="font-arabicMedium text-[18px] text-end">بقوليات و حبوب</p>
        <p className="max-w-[190px] text-end font-arabicLight text-[15px] h-auto">
          برغل - عدس - فول - حمص ذرة - قمح - فاصولياء - فريكة
        </p>
        <div className="flex justify-end">
          {" "}
          <button className="bg-red-600  py-1.5  text-sm my-6  rounded-full w-24 text-white">
            <Link href="/products/product-content"> عرض المزيد</Link>
          </button>
        </div>
      </div>{" "}
      <div className="ml-3">
        <OptimizedImage  alt="صورة سيدي هشام" width={80} height={80} src={categoryImage} />
      </div>
    </div>
  );
}
