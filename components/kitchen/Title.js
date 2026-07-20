import React from "react";

export default function Title({ text, size,local }) {
  return (
    <div className={local === "ar"?"flex justify-end":"flex justify-start"}>
      <p
        className={`text-${size}  h-[57px]  font-arabicMedium h-10  truncate tracking-tight ${local === "ar"?"text-end":"text-start"} text-[#007530]`}
      >
        {text} 
      </p>
    </div>
  );
}
