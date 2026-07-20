import { ChatIcon, PlusCircleIcon, TruckIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../redux/auth";
import { calculateTotals } from "../../../redux/cartSlice";
import { clearMessage, setMessage } from "../../../redux/message";
import Address from "./Address";
import ChooseShipping from "./ChooseShipping";

export default function Index() {
  const { user, order } = useSelector((state) => state.auth);
  const { cart, total, points, discount } = useSelector((state) => state.cart);
  const userLocations = useSelector((state) => state?.auth?.userLocations);
  const [comment, setComment] = useState("");
  const [location, setLocations] = useState([]);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(calculateTotals());
  }, [dispatch]);

  // Get user locations and choose from them
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const [checked, setChecked] = useState(0);
  const handleChangeLocation = (e) => {
    setChecked(e.target.value);
  };

  // console.log(total+userLocations[checked]?.shipmentsFee)

  const router = useRouter();
  // Get preferences
  const [vat, setVat] = useState("");
  const getVat = async (e) => {
    await axios
      .get("https://api.sedihisham.com/settings/findall")
      .then((res) => {
        setVat(res.data);
        // console.log("Vat :"+JSON.stringify(res.data))
      });
  };

  useEffect(() => {
    getVat();
  }, []);

  useEffect(() => {
    console.log(userLocations);
    if (userLocations && userLocations?.length && Array.isArray(userLocations))
      setLocations(userLocations);
  }, [userLocations]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!comment) {
      dispatch(setMessage("Comment or Total price is empty"));
    } else if (cart.length === 0) {
      dispatch(setMessage("Your cart should not be empty"));
    } else if (
      userLocations.length === 0 ||
      userLocations.shipmentsFee === (undefined || null)
    ) {
      dispatch(setMessage("Please choose your region"));
    } else if (total === null) {
      dispatch(setMessage("Total price should not be empty"));
    } else {
      dispatch(
        createOrder({
          customer_id: user !== null ? user.customer_id : null,
          phone_number_recipent: userLocations[checked]?.phone_number_recipent,
          request_recipent_name: userLocations[checked]?.request_recipent_name,
          customer_comment: comment,
          shipping_addres:
            userLocations[checked]?.country +
            " " +
            userLocations[checked]?.region,
          subtotal: parseInt(total),
          total: parseInt(total),
          total_price: parseInt(total),
          shipping_cost: parseInt(userLocations[checked]?.shipmentsFee),
          discount: discount,
          vat: vat.vat ? vat.vat_value : 0,
          order_items: cart,
          reward_points: points,
        })
      );
      router.push("/payment/checkout");
    }
  };

  // useEffect(()=>{
  //   dispatch(
  //       createOrder({
  //        ...order,
  //         discount: discount,
  //         subtotal: parseInt(total-discount),
  //         total:parseInt(total-discount+userLocations[checked]?.shipmentsFee)
  //       }))
  // },[discount])

  const { local } = useSelector((state) => state.language);

  return (
    <div className="ml-4 mr-12">
      {/* Header */}
      <div className="flex justify-between  py-2.5 rounded-xl bg-gray-100">
        <div className={`${local === "en" ? "order-2" : ""}`}>
          <div className="flex justify-end  items-center ml-2 mt-[2px] space-x-2">
            <Link href="/payment/addLocation">
              <p className="text-[#000000] cursor-pointer opacity-80 text-xs font-arabicLight ">
                {local === "ar" ? "اضافة عنوان جديد" : "Add new location"}
              </p>
            </Link>
            <div className="rounded-full cursor-pointer bg-[#A7D769]">
              <Link href="/payment/addLocation">
                <PlusCircleIcon color="white" width={20} height={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex">
          <p className=" font-arabicLight  text-[#D40017] tracking-wide">
            {local === "en"
              ? "Payment and receipt address"
              : " عنوان الدفع والإيصال"}
          </p>
          <div className="text-[#D8AA6B] ml-2  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
        </div>
      </div>
      {/* Address */}
      <div className="flex flex-col space-y-2 h-[30vh] overflow-y-scroll px-3">
        {userLocations && userLocations?.length && Array.isArray(userLocations)
          ? location?.map((location, index) => (
              <div key={index}>
                <Address
                  id={index}
                  phoneNumberRecipent={location.phone_number_recipent}
                  region={location.region}
                  shipmentsFee={location.shipmentsFee}
                  firstName={location.country}
                  name={location.country}
                  checked={checked === index}
                  handleChange={() => setChecked(index)}
                  value={index}
                />
              </div>
            ))
          : null}
      </div>
      {/* <div className=" mt-8"> */}
      <div className="w-full mr-2">
        <div
          className={
            local === "ar"
              ? "flex justify-end  py-2.5 rounded-xl bg-gray-100"
              : "flex justify-start  py-2.5 rounded-xl bg-gray-100"
          }
        >
          <p className=" font-arabicLight text-red-600 tracking-wide">
            {local === "ar" ? " أضف تعليق على الطلب" : "Add a comment "}
          </p>
          <div className="text-[#D8AA6B] mx-3 ">
            <ChatIcon width={20} height={20} />
          </div>
        </div>{" "}
        <div className="rounded-xl bg-white shadow-lg h-16 mt-2">
          <textarea
            type="text"
            className={` font-arabicLight mx-1 w-full ${
              local === "ar" ? "pr-8 text-end" : "pl-4 text-start"
            }`}
            rows="2"
            placeholder={
              local === "ar" ? " أضف تعليق على الطلب" : "Add a comment "
            }
            name="comment"
            value={comment}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* <div className="flex-[60%] flex flex-col">
          <div className="flex justify-end  py-2.5 rounded-xl bg-gray-100">
            <p className=" font-arabicLight text-red-600 tracking-wide">
              اختر طريقة الدفع
            </p>
            <div className="text-[#D8AA6B] mx-3 ">
              {" "}
              <TruckIcon width={20} height={20} />
            </div>
          </div>
          <ChooseShipping label="cash_on_delivery" name="i" value="D" />
        </div> */}
      {/* </div>{" "} */}
      {message && (
        <div
          className="text-red-500 my-4 flex justify-center items-center"
          role="alert"
        >
          {message}
        </div>
      )}
      <div className="mt-6 ">
        {/* <Link href={href}> */}
        <button
          type="submit"
          onClick={onSubmit}
          className=" w-full font-arabicMedium flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#007530]  hover:bg-green-600 "
        >
          {local === "ar" ? "تثبيت العنوان" : "Set location"}
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
