import React from "react";

export default function NumInput({value,handleChange,name }) {
  return (
    <div className="rounded-xl text-center w-12 h-12 flex items-center justify-center">
      <input
        name={name}
        value={value}
        onChange={handleChange}
        type="number"
        maxLength="1"
        className=" text-center w-full pl-3 font-bold  h-full text-[18px] rounded-lg bg-white"
      />
    </div>
  );
}
