import React from "react";

export default function RadioButton({
  id,
  label,
  name,
  value,
  isChecked,
  handleChange,
  local
}) {
  return (
    <div>
      <div className={`flex items-center ${local === "ar"?"justify-end":"justify-start"} mb-3`}>
        <label className={` text-xs order-2 -mt-1   font-normal text-gray-900 ${local === "ar" ? "mr-2 text-end":"ml-2 text-start"}`}>
          {label}
        </label>
        <input
          id={id}
          type="radio"
          value={value}
          onChange={handleChange}
          checked={isChecked}
          name={name}
          className="w-4 h-4 accent-red-700 bg-gray-100 border-gray-300 focus:ring-red-500 "
        />
      </div>
    </div>
  );
}
