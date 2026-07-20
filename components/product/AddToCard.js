import { ShoppingCartIcon } from "@heroicons/react/outline";
import React from "react";

export default function AddToCard({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 w-full hover:opacity-80   mx-1 text-[1.2rem]  justify-center items-center font-arabicMedium text-white flex rounded-full py-2"
    >
      {label}
      <div className=" ml-3">
        <ShoppingCartIcon color="white" height="1.8rem" width="1.8rem" />
      </div>
    </button>
  );
}
