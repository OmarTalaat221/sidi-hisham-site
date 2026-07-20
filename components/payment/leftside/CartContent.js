import React, { useEffect, useState } from "react";
import Product from "./Product";
import ProductImage from "../../../public/images/birgleOneBag.png";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../../redux/cartSlice";
import CartProduct from "../../cart/Product";
import TotalPriceCard from "../../cart/TotalPriceCard";
import DiscountVoucher from "./DiscountVoucher";
export default function CartContent() {
  //Get the cart items
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart]);

  const { currency, conversion } = useSelector((state) => state.language);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    // Create a variable for the complex expression
    const targetConversion = conversion.find(
      (conv) => conv.to_currency === currency
    );

    if (currency !== "SYP") {
      setRate(targetConversion.rate);
    } else {
      setRate(1);
    }
  }, [currency, conversion]);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="flex flex-col ">
      <p
        className={`w-full text-[16px]
        font-arabicMedium tracking-wide  text-red-600 mb-3
        ${local === "ar" ? "text-end" : "text-start"}
        `}
      >
        {local === "ar" ? " محتويات السلة" : "Cart Content"}
      </p>
      {cart.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-red-400 font-arabicMedium">
            {local === "ar" ? "فارغة السلة" : "Cart is empty"}
          </p>
        </div>
      ) : (
        //  < className={`${1>0?"max-h-36 flex flex-col max-w-[40] scrollbar-corner-rounded-xl scrollbar-thumb-gray-300 scrollbar-thin scrollbar-track-gray-100":""}`}>

        <body className=" flex flex-col max-w-[40] scrollbar-corner-rounded-xl scrollbar-thumb-gray-300 scrollbar-thin scrollbar-track-gray-100">
          {" "}
          <div className="md:h-[60vh] h-[60vh] overflow-y-scroll">
            {cart?.map((item) => (
              <CartProduct
                key={item.id}
                currency={currency}
                id={item.product_id}
                image={"https://api.sedihisham.com/" + item.product_image}
                title={
                  item?.product_name?.filter((item) =>
                    local == "ar" ? item?.local == "ar" : item?.local == "en"
                  )[0]?.nameProduct
                }
                price={(Math.round(item.price * rate * 100) / 100).toFixed(4)}
                quantity={item.quantity}
              />
            ))}
          </div>
          {/* <TotalPriceCard /> */}
        </body>
      )}
    </div>
  );
}
