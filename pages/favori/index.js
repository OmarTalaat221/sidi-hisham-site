// import { Carousel } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/favori/BreadCrumb";
import FavoritesCarousel from "../../components/favori/FavoritesCarousel";
import RecipeCarousel from "../../components/home/section3/Carousel";
import ProductCard from "../../components/home/section3/ProductCard";
// import data from "../../components/news/Data.json";
// import 

export default function Index() {
  const {favorites} = useSelector((state)=>state.favorites)
  const {local} = useSelector((state)=>state.language)
  // console.log("Favorites :"+JSON.stringify(favorites))
  return (
    <div className="mt-24 mb-14 w-[90%] mx-[5%]">
      <div className={local === "ar"?"flex justify-end md:mr-[5%]":"flex justify-start md:ml-[5%]"}>
        <Breadcrumb />
      </div>
      <FavoritesCarousel />
  
    </div>
  );
}
