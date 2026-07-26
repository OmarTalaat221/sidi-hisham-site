import React from "react";

export default function RadioButton({
  id,
  label,
  name,
  value,
  isChecked,
  handleChange,
  local,
  text
}) {
  const isRTL = local === "ar";
  const displayLabel = label || text;
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-red-500/50 cursor-pointer transition-all duration-200 ${
        isChecked ? "border-red-500/80 bg-red-950/30 text-white" : "text-slate-300"
      }`}
    >
      <input
        id={id}
        type="radio"
        value={value}
        onChange={handleChange}
        checked={isChecked}
        name={name}
        className="w-4 h-4 accent-red-600 focus:ring-red-500 bg-slate-900 border-slate-700 cursor-pointer"
      />
      <span className={`text-xs sm:text-sm font-arabicMedium ${isRTL ? "text-right" : "text-left"}`}>
        {displayLabel}
      </span>
    </label>
  );
}
