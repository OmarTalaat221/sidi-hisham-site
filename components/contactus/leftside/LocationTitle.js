import React from "react";
import { useSelector } from "react-redux";

export default function LocationTitle({ name,branchId,local }) {
  const { branchID } = useSelector((state) => state.branch);
  return (
    <div className={`pb-1 ${branchId === branchID ? "text-green-500" :"text-gray-600"} cursor-pointer font-arabicMedium
       ${local === "ar"?"text-end mr-8":"text-start ml-5"} tracking-tight opacity-70  text-sm font-medium mb-2`}>
      <p>{name}</p>
    </div>
  );
}
