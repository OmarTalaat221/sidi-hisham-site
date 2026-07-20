import React from "react";

export default function SampleInput({ name, label, placeholder,value,handleChange,type,local }) {
  return (
    <div className="w-[96%] my-1  flex flex-col justify-center mx-[2%]">
      <label className={`block mb-2 tracking-tight ${local === "ar"?"text-end":"text-start"} text-[13px] font-medium text-gray-600 `}>
        {label}
      </label>
      <div className="flex">
        {" "}
        <input
        name={name}
          type={type}
          className={`rounded-lg ${local === "ar"?"text-end":"text-start"} bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
