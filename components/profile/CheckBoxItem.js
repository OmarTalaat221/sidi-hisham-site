import React from "react";

export default function CheckBoxItem({
  id,
  label,
  name,
  value,
  isChecked,
  handleChange,
  local,
}) {
  return (
    <div className="w-full flex md:w-1/4 px-3  mb-4">
      <input
        name={name}
        type="radio"
        value={value}
        checked={isChecked}
        onChange={() => handleChange({ target: { name, value } })}
        className="w-4 rounded-full  border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
      />
      <p
        className={`mb:pb-2 ${
          local === "ar" ? "mr-2 " : "ml-2 order-1"
        } text-sm font-medium text-slate-700 md:pb-0`}
      >
        {label}
      </p>
    </div>
  );
}
