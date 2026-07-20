import { useState, useRef, useEffect } from "react";
import ProductCard from "../home/section3/ProductCard";
import OptimizedImage from "@/components/common/OptimizedImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import Item from "antd/lib/list/Item";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../redux/cartSlice";
import ProductCardFavori from "../home/section3/ProductCardFavori";

const FavoritesCarousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  //Calcul total price
  //Get the cart items
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { favorites } = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart]);

  const { local } = useSelector((state) => state.language);

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
  }, [currentIndex, favorites]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [favorites]);

  // console.log(favorites, local);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col mt-24">
        <div className="carousel flex -mt-[80px] max-[450px]:max-w-xs max-sm:max-w-md sm:container ">
          {favorites?.length !== 0 && (
            <button
              onClick={movePrev}
              className="hover:bg-red-800  hover:text-white text-[#D40017]  shadow-xl  w-9  px-3 py-3   bg-white h-9 mt-[250px] text-center rounded-full    z-30 p-0 m-0 transition-all ease-in-out duration-300"
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
            <div className="flex absolute top left  w-full h-full"></div>
            {favorites?.length === 0 ? (
              <div className="flex  text-red-400"> المفضلة فارغة</div>
            ) : (
              <div
                ref={carousel}
                className="carousel-container  relative flex overflow-hidden gap-1 scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
              >
                {favorites?.map((product, index) => (
                  <div
                    key={index}
                    className="carousel-item text-center relative h-full w-full z-4 pt-28 mx-1  snap-start"
                  >
                    {/* {
                      console.log(product)

                    } */}
                    <ProductCardFavori
                      points={product?.points}
                      discount={product?.discount}
                      product_image={
                          product.product_images !== undefined
                            ? "https://api.sedihisham.com/" +
                              product?.product_images[0]?.image_url
                            : null
                        }
                      product_id={product?.product_id}
                      price={product?.price}
                      translations={product.product_translations}
                      quantity={product?.quantity}
                      order_number={1}
                      desc={product?.desc}
                      product={product}
                      product_name={
                        product?.translations?.find(
                          (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                        )?.nameProduct || product?.translations?.[0]?.nameProduct || ""
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {favorites?.length === 0 ? (
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

export default FavoritesCarousel;
