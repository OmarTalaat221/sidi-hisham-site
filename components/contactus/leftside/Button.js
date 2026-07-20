import React from "react";

export default function Button({ text, bgColor, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-md
        cursor-pointer font-arabicMedium text-sm  h-6 py-5 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-6 bg-${bgColor}`}
    >
      {text}
    </div>
  );
}
