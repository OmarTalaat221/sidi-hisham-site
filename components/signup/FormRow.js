import React from "react";
import { useSelector } from "react-redux";

export default function FormRow({
  label,
  inputType,
  placeholder,
  name,
  handleChange,
  value,
  size,
  maxLength,
  minLength,
  pattern
}) {
  const {local} = useSelector((state)=>state.language)
  return (
    <div className="mb-2">
      <label className={`block  ${local === "ar" ? "text-end font-arabicMedium" : "text-start font-medium" } tracking-wide text-gray-700 text-xs  mb-2`}>
        {label}
      </label>
      <input
      pattern={pattern}
      // size={size}
      // minlength={minLength}
      // maxlength={maxLength}
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`appearance-none rounded-full ${local === "ar" ? "text-end" : "text-start" } font-medium block w-full bg-gray-200 text-gray-700 border   py-2.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
      />
    </div>
  );
}
