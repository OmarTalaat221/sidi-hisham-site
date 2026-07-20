import React, { useState } from "react";

export default function AvailableChoice({
  title,
  description,
  name,
  value,
  choices,
  handleChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="border-b  py-4 bg-gray-100 rounded-xl">
      <div
        onClick={() => setShow(!show)}
        className="flex cursor-pointer  items-center justify-between"
      >
        {" "}
        <button
          className="font-medium
                            cursor-pointer  pl-6 py-2 
                            rounded 
                        "
          aria-label="show or hide"
        >
          <svg
            className={"transform " + (show ? "rotate-180" : "rotate-0")}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L5 5L1 1"
              stroke="#4B5563"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className=" text-sm pr-4 font-arabicMedium text-center leading-4 text-gray-800 ">
          {title}
        </p>
      </div>
      <div
        className={
          "mt-4 pt-4   text-sm text-end leading-normal mx-[5%] w-[90%] text-gray-600 " +
          (show ? "flex" : "hidden")
        }
        id="sect"
      >
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="appearance-none text-end block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-full py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {choices?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
