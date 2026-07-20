import React from "react";

export default function InfoCard({ Icon, title, desc }) {
  return (
    <div className="flex md:flex-row space-y-2 flex-col md:justify-end">
      <div className="flex justify-center items-center md:items-center ">
        <Icon className="w-7 h-7 text-[#007530] hover:animate-bounce" />
      </div>
      <div className="flex flex-col md:flex-[70%] md:mx-4">
        <p className="text-[#007530] text-xs font-arabicMedium md:text-sm">{title}</p>
        <p className="text-xs font-medium">{desc}</p>
      </div>
    </div>
  );
}
