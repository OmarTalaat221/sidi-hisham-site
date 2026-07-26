import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBranchId } from "../../../redux/branchSlice";
import LocationTitle from "./LocationTitle";

export default function Locations({ locations, local, setZoom }) {
  const dispatch = useDispatch();
  const { branchID } = useSelector((state) => state.branch);
  const isAr = local === "ar";

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm">
      {/* Section Title */}
      <h3
        className={`text-sm font-bold tracking-wide uppercase text-[#7c1422] mb-3 px-2 ${
          isAr ? "text-right font-arabicBold" : "text-left"
        }`}
      >
        {isAr ? "الفروع والعناوين" : "Branches & Addresses"}
      </h3>

      {/* Branches List Container with Custom Scrollbar */}
      <div className="max-h-[350px] overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-[#7c1422] scrollbar-track-gray-50 scrollbar-thumb-rounded-full">
        {locations?.map((branch, index) => {
          const isSelected = branchID === branch.id;

          return (
            <div
              key={branch.id || index}
              onClick={() => {
                dispatch(setBranchId(branch.id));
                setZoom(16);
              }}
              className={`cursor-pointer transition-all duration-200 rounded-xl p-2.5 border ${
                isSelected
                  ? "bg-red-50/80 border-[#7c1422] shadow-sm"
                  : "bg-gray-50/50 border-transparent hover:bg-gray-100 hover:border-gray-200"
              }`}
            >
              <LocationTitle
                local={local}
                branchId={branch.id}
                name={branch.name}
                isSelected={isSelected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}