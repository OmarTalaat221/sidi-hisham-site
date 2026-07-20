import React, { useEffect, useState } from "react";
import grots from "../../../public/images/grots.png";
import categoryImage from "../../../public/images/cat2.png";
import OptimizedImage from "@/components/common/OptimizedImage";
import CateCarousel from "../../../components/home/section3/CarouselCateg";
import Breadcrumb from "../../../components/categories/BreadCrumb";
import pathHome from "../../../public/images/pathHome.png";
import Sort from "../../../components/dropdowns/sort/SortProducts";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import ProductCardCate from "../../../components/home/section3/ProductCardCate";
import ProductCard from "../../../components/home/section3/ProductCard";

export default function ProductContent() {
  const router = useRouter();
  const { id } = router.query;

  //Get Products By Category id
  const [products, setProducts] = useState([]);
  const getRelatedProducts = async () => {
    if (id === undefined) {
      const { id } = router.query;
    } else {
      await axios
        .get(`https://api.sedihisham.com/products/allProductsByCategory/${id}`)
        .then((response) => {
          setProducts(response.data);
          // console.log(
          //   "Products of the category :" + JSON.stringify(response.data)
          // );
        });
    }
  };

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  //Get Current Category INfo
  const [categoryInfo, setCategoryInfo] = useState();
  const getCategoryInfo = async () => {
    if (id === undefined) {
      const { id } = router.query;
    } else {
      await axios
        .get("https://api.sedihisham.com/categories/" + id)
        .then((response) => {
          setCategoryInfo(response.data);
          // console.log(
          //   "category info :" +
          //     JSON.stringify(response.data.category_translations)
          // );
        });
    }
  };
  useEffect(() => {
    getCategoryInfo();
    getRelatedProducts();
  }, [id, router.query]);
  useEffect(() => {
    getCategoryInfo();
    getRelatedProducts();
  }, []);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="flex flex-col ">
      {" "}
      <div
        className={`flex my-6 w-[80%] mx-[10%] mt-24 ${
          local === "ar" ? "justify-end items-end" : "justify-start items-start"
        }`}
      >
        <Breadcrumb />
      </div>
      <div className="flex md:flex-row flex-col   w-[80%] mx-[10%]">
        <div className="space-y-3  flex-col flex flex-[50%] justify-center items-center ">
          <div className="flex flex-col  space-y-1">
            <div className="mr-2">
              <OptimizedImage  alt="صورة سيدي هشام" 
                loader={GraphCMSImageLoader}
                width={120}
                height={120}
                src={"https://api.sedihisham.com/" + categoryInfo?.icon_url}
              />
            </div>

            <p className="font-arabicBold text-center">
              {parse(
                String(
                  categoryInfo?.category_translations?.find(
                    (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                  )?.name || categoryInfo?.category_translations?.[0]?.name || ""
                )
              )}
            </p>
            <p className="max-w-[190px] font-arabicMedium text-center text-sm h-auto">
              {/* {parse(categoryInfo !== undefined ? categoryInfo.category_translations?.find(
                                  (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                                )?.description : "null"
                              )} */}
              {/* {categoryInfo?.category_translations[1]?.description} */}
            </p>
            <p className="max-w-[190px] font-arabicLight text-center text-sm h-auto">
              {/* {categoryInfo?.category_translations[1]?.description} */}
            </p>
            <div className="flex justify-start"> </div>
          </div>
        </div>
        <div className="flex flex-[50%] justify-center items-center ">
          <OptimizedImage loader={GraphCMSImageLoader}
            alt="h"
            height={300}
            width={300}
            src={"https://api.sedihisham.com/" + categoryInfo?.image_url}
          />
        </div>
      </div>
      {/* <div className="relative rotate-180 object-cover opacity-50 w-full h-full rounded-xl">
        <OptimizedImage  alt="صورة سيدي هشام" src={pathHome} />
      </div> */}
      <div className="flex justify-between mt-10  w-[70%] mx-[15%]">
        <div className={`${local === "ar" ? "order-1" : "order-2"}`}>
          <Sort />
        </div>
        <div
          className={`  text-[18px] ${
            local === "ar" ? "font-arabicBold order-2" : "order-1 font-medium"
          }`}
        >
          {local === "ar" ? "المنتجات" : "Products"}
        </div>
      </div>
      {/* <div className="flex justify-center items-center  "> */}
      <div className="carousel-container carousalDetails carousalProducts  relative flex overflow-hidden gap-1 scroll-smooth snap-x snap-mandatory touch-pan-x z-0">
        {products?.map((product, index) => (
          <div
            key={index}
            className="carousel-item text-center relative h-full w-full z-4 !pt-[17rem] mx-1  snap-start"
          >
            <ProductCard
              // key={index}
              product={product}
              product_image={
                "https://api.sedihisham.com/" +
                product.product_images[0]?.image_url
              }
              product_id={product.id}
              translations={product.product_translations}
              price={product.price}
              order_number="1"
              desc={parse(
                String(
                  product.product_translations?.find(
                    (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                  )?.description || product.product_translations?.[0]?.description || ""
                )
              )}
              product_name={
                product.product_translations?.find(
                  (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                )?.nameProduct || product.product_translations?.[0]?.nameProduct || ""
              }
            />
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
