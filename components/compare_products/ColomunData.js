import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import AddToCard from "./AddToCard";

export default function ColomunData({
  title,
  image,
  price,
  brand,
  availability,
  rating,
  size,
  weight,
}) {
  return (
    <tr className="flex flex-col flex-[25%]  w-full">
      <td className="px-6 border-[1px] border-gray-300  flex justify-center  items-center  py-[9.5px] text-sm font-medium text-gray-800 whitespace-nowrap">
        {title}
      </td>
      <td className="px-6 h-28 border-[1px] border-gray-300  flex justify-center items-center py-4 text-sm text-gray-800 whitespace-nowrap">
        <OptimizedImage  alt="صورة سيدي هشام" width={100} height={100} src={image} />
      </td>
      <td className="px-6 flex border-[1px] border-gray-300   justify-center items-center py-[12.5px] text-sm text-gray-800 whitespace-nowrap">
        {price}
      </td>
      <td className="px-6 border-[1px] border-gray-300   flex justify-center py-[13.5px] items-center text-sm text-gray-800 whitespace-nowrap">
        {brand}
      </td>
      <td className="px-6 border-[1px] border-gray-300  py-4 flex justify-center items-center text-sm text-gray-800 whitespace-nowrap">
        {availability}
      </td>
      <td className="px-6 border-[1px] border-gray-300  py-4 flex justify-center items-center text-sm text-gray-800 whitespace-nowrap">
        {rating}
      </td>
      <td className="px-6 border-[1px] border-gray-300 py-4 flex justify-center items-center text-sm text-gray-800 whitespace-nowrap">
        {size}
      </td>
      <td className="px-6 border-[1px] border-gray-300  py-4 flex justify-center items-center text-sm text-gray-800 whitespace-nowrap">
        {weight}
      </td>
      <td className="px-6   py-4 flex flex-col space-y-2 justify-center items-center text-sm text-gray-800 whitespace-nowrap">
        <AddToCard />
        <button className="bg-red-700 px-[55px] py-2 mr-1 font-medium text-white flex rounded-xl ">
          حذف
        </button>
      </td>
    </tr>
  );
}
