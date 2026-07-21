import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import parse from "html-react-parser";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../../redux/cartSlice";
import ProductCard from "./ProductCard";

const Carousel = ({ products }) => {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const { local, currency } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [percentage, setPercentage] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products
      .slice()
      .sort(
        (firstProduct, secondProduct) =>
          new Date(secondProduct.createdAt).getTime() -
          new Date(firstProduct.createdAt).getTime(),
      );
  }, [products]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    let isCancelled = false;

    const getOffers = async () => {
      if (!Array.isArray(products) || products.length === 0) {
        setPercentage(0);
        return;
      }

      try {
        const response = await axios.get(
          "https://api.sedihisham.com/offers/alloffers",
        );

        const offers = Array.isArray(response?.data) ? response.data : [];

        let matchedPercentage = 0;

        offers.forEach((offer) => {
          offer.Categories?.forEach((category) => {
            const hasMatchingProduct = products.some(
              (product) => product.category_id === category.id,
            );

            if (hasMatchingProduct) {
              matchedPercentage = offer.percentage;
            }
          });
        });

        if (!isCancelled) {
          setPercentage(matchedPercentage);
        }
      } catch {
        if (!isCancelled) {
          setPercentage(0);
        }
      }
    };

    getOffers();

    return () => {
      isCancelled = true;
    };
  }, [products]);

  const checkScrollButtons = useCallback(() => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) {
      return;
    }

    const maxScroll = carouselElement.scrollWidth - carouselElement.clientWidth;

    if (maxScroll <= 5) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const currentScrollLeft = carouselElement.scrollLeft;

    let normalizedScrollPosition;

    if (!isAr) {
      normalizedScrollPosition = currentScrollLeft;
    } else if (currentScrollLeft < 0) {
      normalizedScrollPosition = Math.abs(currentScrollLeft);
    } else {
      normalizedScrollPosition = maxScroll - currentScrollLeft;
    }

    setCanScrollPrev(normalizedScrollPosition > 5);
    setCanScrollNext(normalizedScrollPosition < maxScroll - 5);
  }, [isAr]);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) {
      return undefined;
    }

    let animationFrameId;

    const requestButtonUpdate = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        checkScrollButtons();
      });
    };

    carouselElement.addEventListener("scroll", requestButtonUpdate, {
      passive: true,
    });

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(requestButtonUpdate);
      resizeObserver.observe(carouselElement);
    }

    requestButtonUpdate();

    return () => {
      carouselElement.removeEventListener("scroll", requestButtonUpdate);
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [checkScrollButtons, sortedProducts.length]);

  const scrollByAmount = (direction) => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) {
      return;
    }

    const scrollAmount = Math.max(carouselElement.clientWidth * 0.72, 240);

    const visualDirection = direction === "next" ? 1 : -1;

    carouselElement.scrollBy({
      left: isAr
        ? -scrollAmount * visualDirection
        : scrollAmount * visualDirection,
      behavior: "smooth",
    });
  };

  if (sortedProducts.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-lg font-arabicMedium text-gray-400">
          {isAr ? "لا توجد منتجات متاحة حالياً" : "No products available"}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-3 sm:px-5 md:px-8">
      <button
        type="button"
        onClick={() => scrollByAmount("prev")}
        disabled={!canScrollPrev}
        aria-label={isAr ? "المنتجات السابقة" : "Previous products"}
        className={`
          absolute top-1/2 z-40 flex h-10 w-10
          -translate-y-1/2 items-center justify-center
          rounded-full border border-gray-100
          bg-white/95 text-primary
          opacity-100 shadow-[0_5px_18px_rgba(0,0,0,0.14)]
          backdrop-blur-sm
          transition-all duration-300
          hover:scale-105 hover:border-primary
          hover:bg-primary hover:text-white
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-0
          md:h-12 md:w-12
          ${isAr ? "right-0 md:right-2" : "left-0 md:left-2"}
        `}
      >
        {isAr ? (
          <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </button>

      <div
        ref={carouselRef}
        dir={isAr ? "rtl" : "ltr"}
        className="
          no-scrollbar flex snap-x snap-mandatory
          gap-4 overflow-x-auto px-2 pb-10 pt-4
          scroll-smooth md:gap-6
        "
      >
        {sortedProducts.map((product, index) => {
          const selectedTranslation =
            product?.product_translations?.find(
              (item) =>
                (item.locale || item.local || "").toLowerCase() ===
                local?.toLowerCase(),
            ) || product?.product_translations?.[0];

          const productDescription = parse(
            String(selectedTranslation?.description || ""),
          );

          const productName =
            selectedTranslation?.nameProduct || product?.name || "";

          return (
            <div
              key={product.id || index}
              className="
                w-[78vw] min-w-[240px] max-w-[280px]
                shrink-0 snap-start
                sm:w-[260px] md:w-[280px]
              "
            >
              <ProductCard
                currency={currency}
                percentage={percentage}
                product={product}
                product_image={
                  product.product_images?.length > 0
                    ? `https://api.sedihisham.com/${product.product_images[0].image_url}`
                    : null
                }
                product_id={product.id}
                desc={productDescription}
                product_name={productName}
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount("next")}
        disabled={!canScrollNext}
        aria-label={isAr ? "المنتجات التالية" : "Next products"}
        className={`
          absolute top-1/2 z-40 flex h-10 w-10
          -translate-y-1/2 items-center justify-center
          rounded-full border border-gray-100
          bg-white/95 text-primary
          opacity-100 shadow-[0_5px_18px_rgba(0,0,0,0.14)]
          backdrop-blur-sm
          transition-all duration-300
          hover:scale-105 hover:border-primary
          hover:bg-primary hover:text-white
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-0
          md:h-12 md:w-12
          ${isAr ? "left-0 md:left-2" : "right-0 md:right-2"}
        `}
      >
        {isAr ? (
          <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </button>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
