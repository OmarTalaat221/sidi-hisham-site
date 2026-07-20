import React from "react";

export default function TitleCard() {
  return (
    <div className=" my-1 flex justify-center items-center rounded-md w-[78%] mx-[12%] h-10 ">
      <div className="flex-[15%] flex w-10 justify-center items-center  bg-green-600 rounded-xl h-full">
        <p className="text-white font-bold text-[20px]">%</p>
      </div>
      <div className="flex-[80%] bg-slate-100 flex justify-center items-center h-full rounded-lg mx-2">
        <p className="text-xs rounded-xl font-arabicMedium ">
          {/* (الرجاء ادخال رقم القسيمة) هل تملك قسيمة حسم */}
        </p>
      </div>
    </div>
  );
}
