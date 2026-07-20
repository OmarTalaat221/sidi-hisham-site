import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function FormRowPassword({
  label,
  placeholder,
  name,
  handleChange,
  value,
  local
} ) {

  const [open, setOpen] = useState(false);
  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full md:w-1/2 px-3 mb-4">
      <label className={`block  ${local === "ar"?"text-end":"text-start"} tracking-wide text-gray-700 text-xs font-arabicMedium mb-2`}>
      {label}
      </label>
      <input
        className={`appearance-none z-40 rounded-full ${local === "ar"?"text-end":"text-start"} block w-full bg-gray-200 text-gray-700 border cursor-text
        py-2.5 px-4 mb-3  focus:outline-none focus:bg-white`}
        type={open ? "password" : "text"}
        name={name}
        value={value}
        // placeholder={placeholder}
        onChange={handleChange}
      />
      <div className={`-mt-[41.5px]  z-30 ${local === "ar"?"ml-2":"mr-6 flex justify-end"} `}>
        {open ? (
          <AiFillEyeInvisible size={18} onClick={toggle} />
        ) : (
          <AiFillEye size={18} onClick={toggle} />
        )}
      </div>
    </div>
  );
}
