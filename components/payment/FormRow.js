import React from "react";

export default function FormRow({
  label,
  type,
  placeholder,
  name,
  handleChange,
  value,
  local
}) {
  return (
    <div className="w-full md:w-1/2 px-3  ">
      <label className={`block  ${local === "ar" ? "text-end" :"text-start"} tracking-wide text-gray-700 text-xs font-arabicMedium mb-2`}>
    {label}
      </label>
     
       <input
        type={type}
        name={name}
        value={value}
        // placeholder={placeholder}
        onChange={handleChange}
        className={`appearance-none text-sm rounded-full  font-medium 
        block w-full bg-gray-200 text-gray-700 border   
        py-2.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${local === "ar" ? "text-end" :"text-start"}`}
      />
    </div>
  );
}
