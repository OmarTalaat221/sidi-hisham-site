import React from "react";

export default function OrderInfo({ title, value, font, color }) {
  return (
    <div className="flex flex-col mr-[18%]  ">
      <div className="justify-between text-sm flex mx-[6%]">
        <p className="text-red-500 ">{title}</p>
        <p
          className={`text-gray-600 tracking-tight  font-${font} text-${color}`}
        >
          {value}
        </p>
      </div>

      <div className="w-[90%] my-[6px] opacity-25  mx-[6%] h-0 border-[1px] bg-gray-300 border-gray-300 " />
    </div>
  );
}
