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
  const isRTL = local === "ar";

  return (
    <div className="w-full space-y-1.5">
      <label className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${isRTL ? "text-right" : "text-left"}`}>
        <span className="text-red-500 font-bold me-1">*</span>
        {label}
      </label>
      <div className="relative flex items-center bg-slate-950/80 border border-slate-700/80 rounded-xl overflow-hidden focus-within:border-red-500/80 focus-within:ring-2 focus-within:ring-red-500/20 transition-all duration-200 shadow-sm">
        {Icon && (
          <div className="px-3 text-slate-400 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          name={name}
          onChange={handleChange}
          value={value || ""}
          placeholder={placeholder}
          className={`w-full bg-transparent text-slate-100 text-sm font-arabicMedium px-3 py-3 outline-none placeholder:text-slate-500 ${
            isRTL ? "text-right" : "text-left"
          }`}
        />
      </div>
    </div>
  );
}
