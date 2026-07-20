import React from "react";

export default function Step({ title, number, color, opacity,onClick }) {
  return (
    <div  className="flex flex-col">
      <p
        className={`opacity-${opacity} text-center text-[12px] mb-1 font-arabicBold`}
      >
        {title}
      </p>
      <div
      onClick={onClick}
        className={`w-10 cursor-pointer h-10 rounded-full  border-2 opacity-${opacity} flex justify-center items-center border-${color} text-${color}`}
      >
        <p className={`opacity-${opacity} text-[18px] font-semibold`}>
          {number}
        </p>
      </div>
    </div>
  );
}
