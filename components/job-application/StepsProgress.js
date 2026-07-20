import { useRouter } from "next/router";
import React from "react";

export default function StepsProgress({ stepNumber }) {
  const router = useRouter()
  return (
    <div className="md:w-[40%] flex mx-5 md:mx-[30%] space-x-2 ">
      {stepNumber === 1 ? (
        <>
          <div  className="bg-green-600 flex-[33%] w-6 h-5" />{" "}
          <div className="bg-gray-200 flex-[33%] w-6 h-5" />{" "}
          <div className="bg-gray-200 flex-[33%] w-6 h-5" />
        </>
      ) : (
        <div></div>
      )}
      {stepNumber === 2 ? (
        <>
          <div onClick={()=>router.push("/job-application")} className="bg-green-600 flex-[33%] w-6 h-5" />{" "}
          <div  className="bg-green-600 flex-[33%] w-6 h-5" />{" "}
          <div className="bg-gray-200 flex-[33%] w-6 h-5" />
        </>
      ) : (
        <div></div>
      )}
      {stepNumber === 3 ? (
        <>
          <div onClick={()=>router.push("/job-application")} className="bg-green-600 flex-[33%] w-6 h-5" />{" "}
          <div onClick={()=>router.push("/job-application/addInfo")} className="bg-green-600 flex-[33%] w-6 h-5" />{" "}
          <div className="bg-green-600 flex-[33%] w-6 h-5" />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
