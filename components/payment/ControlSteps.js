import React from "react";

export default function ControlSteps({ onClickA, onClickB, onClickC }) {
  return (
    <div className="flex p-2 mt-4">
      <button
        onClick={onClickA}
        className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition"
      >
        Previous
      </button>
      <div className="flex-auto flex flex-row-reverse">
        <button
          onClick={onClickB}
          className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-600  
        bg-teal-600 
        text-teal-100 
        border duration-200 ease-in-out 
        border-teal-600 transition"
        >
          Next
        </button>
        <button
          onClick={onClickC}
          className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-teal-200  
        bg-teal-100 
        text-teal-700 
        border duration-200 ease-in-out 
        border-teal-600 transition"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
