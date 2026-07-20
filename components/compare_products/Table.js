import React from "react";
import ColomunData from "./ColomunData";
import image from "../../public/images/oil.png";

export default function Table() {
  return (
    <div className="flex flex-col mt-6">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full  align-middle">
          <div className="overflow-hidden  rounded-lg">
            <table className=" flex bg-white mx-[10%] w-[80%] divide-y divide-gray-200">
              <tbody className="bg-gray-100   flex-[88%] flex ">
                <ColomunData
                  weight="weight"
                  price="price"
                  rating="rating"
                  size="size"
                  availability="aavailability"
                  image={image}
                  title="title"
                  brand="brand"
                />

                <ColomunData
                  weight="weight"
                  price="price"
                  rating="rating"
                  size="size"
                  availability="aavailability"
                  image={image}
                  title="title"
                  brand="brand"
                />
                <ColomunData
                  weight="weight"
                  price="price"
                  rating="rating"
                  size="size"
                  availability="aavailability"
                  image={image}
                  title="title"
                  brand="brand"
                />
                <ColomunData
                  weight="weight"
                  price="price"
                  rating="rating"
                  size="size"
                  availability="aavailability"
                  image={image}
                  title="title"
                  brand="brand"
                />
              </tbody>{" "}
              <thead className="bg-white border-2 border-gray-300 flex-[12%]">
                <tr className="flex flex-col divide-y-2 divide-gray-300">
                  <th
                    scope="col"
                    className="px-6 py-[12px] text-xs font-bold flex justify-center items-center text-gray-500 uppercase "
                  >
                    المنتج
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[55px] h-24 text-xs flex justify-center items-center  font-bold  text-gray-500 uppercase "
                  >
                    الصورة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[14.5px] text-xs text-center font-bold  text-gray-500 uppercase "
                  >
                    السعر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[15.5px] text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    البراند
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[18px] text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    {" "}
                    الفئة
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[18px] text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    التوافر
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-[18.5px] text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    التقييم
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-4 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    الملخص
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 pb-5   pt-4 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    <p className="w-full h-full"> الوزن</p>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
