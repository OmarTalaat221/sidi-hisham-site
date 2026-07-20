import React from "react";
// import SideBar from "../components/SideBar";

import {
  faCircle,
  faArrowDown,
  faArrowUp,
  faUser,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
// import { faBell, faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import columns from "./orderColumns";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../../redux/message";
// import data from "./orderData";

function Orders() {
  const gridStyle = {
    minHeight: 560,
    border: "none",
    fontSize: "13px",
    fontWeight: "200",
  };
  const showCellBorders = false;
  const showZebraRows = false;

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  // alert("User :"+JSON.stringify(user))

  //Fetch order by customer id
  const [orders, setOrders] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const fetchOrders = async () => {
    const response = await axios
      .get(
        `https://api.sedihisham.com/orders/findone/customer/${user?.customer_id}`
      )
      .then((response) => {
        const data = response.data;
        let totalP = 0;
        data?.map((item) => {
          totalP += item.reward_points;
        });
        setTotalPoints(totalP);
        if (data.length !== orders.length) {
          setOrders(data);
        }
      })
      .catch((error) => {
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          )
        );
      });
  };

  var data = [];
  useEffect(() => {
    fetchOrders();
  }, []);

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    data = [
      ...data,
      {
        id: (
          <div className="text-[14px]  font-[300]  text-[#0388CC]">
            {order.id}{" "}
          </div>
        ),
        phone: (
          <div className="text-[14px] font-[600] underline text-[#0F3F62]">
            {order.receiver_phone}
          </div>
        ),
        email: (
          <div className="text-[14px] font-[300] underline text-[#0388CC]">
            {order.receiver_name}
          </div>
        ),
        products: <div className="font-[400]">{order.order_items.length}</div>,
        adress: <div className="font-[400]">{order.shipping_add} </div>,
        time: (
          <div className="font-[400]">{order.CreatedAt.slice(11, 19)} </div>
        ),
        date: <div className="font-[400]">{order.CreatedAt.slice(0, 10)}</div>,
        total: (
          <div className="text-[14px] font-[600] text-[#000]">
            {(Math.round(order.total * rate * 100) / 100).toFixed(6)}
          </div>
        ),
        points: <div className="font-[400]">{order.reward_points}</div>,
        status: order.order_status,
        view: (
          <Link href={`/orders/orderDetails/${order.id}`}>
            <div className="text-[14px] bg-[#0388CC] cursor-pointer rounded w-fit px-3 py-[2px] text-[white] text-center">
              View
            </div>
          </Link>
        ),
      },
    ];
  }

  const { message } = useSelector((state) => state.message);
  const { local } = useSelector((state) => state.language);
  // const {customer_id} = useSelector((state) => state.auth.user)

  //   const [userPoints,setPoints] = useState(0)
  //   const getCustomerData = async ()=>{
  //     await axios.get("https://api.sedihisham.com/users/customer/"+user?.customer_id).then((res)=>{
  //       setPoints(res?.data.points);
  //       // console.log(res?.data.points)
  //     }).catch((err)=>{
  //       console.log("error")
  //     })
  // }

  //   useEffect(()=>{
  //     getCustomerData()
  //   },[])

  return (
    <div className="md:w-[96%] w-full text-[17px] m-auto mt-6">
      <div
        className={
          local === "ar"
            ? "justify-center flex font-medium"
            : "justify-center flex  font-medium"
        }
      >
        <p>
          {local === "ar" ? "مجموع النقط" : "Total points"} : {totalPoints}{" "}
        </p>
      </div>
      <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-700">
        {message && (
          <div className={"text-red-500"} role="alert">
            {message}
          </div>
        )}
      </p>
      <div className="m-auto mt-6 flex">
        <div className="w-full flex flex-col ml-6 text-[#033362] font-semibold">
          <div className="bg-[#d98a8a] grow mt-4 rounded-xl shadow-[0px_0px_16px_rgb(210,215,211)]">
            <div className=" p-3 w-full">
              <ReactDataGrid
                idProperty="id"
                columns={columns}
                showCellBorders={showCellBorders}
                showZebraRows={showZebraRows}
                style={gridStyle}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
