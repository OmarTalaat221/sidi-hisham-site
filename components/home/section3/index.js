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
    transform: "translate3d(0, 0, 0)",
  });

  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);

  const [products, setProducts] = useState([]);
  const [bestSold, setBestSold] = useState([]);
  const [specialOfferProducts, setSpecialOfferProducts] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const prodRes = await axios.get(
          "https://api.sedihisham.com/products/allProducts",
        );

        if (!isCancelled) {
          setProducts(Array.isArray(prodRes?.data) ? prodRes.data : []);
        }

        const bestRes = await axios.get(
          "https://api.sedihisham.com/products/allProducts/bestsold",
        );

        if (!isCancelled) {
          setBestSold(Array.isArray(bestRes?.data) ? bestRes.data : []);
        }

        const offersRes = await axios.get(
          "https://api.sedihisham.com/products/allProducts/offersproduct",
        );

        const offerItems = Array.isArray(offersRes?.data) ? offersRes.data : [];

        const offersData = await Promise.all(
          offerItems.map(async (item) => {
            const result = await axios.get(
              `https://api.sedihisham.com/products/${item.id}`,
            );

            return result?.data;
          }),
        );

        if (!isCancelled) {
          setSpecialOfferProducts(offersData.filter(Boolean));
        }
      } catch {
        if (!isCancelled) {
          setProducts([]);
          setBestSold([]);
          setSpecialOfferProducts([]);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const updatePillPosition = useCallback(() => {
    const activeTabElement = tabRefs.current[activeTab];
    const tabsContainer = tabsContainerRef.current;

    if (!activeTabElement || !tabsContainer) {
      return;
    }

    const containerRect = tabsContainer.getBoundingClientRect();
    const tabRect = activeTabElement.getBoundingClientRect();
    const offsetLeft = tabRect.left - containerRect.left;

    setPillStyle({
      width: tabRect.width,
      transform: `translate3d(${offsetLeft}px, 0, 0)`,
    });
  }, [activeTab]);

  useLayoutEffect(() => {
    updatePillPosition();
  }, [updatePillPosition, isAr]);

  useEffect(() => {
    const container = tabsContainerRef.current;

    if (!container) {
      return undefined;
    }

    let animationFrameId;

    const requestPositionUpdate = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        updatePillPosition();
      });
    };

    window.addEventListener("resize", requestPositionUpdate, {
      passive: true,
    });

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(requestPositionUpdate);

      resizeObserver.observe(container);

      tabRefs.current.forEach((tabElement) => {
        if (tabElement) {
          resizeObserver.observe(tabElement);
        }
      });
    }

    requestPositionUpdate();

    return () => {
      window.removeEventListener("resize", requestPositionUpdate);
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [updatePillPosition, isAr]);

  const getActiveData = () => {
    if (activeTab === 0) {
      return products;
    }

    if (activeTab === 1) {
      return bestSold;
    }

    if (activeTab === 2) {
      return specialOfferProducts;
    }

    return [];
  };

  return (
    <section
      className="relative z-30 w-full px-2 py-6 sm:px-4 md:py-8"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mb-6 flex flex-col items-center justify-center md:mb-8">
        <div
          ref={tabsContainerRef}
          role="tablist"
          aria-label={isAr ? "أقسام المنتجات" : "Product sections"}
          className="
            relative flex max-w-full items-center rounded-full
            border border-gray-100 bg-white p-1.5
            shadow-[0_8px_20px_rgba(0,0,0,0.05)]
          "
        >
          <div
            aria-hidden="true"
            className="
              absolute bottom-1.5 left-0 top-1.5
              rounded-full bg-primary
              shadow-[0_5px_14px_rgba(212,0,23,0.25)]
              will-change-transform
            "
            style={{
              width: `${pillStyle.width}px`,
              transform: pillStyle.transform,
              transition:
                "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {tabs.map((tab, index) => {
            const isActive = activeTab === index;

            return (
              <button
                key={tab}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(index)}
                className={`
                  relative z-10 whitespace-nowrap rounded-full
                  px-3 py-2 text-[11px] font-arabicMedium
                  transition-colors duration-300
                  min-[360px]:px-4 min-[360px]:text-xs
                  sm:px-8 sm:py-2.5 sm:text-sm
                  md:px-10 md:py-3 md:text-base
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div key={activeTab} className="animate-fade-in w-full">
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
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
