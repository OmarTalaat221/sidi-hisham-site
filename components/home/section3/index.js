import axios from "axios";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

export default function Tabs() {
  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const tabsAr = ["آخر المنتجات", "الأكثر مبيعاً", "عروض خاصة"];
  const tabsEn = ["Latest Products", "Best Sellers", "Special Offers"];
  const tabs = isAr ? tabsAr : tabsEn;

  const [activeTab, setActiveTab] = useState(0);
  const [pillStyle, setPillStyle] = useState({
    width: 0,
    transform: "translate3d(0,0,0)",
  });

  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);

  const [products, setProducts] = useState([]);
  const [bestSold, setBestSold] = useState([]);
  const [specialOfferProducts, setSpecialOfferProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get(
          "https://api.sedihisham.com/products/allProducts",
        );
        setProducts(prodRes?.data || []);

        const bestRes = await axios.get(
          "https://api.sedihisham.com/products/allProducts/bestsold",
        );
        setBestSold(bestRes?.data || []);

        const offersRes = await axios.get(
          "https://api.sedihisham.com/products/allProducts/offersproduct",
        );
        const offersData = await Promise.all(
          offersRes.data.map(async (item) => {
            const result = await axios.get(
              `https://api.sedihisham.com/products/${item.id}`,
            );
            return result.data;
          }),
        );
        setSpecialOfferProducts(offersData || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // حساب موضع الـ Pill - Hardware accelerated
  const updatePillPosition = useCallback(() => {
    const activeTabEl = tabRefs.current[activeTab];
    const container = tabsContainerRef.current;
    if (!activeTabEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTabEl.getBoundingClientRect();

    const offsetLeft = tabRect.left - containerRect.left;

    setPillStyle({
      width: tabRect.width,
      transform: `translate3d(${offsetLeft}px, 0, 0)`,
    });
  }, [activeTab]);

  // نستخدم useLayoutEffect عشان يحصل الحساب قبل الـ paint
  useLayoutEffect(() => {
    updatePillPosition();
  }, [updatePillPosition, isAr]);

  // إعادة الحساب لو الشاشة اتغير حجمها
  useEffect(() => {
    let rafId;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePillPosition);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [updatePillPosition]);

  const getActiveData = () => {
    if (activeTab === 0) return products;
    if (activeTab === 1) return bestSold;
    if (activeTab === 2) return specialOfferProducts;
    return [];
  };

  return (
    <div className="w-full relative z-30 py-6 md:py-8 px-2 sm:px-4">
      <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
        <div
          ref={tabsContainerRef}
          dir={isAr ? "rtl" : "ltr"}
          className="relative flex items-center p-1.5 bg-white border border-gray-100 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.04)] w-fit max-w-full"
        >
          {/* Pill Indicator - Hardware Accelerated */}
          <div
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 bg-primary rounded-full shadow-md will-change-transform"
            style={{
              width: `${pillStyle.width}px`,
              transform: pillStyle.transform,
              transition:
                "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              left: 0,
            }}
          />

          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(index)}
                className={`relative px-5 sm:px-8 md:px-10 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-arabicMedium whitespace-nowrap z-10 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto">
        <div className="w-full animate-fade-in" key={activeTab}>
          <Carousel products={getActiveData()} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate3d(0, 10px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
