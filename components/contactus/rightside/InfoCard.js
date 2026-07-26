import React from "react";

export default function InfoCard({ Icon, title, desc }) {
  return (
    <div className="group flex items-center gap-3.5 w-full dir-auto">
      {/* Icon Container */}
      <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-red-50 text-[#7c1422] border border-red-200/60 shadow-xs group-hover:bg-[#7c1422] group-hover:text-white group-hover:scale-105 group-hover:border-[#7c1422] transition-all duration-300">
        {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />}
      </div>

      {/* Content Details */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs font-semibold font-arabicMedium text-gray-500 tracking-wide uppercase truncate">
          {title}
        </span>
        <span className="text-sm font-bold font-arabicBold text-gray-800 leading-snug break-words mt-0.5" title={desc || "-"}>
          {desc || "-"}
        </span>
      </div>
    </div>
  );
}