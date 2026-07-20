import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBranchId } from "../../../redux/branchSlice";
import LocationTitle from "./LocationTitle";

export default function Locations({ locations, local, setZoom }) {
  const dispatch = useDispatch();
  const { branchID } = useSelector((state) => state.branch);
  return (
    <div className="mx-8 bg-gray-100 px-6 rounded-xl">
      <p
        className={`w-[80%] mx-[10%] text-[15px] ${
          local === "ar" ? "text-end" : "text-start"
        } font-medium tracking-tight  text-red-500 pt-3`}
      >
        {local === "ar" ? "العناوين" : "Address"}
      </p>
      {/* on Click : Set branch id to redux */}
      <div className="mt-4 pb-2 scrollbar-corner-rounded-md scrollbar-thumb-rounded-xl scrollbar-thumb-[#007530] scrollbar-thin scrollbar-track-gray-100">
        {locations?.map((branch, index) => (
          <div
            onClick={() => {
              dispatch(setBranchId(branch.id));
              setZoom(16);
            }}
            key={index}
          >
            <LocationTitle
              local={local}
              branchId={branch.id}
              name={branch.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
