import React from "react";

export default function SampleInput({ 
  name, 
  label,
  inputType,
  placeholder,
  handleChange,
  value,
  local
}) {
  const isRTL = local === "ar";
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${isRTL ? "text-right" : "text-left"}`}>
          <span className="text-red-500 font-bold me-1">*</span> {label}
        </label>
      )}
      <input
        type={inputType || "text"}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={handleChange}
        className={`w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 transition-all duration-200 text-slate-100 placeholder:text-slate-500 ${
          isRTL ? "text-right" : "text-left"
        }`}
      />
    </div>
  );
}
