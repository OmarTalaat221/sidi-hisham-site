import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { calculateTotals } from "../../redux/cartSlice";

export default function TotalPriceCard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  //Get the cart items
  const { total, cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart]);

  //Change price
  const { currency, conversion } = useSelector((state) => state.language);
  const [rate, setRate] = useState(1);
  // const [prodPrice,setProdPrice]=usState(product.price)
  useEffect(() => {
    if (currency !== "SYP") {
      setRate(
        conversion.find((conversion) => conversion.to_currency === currency)
          .rate
      );
    } else {
      setRate(1);
    }
    //  console.log("rate :"+JSON.stringify(conversion.find((conversion)=>conversion.to_currency === currency)))
  }, [currency]);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="flex  bg-white h-24 z-50 fixed bottom-5 left-0 right-0 md:mx-32 rounded-full border-2 border-green-600">
      <div
        onClick={() => router.push("/categories")}
        className="flex
      
        md:flex-[20%] flex-[25%] justify-center items-center"
      >
        <div className="rounded-full text-xs px-2 p-2 text-center font-arabicMedium cursor-pointer h-6 py-5 tracking-wide hover:opacity-100 opacity-80 text-white flex bg-[#D8AA6B] justify-center items-center  md:px-5 ">
          {local === "ar" ? " العودة للمنتجات" : "Back to products"}
        </div>
      </div>
      <div className="flex flex-col md:flex-row  md:flex-[60%] flex-[50] justify-center items-center">
        <p
          className={`md:text-xl text-sm  ${
            local === "ar" ? "mr-5 " : "order-2 ml-5"
          } opacity-80`}
        >
          <strong>
            <span className="md:text-3xl text-sm">
              {(Math.round(total * rate * 100) / 100).toFixed(4)}
            </span>{" "}
            {currency}
          </strong>
        </p>
        <p className="tracking-tight text-xs md:text-[18px] px-2 font-arabicMedium  cursor-pointer opacity-70 ">
          {local === "ar" ? " المجموع الكلي" : "Total price"}
        </p>
      </div>
      <div className="flex md:flex-[20%] flex-[25%] justify-center items-center">
        <div
          onClick={() =>
            !isLoggedIn
              ? router.push("/payment")
              : router.push("/payment/shiping-address")
          }
          className="flex
      
      flex-[20%] justify-center items-center"
        >
          <div className="rounded-full text-xs px-2  text-center font-arabicMedium  cursor-pointer  h-6 py-5 tracking-wide hover:opacity-100 opacity-80 text-white flex bg-[#007530] justify-center items-center  md:px-5 ">
            {local === "ar" ? " اتمام عملية الشراء" : "Complete the purchase"}
          </div>
        </div>
      </div>
    </div>
  );
}
