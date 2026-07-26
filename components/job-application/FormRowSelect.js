import React from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  isTrue,
  local
}) => {
  const isRTL = local === "ar";
  return (
    <div className="w-full space-y-1.5">
      <label className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${isRTL ? "text-right" : "text-left"}`}>
        <span className="text-red-500 font-bold me-1">*</span> {labelText || name}
      </label>
      <div className="relative flex items-center bg-slate-950/80 border border-slate-700/80 rounded-xl overflow-hidden focus-within:border-red-500/80 focus-within:ring-2 focus-within:ring-red-500/20 transition-all duration-200 shadow-sm">
        <select
          name={name}
          value={value || ""}
          onChange={handleChange}
          className={`w-full bg-transparent text-slate-100 text-sm font-arabicMedium px-4 py-3 outline-none appearance-none cursor-pointer ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <option value="" disabled className="bg-slate-900 text-slate-400">
            {isRTL ? "-- اختر --" : "-- Select --"}
          </option>
          {list?.map((itemValue, index) => {
            return (
              <option
                key={index}
                value={isTrue ? itemValue.id : itemValue}
                className="bg-slate-900 text-slate-100 font-medium py-1"
              >
                {isTrue ? (isRTL ? itemValue.name_ar : (itemValue.name_en || itemValue.name_ar)) : itemValue}
              </option>
            );
          })}
        </select>
        <div className={`pointer-events-none absolute ${isRTL ? "left-3" : "right-3"} text-slate-400`}>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default FormRowSelect;
