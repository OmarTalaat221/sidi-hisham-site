import React from "react";

export default function FormTitle({ text, local }) {
  const isRTL = local === "ar";
  return (
    <div className="w-full mb-4">
      <h3
        className={`text-base md:text-lg font-arabicBold font-bold text-red-400 pb-2 border-b border-slate-800/80 flex items-center gap-2 ${
          isRTL ? "text-right justify-start" : "text-left justify-start"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
        <span>{text}</span>
      </h3>
    </div>
  );
}
