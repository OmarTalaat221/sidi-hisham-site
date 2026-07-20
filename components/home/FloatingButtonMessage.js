import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import message from "../../public/images/message.svg";

export default function FloatingButtonMessage() {
  return (
    <div className="">
      <div
        title="Contact Sale"
        className="fixed z-80 flex group  justify-center items-center w-10 h-10 bottom-[90px] right-8 bg-blue-600  rounded-full drop-shadow-lg  text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl "
      >
        {/* <div className="bg-red-600  rounded-full p-2   w-10 h-10 flex border-[1px] border-white justify-center items-center"> */}
        <div>
          <OptimizedImage  alt="صورة سيدي هشام" src={message} />
        </div>
        {/* </div> */}
        <div className="hover:opacity-90 flex absolute justify-end opacity-0 mt-[1px] w-28 border-[1px] border-white   h-10 text-sm rounded-full  z-90 bg-red-600 mr-[68px]">
          <div className="flex justify-center items-center mx-3">المفضلة</div>{" "}
          <div className="bg-red-600 border-[1px]  bg-cover border-white  rounded-full p-2  w-10 h-10 flex justify-center items-center">
            <OptimizedImage  alt="صورة سيدي هشام" src={message} />
          </div>
        </div>
      </div>
    </div>
  );
}
