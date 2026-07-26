import React from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function Button({ text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#b11d30] to-[#7c1422] hover:from-[#7c1422] hover:to-[#b11d30] text-white font-arabicBold text-sm py-3.5 px-6 shadow-md shadow-[#7c1422]/20 hover:shadow-lg hover:shadow-[#7c1422]/30 active:scale-[0.99] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer border border-[#7c1422]/30"
    >
      <MailIcon className="w-5 h-5 text-red-100 group-hover:scale-110 transition-transform duration-200" />
      <span className="tracking-wide">{text}</span>
    </button>
  );
}
