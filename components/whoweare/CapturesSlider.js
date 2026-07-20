import { useState, useRef, useEffect } from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";

const CaptureSlider = ({ title, data }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    // if (src.startsWith("uploads/products/images/")) {
    return `https://api.sedihisham.com/${src}`;
    // } else {
    //   return "/images/eim.png";
  }

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex, data]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [data]);

  return (
    <div>
      <div className="flex w-full flex-col mt-24">
        <div className="carousel flex -mt-[80px] w-full  ">
          {data?.length === 0 ? (
            <></>
          ) : (
            <button
              onClick={movePrev}
              className="hover:bg-red-800  hover:text-white text-[#D40017]  shadow-xl ml-10  w-9  px-3 py-3   bg-white h-9 mt-[250px] text-center rounded-full    z-30 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled("prev")}
            >
              <div className="flex justify-center -ml-2  -mt-[6px]  w-7 h-7 items-center">
                {" "}
                <ChevronLeftIcon />
              </div>
              <span className="sr-only">Prev</span>
            </button>
          )}

          <div className="relative md:mx-8 overflow-hidden">
            <div className="flex  absolute top left  w-full h-full"></div>
            {data?.length === 0 ? (
              <div className="flex  text-red-400">لا يوجد منتجات</div>
            ) : (
              <div
                ref={carousel}
                className="carousel-container  relative flex overflow-hidden gap-1 scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
              >
                {data?.map((image, index) => {
                  <div
                    key={index}
                    className="w-[300px] inline-block p-2 cursor-pointer rounded-xl hover:scale-105 ease-in-out duration-300"
                  >
                    <OptimizedImage loader={GraphCMSImageLoader}
                      width={300}
                      height={300}
                      src={image.path_image}
                      alt="waloo"
                    />
                  </div>;
                })}
              </div>
            )}
          </div>
          {data?.length === 0 ? (
            <></>
          ) : (
            <button
              onClick={moveNext}
              className="hover:bg-red-800  hover:text-white text-[#D40017]  shadow-xl  w-9 h-9 px-3 py-3   bg-white  mt-[250px] text-center rounded-full    z-10 p-0 m-0 transition-all ease-in-out duration-300"
              // className="hover:bg-red-800/75 text-[#D40017] mr-3 border-2 border-[#D40017] w-12 ml-3   h-12 mt-[250px] text-center rounded-full hover:text-white    z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled("next")}
            >
              <div className="flex justify-center -ml-2  -mt-[6px]  w-7 h-7 items-center">
                {" "}
                <ChevronRightIcon />
              </div>
              <span className="sr-only">Next</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptureSlider;
