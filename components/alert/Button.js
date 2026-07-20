import React from "react";

export default function Button({ text, bgColor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full w-40 font-arabicMedium cursor-pointer   h-6 py-5 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-5 bg-[#D40017]"
    >
      {text}
    </button>
  );
}
