import SEO from "@/components/SEO";
import axios from "axios";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabss from "../components/home/section3";
import SponsorSection from "../components/home/section5";
import { setConversions } from "../redux/languageSlice";
import { useWidth } from "../util/useWidth.ts";

const Slider = lazy(() => import("../components/home/Slider"));

const ElasticCarousel = lazy(
  () => import("../components/home/section4/ElasticCarousel"),
);

const NewsCarousel = lazy(() => import("../components/news/NewsCarousel"));

const VideoImagesSlider = lazy(
  () => import("../components/home/VideoImagesSlider"),
);

const SponsorSlider = lazy(() => import("../components/home/SponsorSlider"));

export default function Home({ type }) {
  const dispatch = useDispatch();

  const getCurrencyConversions = useCallback(async () => {
    await axios
      .get("https://api.sedihisham.com/currencies/findall")
      .then((response) => {
        dispatch(setConversions(response?.data));
      });
  }, [dispatch]);

  const [sliderImages, setSliderImages] = useState([]);

  const getSliderImages = useCallback(async () => {
    await axios
      .get("https://api.sedihisham.com/pages/getall/home")
      .then((response) => {
        setSliderImages(response?.data);
      });
  }, []);

  const [news, setNews] = useState([]);

  const getNews = useCallback(async () => {
    await axios
      .get("https://api.sedihisham.com/news/findall")
      .then((response) => {
        setNews(response?.data);
      });
  }, []);

  const [activities, setActivities] = useState([]);

  const getActivities = useCallback(async () => {
    await axios
      .get("https://api.sedihisham.com/activities/findall")
      .then((response) => {
        setActivities(response?.data);
      });
  }, []);

  useEffect(() => {
    getNews();
    getSliderImages();
    getCurrencyConversions();
    getActivities();
  }, [getNews, getSliderImages, getCurrencyConversions, getActivities]);

  const { isMobile } = useWidth();

  const { local } = useSelector((state) => state.language);

  return (
    <div className="w-full overflow-hidden bg-white">
      <SEO
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة يتم استخدامها في ملايين غرف المعيشة والمطابخ"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة, مطابخ, غرف معيشة, غذائيات, صناعة"
        image="https://www.sedihisham.com/images/logo.png"
      />

      <h1 className="sr-only">سيدي هشام - شركة العقاد للصناعة والتجارة</h1>

      <Suspense
        fallback={<div className="h-screen animate-pulse bg-gray-100" />}
      >
        <Slider sliderImages={sliderImages} />
      </Suspense>

      <div className="faviconhomecarousal pattern-section pattern-section-wheat relative z-[60] mt-8 md:mt-12">
        <Tabss />
      </div>

      <div className="mt-8 md:mt-12">
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
          <ElasticCarousel sliderImages={sliderImages} />
        </Suspense>
      </div>

      {/* معرض الصور والفيديو — باترن القمح */}
      <section
        dir={local === "ar" ? "rtl" : "ltr"}
        className="pattern-section pattern-section-wheat relative mt-10 w-full overflow-hidden bg-white md:mt-12"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="mb-6 flex w-full flex-col items-start justify-start text-start">
            <h2 className="font-arabicBold text-xl tracking-wide text-gray-900 sm:text-2xl">
              {local === "ar"
                ? "معرض الصور والفيديو"
                : "Photo and video gallery"}
            </h2>

            <span className="mt-3 h-[3px] w-14 rounded-full bg-[#D40017]" />
          </div>

          <Suspense
            fallback={<div className="h-64 animate-pulse bg-gray-100/70" />}
          >
            <VideoImagesSlider />
          </Suspense>
        </div>
      </section>

      {/* الأخبار والفعاليات — باترن البهارات */}
      <section
        dir={local === "ar" ? "rtl" : "ltr"}
        className="pattern-section pattern-section-spices relative w-full overflow-hidden bg-white"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <Suspense
            fallback={
              <div className="h-[420px] animate-pulse bg-gray-100/70" />
            }
          >
            <NewsCarousel
              type="homepage"
              news={[...news]}
              activities={activities}
            />
          </Suspense>
        </div>
      </section>

      <div className="mx-auto mb-8 mt-10 w-full max-w-[1380px] px-4 sm:px-6 md:mb-12 md:mt-12 lg:px-8">
        <SponsorSection
          title={local === "ar" ? "العلامات التجارية" : "Trademarks"}
          desc={
            local === "ar"
              ? "بمفردنا لا نستطيع فعل الكثير ؛ معًا يمكننا أن نفعل الكثير"
              : "On our own we can do little; Together we can do a lot"
          }
        />

        <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100" />}>
          <SponsorSlider />
        </Suspense>
      </div>

      <style jsx global>{`
        .pattern-section {
          position: relative;
          isolation: isolate;
          margin-inline: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          // background-color: #ffffff !important;
        }

        .pattern-section::before {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-repeat: repeat;
          background-position: center top;
          background-size: 560px 560px;
          opacity: 0.36;
          pointer-events: none;
          content: "";
        }

        .pattern-section-wheat::before {
          background-image: url("/images/sedi-hisham-wheat-pattern-transparent.webp");
        }

        .pattern-section-spices::before {
          background-image: url("/images/sedi-hisham-spices-pattern-transparent.webp");
        }

        .pattern-section-spices .news-carousel-section {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
        }

        .pattern-section-spices .news-carousel-section > div {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        @media (max-width: 639px) {
          .pattern-section::before {
            background-size: 420px 420px;
          }
        }

        @media (min-width: 1400px) {
          .pattern-section::before {
            background-size: 620px 620px;
          }
        }
      `}</style>
    </div>
  );
}
