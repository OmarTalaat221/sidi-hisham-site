import React from "react";

export default function Button({ text, bgColor, onCLick }) {
  return (
    <div
      onClick={onCLick}
      className={`rounded-full hover:font-bold cursor-pointer border-[1px] border-black  h-6 py-4 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-5 bg-${bgColor}`}
    >
      {text}
    </div>
  );
}
