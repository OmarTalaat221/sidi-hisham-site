import React, { useEffect } from "react";
import Product from "../../components/payment/leftside/Product";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../redux/cartSlice";

export default function OrderContent({ items }) {
  //Get the cart items
  //Get order by id

  return (
    <div className="">
      <p className="w-[80%] mx-[10%] text-[16px] text-end font-arabicMedium mb-4 tracking-wide  text-red-600">
        محتويات الطلب
      </p>
      {items?.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-red-400 font-arabicMedium">السلة فارغة</p>
        </div>
      ) : (
        <div className="min-h-48  scrollbar-corner-rounded-xl scrollbar-thumb-gray-300 scrollbar-thin scrollbar-track-gray-100">
          {items?.map((item) => (
            <Product
              key={item.product_id}
              id={item.product_id}
              image={"https://api.sedihisham.com/" + item.product_image}
              title={item.product_name}
              price={item.quantity}
              product={item?.product}
              totalItems={item.quantity}
              quantity={item.quantity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
