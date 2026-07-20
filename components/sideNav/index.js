import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoDocumentText } from "react-icons/io5";
import { RiShoppingBag3Fill, RiWhatsappLine } from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";
import { useWidth } from "../../util/useWidth";

const SideNav = () => {
  const { local } = useSelector((state) => state.language);
  const router = useRouter();
  const { cart } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorites);
  console.log("favorites "+favorites?.length)
  const [sliderImages, setSliderImages] = useState([]);
  const getSliderImages = async (e) => {
    await axios
      .get("https://api.sedihisham.com/pages/getall/home")
      .then((response) => {
        // const slideImages = response?.data?.filter((item)=>item.categoryImage === "catalog")
        setSliderImages(response.data);
        // console.log("slideImages : "+JSON.stringify(slideImages))
      });
  };

  useEffect(() => {
    getSliderImages();
  }, []);
  const { isMobile } = useWidth();
  const [open, setOpen] = useState(false);

  return (
    <div className="sideBar">
      {isMobile ? (
        <>
          <p
            className="closeOpenSideNav"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          >
            <b>
              {" "}
              {!open ? (
                <img
                  src="https://res.cloudinary.com/duovxefh6/image/upload/v1721480460/sidebar_1_eqvmry.png"
                  alt=""
                  width={40}
                  height={40}
                />
              ) : (
                <img
                src="https://res.cloudinary.com/duovxefh6/image/upload/v1721480459/sidebar_ncfllz.png"
                alt=""
                width={40}
                height={40}
              />
              )}
            </b>
          </p>
        </>
      ) : null}{" "}
      {open && isMobile ? (
        <div className="sideBar">
          <Link
            href={`https://api.sedihisham.com/${
              sliderImages?.find((item) => item.categoryImage === "catalog")
                ?.path_image
            }`}
            target="_blanck"

            // href={`https://api.sedihisham.com/${
            //   sliderImages1?.find((item) => item.categoryImage === "catalog")
            //     ?.path_image
            // }`}
          >
            <button
              className={local === "en" ? "catalogBtnEn" : "catalogBtnAr"}
            >
              <div className="iconbtn">
                {/* <img src="/images/cart.svg" alt="" /> */}
                <IoDocumentText className="w-7 h-7 text-white" />
              </div>
            </button>
          </Link>
          <Link href="/categories">
            <button
              className={local === "en" ? "productsBtnEn" : "productsBtnAr"}
            >
             
              <div className="iconbtn">
                <RiShoppingBag3Fill className="w-7 h-7 text-white" />
              </div>
            </button>
          </Link>
          <Link href="/cart">
            <button className={local === "en" ? "cartBtnEn" : "cartBtnAr"}>
            <sup className="text-xs text-white absolute top-0 right-0 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center z-[100] -translate-x-1 -translate-y-1 !text-[13px] font-bold !leading-none">{cart?.length}</sup>
              <div className="iconbtn">
                <img
                  src="https://res.cloudinary.com/duovxefh6/image/upload/v1716104895/cart_xvhxpz.svg"
                  alt=""
                />
              </div>
            </button>
          </Link> 
          <Link href="/favori">
            <button className={local === "en" ? "heartBtnEn" : "heartBtnAr"}>
                  <sup className="text-xs text-white absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center z-[100] -translate-x-1 -translate-y-1 !text-[13px] font-bold !leading-none">{favorites?.length}</sup>
              <div className="iconbtn">
                <img
                  src="https://res.cloudinary.com/duovxefh6/image/upload/v1716104895/hart_pkfqho.svg"
                  alt=""
                />
              </div>
            </button>
          </Link>
          {router.pathname === "/contact" ? (
            <Link href="https://api.whatsapp.com/send?phone=%2B963942000971&app=facebook&entry_point=page_cta&fbclid=IwAR23B41qgd7-Z89fxmv0wHhvHxM7dCCrp3qBZgzqyCPNUUaWq0zMHSC_kAQ">
              <button
                className={local === "en" ? "whatsappBtnEn" : "whatsappBtnAr"}
              >
                <div className="iconbtn">
                  <RiWhatsappLine className="w-7 h-7 text-white" />
                </div>
              </button>
            </Link>
          ) : (
            <Link href="/contact">
              <button className={local === "en" ? "chatBtnEn" : "chatBtnAr"}>
                <div className="iconbtn">
                  <img
                    src="https://res.cloudinary.com/duovxefh6/image/upload/v1716104943/chat_punzue.svg"
                    alt=""
                  />
                </div>
              </button>
            </Link>
          )}
        </div>
      ) : !isMobile ? (
        <div className="sideBar">
          <Link
            href={`https://api.sedihisham.com/${
              sliderImages?.find((item) => item.categoryImage === "catalog")
                ?.path_image
            }`}
            target="_blanck"

            // href={`https://api.sedihisham.com/${
            //   sliderImages1?.find((item) => item.categoryImage === "catalog")
            //     ?.path_image
            // }`}
          >
            <button
              className={local === "en" ? "catalogBtnEn" : "catalogBtnAr"}
            >
              <div className="iconbtn">
                {/* <img src="/images/cart.svg" alt="" /> */}
                <IoDocumentText className="w-7 h-7 text-white" />
              </div>
            </button>
          </Link>
          <Link href="/categories">
            <button
              className={local === "en" ? "productsBtnEn" : "productsBtnAr"}
            >
             
              <div className="iconbtn">
                <RiShoppingBag3Fill className="w-7 h-7 text-white" />
              </div>
            </button>
          </Link>
          <Link href="/cart">
            <button className={local === "en" ? "cartBtnEn" : "cartBtnAr"}>
              <sup className="text-xs text-white absolute top-0 right-0 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center z-[100] -translate-x-1 -translate-y-1 !text-[13px] font-bold !leading-none">{cart?.length}</sup> 
              <div className="iconbtn">
                <img
                  src="https://res.cloudinary.com/duovxefh6/image/upload/v1716104895/cart_xvhxpz.svg"
                  alt=""
                />
              </div>
            </button>
          </Link>
          <Link href="/favori">
            <button className={local === "en" ? "heartBtnEn" : "heartBtnAr"}>
                <sup className="text-xs text-white absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center z-[100] -translate-x-1 -translate-y-1 !text-[13px] font-bold !leading-none">{favorites?.length}</sup>
              <div className="iconbtn">
                <img
                  src="https://res.cloudinary.com/duovxefh6/image/upload/v1716104895/hart_pkfqho.svg"
                  alt=""
                />
              </div>
            </button>
          </Link>
          {router.pathname === "/contact" ? (
            <Link href="https://api.whatsapp.com/send?phone=%2B963942000971&app=facebook&entry_point=page_cta&fbclid=IwAR23B41qgd7-Z89fxmv0wHhvHxM7dCCrp3qBZgzqyCPNUUaWq0zMHSC_kAQ">
              <button
                className={local === "en" ? "whatsappBtnEn" : "whatsappBtnAr"}
              >
                <div className="iconbtn">
                  <RiWhatsappLine className="w-7 h-7 text-white" />
                </div>
              </button>
            </Link>
          ) : (
            <Link href="/contact">
              <button className={local === "en" ? "chatBtnEn" : "chatBtnAr"}>
                <div className="iconbtn">
                  <img
                    src="https://res.cloudinary.com/duovxefh6/image/upload/v1716104943/chat_punzue.svg"
                    alt=""
                  />
                </div>
              </button>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SideNav;
