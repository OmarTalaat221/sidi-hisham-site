import React, { useEffect, useState } from "react";
import CartContent from "../../components/payment/leftside/CartContent";
import PriceRow from "../../components/payment/leftside/PriceRow";
import Product from "../../components/payment/leftside/Product";
import TitleCard from "../../components/payment/leftside/TitleCard";
import Step from "../../components/payment/Step";
import SignUp from "../../components/signup/SignUp";
import AddLocation from "../../components/payment/AddLocation";
import Title from "../../components/payment/payment_step/Title";
import PaymentTypeTitle from "../../components/payment/payment_step/PaymentTypeTitle";
import BankTransfer from "../../components/payment/payment_step/BankTransfer";
import DebitCard from "../../components/payment/payment_step/DebitCard";
import PayByPoints from "../../components/payment/payment_step/PayByPoints";
import { useSelector } from "react-redux";
import DiscountVoucher from "../../components/payment/leftside/DiscountVoucher";

export default function Addlocation() {
  const { order } = useSelector((state) => state.auth.order);
  const {local} = useSelector((state)=>state.language)

  return (
    <div className="md:mx-32 mt-20 mb-20  flex flex-col ">
      {
        local === "ar" ? 
        <div className="mt-10 flex   justify-center items-center">
        <Step title="الدفع" color="gray-300" opacity="60" number="3" />
        <div className="border-[1px] w-28 mt-5  bg-slate-500 border-gray-600 opacity-30 border-dashed w-" />
        <Step title="العنوان" color="red-500" opacity={90} number="2" />{" "}
        <div className="border-[1px]  h-[1px] mt-5 w-28 bg-red-700 border-red-600 opacity-30 border-dashed " />
        <Step title="الحساب" color="red-500" opacity={90} number="1" />
      </div>

        :
        <div className="mt-10 flex   justify-center items-center"><Step title="Account" color="red-500" opacity={90} number="1" />
      
        <div className="border-[1px] w-28 mt-5  bg-slate-500 border-gray-600 opacity-30 border-dashed w-" />
        <Step title="Adress" color="red-500" opacity={90} number="2" />{" "}
        <div className="border-[1px]  h-[1px] mt-5 w-28 bg-red-700 border-red-600 opacity-30 border-dashed " />
          <Step title="Pay" color="gray-300" opacity="60" number="3" />
      </div>
      }
      <div className="flex mt-6 flex-col md:flex-row">
        <div className="md:flex-[40%] flex flex-col ">
          <CartContent />
          {/* <DiscountVoucher /> */}
        </div>

        <div className="md:flex-[60%] mt-6 md:mt-0 space-y-5 ">
          <AddLocation href="/payment/shiping-address" />
        </div>
      </div>{" "}
    </div>
  );
}
