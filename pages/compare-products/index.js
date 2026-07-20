import React from "react";
import Table from "../../components/compare_products/Table";
import Breadcrumb from "../../components/contactus/leftside/BreadCrumb";
import OptimizedImage from "@/components/common/OptimizedImage";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import grots from "../../public/images/slide1.png";

const items = [
  { id: 1, title: grots },
  { id: 2, title: grots },
  { id: 3, title: grots },
];

export default function index() {
  return (
    <div className="mt-24 w-[90%] mx-[5%]">
      <div className="flex my-6 justify-end flex-col items-end ml-[10%]">
        <Breadcrumb step="مقارنة المنتجات" />{" "}
        <div
          scope="col"
          className=" text-red-500   px-6 py-[18px] text-sm font-bold flex justify-end items-center  uppercase "
        >
          تفاصيل المنتجات
        </div>
      </div>

      {/* <Table /> */}
      <div className=" mt-3">
        {" "}
        <Carousel preventDefaultTouchmoveEvent={true} enableMouseSwipe={false}  className="text-red-600 ">
          {items.map((item) => (
            <div key={item.id} className="flex ">
              {/* <OptimizedImage  alt="صورة سيدي هشام" width={500} height={500} src={grots} /> */}
              <Table />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
