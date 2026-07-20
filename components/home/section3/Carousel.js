import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
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
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const response = await axios.get(
          "https://api.sedihisham.com/offers/alloffers",
        );
        if (response.data && products?.length) {
          response.data.forEach((item) => {
            item.Categories?.forEach((subItem) => {
              const hasOffer = products.some(
                (p) => p.category_id === subItem.id,
              );
              if (hasOffer) setPercentage(item.percentage);
            });
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOffers();
  }, [products]);

  // Check scroll position for enabling/disabling buttons
  const checkScrollButtons = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const scrollLeft = Math.abs(el.scrollLeft); // Math.abs عشان RTL بيرجع سالب
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollPrev(scrollLeft > 5);
    setCanScrollNext(scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    checkScrollButtons();
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScrollButtons, { passive: true });
    return () => el.removeEventListener("scroll", checkScrollButtons);
  }, [products]);

  // Universal scroll - يعتمد على اتجاه visual مش على الـ scrollLeft
  const scrollByAmount = (direction) => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    const scrollAmount = el.offsetWidth * 0.7;

    // في RTL, scrollBy مع قيمة موجبة بيتحرك لليسار (visually forward)
    // في LTR, scrollBy مع قيمة موجبة بيتحرك لليمين (visually forward)
    // فبنستخدم "next" و "prev" بمعناهم البصري
    const delta = direction === "next" ? scrollAmount : -scrollAmount;

    el.scrollBy({
      left: isAr ? -delta : delta,
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-400 font-arabicMedium text-lg">
          {isAr ? "لا توجد منتجات متاحة حالياً" : "No products available"}
        </p>
      </div>
    );
  }

  return (
    <div className="relative group w-full px-2 md:px-6">
      {/* زرار "السابق" - يمين في العربي، شمال في الانجليزي */}
      <button
        onClick={() => scrollByAmount("prev")}
        disabled={!canScrollPrev}
        aria-label={isAr ? "التالي" : "Previous"}
        className={`absolute top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/95 backdrop-blur border border-gray-100 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-white disabled:opacity-0 disabled:cursor-not-allowed ${
          isAr ? "right-0 md:right-2" : "left-0 md:left-2"
        }`}
      >
        {isAr ? (
          <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>

      {/* الحاوية القابلة للسحب - dir يتحكم في الاتجاه تلقائيًا */}
      <div
        ref={carouselRef}
        dir={isAr ? "rtl" : "ltr"}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-10 pt-4 px-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        {products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((product, index) => (
            <div
              key={product.id || index}
              className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[280px]"
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
                desc={parse(
                  String(
                    product?.product_translations?.find(
                      (item) =>
                        (item.locale || item.local || "").toLowerCase() ===
                        local?.toLowerCase(),
                    )?.description ||
                      product?.product_translations?.[0]?.description ||
                      "",
                  ),
                )}
                product_name={
                  product.product_translations?.find(
                    (item) =>
                      (item.locale || item.local || "").toLowerCase() ===
                      local?.toLowerCase(),
                  )?.nameProduct ||
                  product?.product_translations?.[0]?.nameProduct ||
                  product?.name ||
                  ""
                }
              />
            </div>
          ))}
      </div>

      {/* زرار "التالي" - شمال في العربي، يمين في الانجليزي */}
      <button
        onClick={() => scrollByAmount("next")}
        disabled={!canScrollNext}
        aria-label={isAr ? "السابق" : "Next"}
        className={`absolute top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/95 backdrop-blur border border-gray-100 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary hover:text-white disabled:opacity-0 disabled:cursor-not-allowed ${
          isAr ? "left-0 md:left-2" : "right-0 md:right-2"
        }`}
      >
        {isAr ? (
          <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
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
