import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/cart/BreadCrumb";
import CartProduct from "../../components/cart/Product";
import TotalPriceCard from "../../components/cart/TotalPriceCard";

export default function Cart() {
  // Get the cart items
  const cart = useSelector((state) => state.cart);

  // Change price
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
    <div className="md:mt-24 md:mx-32">
      <div
        className={`flex ${
          local === "ar" ? "justify-end md:mr-4" : "justify-start md:ml-8"
        }  mt-10`}
      >
        <Breadcrumb />
      </div>
      <div className="md:h-[60vh] h-[60vh] overflow-y-scroll">
        {cart?.cart?.map((item) => (
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
      <TotalPriceCard />
    </div>
  );
}
