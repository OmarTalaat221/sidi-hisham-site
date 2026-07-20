import React, { useEffect, useState } from "react";
import CartContent from "../../components/payment/leftside/CartContent";
import PriceRow from "../../components/payment/leftside/PriceRow";
import Product from "../../components/payment/leftside/Product";
import TitleCard from "../../components/payment/leftside/TitleCard";
import Step from "../../components/payment/Step";
import Login from "../../components/login";
import SEO from '@/components/SEO';
import SignUp from "../../components/signup/SignUp";
import AddLocation from "../../components/payment/AddLocation";
import Title from "../../components/payment/payment_step/Title";
import PaymentTypeTitle from "../../components/payment/payment_step/PaymentTypeTitle";
import BankTransfer from "../../components/payment/payment_step/BankTransfer";
import DebitCard from "../../components/payment/payment_step/DebitCard";
import PayByPoints from "../../components/payment/payment_step/PayByPoints";
import ShippingAddress from "../../components/payment/shipping-address";
import DiscountVoucher from "../../components/payment/leftside/DiscountVoucher";
import { useSelector } from "react-redux";

export default function Index() {
  const [isLoginSelected, setIsLoginSelected] = useState(false);
  const [paymentType, setPaymentType] = useState("D");
  const a = isLoginSelected;

  const handleChange = (event) => {
    setPaymentType(event.target.value);
  };

  useEffect(() => {
    a === isLoginSelected;
  }, [isLoginSelected]);
  const {local} = useSelector((state)=>state.language)

  return (
    <div className=" mt-20 mb-20  flex flex-col md:mx-24">
       <SEO 
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />
     {
      local === "ar"  ? 
      <div className="mt-10 flex   justify-center items-center">
      <Step title={local === "ar" ? "الدفع" : "Pay" } color="gray-300" opacity="60" number="3" />
      <div className="border-[1px] w-28 mt-5  bg-slate-500 border-gray-600 opacity-30 border-dashed w-" />
      <Step title={local === "ar" ? "العنوان" : "Address" } color="gray-300" opacity="60" number="2" />{" "}
      <div className="border-[1px]  h-[1px] mt-5 w-28 bg-slate-500 border-gray-600 opacity-30 border-dashed " />
      <Step title={local === "ar" ? "الحساب": "Account" } color="red-500" opacity={90} number="1" />
    </div>
      :
      <div className="mt-10 flex   justify-center items-center">
        <Step title={local === "ar" ? "الحساب": "Account" } color="red-500" opacity={90} number="1" />
      
      <div className="border-[1px] w-28 mt-5  bg-slate-500 border-gray-600 opacity-30 border-dashed w-" />
      <Step title={local === "ar" ? "العنوان" : "Address" } color="gray-300" opacity="60" number="2" />{" "}
      <div className="border-[1px]  h-[1px] mt-5 w-28 bg-slate-500 border-gray-600 opacity-30 border-dashed " />
      <Step title={local === "ar" ? "الدفع" : "Pay" } color="gray-300" opacity="60" number="3" />
    </div>
     }
      <div className="flex flex-col md:flex-row mt-6 ">
        <div className="flex-[40%]  flex flex-col">
          <CartContent />
          <div>
           {/* <DiscountVoucher /> */}
          </div>
        </div>
        <div className="flex-[60%] md:mt-0 mt-10 space-y-5 ">
          {/* Step 1 : lOGIN/SIGNUP */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsLoginSelected(true)}
              className={`text-[16px]  cursor-pointer  text-black 
                ${a ? "font-arabicMedium" : "font-arabicMedium opacity-25"} 
                `}
            >
             {local === "ar" ? " تسجيل جديد" : "Create Account"}
            </button>{" "}
            <p className="text-lg opacity-25  font-semibold mx-5 ">|</p>
            <button
              onClick={() => setIsLoginSelected(false)}
              className={`text-[16px]  cursor-pointer  text-black 
                ${a ? "font-arabicMedium opacity-25" : "font-arabicMedium "} 
                `}
            >
               {local === "ar" ? " تسجيل الدخول" : "Login"}
             
            </button>
          </div>
          {a ? (
             <div className="w-[80%]  mx-[10%]">
            <SignUp />
            </div>
          ) : (
            <div className="w-[80%]  mx-[10%]">
              <Login toPage="/payment/otp" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
