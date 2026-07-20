import React from "react";
import { useSelector } from "react-redux";

export default function AboutProduct({ text }) {
  const { local } = useSelector((state) => state.language);
  return (
    <div className="flex py-3 space-y-2  mx-10 bg-gray-100 rounded-xl  flex-col">
      <h2
        className={`${
          local === "ar" ? "text-end mx-3" : "text-start mx-3"
        } object-contain text-red-600 font-arabicMedium`}
      >
        {local === "ar" ? " عن المنتج" : "About product"}
      </h2>
      <div className="inline-block w-full">
        <p
          className={`w-[98%]  block p-4   ${
            local === "ar" ? "text-end font-arabicLight " : "text-start "
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
