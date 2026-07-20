import React from "react";

export default function InputWithIcon({ 
  label,
  inputType,
  placeholder,
  name,
  handleChange,
  value,
  Icon,
  local
}) {
  return (
    <div className="w-[96%]  flex flex-col justify-center mx-[2%]">
      <label className={`block mb-2 tracking-tight ${local === "ar"?"text-end":"text-start"} text-[13px] font-arabicMedium text-gray-600`}>
        <span className={local === "ar"?"text-red-500 ":"text-red-500 hidden"}>*</span> {label}
      </label>
      <div className="flex">
        <input
          type={inputType}
          className={`rounded-none ${local === "ar"?"text-end":"text-start"}  font-medium rounded-l-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`}
          // placeholder={placeholder}
          name={name}
          onChange={handleChange}
          value={value}
        />
        <span className="inline-flex items-center opacity-50 px-3 text-sm text-gray-900 bg-gray-200 rounded-r-md border border-r-0 border-gray-300 ">
          <Icon width={20} height={20} />
        </span>
      </div>
    </div>
  );
}
