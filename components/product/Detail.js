import React from "react";
import { useSelector } from "react-redux";

export default function Detail({ title, value, hidden }) {
  
  const {local} = useSelector((state)=>state.language)
  return (
    <div className={`flex mb-1 space-x-3 ${hidden} `}>
      {" "}
      <p className={`font-semibold opacity-80  text-[13px] ${local === "en" ? "order-2 ml-2 -mt-[2px] " : ""}`}>{value}</p>
      <p className="text-[13px] text-green-500 font-arabicMedium tracking-tighter">
        {title}
      </p>
    </div>
  );
}
