import React from "react";

export default function FormRowWithIcon(
  { 
    Icon,
    name, 
    label,
    placeholder,
    handleChange,
    value, 
    local
  }) {
  return (
    <div className="w-full md:w-1/2 px-3  ">
      <label className={`block ${local === "ar" ? "text-end" : "text-start"}   tracking-wide text-gray-700 text-xs font-arabicMedium mb-2`}>
        {label}
      </label>
      <div className="flex flex-row">
        <div className="flex justify-center mt-[5px] text-green-800 mx-2">
          <Icon height={30} width={30} />
        </div>

        <input
          className={`appearance-none font-arabicMedium rounded-full ${local === "ar" ? "text-end" : "text-start"} block w-full bg-gray-200
           text-gray-700 border py-2.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          type="text"
          name={name}
          value={value}
          // placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
