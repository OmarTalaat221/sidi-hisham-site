import React from "react";

export default function FormTitle({ text, local }) {
  return (
    <div>
      <p className={`text-[17px] px-4 py-2 mt-2 ${local === "ar" ? "text-end":"text-start" } font-arabicBold opacity-80 text-[#007530]`}>
        {text}
      </p>
    </div>
  );
}
