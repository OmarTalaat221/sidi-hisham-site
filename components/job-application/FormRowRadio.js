import React from "react";
import RadioButton from "./RadioButton";

export default function FormRowRadio({ label }) {
  return (
    <div className="px-3">
      <label className="block mb-3 tracking-tight text-end text-[13px] font-medium text-gray-600 ">
        <span className="text-red-500">*</span> {label}
      </label>
      <div className="flex justify-end space-x-6 mt-1">
        <RadioButton text="ارمل " />
        <RadioButton text="ارمل " />
      </div>
    </div>
  );
}
