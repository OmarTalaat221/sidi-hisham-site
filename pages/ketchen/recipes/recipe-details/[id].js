import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../components/kitchen/BreadCrumb";
import Carousel from "../../../../components/home/section3/Carousel";
import data from "../../../../components/kitchen/Data.json";
import { useRouter } from "next/router";
import axios from "axios";
import ReactPlayer from "react-player/youtube";
import { useSelector } from "react-redux";
import RecipeGallery from "../../../../components/kitchen/RecipeSlider";
import parse from "html-react-parser";

export default function RecipeDetails() {
  const router = useRouter();
  const { id } = router.query;

  //Get Cooks by Category ID
  const [cook, setCook] = useState("");
  const [isreday, setIsDataReady] = useState(false);

  const getCookData = async (e) => {
    if (id == undefined) {
      const { id } = router.query;
    } else {
      await axios
        .get(`https://api.sedihisham.com/cooks/find/${id}`)
        .then((response) => {
          setCook(response.data);
          // console.log("cook details :" + JSON.stringify(response.data));
          setIsDataReady(true);
        })
        .catch((error) => {
          alert(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        });
    }
  };

  if (!isreday) {
    getCookData();
  }

  useEffect(() => {
    getCookData();
  }, [id]);
  useEffect(() => {
    getCookData();
  }, []);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="container mx-auto !max-w-6xl px-4 py-12 md:py-[6rem]">
      <div
        className={
          local === "ar"
            ? "flex justify-end mb-6"
            : "flex justify-start mb-6"
        }
      >
        <Breadcrumb local={local} show={true} />
      </div>
      
      {/* Recipe Title Section */}
      <div className={`mb-12 ${local === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-center mb-6 ${local === 'ar' ? 'justify-end' : 'justify-start'}`}>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D40017] to-[#FF6B6B] rounded-full"></div>
          <h1 className="text-4xl md:text-5xl font-arabicMedium text-center text-gray-800 mx-auto">
            {cook.cooks_translations &&
              cook.cooks_translations.find((item) => item.locale === local)?.name}
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B6B] to-[#D40017] rounded-full"></div>
        </div>
        {/* <p className="text-gray-600 text-lg opacity-75">
          {local === 'ar' ? 'وصفة مميزة من مطبخ سيدي هشام' : 'A special recipe from Sedi Hisham kitchen'}
        </p> */}
      </div>
      {/* Video Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center z-10 items-center">
            <ReactPlayer url={cook.video_url_instead_slider} />
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className={`flex items-center mb-6 ${local === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-12 h-12 bg-gradient-to-r from-[#D40017] to-[#FF6B6B] rounded-full flex items-center justify-center ${local === 'ar' ? 'ml-4' : 'mr-4'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className={`text-2xl md:text-3xl font-arabicMedium text-gray-800 ${local === 'ar' ? 'text-right' : 'text-left'}`}>
              {local === "ar"
                ? "المقادير و طريقة التحضير"
                : "Ingredients and method of preparation"}
            </h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className={`text-gray-700 text-base leading-relaxed ${
              local === "ar" ? "text-right" : "text-left"
            }`}>
              {cook.ingrendients}
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className={`flex items-center mb-6 ${local === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-12 h-12 bg-gradient-to-r from-[#FF6B6B] to-[#D40017] rounded-full flex items-center justify-center ${local === 'ar' ? 'ml-4' : 'mr-4'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className={`text-2xl md:text-3xl font-arabicMedium text-gray-800 ${local === 'ar' ? 'text-right' : 'text-left'}`}>
              {local === "ar" ? "الوصف" : "The description"}
            </h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className={`text-gray-700 text-base leading-relaxed prose prose-lg max-w-none ${
              local === "ar" ? "text-right" : "text-left"
            }`}>
              {cook.cooks_translations &&
                parse(
                  cook.cooks_translations.find((item) => item.locale === local)
                    ?.description
                )}
            </div>
          </div>
        </div>
      </div>
      {/* Recipe Gallery Section */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className={`flex items-center mb-6 ${local === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-12 h-12 bg-gradient-to-r from-[#D40017] to-[#FF6B6B] rounded-full flex items-center justify-center ${local === 'ar' ? 'ml-4' : 'mr-4'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className={`text-2xl md:text-3xl font-arabicMedium text-gray-800 ${local === 'ar' ? 'text-right' : 'text-left'}`}>
              {local === "ar" ? "صور الطبخة" : "Recipe Gallery"}
            </h2>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <RecipeGallery data={cook.cooks_images} />
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className={`flex items-center mb-6 ${local === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-12 h-12 bg-gradient-to-r from-[#FF6B6B] to-[#D40017] rounded-full flex items-center justify-center ${local === 'ar' ? 'ml-4' : 'mr-4'}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className={`text-2xl md:text-3xl font-arabicMedium text-gray-800 ${local === 'ar' ? 'text-right' : 'text-left'}`}>
              {local === "ar"
                ? "منتجات سيدي هشام الموصى بها"
                : "Recommended Sedi Hisham products"}
            </h2>
          </div>
          <div className={`bg-gray-50 rounded-xl p-6 ${local === 'ar' ? 'text-right' : 'text-left'}`}>
            <Carousel preventDefaultTouchmoveEvent={true} enableMouseSwipe={false} products={cook.recommended_products} />
          </div>
        </div>
      </div>
    </div>
  );
}
