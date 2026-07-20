import { counter } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import AddressLeftTitle from "./AddressLeftTitle";
import AddressRightTitle from "./AddressRightTitle";

export default function Address({
  id,
  country,
  name,
  value,
  label,
  region,
  checked,
  firstName,
  handleChange,
  shipmentsFee,
  phoneNumberRecipent,
}) {
  
  return (
    <div className="flex py-2">
      <div >
        <div className="mt-1 ml-2 space-y-[1px]">
          {/* <p className="font-arabicLight text-[#DADADA]  text-sm">
            العنوان الافتراضي
          </p> */}
          <p className="font-bold text-black  text-sm">{phoneNumberRecipent}</p>
          <p className="font-medium text-[#D40017]  text-sm">
   + {shipmentsFee}
          </p>
        </div>
      </div>
      <div className=" flex-[70%]">
        <div className="flex flex-col space-y-1">
          <div className="flex mt-1 justify-end">
            <p className="mb:pb-2 mr-3  text-sm font-arabicMedium text-slate-700 md:pb-0">
              {firstName}
            </p>
            <input
              id={id}
              name={name}
              onChange={handleChange}
              type="radio"
              checked={checked}
              value={value}
              className="w-4 rounded-full order-1 border border-slate-200 py-3 px-3 hover:shadow focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div className="mr-7">
            <p className="font-normal text-end text-sm">{region}</p>
            {/* <p className="font-arabicLight text-[#DADADA] text-end text-sm">
              العنوان الافتراضي
            </p> */}
          </div>
          <span className=" p-[1px] ml-2 flex justify-center  mb-2 items-center  bg-gray-200 "></span>
        </div>
      </div>
    </div>
  );
}
