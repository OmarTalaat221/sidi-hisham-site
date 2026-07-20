import React from "react";
import { TruckIcon } from "@heroicons/react/solid";
import PaymentTypeTitle from "../payment_step/PaymentTypeTitle";

export default function ChooseShipping({
  name,
  value,
  label,
  checked,
  handleChange,
}) {
  return (
    <div>
      <div className="flex justify-between mx-3">
        <div className="flex justify-center items-center">
          <p className="text-[#007530] font-bold">2022</p>
        </div>
        <div className="flex  py-4 justify-end">
          <p className=" mr-3  text-xs font-arabicMedium text-slate-700 md:pb-0">
            {label}
          </p>
          <input
            name={name}
            onChange={handleChange}
            type="radio"
            checked={checked}
            value={value}
            className="w-4 rounded-full order-1 border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
