import OptimizedImage from "@/components/common/OptimizedImage";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import Button from "./Button";

export default function JobApplicationSent() {
  const { local } = useSelector((state) => state.language);
  const router = useRouter();
  return (
    <div className="shadow-xl bg-white rounded-3xl max-md:container md:max-w-screen-md mx-auto justify-center items-center flex flex-col space-y-8 py-6 ">
      <OptimizedImage src={logo} alt="logo" width={220} height={90} />
      <p className="font-arabicMedium opacity-70 text-[18px]">
        {local === "ar"
          ? " شكراً تم استلام طلب التوظيف الخاص بكم"
          : "Thank you. Your job application has been received"}
      </p>
      <div className="flex space-x-3">
        <Button
          onClick={() => router.push("/")}
          bgColor="[#D40017]"
          text={local === "ar" ? "الرئيسية" : "Home"}
        />
      </div>
      <div></div>
    </div>
  );
}
