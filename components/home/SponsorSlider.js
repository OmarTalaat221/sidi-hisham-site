/* eslint-disable react/jsx-key */

import OptimizedImage from "@/components/common/OptimizedImage";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const API_BASE_URL = "https://api.sedihisham.com/";

function SponsorSlider() {
  const { local } = useSelector((state) => state.language);

  const isRTL = local === "ar";

  const sectionRef = useRef(null);

  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [revealFinished, setRevealFinished] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getSliderImages = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          "https://api.sedihisham.com/pages/getall/home",
        );

        if (!isMounted) return;

        const slideImages = Array.isArray(response?.data)
          ? response.data.filter(
              (item) =>
                item?.categoryImage === "trademarks" &&
                typeof item?.path_image === "string" &&
                item.path_image.trim() !== "",
            )
          : [];

        setSliderImages(slideImages);
      } catch (error) {
        console.error("Error fetching slider images:", error);

        if (isMounted) {
          setSliderImages([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getSliderImages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement || hasEnteredView) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, [hasEnteredView]);

  useEffect(() => {
    if (!hasEnteredView || sliderImages.length === 0 || revealFinished) {
      return;
    }

    const revealTimer = setTimeout(() => {
      setRevealFinished(true);
    }, 1600);

    return () => {
      clearTimeout(revealTimer);
    };
  }, [hasEnteredView, sliderImages.length, revealFinished]);

  function GraphCMSImageLoader({ src }) {
    if (!src || typeof src !== "string") {
      return "/images/eim.png";
    }

    const normalizedSrc = src.trim();

    if (!normalizedSrc) {
      return "/images/eim.png";
    }

    if (
      normalizedSrc.startsWith("http://") ||
      normalizedSrc.startsWith("https://")
    ) {
      return normalizedSrc;
    }

    return `${API_BASE_URL}${normalizedSrc.replace(/^\/+/, "")}`;
  }

  const breakpoints = useMemo(
    () => ({
      320: {
        slidesPerView: 1,
        spaceBetween: 14,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 18,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 22,
      },
    }),
    [],
  );

  return (
    <section
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="sponsor-slider-section w-full overflow-hidden bg-white py-3"
    >
      {isLoading ? (
        <div className="grid w-full grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[190px] animate-pulse rounded-[26px] border border-[#D40017]/10 bg-[#D40017]/5"
            />
          ))}
        </div>
      ) : sliderImages.length === 0 ? (
        <div className="flex min-h-[180px] w-full items-center justify-center rounded-[24px] border border-dashed border-gray-200 bg-white px-5 text-center">
          <p className="font-arabicLight text-sm text-gray-400">
            {isRTL
              ? "لا توجد علامات تجارية لعرضها"
              : "There are no trademarks to display"}
          </p>
        </div>
      ) : (
        <Swiper
          key={`sponsor-slider-${local}-${sliderImages.length}`}
          dir={isRTL ? "rtl" : "ltr"}
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={14}
          speed={5200}
          loop={sliderImages.length > 1}
          loopAdditionalSlides={sliderImages.length}
          autoplay={
            sliderImages.length > 1
              ? {
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                  waitForTransition: true,
                }
              : false
          }
          allowTouchMove
          grabCursor={sliderImages.length > 1}
          watchOverflow
          observer
          observeParents
          resizeObserver
          breakpoints={breakpoints}
          className="sponsor-brands-swiper w-full"
        >
          {sliderImages.map((item, index) => (
            <SwiperSlide
              key={item?.id || `${item.path_image}-${index}`}
              className="sponsor-brand-slide h-auto"
            >
              <div className="sponsor-glass-card group relative flex h-[190px] w-full items-center justify-center overflow-hidden rounded-[26px] border border-[#D40017]/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,255,255,0.72),rgba(212,0,23,0.04))] p-1.5 backdrop-blur-xl transition-colors duration-500 hover:border-[#D40017]/30 sm:h-[200px] lg:h-[210px]">
                <div className="pointer-events-none absolute inset-[5px] rounded-[21px] border border-white/80" />

                <div className="relative z-10 h-full w-full">
                  <OptimizedImage
                    loader={GraphCMSImageLoader}
                    src={`${API_BASE_URL}${item.path_image.replace(
                      /^\/+/,
                      "",
                    )}`}
                    alt={
                      isRTL
                        ? `العلامة التجارية ${index + 1}`
                        : `Trademark ${index + 1}`
                    }
                    fill
                    showSkeleton={false}
                    objectFit="contain"
                    objectPosition="center"
                    sizes="(max-width: 479px) 90vw, (max-width: 767px) 46vw, (max-width: 1023px) 31vw, (max-width: 1399px) 23vw, 250px"
                    quality={90}
                    className="p-0 transition-transform duration-500 ease-out group-hover:scale-[1.055]"
                  />
                </div>

                {hasEnteredView && !revealFinished && (
                  <>
                    <div className="sponsor-card-reveal pointer-events-none absolute inset-0 z-30 rounded-[26px] bg-[linear-gradient(120deg,#6F0715_0%,#D40017_55%,#A30719_100%)]" />

                    <div className="sponsor-reveal-light pointer-events-none absolute inset-y-0 z-40 w-[28%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/65 to-transparent" />
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style jsx global>{`
        .sponsor-slider-section,
        .sponsor-slider-section *,
        .sponsor-slider-section *::before,
        .sponsor-slider-section *::after {
          box-sizing: border-box;
        }

        .sponsor-brands-swiper {
          width: 100%;
          overflow: hidden;
        }

        .sponsor-brands-swiper .swiper-wrapper {
          align-items: stretch;
          transition-timing-function: linear !important;
        }

        .sponsor-brands-swiper .swiper-slide {
          display: flex;
          height: auto;
          align-items: stretch;
        }

        .sponsor-glass-card {
          box-shadow: none !important;
        }

        .sponsor-card-reveal {
          transform: translateX(0);
          animation: sponsorCardRevealOnce 1.35s cubic-bezier(0.77, 0, 0.18, 1)
            forwards;
          will-change: transform;
        }

        .sponsor-reveal-light {
          inset-inline-start: -38%;
          opacity: 0;
          animation: sponsorRevealLightOnce 1.35s cubic-bezier(0.77, 0, 0.18, 1)
            forwards;
          will-change: inset-inline-start, opacity;
        }

        @keyframes sponsorCardRevealOnce {
          0%,
          16% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(110%);
          }
        }

        @keyframes sponsorRevealLightOnce {
          0%,
          12% {
            inset-inline-start: -38%;
            opacity: 0;
          }

          25% {
            opacity: 0.75;
          }

          100% {
            inset-inline-start: 120%;
            opacity: 0;
          }
        }

        @media (max-width: 479px) {
          .sponsor-glass-card {
            height: 190px !important;
            padding: 4px !important;
          }
        }

        @media (min-width: 480px) and (max-width: 767px) {
          .sponsor-glass-card {
            height: 185px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sponsor-card-reveal,
          .sponsor-reveal-light {
            display: none !important;
          }

          .sponsor-brands-swiper .swiper-wrapper {
            transition-duration: 0.01ms !important;
          }

          .sponsor-glass-card img {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

export default SponsorSlider;
