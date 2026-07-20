import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import kabsa from '../../public/images/kabsa.png';
import kabsa1 from '../../public/images/kabsa1.png';
import kabsa2 from '../../public/images/kabsa2.png';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const RecipeCarousel = ({ data, title, showLeftButton }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

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
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
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

  const { local } = useSelector((state) => state.language);

  return (
    <div className="flex flex-col  mt-10 md:!w-[100%] !w-full">
      <div className=" -mb-20 mx-[6%] z-50">
        {" "}
        <p className="text-end opacity-80 text-2xl font-arabicMedium  elevation-50 ">
          {data?.cooks_translations
            ? data?.cooks_translations.find((item) => item.locale === local)
                ?.name
            : title}
        </p>
      </div>
      <div className="carousel flex z-60  w-full -mt-1">
        {/* {showLeftButton ? ( */}
        <button
          onClick={movePrev}
          className="
            text-[#D40017] border-[2px] border-[#D40017]
            enabled:hover:bg-[#D40017] enabled:hover:text-white   w-10 mx-4 flex justify-center   bg-white h-10 mt-[270px] text-center rounded-full opacity-75 enabled:hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          disabled={isDisabled('prev')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        {/* ) : (
          <div></div>
        )} */}
        <div className="relative overflow-hidden">
          {/* <div className="flex  absolute top left w-full h-full"></div> */}
          {data.length === 0 ? (
            <div className="flex items-end text-end justify-end mt-20 ">
              <p className="text-red-500 text-end">
                {" "}
                {local === 'ar'
                  ? 'لا يوجد طبخات لهذه الفئة'
                  : 'No cooks for this category'}
              </p>
            </div>
          ) : (
            <div
              ref={carousel}
              className="carousel-container carousalProductsContainer w-full bg-white relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
            >
              {/* {data?.map((cook, index) => ( */}

              {data.map((cook, index) => (
                <div
                  key={index}
                  className="carousel-item text-center relative h-full w-full pt-28 mx-1 snap-start"
                >
                  <RecipeCard
                    local={local}
                    id={cook.id}
                    image={
                      "https://api.sedihisham.com/" + cook.image_background_url
                    }
                    title={
                      cook.cooks_translations.length > 0 &&
                      cook.cooks_translations?.find(
                        (item) => item.locale === local
                      )?.name
                    }
                    description={
                      cook.cooks_translations.length > 0 &&
                      cook.cooks_translations?.find(
                        (item) => item.locale === local
                      )?.description
                    }
                  />
                </div>
              ))}

              {/* ))} */}
            </div>
          )}
        </div>
        {data.length === 0 ? (
          <></>
        ) : (
          <button
            onClick={moveNext}
            className="text-[#D40017] border-[2px] border-[#D40017]
            w-10 mx-4   h-10 mt-[270px] text-center rounded-full enabled:hover:bg-[#D40017] enabled:hover:text-white z-10 p-0 m-0 transition-all ease-in-out duration-300 disabled:opacity-25"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-center"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCarousel;
