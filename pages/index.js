import SEO from "@/components/SEO";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/home/Slider";
import SponsorSection from "../components/home/section5";
import { setConversions } from "../redux/languageSlice";

const Tabss = dynamic(() => import("../components/home/section3"), {
  ssr: false,
  loading: () => <div className="h-[430px] w-full bg-white" />,
});

const ElasticCarousel = dynamic(
  () => import("../components/home/section4/ElasticCarousel"),
  {
    ssr: false,
    loading: () => <div className="h-[420px] w-full bg-white" />,
  },
);

const NewsCarousel = dynamic(() => import("../components/news/NewsCarousel"), {
  ssr: false,
  loading: () => <div className="h-[420px] w-full bg-white" />,
});

const VideoImagesSlider = dynamic(
  () => import("../components/home/VideoImagesSlider"),
  {
    ssr: false,
    loading: () => <div className="h-[360px] w-full bg-white" />,
  },
);

const SponsorSlider = dynamic(
  () => import("../components/home/SponsorSlider"),
  {
    ssr: false,
    loading: () => <div className="h-40 w-full bg-white" />,
  },
);

function filterHomeSliderImages(data) {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(
    (item) =>
      item?.categoryImage === "home_page_main_slider" ||
      item?.categoryImage === "home_page_second_slider",
  );
}

function DeferredSection({
  children,
  minHeight = "300px",
  rootMargin = "500px 0px",
}) {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement || shouldRender) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: shouldRender ? undefined : minHeight,
      }}
    >
      {shouldRender ? children : null}
    </div>
  );
}

export default function Home({ initialSliderImages = [] }) {
  const dispatch = useDispatch();

  const { local } = useSelector((state) => state.language);

  const [sliderImages, setSliderImages] = useState(
    Array.isArray(initialSliderImages) ? initialSliderImages : [],
  );

  const [news, setNews] = useState([]);
  const [activities, setActivities] = useState([]);

  const getCurrencyConversions = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.sedihisham.com/currencies/findall",
      );

      dispatch(
        setConversions(Array.isArray(response?.data) ? response.data : []),
      );
    } catch {
      dispatch(setConversions([]));
    }
  }, [dispatch]);

  const getSliderImages = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.sedihisham.com/pages/getall/home",
      );

      const filteredImages = filterHomeSliderImages(response?.data);

      if (filteredImages.length > 0) {
        setSliderImages(filteredImages);
      }
    } catch {
      return;
    }
  }, []);

  const getNews = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.sedihisham.com/news/findall",
      );

      setNews(Array.isArray(response?.data) ? response.data : []);
    } catch {
      setNews([]);
    }
  }, []);

  const getActivities = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.sedihisham.com/activities/findall",
      );

      setActivities(Array.isArray(response?.data) ? response.data : []);
    } catch {
      setActivities([]);
    }
  }, []);

  useEffect(() => {
    getCurrencyConversions();
  }, [getCurrencyConversions]);

  useEffect(() => {
    if (initialSliderImages.length === 0) {
      getSliderImages();
    }
  }, [getSliderImages, initialSliderImages.length]);

  useEffect(() => {
    let timeoutId;

    const loadSecondaryData = () => {
      timeoutId = window.setTimeout(() => {
        getNews();
        getActivities();

        if (initialSliderImages.length > 0) {
          getSliderImages();
        }
      }, 1200);
    };

    if (document.readyState === "complete") {
      loadSecondaryData();
    } else {
      window.addEventListener("load", loadSecondaryData, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("load", loadSecondaryData);
      window.clearTimeout(timeoutId);
    };
  }, [getNews, getActivities, getSliderImages, initialSliderImages.length]);

  return (
    <div className="w-full overflow-hidden bg-white">
      <Head>
        <link rel="preconnect" href="https://api.sedihisham.com" />
        <link rel="dns-prefetch" href="https://api.sedihisham.com" />
      </Head>

      <SEO
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة يتم استخدامها في ملايين غرف المعيشة والمطابخ"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة, مطابخ, غرف معيشة, غذائيات, صناعة"
        image="https://www.sedihisham.com/images/logo.png"
      />

      <h1 className="sr-only">سيدي هشام - شركة العقاد للصناعة والتجارة</h1>

      <Slider sliderImages={sliderImages} />

      <section className="faviconhomecarousal pattern-section pattern-section-wheat relative z-[60] mt-8 w-full md:mt-12">
        <div className="home-content-shell">
          <DeferredSection minHeight="430px" rootMargin="350px 0px">
            <Tabss />
          </DeferredSection>
        </div>
      </section>

      <section className="mt-8 w-full bg-white md:mt-12">
        <div className="home-content-shell">
          <DeferredSection minHeight="420px" rootMargin="500px 0px">
            <ElasticCarousel sliderImages={sliderImages} />
          </DeferredSection>
        </div>
      </section>

      <section
        dir={local === "ar" ? "rtl" : "ltr"}
        className="pattern-section pattern-section-wheat relative mt-10 w-full overflow-hidden bg-white md:mt-12"
      >
        <div className="home-content-shell relative z-10 py-10 sm:py-12 lg:py-14">
          <div className="mb-6 flex w-full flex-col items-center justify-center text-center md:mb-8">
            <h2 className="font-arabicBold text-xl tracking-wide text-gray-900 sm:text-2xl">
              {local === "ar"
                ? "معرض الصور والفيديو"
                : "Photo and video gallery"}
            </h2>

            <span className="mt-3 h-[3px] w-14 rounded-full bg-[#D40017]" />
          </div>

          <Suspense
            fallback={
              <div className="h-[360px] w-full animate-pulse bg-gray-100/70" />
            }
          >
            <VideoImagesSlider />
          </Suspense>
        </div>
      </section>

      <section
        dir={local === "ar" ? "rtl" : "ltr"}
        className="pattern-section pattern-section-spices relative w-full overflow-hidden bg-white"
      >
        <div className="home-content-shell relative z-10 py-10 sm:py-12 lg:py-14">
          <DeferredSection minHeight="420px" rootMargin="650px 0px">
            <NewsCarousel
              type="homepage"
              news={[...news]}
              activities={activities}
            />
          </DeferredSection>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="home-content-shell mb-8 mt-10 md:mb-12 md:mt-12">
          <SponsorSection
            title={local === "ar" ? "العلامات التجارية" : "Trademarks"}
            desc={
              local === "ar"
                ? "بمفردنا لا نستطيع فعل الكثير ؛ معًا يمكننا أن نفعل الكثير"
                : "On our own we can do little; Together we can do a lot"
            }
          />

          <DeferredSection minHeight="160px" rootMargin="700px 0px">
            <SponsorSlider />
          </DeferredSection>
        </div>
      </section>

      <style jsx global>{`
        .home-content-shell {
          width: calc(100% - 24px);
          max-width: 1380px;
          margin-inline: auto;
          padding-inline: 12px;
        }

        .pattern-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          margin-inline: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background-color: #ffffff !important;
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

        .home-content-shell .second-home-slider > div {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
          padding-inline: 0 !important;
        }

        .home-content-shell .gallery-slider-container {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
          padding-inline: 0 !important;
        }

        .home-content-shell .news-carousel-section {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding-inline: 0 !important;
          background: transparent !important;
        }

        .home-content-shell .news-carousel-section > div {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
          padding-inline: 0 !important;
        }

        .home-content-shell .sponsor-slider-section {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
          padding-inline: 0 !important;
        }

        @media (max-width: 639px) {
          .home-content-shell {
            width: calc(100% - 16px);
            padding-inline: 8px;
          }

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

export async function getStaticProps() {
  try {
    const response = await axios.get(
      "https://api.sedihisham.com/pages/getall/home",
      {
        timeout: 15000,
      },
    );

    return {
      props: {
        initialSliderImages: filterHomeSliderImages(response?.data),
      },
    };
  } catch {
    return {
      props: {
        initialSliderImages: [],
      },
    };
  }
}
