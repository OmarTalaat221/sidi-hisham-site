/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SEO from '@/components/SEO';
import React, { useEffect, useState } from "react";

import axios from "axios";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../../styles/pages/Products.module.css";
import { useWidth } from "../../util/useWidth";

export default function Index() {
  const router = useRouter();

  const [cooksCategories, setCooksCategories] = useState([]);

  const getCategoriesData = async (e) => {
    await axios
      .get("https://api.sedihisham.com/cooks-categories/findall")
      .then((response) => {
        setCooksCategories(response.data);
        // console.log("cooks :" + JSON.stringify(response.data));
      });
  };

  useEffect(() => {
    getCategoriesData();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [cooksCategories]);

  useEffect(() => {
    if (cooksCategories.length > 0) {
      const categorydiv = document.querySelectorAll(".categorydiv");

      categorydiv.forEach((div) => {
        gsap.to(div.getElementsByClassName("grots")[0], {
          scale: 0.9,
          rotation: 0,
          duration: 1,
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: div,
            // markers: true,
            scrub: 3,
            start: "top bottom",
            end: "20% center",
          },
        });
        gsap.to(div.getElementsByClassName("imgRight")[0], {
          scale: 0.9,
          rotation: 0,
          duration: 1,
          x: 0,
          y: 0,
          scrollTrigger: {
            trigger: div,
            // markers:true,
            scrub: 3,
            start: "top bottom",
            end: "20% center",
          },
        });
        gsap.to(div.getElementsByClassName("productsIntro")[0], {
          scale: 1,
          duration: 1,
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: div,
            // markers:true,
            scrub: 3,
            start: "top bottom",
            end: "20% center",
          },
        });
      });
      gsap.to(".pathforProducts", {
        duration: 1,
        // strokeDasharray: 2000,
        strokeDashoffset: 400,
        // top:-350,
        scrollTrigger: {
          trigger: ".products",
          // markers: true,
          scrub: 3,
          start: "10% bottom",
          end: "bottom center",
        },
      });
    }
  }, [cooksCategories]);

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  const { local } = useSelector((state) => state.language);
  const { isMobile } = useWidth();
  return (
    <div>
      <div className={` ${isMobile?"products w-[95%]" : "products w-[80%]"} mt-20 mx-[10%]`}>
        <SEO 
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />
        {/* <div className={` productsIntro`}> */}
        {/* <img src="/images/productImg.png" alt="" /> */}
        {/* 
        <div className="categorydiv flex md:flex-div flex-div mt-10 md:-mt-[10vh] justify-between">
          <div
            className="flex items-center justify-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            order={1}
            span={24}
            lg={{ span: 10, order: 2 }}
          >
            <div
              style={{
                objectPosition: "center center",
              }}
              className="w-[30vw] z-40  "
            >
              {" "}
              <OptimizedImage src={grots} alt="" className={`grots`} />
            </div>
          </div>{" "}
          <div
            className="flex  items-center justify-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            lg={{ span: 10, order: 1 }}
            span={24}
            order={2}
          >
            <div className={`${styles.productIntro} productIntro z-30`}>
              <div className={`${styles.categoryInfo} categoryInfo`}>
                <div className="pr-2 space-y-2">
                  <p className="font-arabicBold text-3xl pb-2 ">
                    {" "}
                    مطبخ سيدي هشام
                  </p>
                  <p className="  font-arabicLight py-2">
                    نقدم لكم طرق و وصفات اشهى الوجبات مع جميع الاحتياجات
                    والمقادير
                  </p>
                  <p className="font-arabicMedium text-xl pb-4 ">
                    وصفة الكبة المقلية من برغل سيدي هشام
                  </p>{" "}
                  <button
                    onClick={() => router.push("/ketchen/recipes")}
                    className="bg-[#D40017] font-arabicMedium text-center  rounded-full w-40 py-2 text-white"
                  >
                    عرض المزيد
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* </div> */}
        <div justify="center">
          <div lg={20} span={22}>
            <div className={`${styles.productsCon} productsCon`}>
              <svg
                className={`${styles.productsPath} productsPath  pathforProducts`}
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                width="455.1"
                height="4819.5"
                viewBox="0 0 455.1 4819.5"
              >
                <path
                  id="Path_56557"
                  data-name="Path 56557"
                  d="M62,0S-26.59,60.18,31.65,157.08c5.15,6.95,10.73,11.73,16.94,14.78,54.92,26.89,166.86-53.23,288.33-37.87,45.87,5.78,111.52,28.46,118.41,66.23C462.8,241,401.57,297.7,335.81,318.58,201.93,361.19,75.73,247.09,20,300.43c-3.47,3.32-11.2,11.26-10.36,20.26,2.84,29.14,89.8,44.71,166.6,45.55,93.06,1.05,276,29.72,272.5,121.21s-126-8.68-231.1-25.62S3.24,458.46,12,529.58s340.89,74.28,383.81,102.53,45.82,75.81-25.19,92.12-98.17,9.57-258.88-26.94S-23.85,830.12,150,860.53c142.93,25,218.42-38.67,260.71-15.78,17.68,9.57,23.15,28.82,23.15,28.82,6.79,15.42,10.15,38.88,3,51.77C409,975.52,234.39,913,113.71,945.49A142.43,142.43,0,0,0,62,970.84c-9,7-43.72,34.2-49.55,81.12-1.53,12.42-3.9,48.87,19.2,76a87.6,87.6,0,0,0,16.94,14.79c71,45.45,162-55.56,288.33-37.88,42.29,5.89,108.37,27.93,116.84,69.07,9.78,47.45-58.71,112.79-117.95,115.52-27.3,1.27-67.07-10-67-10.31.79.12,1,.12,1,.09.18-.86-187.67-70.42-249.79-7.93-4.35,4.38-11.52,11.78-10.36,20.26,3.52,25.88,80.33,29.4,166.6,45.55,46.56,8.68,266.55,49.82,272.5,121.21.89,10.94-3.11,24-12.05,31.88-34.88,30.77-111.84-45.61-219-57.55C108,1420.41,8.76,1480.44,12,1500.37c5.16,32.15,286.23,18,383.81,102.53,9.11,7.89,34.3,29.67,29.94,51.5-4.68,23.52-41.35,35.93-55.13,40.61a154.45,154.45,0,0,1-54.24,8.16c-83.91-3-128.62-32-204.64-35.09-33-1.31-90.37-3.63-101,20.83C-3.7,1721.84,63,1811.12,150,1831.37c101.89,23.78,215.26-50.87,260.71-15.78a82.65,82.65,0,0,1,23.15,28.83c6.78,15.46,10.1,38.92,3,51.76-25.89,46.56-205.64-18.94-323.16,20.15A158.06,158.06,0,0,0,62,1944.79c-11.79,9.78-43.88,36.51-49.56,81.12-1.31,10.15-4.63,48,19.2,76a87.72,87.72,0,0,0,16.94,14.78c70.44,45.14,160-54.66,288.34-37.88,6,.79,104,14.58,116,64.87,11.16,46.34-53.34,111.89-117.15,119.73-18.83,2.31-28.93-1.47-62.81-9.73-108.42-26.41-211.9-50.61-253-8.42-4.42,4.52-11.52,11.84-10.37,20.25,3.53,25.89,80.33,29.41,166.61,45.56,46.55,8.68,266.55,49.82,272.5,121.2.89,10.95-3.11,24-12,31.88-34.88,30.78-111.84-45.61-219-57.55-109.68-12.2-208.9,47.82-205.69,67.76,5.15,32.14,286.23,18,383.81,102.53,9.1,7.89,34.3,29.67,29.93,51.5-4.68,23.51-41.34,35.93-55.13,40.61a154.55,154.55,0,0,1-54.23,8.15c-83.91-2.94-128.62-32-204.64-35.08-33-1.32-90.38-3.63-101.06,20.83-14.36,32.93,52.29,122.2,139.3,142.45,98.9,23.1,216.58-48.5,260.72-15.78A79.57,79.57,0,0,1,430,2811.1c10.21,17.83,14.57,45,6.73,59-25.67,46-203.21-12.1-323.15,20.14a142.77,142.77,0,0,0-51.72,25.36c-9,7-43.71,34.19-49.55,81.12-1.53,12.41-3.89,48.87,19.2,76a87.72,87.72,0,0,0,16.94,14.78c70.44,45.09,160.4-53.71,288.33-37.87,39.72,4.89,108.74,24.09,118.42,65.28,10.89,46.24-54.82,111.68-119.52,119.31-18.41,2.16-27.88-1.42-62.81-9.73-113.47-27-212.85-49.66-253-8.42-4.42,4.53-11.53,11.84-10.37,20.25,3.53,25.89,80.33,29.41,166.6,45.56,46.56,8.68,266.56,49.82,272.5,121.21.9,10.94-3.1,24-12,31.87-34.88,30.78-111.84-45.6-219-57.55-109.69-12.2-208.9,47.82-205.69,67.76,5.15,32.14,286.23,18,383.81,102.53,9.1,7.89,34.3,29.67,29.93,51.5-4.68,23.51-41.35,35.93-55.13,40.61a153,153,0,0,1-52,8.21c-81.8-1.84-129.56-32-206.84-35.14-32.93-1.32-90.38-3.68-101.06,20.83-14.36,32.93,52.34,122.52,139.3,142.46,102,23.41,215.27-50.87,260.72-15.79a82.78,82.78,0,0,1,23.14,28.83c6.79,15.42,10.05,38.83,3,51.77-25,45.76-202.74-12.21-323.16,20.14a142.82,142.82,0,0,0-51.71,25.36c-9.05,7.05-43.71,34.19-49.55,81.12-1.53,12.41-3.9,48.87,19.2,76a87.36,87.36,0,0,0,16.94,14.78c70.49,45.14,160-54.71,288.33-37.87,5.84.73,104,14.62,116.05,65,11.1,46.34-53.4,111.78-117.15,119.62-18.89,2.32-29-1.47-62.82-9.73-108.36-26.41-211.89-50.61-253-8.42-4.42,4.53-11.52,11.84-10.36,20.26,3.52,25.88,80.33,29.4,166.6,45.55,46.56,8.68,266.56,49.82,272.5,121.21.9,10.94-3.1,24-12.05,31.88-34.87,30.77-111.84-45.61-219-57.55C107.82,4336,8.61,4396.06,11.81,4416,17,4448.14,298,4434,395.63,4518.53c9.1,7.89,34.3,29.67,29.93,51.5-4.68,23.52-41.35,35.93-55.13,40.61a154.33,154.33,0,0,1-54.24,8.16c-107.38-4.11-164.56-42.6-211.69-18.3-44.67,23-64.06,94.09-45,118,15.73,19.74,55,4,118,30,10,4.12,23.67,10.57,33,25,10.5,16.25,10,34.11,9,43"
                  transform="translate(-2.82 1.5)"
                  stroke="#ddb659"
                  strokeLinecap="round"
                  strokeWidth="1.3px"
                  strokeDasharray="8"
                  fill="transparent"
                />
              </svg>

              {cooksCategories?.map((category, index) =>
                index % 2 == 0 ? (
                  <div
                    key={index}
                    className="categorydiv flex md:flex-div flex-div justify-between"
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      order={1}
                      span={24}
                      lg={{ span: 10, order: 2 }}
                    >
                      <div
                        style={{
                          objectPosition: "center center",
                        }}
                        className="w-[30vw] z-40  "
                      >
                        {" "}
                        <img
                          src={
                            "https://api.sedihisham.com/" + category.image_url
                          }
                          width={400}
                          height={400}
                          alt=""
                          className={`grots`}
                        />
                      </div>
                    </div>
                    <div
                      className="flex  items-center justify-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      lg={{ span: 10, order: 1 }}
                      span={24}
                      order={2}
                    >
                      <div
                        className={`${styles.productIntro} productIntro z-30`}
                      >
                        <div className={`${styles.categoryInfo} categoryInfo`}>
                          <div className="pr-2 space-y-2">
                            <p className="font-arabicBold text-3xl pb-2 ">
                                {parse(
                                  String(
                                    category?.cooks_category_translations?.find(
                                      (item) => item.locale === local
                                    )?.title || ""
                                  )
                                )}
                            </p>
                            <p className="  font-arabicLight py-2">
                              {parse(
                                String(
                                  category?.cooks_category_translations?.find(
                                    (item) => item.locale === local
                                  )?.description || ""
                                )
                              )}
                            </p>
                            <p className="font-arabicMedium text-xl pb-4 ">
                              {category.subSubTitle}
                            </p>
                            <button
                              onClick={() =>
                                router.push(`/ketchen/recipes/${category.id}`)
                              }
                              className="bg-[#D40017] font-arabicMedium text-center  rounded-full w-40 py-2 text-white"
                            >
                              {local === "ar" ? " عرض المزيد" : "Show more"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="categorydiv flex md:flex-div flex-div div-reverse justify-between"
                    style={{ flexDirection: "div-reverse" }}
                  >
                    <div
                      className="flex  items-center justify-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      lg={{ span: 10, order: 1 }}
                      span={24}
                      order={2}
                    >
                      <div
                        className={`${styles.productIntro} productIntro z-30`}
                      >
                        <div className={`${styles.categoryInfo} categoryInfo`}>
                          <div className="pr-2 space-y-2">
                            <p className="font-arabicBold text-3xl pb-2 ">
                                {parse(
                                  String(
                                    category?.cooks_category_translations?.find(
                                      (item) => item.locale === local
                                    )?.title || ""
                                  )
                                )}
                            </p>
                            <p className="  font-arabicLight py-2">
                              {parse(
                                String(
                                  category?.cooks_category_translations?.find(
                                    (item) => item.locale === local
                                  )?.description || ""
                                )
                              )}
                            </p>
                            {/* <p className="font-arabicMedium text-xl pb-4 ">
                              {category.subSubTitle}
                            </p>{" "} */}
                            <button
                              onClick={() =>
                                router.push(`/ketchen/recipes/${category.id}`)
                              }
                              className="bg-[#D40017] font-arabicMedium text-center  rounded-full w-40 py-2 text-white"
                            >
                              {local === "ar" ? " عرض المزيد" : "Show more"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      order={1}
                      span={24}
                      lg={{ span: 10, order: 2 }}
                    >
                      <div
                        style={{
                          objectPosition: "center center",
                        }}
                        className="w-[30vw] z-40  "
                      >
                        {" "}
                        <img
                          src={`https://api.sedihisham.com/${category.image_url}`}
                          alt=""
                          width={400}
                          height={400}
                          className={`grots`}
                        />
                      </div>
                    </div>{" "}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
