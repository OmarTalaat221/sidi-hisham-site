import React from "react";

export default function Price({ price, classname,currency }) {
  return (
    <div>
      <p className="text-3xl flex space-x-2 font-medium opacity-90">
      <span className={classname}>  {price} </span>
      <span className={classname}>  {currency} </span>
       
        {/* <span className={`absolute text-2xl font-medium -mt-4 ${classname}`}>
          00
        </span> */}
      </p>
    </div>
  );
}
