import React from "react";

export default function Button({ text, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className="w-full px-8 py-3.5 bg-gradient-to-r from-[#ba0d1b] via-[#e61c24] to-[#ba0d1b] hover:from-[#d1101e] hover:to-[#960812] text-white font-arabicBold font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
    >
      <span>{text}</span>
    </button>
  );
}
