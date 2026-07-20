import React from "react";

export default function InfoRow({ title, value,local }) {
  return (
    <div className={`flex flex-col opacity-70 my-[6px] w-[60%]  ml-[20%] ${local === "ar"?"justify-end":"justify-start"}`}>
      <p className={`text-[13px] ${local === "ar"?"text-end font-arabicMedium":"text-start font-medium"} `}>
        {" "}
        {title} : <span className="opacity-80 font-medium">{value}</span>
      </p>
    </div>
  );
}
