import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function AddToCart() {
  return (
    <div className="w-full ">
      <button className="bg-green-700 space-x-1 w-full    text-sm font-arabicLight text-white flex rounded-full p-2">
        <div> إضافة الى السلة</div>
        <div className="mt-[2px] mx-1">
          <ShoppingCartIcon color="white" height={18} width={18} />
        </div>
      </button>
    </div>
  );
}
