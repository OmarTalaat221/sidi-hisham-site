import React, { useState } from "react";
// import { data } from "./mockData";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import OptimizedImage from "@/components/common/OptimizedImage";
function ProductsSlider({ sliderImages }) {
  const [imgIndex, setImgIndex] = useState(1);

  const slideLeft = () => {
    if (imgIndex !== 1) {
      var slider = document.getElementById("slider2");
      slider.scrollLeft = slider.scrollLeft - 360;
      setImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slideRight = () => {
    if (imgIndex !== sliderImages.length - 2) {
      var slider = document.getElementById("slider2");
      slider.scrollLeft = slider.scrollLeft + 360;
      setImgIndex((prevIndex) => prevIndex + 1);
    }
  };

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/products/images/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  return (
    <>
      <div className="relative md:w-[1200px] mt-20 mx-auto flex flex-col items-center">
        <div
          id="slider2"
          className="w-full flex items-center h-[470px]  overflow-hidden scroll  whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {sliderImages
            ?.filter((item) => item.categoryImage === "home_page_main_slider")
            .map((item, index) =>
              index === imgIndex ? (
                <OptimizedImage key={index}
                  loader={GraphCMSImageLoader}
                  // className="w-[40%] h-[450px] px-6 inline-block  cursor-pointer rounded-xl scale-105 ease-in-out duration-300"
                  src={item.path_image}
                  width={300}
                  height={450}
                  alt="/"
                />
              ) : (
                <OptimizedImage key={index}
                  width={300}
                  height={380}
                  loader={GraphCMSImageLoader}
                  // className="w-[30%] h-[380px] px-[1px] inline-block cursor-pointer rounded-xl "
                  src={item.path_image}
                  alt="/"
                />
              )
            )}
        </div>
        <div className="flex  space-x-3 mt-5">
          <MdChevronLeft
            className=" text-red-600  shadow-md rounded-full cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <MdChevronRight
            className=" text-red-600  shadow-md rounded-full cursor-pointer hover:opacity-100"
            onClick={slideRight}
            size={40}
          />
        </div>
      </div>
    </>
  );
}

export default ProductsSlider;
