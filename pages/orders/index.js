import React from "react";
import Breadcrumb from "../../components/orders/BreadCrumb";
import Orders from "../../components/orders/Orders";

export default function index() {
  return (
    <div className="w-[94%] mt-24 mb-20 flex flex-col mx-[3%]">
      <Breadcrumb />
      <Orders />
    </div>
  );
}
