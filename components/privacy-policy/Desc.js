import React from "react";

export default function Desc({ text }) {
  return (
    <div className="md:w-[60%]  w-[90%]  h-auto py-3 flex flex-col rounded-md   z-20 mx-[5%] md:mx-[20%] bg-white shadow-md">
    <p className="font-arabicMedium text-[16px] text-end text-[#000000] flex justify-end py-5 md:px-4">{text} </p>
    </div>
  );
}
