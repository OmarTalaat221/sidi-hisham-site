import React from "react";
import { Home, HomeIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

export default function Title() {
  const {local}=useSelector((state)=>state.language)
  return (
    <div className={`flex  mx-[10%] py-2.5 ${local === "ar"?"justify-end":"justify-start"} rounded-xl bg-gray-100`}>
      <p className="font-arabicBold font-semibold text-red-600 tracking-wide">
       {local === "ar"?" اختر طريقة الدفع":"Choose the payment method"}
      </p>{" "}
      <div className="text-amber-300 mx-3 ">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>
    </div>
  );
}
