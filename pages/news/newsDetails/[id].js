import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/kitchen/BreadCrumb";
import RecipeSlider from "../../../components/kitchen/RecipeSlider";
import Carousel from "../../../components/home/section3/Carousel";
import data from "../../../components/kitchen/Data.json";
import { useRouter } from "next/router";
import NewsService from "../../../services/newsService";
import axios from "axios";
import ReactPlayer from "react-player";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import NewsDetailsCarousel from "../../../components/news/NewsDetailsCarousel";
import NewsBreadcrumb from "../../../components/news/BreadCrumb";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  //News Slider Data

  //Get Cooks by Category ID
  const [neew, setNews] = useState("");
  const [isreday, setIsDataReady] = useState(false);

  const getNewsData = async (e) => {
    if (id == undefined) {
      const { id } = router.query;
    } else {
      await axios
        .get(`https://api.sedihisham.com/news/${id}`)
        .then((response) => {
          setNews(response.data);
          // console.log("neew details :" + JSON.stringify(response.data));
          setIsDataReady(true);
        })
        .catch((error) => {
          console.log(
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
    getNewsData();
  }

  useEffect(() => {
    getNewsData();
  }, [id, router.query]);
  useEffect(() => {
    getNewsData();
  }, []);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="w-[100%] mt-24 mb-10 flex-col text-end mx-[auto] newsDetails">
      <div>
        <div
          className={
            local === "ar"
              ? "flex justify-end my-5 "
              : "flex justify-start my-5 "
          }
        >
          <NewsBreadcrumb />
        </div>
        <NewsDetailsCarousel
          videoUrl={neew.video_url}
          text={
            local === "ar"
              ? "لا يوجد فيديو لهذا الخبر"
              : "This product has no video"
          }
          sliderImages={neew.image_url}
        />
      </div>
      <p
        className={`${
          local === "ar" ? " text-end" : "text-start"
        } tracking-tight  opacity-80 text-red-600 text-xl font-arabicMedium mt-5  elevation-50 `}
      >
        {neew.new_translations &&
          parse(
            neew.new_translations.find((item) => item.locale === local).title
          )}
      </p>
      <p
        className={` tracking-wide trancate ${
          local === "ar" ? "text-end" : "text-start"
        }  opacity-80 text-sm text-gray-800 font-arabicLight mt-5  elevation-50`}
      >
        {neew.new_translations &&
          parse(
            neew.new_translations.find((item) => item.locale === local)
              .descrition
          )}
      </p>
   
    </div>
  );
}
