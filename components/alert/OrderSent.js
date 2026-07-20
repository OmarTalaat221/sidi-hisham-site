import OptimizedImage from "@/components/common/OptimizedImage";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import Button from "./Button";

export default function OrderSent({ id, points }) {
  const router = useRouter();
  const { local } = useSelector((state) => state.language);
  const { order } = useSelector((state) => state.auth);

  return (
    <div className="shadow-xl md:mt-12 bg-white rounded-3xl w-[80%] md:w-[46%] h-[400px] md:mx-[27%] mx-[10%] justify-center items-center flex flex-col space-y-8 py-6 ">
      <OptimizedImage  alt="صورة سيدي هشام" src={logo} height={140} width={300} />
      {local === "ar" ? (
        <p className="font-medium opacity-60 text-[18px]">
          تم ارسال الطلب بنجاح لقد حصلت على {points} نقطة
        </p>
      ) : (
        <p className="font-medium opacity-60 text-[18px]">
          Your request has been sent successfully. You have earned {points}{" "}
          points
        </p>
      )}
      <div className="flex space-x-3">
        <Button
          onClick={() => router.push("/")}
          bgColor="[#007530]"
          text={local === "ar" ? "اكمل التسوق" : "Home"}
        />
        {/* <Button bgColor="green-600" text="   طلباتي" /> */}
        {/* <Button bgColor="green-300" text=" طلباتي" /> */}
        <button
          onClick={() => router.push("/orders")}
          className="rounded-full font-arabicMedium w-40 hover:font-bold cursor-pointer   h-6 py-5 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-5 bg-[#007530]"
        >
          {local === "ar" ? "طلباتي" : "My orders"}
        </button>
      </div>
      <div>
        <p className="text-red-600 arabicMedium ">
          Order ID :
          <span className="opacity-80 text-black font-medium">{id}</span>
        </p>
      </div>
    </div>
  );
}
