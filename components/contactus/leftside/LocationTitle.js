import React from "react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon as LocationMarkerOutline } from "@heroicons/react/outline";

export default function LocationTitle({ name, isSelected, local }) {
  const isAr = local === "ar";

  return (
    <div className={`flex items-center gap-2.5 ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
      <div className={`shrink-0 p-1.5 rounded-lg transition-colors ${
        isSelected ? "bg-[#7c1422] text-white" : "bg-gray-200/60 text-gray-500 group-hover:text-[#7c1422] group-hover:bg-red-100/60"
      }`}>
        {isSelected ? (
          <LocationMarkerIcon className="w-4 h-4" />
        ) : (
          <LocationMarkerOutline className="w-4 h-4" />
        )}
      </div>
      <span className={`text-sm font-semibold truncate ${
        isSelected ? "text-[#7c1422] font-arabicBold font-bold" : "text-gray-700 font-arabicMedium"
      }`}>
        {name}
      </span>
    </div>
  );
}
