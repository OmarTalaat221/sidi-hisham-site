import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ActivitiesCarousel from "./ActivitiesCarousel";
import NewsCarousel from "./NewsCarousel";

const tabItems = [
  {
    key: "national",
    type: "activities",
    category: "national",
    labelAr: "فعاليات سورية",
    labelEn: "Activities in Syria",
    titleAr: "الفعاليات داخل سورية",
    titleEn: "Activities in Syria",
    descriptionAr:
      "استعرض المشاركات والفعاليات التي تخص سيدي هشام داخل السوق السوري.",
    descriptionEn:
      "Browse the activities and participations related to Sedi Hisham inside the Syrian market.",
  },
  {
    key: "international",
    type: "activities",
    category: "international",
    labelAr: "فعاليات عالمية",
    labelEn: "International Activities",
    titleAr: "الفعاليات خارج سورية",
    titleEn: "International Activities",
    descriptionAr: "مجموعة من الفعاليات والمشاركات الخارجية الخاصة بسيدي هشام.",
    descriptionEn:
      "A selection of Sedi Hisham international activities and participations.",
  },
  {
    key: "news",
    type: "news",
    labelAr: "أخبار",
    labelEn: "News",
    titleAr: "أخبار الشركة",
    titleEn: "Company News",
    descriptionAr:
      "آخر المستجدات والأخبار المتعلقة بالشركة ومنتجاتها وأنشطتها.",
    descriptionEn:
      "The latest company updates, announcements, products, and related news.",
  },
];

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-[0_10px_25px_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.03)]"
        >
          <div className="h-[220px] animate-pulse bg-gray-100" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-24 animate-pulse rounded-full bg-gray-100" />
            <div className="h-6 w-[82%] animate-pulse rounded-lg bg-gray-100" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded-lg bg-gray-100" />
              <div className="h-4 w-[90%] animate-pulse rounded-lg bg-gray-100" />
              <div className="h-4 w-[70%] animate-pulse rounded-lg bg-gray-100" />
            </div>
            <div className="pt-3">
              <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Tabs() {
  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const [activeTab, setActiveTab] = useState(0);
  const [news, setNews] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const tabsContainerRef = useRef(null);
  const tabRefs = useRef([]);

  const [pillStyle, setPillStyle] = useState({
    width: 0,
    transform: "translate3d(0,0,0)",
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const [newsResponse, activitiesResponse] = await Promise.all([
        axios.get("https://api.sedihisham.com/news/findall"),
        axios.get("https://api.sedihisham.com/activities/findall"),
      ]);

      const newsData = Array.isArray(newsResponse?.data)
        ? [...newsResponse.data].reverse()
        : [];

      const activitiesData = Array.isArray(activitiesResponse?.data)
        ? [...activitiesResponse.data].reverse()
        : [];

      setNews(newsData);
      setActivities(activitiesData);
    } catch {
      setNews([]);
      setActivities([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const [newsResponse, activitiesResponse] = await Promise.all([
          axios.get("https://api.sedihisham.com/news/findall"),
          axios.get("https://api.sedihisham.com/activities/findall"),
        ]);

        if (isCancelled) {
          return;
        }

        const newsData = Array.isArray(newsResponse?.data)
          ? [...newsResponse.data].reverse()
          : [];

        const activitiesData = Array.isArray(activitiesResponse?.data)
          ? [...activitiesResponse.data].reverse()
          : [];

        setNews(newsData);
        setActivities(activitiesData);
      } catch {
        if (!isCancelled) {
          setNews([]);
          setActivities([]);
          setHasError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const updatePillPosition = useCallback(() => {
    const activeElement = tabRefs.current[activeTab];

    if (!activeElement) {
      return;
    }

    setPillStyle({
      width: activeElement.offsetWidth,
      transform: `translate3d(${activeElement.offsetLeft}px, 0, 0)`,
    });
  }, [activeTab]);

  useEffect(() => {
    let frameId = requestAnimationFrame(() => {
      updatePillPosition();
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [updatePillPosition, local]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let frameId;

    const requestUpdate = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        updatePillPosition();
      });
    };

    window.addEventListener("resize", requestUpdate, { passive: true });

    let resizeObserver;

    if (typeof ResizeObserver !== "undefined" && tabsContainerRef.current) {
      resizeObserver = new ResizeObserver(requestUpdate);

      resizeObserver.observe(tabsContainerRef.current);

      tabRefs.current.forEach((element) => {
        if (element) {
          resizeObserver.observe(element);
        }
      });
    }

    return () => {
      window.removeEventListener("resize", requestUpdate);
      resizeObserver?.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [updatePillPosition, local]);

  const handleKeyDown = (event, index) => {
    const lastIndex = tabItems.length - 1;

    if (event.key === "Home") {
      event.preventDefault();
      setActiveTab(0);
      tabRefs.current[0]?.focus();
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveTab(lastIndex);
      tabRefs.current[lastIndex]?.focus();
      return;
    }

    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();

    const moveForward = isAr
      ? event.key === "ArrowLeft"
      : event.key === "ArrowRight";

    const nextIndex = moveForward
      ? (index + 1) % tabItems.length
      : (index - 1 + tabItems.length) % tabItems.length;

    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const activeConfig = tabItems[activeTab] || tabItems[0];

  const filteredActivities =
    activeConfig.type === "activities"
      ? activities.filter(
          (activity) => activity?.category === activeConfig.category,
        )
      : [];

  const renderPanelContent = () => {
    if (isLoading) {
      return <LoadingGrid />;
    }

    if (hasError) {
      return (
        <div className="flex min-h-[240px] items-center justify-center rounded-[22px] border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center">
          <div>
            <p className="font-arabicMedium text-base text-gray-700 sm:text-lg">
              {isAr
                ? "تعذر تحميل المحتوى حاليًا"
                : "Unable to load content right now"}
            </p>

            <button
              type="button"
              onClick={loadData}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#7C1422] px-6 py-2.5 font-arabicMedium text-sm text-white transition-colors duration-300 hover:bg-[#B80014] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C1422]"
            >
              {isAr ? "إعادة المحاولة" : "Try Again"}
            </button>
          </div>
        </div>
      );
    }

    if (activeConfig.type === "news") {
      return (
        <NewsCarousel
          local={local}
          hideHeader
          news={news}
          type="listing"
          emptyText={
            isAr ? "لا توجد أخبار لعرضها حاليًا" : "There is no news to show"
          }
        />
      );
    }

    return (
      <ActivitiesCarousel
        local={local}
        hideHeader
        activities={filteredActivities}
        emptyText={
          isAr
            ? "لا توجد فعاليات لعرضها حاليًا"
            : "There are no activities to show"
        }
      />
    );
  };

  return (
    <section
      className="relative px-3 pb-14 pt-8 sm:px-4 sm:pb-16 sm:pt-10 md:px-6 lg:px-8"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* باترن خفيفة جدًا من غير ما تغيّر شكل التصميم */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-16 h-[220px] w-[220px] opacity-[0.04] sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]"
          style={{
            backgroundImage:
              "url('/images/sedi-hisham-spices-pattern-transparent.webp')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 h-[220px] w-[220px] opacity-[0.035] sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px]"
          style={{
            backgroundImage:
              "url('/images/sedi-hisham-wheat-pattern-transparent.webp')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="font-arabicBold text-[24px] leading-[1.4] text-gray-900 sm:text-[28px] md:text-[32px]">
            {isAr ? "أخبار وفعاليات سيدي هشام" : "Sedi Hisham News & Events"}
          </h1>

          <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-[#7C1422]" />

          <p className="mx-auto mt-4 max-w-2xl font-arabicLight text-sm leading-7 text-gray-500 sm:text-[15px]">
            {isAr
              ? "اختر القسم الذي تريد تصفحه لعرض أخبار الشركة أو الفعاليات داخل سورية وخارجها."
              : "Choose the section you want to browse to view company news or activities in Syria and abroad."}
          </p>
        </div>

        <div className="overflow-x-auto pb-1 text-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            ref={tabsContainerRef}
            role="tablist"
            aria-label={
              isAr ? "تبويبات الأخبار والفعاليات" : "News and activities tabs"
            }
            className="relative inline-flex min-w-max items-center rounded-full border border-gray-100 bg-white p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.04)]"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-1.5 top-1.5 left-0 rounded-full bg-primary will-change-transform"
              style={{
                width: `${pillStyle.width}px`,
                transform: pillStyle.transform,
                transition:
                  "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {tabItems.map((item, index) => {
              const isActive = activeTab === index;

              return (
                <button
                  key={item.key}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`news-tab-${item.key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`news-panel-${item.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`relative z-10 rounded-full whitespace-nowrap px-4 py-2 text-[12px] font-arabicMedium transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm md:px-7 md:py-3 md:text-[15px] ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 rounded-[28px] py-4 sm:mt-8 sm:py-5 lg:py-6">
          <div
            key={activeConfig.key}
            id={`news-panel-${activeConfig.key}`}
            role="tabpanel"
            aria-labelledby={`news-tab-${activeConfig.key}`}
            className="news-panel-fade"
          >
            {renderPanelContent()}
          </div>
        </div>
      </div>

      <style jsx>{`
        .news-panel-fade {
          animation: fadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

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

        @media (prefers-reduced-motion: reduce) {
          .news-panel-fade {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
