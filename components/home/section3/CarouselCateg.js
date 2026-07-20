import { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import pathHome from '../../../public/images/pathHome.png';
import OptimizedImage from "@/components/common/OptimizedImage";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import axios from 'axios';
import Item from 'antd/lib/list/Item';
import ProductService from '../../../services/productsService';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import ProductCardCate from './ProductCardCate';

const CateCarousel = ({ title, products }) => {
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
  }, [currentIndex, products]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [products]);

  const { local } = useSelector((state) => state.language);

  return (
    <div>
      <div className="flex md:w-[80%] md:mx-[10%] flex-col mt-24">
        <div className=" -mb-20">
          <p className="text-end opacity-80 text-2xl mb-28 font-bold  elevation-50 ">
            {title}
          </p>
        </div>
        <div className="carousel flex -mt-[80px] w-full  ">
          {products?.length === 0 ? (
            <></>
          ) : (
            <button
              onClick={movePrev}
              className="hover:bg-red-800  hover:text-white text-[#D40017]  shadow-xl ml-10  w-9  px-3 py-3   bg-white h-9 mt-[250px] text-center rounded-full    z-30 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled('prev')}
            >
              <div className="flex justify-center -ml-2  -mt-[6px]  w-7 h-7 items-center">
                {" "}
                <ChevronLeftIcon />
              </div>

              <span className="sr-only">Prev</span>
            </button>
          )}

          {products?.length === 0 ? (
            <div className="flex justify-center items-center text-red-400">
              <p>
                {local === 'en' ? 'There is no products' : 'لا يوجد منتجات'}
              </p>
            </div>
          ) : (
            <div className="relative  overflow-hidden">
              <div
                ref={carousel}
                className="carousel-container  relative flex overflow-hidden gap-1 scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
              >
                {products?.map((product, index) => (
                  <div
                    key={index}
                    className="carousel-item text-center relative h-full w-full z-4 pt-28 mx-1  snap-start"
                  >
                    <ProductCardCate
                      // key={index}
                      product={product}
                      product_image={
                        "https://api.sedihisham.com/" +
                        product.product_images[0]?.image_url
                      }
                      translations={product.product_translations}
                      product_id={product.id}
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
              </div>{" "}
            </div>
          )}

          {products?.length === 0 ? (
            <></>
          ) : (
            <button
              onClick={moveNext}
              className="hover:bg-red-800  hover:text-white text-[#D40017]  shadow-xl  w-9 h-9 px-3 py-3   bg-white  mt-[250px] text-center rounded-full    z-10 p-0 m-0 transition-all ease-in-out duration-300"
              // className="hover:bg-red-800/75 text-[#D40017] mr-3 border-2 border-[#D40017] w-12 ml-3   h-12 mt-[250px] text-center rounded-full hover:text-white    z-10 p-0 m-0 transition-all ease-in-out duration-300"
              disabled={isDisabled('next')}
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

export default CateCarousel;
