import React from "react";

export default function SampleInput({ name, label,
  inputType,
  placeholder,
  handleChange,
  value,
  local
 }) {
  return (
    <div className="w-[96%]  flex flex-col justify-center mx-[2%]">
      <label className={`block mb-2 tracking-tight ${local ==="ar"?"text-end":"text-start"} text-[13px] font-medium text-gray-600`}>
        <span className={local === "ar"?"text-red-500 ":"text-red-500 hidden"}>*</span> {label}
      </label>
      <div className="flex">
        {" "}
        <input
          type={inputType}
          id="website-admin"
          className={`${local ==="ar"?"text-end":"text-start"} rounded-lg bg-white opacity-100 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 `}
      
          name={name}
          value={value}
          // placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
