import React from "react";

export default function PriceRow({ title, price }) {
  return (
    <div className=" flex justify-between items-center rounded-md w-[80%] mx-[10%] h-10 ">
      <p className="text-[13px] font-arabicLight opacity-80">{title}</p>
      <p className="text-[13px] font-medium opacity-80">{price}</p>
    </div>
  );
}
