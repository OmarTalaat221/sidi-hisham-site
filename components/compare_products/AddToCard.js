import React from "react";
import {
  HomeIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
export default function AddToCard() {
  return (
    <div>
      <button className="bg-green-700 mr-1 font-medium text-white flex rounded-xl p-2">
        إضافة الى السلة
        <div className="mt-[3px] mx-1">
          <ShoppingCartIcon color="white" height={20} width={20} />
        </div>
      </button>
    </div>
  );
}
