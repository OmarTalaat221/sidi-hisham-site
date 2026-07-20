import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../redux/auth";
import {
  addCoupon,
  addUsedCoupon,
  clearCoupon,
  updateDiscount,
} from "../../../redux/cartSlice";
import PriceRow from "./PriceRow";
import TitleCard from "./TitleCard";

export default function DiscountVoucher() {
  const { order } = useSelector((state) => state.auth);
  const { cart, total, discount, coupons, couponValue } = useSelector(
    (state) => state.cart
  );

  const router = useRouter();
  const dispatch = useDispatch();

  //get all coupons
  const [couponss, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  const getCoupons = async (e) => {
    await axios
      .get("https://api.sedihisham.com/coupons/findall")
      .then((response) => {
        setCoupons(response.data);
        console.log("Coupons ", response.data);
      });
  };
  useEffect(() => {
    getCoupons();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (
      couponss?.find((item) => item?.coupon_code == e.target?.promo_code?.value)
    ) {
      setCouponCode(e.target?.promo_code?.value);

      alert("Copoun Is Valid");
    } else {
      alert("Wrong Copoun");
      setCouponCode(null);
      dispatch(addUsedCoupon(null));
      dispatch(updateDiscount(0));
    }
    couponss?.map((item, isx) => {
      if (
        item.coupon_code == e.target?.promo_code?.value &&
        couponss?.find(
          (item) => item?.coupon_code == e.target?.promo_code?.value
        )
      ) {
        console.log(item);
        dispatch(
          updateDiscount(
            item.type_coupon === "Percentage"
              ? ((order?.shipping_cost + total) * item.value) / 100
              : item.value
          )
        );
        dispatch(addUsedCoupon(e.target?.promo_code?.value));
      } else {
        return "";
      }
    });
  };

  const clearCpn = () => {
    dispatch(clearCoupon());
    dispatch(updateDiscount(0));
    setCouponCode("");
  };

  //Change price based on currency
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

  //coupon value
  // const [couponvalue,setCouponValue] = useState(0)

  // useEffect(()=>{
  //   // console.log(couponCode)

  //   ))
  //   // dispatch(
  //   //   createOrder({
  //   //    ...order,
  //   //     discount: discount,
  //       // subtotal: parseInt(total-discount),
  //   //     total:parseInt(total-discount)
  //   //   }))
  // },[couponCode,couponValue])

  const { local } = useSelector((state) => state.language);

  return (
    <div>
      <p
        className={`w-[80%] mx-[10%] mt-2 text-[16px]
   font-arabicMedium tracking-wide  text-red-600 mb-3
   ${local === "ar" ? "text-end" : "text-start"}
   `}
      >
        {local === "ar" ? " قسيمة الحسم" : "discount coupon"}
      </p>
      {router.pathname.startsWith('/payment/checkout') ? (
        <div>
          {/* <div className=" my-1 flex justify-center items-center rounded-md w-[78%] mx-[12%] h-10 ">
            <div className="flex-[15%] flex w-10 justify-center items-center  bg-green-600 rounded-xl h-full">
              <p className="text-white font-bold text-[20px]">%</p>
            </div>
            <div className="flex-[80%] bg-slate-100 flex justify-center items-center h-full rounded-lg mx-2">
              <input
                className="text-xs flex justify-center items-center px-5 rounded-xl font-arabicMedium w-full h-full "
                placeholder="Coupon id"
                name="couponCode"
                onChange={handleChange}
                value={couponCode}
              />
            </div>
          </div> */}
          <form
            onSubmit={handleChange}
            style={{ margin: "auto", width: "fit-content" }}
          >
            {" "}
            <input
              type="search"
              id="promo-code"
              class="promo-input"
              name="promo_code"
            />{" "}
            <button type="submit" class="btn">
              Submit
            </button>{" "}
          </form>
          {couponCode &&
          couponCode?.length &&
          couponValue &&
          couponValue.length ? (
            <button
              className="clearCoupon btn btn-danger"
              // style={{
              //   margin: '30px auto',
              //   fontSize: '18px',
              //   height: '65px',
              //   width: '180px',
              //   borderRadius: '10px',
              //   border: 'none',
              //   boxShadow: '1px 1px 0px 2px rgba(0, 0, 0, 0.3)',
              //   background: 'rgb(141, 217, 252)',
              //   cursor: 'pointer',
              //   background: "red",
              //   color: "white",
              // }}
              onClick={() => clearCpn()}
            >
              clear coupon
            </button>
          ) : null}
        </div>
      ) : (
        <div></div>
      )}

      <div className="bg-green-50 rounded-xl my-1 grid grid-cols-1  divide-y w-[76%] mx-[12%]  ">
        <PriceRow
          title="Subtototal"
          price={(Math.round(total * rate * 100) / 100).toFixed(4)}
        />
        {console.log(discount, rate)}
        <PriceRow title="Discount" price={couponValue[0]} />
        {couponValue.length !== 0 ? (
          <PriceRow
            title="Coupon value"
            price={couponValue[couponValue.length - 1] * rate}
          />
        ) : (
          ""
        )}
        <PriceRow title="Shipping cost" price={order?.shipping_cost * rate} />
        <PriceRow title="VAT" price={`${order?.vat ? order?.vat : 0}%`} />
      </div>
      <button className="w-[76%] px-10 bg-green-600 flex justify-between items-center rounded-md  mx-[12%] h-10 ">
        <p className="text-[18px] text-white font-medium opacity-90">
          Total <span className="text-sm font-normal"> (Include Tax)</span>
        </p>
        <p className="text-[18px] text-white font-bold  opacity-90">
          {(
            Math.round(
              (total * (order?.vat / 100) -
                (couponValue.length === 0 ? 0 : couponValue[0]) +
                order?.shipping_cost +
                total) *
                rate *
                100
            ) / 100
          ).toFixed(4)}
        </p>
      </button>
    </div>
  );
}
