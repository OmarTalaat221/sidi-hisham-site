import React from "react";

export default function AddressRightTitle({
  name,
  value,
  label,
  region,
  checked,
  handleChange,
}) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex mt-1 justify-end">
        <p className="mb:pb-2 mr-3  text-sm font-arabicMedium text-slate-700 md:pb-0">
          {label}
        </p>
        <input
          name={name}
          onChange={handleChange}
          type="radio"
          checked={checked}
          value={value}
          className="w-4 rounded-full order-1 border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
        />
      </div>
      <div className="mr-7">
        {" "}
        <p className="font-arabicLight text-end text-sm">{region}</p>
        <p className="font-arabicLight text-[#DADADA] text-end text-sm">
          العنوان الافتراضي
        </p>
      </div>
      <span className=" p-[1px] ml-2 flex justify-center  mb-2 items-center  bg-gray-200 "></span>
    </div>
  );
}
