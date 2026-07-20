import React from "react";
import { useSelector } from "react-redux";

export default function PaymentTypeTitle({
  name,
  value,
  label,
  checked,
  handleChange,
}) {
  const {local} = useSelector((state)=>state.language)
  return (
    <div className="flex flex-col mx-5">
      <div className={`flex mx-[10%] w-[80%] py-4 ${local === "ar"?"justify-end":"justify-start"}`}>
        <p className={`mb:pb-2 ${local === "ar" ? " mr-3" : "order-2 ml-3" }   text-sm font-arabicMedium text-slate-700 md:pb-0`}>
          {label}
        </p>
        <input
          name={name}
          onChange={handleChange}
          type="radio"
          checked={checked}
          value={value}
          className="w-4 rounded-full order-1 border border-slate-200 py-3 mb-1 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
        />
      </div>
      <span className=" p-[1px] flex justify-center w-[80%] mb-2 items-center mx-[10%] bg-gray-300 "></span>
    </div>
  );
}
