import React from "react";

export default function Button({ text, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="rounded-md font-arabicMedium w-full
  cursor-pointer text-sm  h-6 py-6 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-6 bg-[#007530]"
    >
      {text}
    </button>
  );
}
