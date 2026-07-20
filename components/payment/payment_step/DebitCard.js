import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import visa from "../../../public/images/visa.png";

export default function DebitCard() {
  return (
    <div>
      <div className="w-96 h-56 m-auto my-3 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
        <img alt="صورة سيدي هشام" 
          className="relative object-cover opacity-50 w-full h-full rounded-xl"
          src="https://i.imgur.com/kGkSg1v.png"
        />

        <div className="w-full px-4 absolute top-3">
          <div className="flex justify-end space-x-2">
            {" "}
            <div className="w-14 h-14 flex justify-center items-center">
              {" "}
              <OptimizedImage  alt="صورة سيدي هشام" src={visa} />
            </div>
            <img alt="صورة سيدي هشام"  className="w-14 h-14 " src="https://i.imgur.com/bbPHJVe.png" />
          </div>
          <div className="-mt-2">
            {" "}
            <p className="text-black opacity-70 text-[13px] font-medium py-1">
              Card Number
            </p>
            <input
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="font-medium text-sm py-1 px-1 border-2 focus:bg-white border-gray-400 w-[53%] rounded-md text-black bg-slate-50"
            />
          </div>
          <div className="pt-3 pr-6 w-full">
            <div className="flex w-full">
              <div className=" flex-[50%]">
                <div className="w-full">
                  {" "}
                  <p className="text-black  opacity-70 text-[13px] font-medium py-1">
                    Tutiliare de la carte
                  </p>
                  <input
                    type="text"
                    placeholder="Barack Obama"
                    className="font-medium text-sm py-1 px-1 border-2 focus:bg-white border-gray-400  rounded-md text-black bg-slate-50"
                  />
                </div>
              </div>
              <div className=" w-full flex-[50%] mx-3">
                <p className=" text-black opacity-70 text-[13px] font-medium py-1">
                  Exprire In
                </p>
                <div className="space-x-4">
                  <input
                    type="number"
                    placeholder=" 01"
                    className="font-medium text-sm py-1 px-1 border-2 focus:bg-white border-gray-400 w-[40%] rounded-md text-black bg-slate-50"
                  ></input>
                  <input
                    type="number"
                    placeholder="06"
                    className="text-sm py-1 font-medium px-1 border-2 focus:bg-white border-gray-400 w-[40%] rounded-md text-black bg-slate-50"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
