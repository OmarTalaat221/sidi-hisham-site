import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../../components/orders/BreadCrumb";
import OrderContent from "../../../components/orders/OrderContent";
import OrderInfo from "../../../components/orders/OrderInfo";
import Title from "../../../components/orders/Title";
import CartContent from "../../../components/payment/leftside/CartContent";
import PriceRow from "../../../components/payment/leftside/PriceRow";

export default function OrderDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState({});

  const fetchOrder = async () => {
    if (id === undefined) {
      const { id } = router.query;
    } else {
      const response = await axios.get(
        `https://api.sedihisham.com/orders/findone/${id}`
      );
      setOrder(response.data);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  useEffect(() => {
    fetchOrder();
  }, [id]);

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

  return (
    <div className="flex flex-col md:flex-row md:w-[90%] md:mx-[5%] mt-24">
      <div className="w-full flex-1 md:flex-[60%]">
        <div className="  mb-20 flex flex-col ">
          <Breadcrumb visible={true} />
          <div>
            <div className="mx-[5%] mt-2">
              <Title text="Order Details" />
            </div>
            <OrderInfo title="Order ID" value={order.id} />
            <OrderInfo
              title="Order Date"
              value={order.CreatedAt?.slice(0, 10)}
            />
            <OrderInfo
              title="Order Status"
              value={order.order_status}
              color="green-500"
              font="bold"
            />
            <OrderInfo title="Payment Method" value={order.payment_way} />
          </div>{" "}
          <div>
            <div className="mx-[5%] mt-2">
              <Title text="Customer Details" />
            </div>
            <OrderInfo
              title="Request Recipient's Name"
              value={order.receiver_name}
            />
            <OrderInfo
              title="Recipient's Mobile Number"
              value={order.receiver_phone}
            />
            <OrderInfo
              title="Shipping Address"
              value={order.shipping_add}
              color="green-500"
              font="bold"
            />
            <OrderInfo
              title="Customer Comment"
              value={order.customer_comment}
            />
          </div>
          <div>
            <div className="mx-[5%] mt-2">
              <Title text="Option" />
            </div>
            <OrderInfo title="Reward Points" value={order.reward_points} />
            <OrderInfo
              title="Used Coupon"
              value={order.used_coupon}
              color="green-500"
              font="bold"
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-col w-full   md:flex-[40%]">
        <OrderContent items={order?.order_items} />
        <div className="bg-green-50 rounded-xl my-1 grid grid-cols-1  divide-y w-[76%] mx-[12%]  ">
          <PriceRow
            title="Subtototal"
            price={(Math.round(order.subtotal * rate * 100) / 100).toFixed(4)}
          />
          <PriceRow title="Discount" price={order.discount_value * rate} />
          <PriceRow title="Shipping cost" price={order.shipping_cost * rate} />

          <PriceRow title="VAT" price={order.vat + "%"} />
        </div>
        <button className="w-[76%] px-10 bg-green-600 flex justify-between items-center rounded-md  mx-[12%] h-10 ">
          <p className="text-[18px] text-white font-medium opacity-90">
            Total <span className="text-sm font-normal"> (Include Tax)</span>
          </p>
          <p className="text-[18px] text-white font-bold  opacity-90">
            {(Math.round(order.total * rate * 100) / 100).toFixed(4)}
          </p>
        </button>
      </div>
    </div>
  );
}
