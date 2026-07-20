import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import Login from "../../components/login";
import image from "../../public/images/logo.png";
import SignUp from "../../components/signup/SignUp";
import { useSelector } from "react-redux";

export default function Index() {
  const {local} = useSelector((state)=>state.language)
  return (
    <div className="flex md:flex-row flex-col space-y-5  mx-[5%] w-[90%] md:mt-32 mt-20  m-5">
      <div className="flex-[50%] mt-20 justify-center items-center  flex-col mx-8 ">
        <p className="text-red-600 animate-bounce tracking-wide text-2xl text-center font-arabicBold">
         {local === "ar"?" أهلا بك !":"Welcome"}
        
        </p>
        <p className="text-gray-600 tracking-tight font-arabicMedium text-center my-5 text-xl">
          {local === "ar"?"  لأول مرة ، يجب عليك تسجيل الدخول أو التسجيل":"For the first time, you must log in or register"}
        </p>
        <div className="flex justify-center mt-12 items-center">
          <OptimizedImage  alt="صورة سيدي هشام" src={image} width={200} height={100} />
        </div>
      </div>
      <div className="flex-[50%] w-full">
        <SignUp />
      </div>
    </div>
  );
}
