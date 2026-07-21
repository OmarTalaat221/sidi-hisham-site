/* eslint-disable react/jsx-key */

import OptimizedImage from "@/components/common/OptimizedImage";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ElasticCarousel({ sliderImages = [] }) {
  const swiperRef = useRef(null);

  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

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

    return `https://api.sedihisham.com/${normalizedSrc.replace(/^\/+/, "")}`;
  }

  const secondSliderImages = useMemo(() => {
    if (!Array.isArray(sliderImages)) {
      return [];
    }

    return sliderImages.filter(
      (item) =>
        item?.categoryImage === "home_page_second_slider" &&
        typeof item?.path_image === "string" &&
        item.path_image.trim() !== "",
    );
  }, [sliderImages]);

  const showControls = secondSliderImages.length > 1;

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  if (secondSliderImages.length === 0) {
    return null;
  }

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="second-home-slider w-full overflow-hidden bg-white py-7 sm:py-9 lg:py-11"
    >
      <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-5 lg:px-8">
        <div className="relative w-full rounded-[26px] bg-white sm:rounded-[34px] sm:p-2">
          <div className="second-home-swiper-frame relative w-full overflow-hidden rounded-[21px] bg-white sm:rounded-[28px]">
            <Swiper
              key={isAr ? "second-slider-ar" : "second-slider-en"}
              dir={isAr ? "rtl" : "ltr"}
              modules={[Pagination, A11y]}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={0}
              speed={700}
              loop={false}
              rewind={showControls}
              watchOverflow
              observer
              observeParents
              resizeObserver
              pagination={
                showControls
                  ? {
                      clickable: true,
                      dynamicBullets: false,
                    }
                  : false
              }
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="second-home-swiper h-full w-full"
            >
              {secondSliderImages.map((item, index) => (
                <SwiperSlide
                  key={item?.id || `${item.path_image}-${index}`}
                  className="second-home-swiper-slide"
                >
                  <div className="relative h-full w-full overflow-hidden bg-white">
                    <OptimizedImage
                      alt={
                        isAr
                          ? `صورة سيدي هشام ${index + 1}`
                          : `Sedi Hisham image ${index + 1}`
                      }
                      src={`https://api.sedihisham.com/${item.path_image}`}
                      loader={GraphCMSImageLoader}
                      fill
                      priority={index === 0}
                      showSkeleton
                      objectFit="cover"
                      objectPosition="center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1535px) 94vw, 1500px"
                      quality={90}
                      wrapperClassName="h-full w-full"
                      className="h-full w-full transition-transform duration-[1000ms] ease-out"
                      skeletonClassName="bg-white"
                    />

                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {showControls && (
              <>
                <button
                  type="button"
                  onClick={handlePrevious}
                  aria-label={isAr ? "الصورة السابقة" : "Previous image"}
                  className={`second-slider-arrow absolute top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#720914]/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#FFD62D] hover:bg-[#920C20] hover:text-[#FFD62D] sm:h-12 sm:w-12 ${
                    isAr ? "right-3 sm:right-5" : "left-3 sm:left-5"
                  }`}
                >
                  {isAr ? (
                    <ArrowRight
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      strokeWidth={1.8}
                    />
                  ) : (
                    <ArrowLeft
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      strokeWidth={1.8}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={isAr ? "الصورة التالية" : "Next image"}
                  className={`second-slider-arrow absolute top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#720914]/90 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#FFD62D] hover:bg-[#920C20] hover:text-[#FFD62D] sm:h-12 sm:w-12 ${
                    isAr ? "left-3 sm:left-5" : "right-3 sm:right-5"
                  }`}
                >
                  {isAr ? (
                    <ArrowLeft
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      strokeWidth={1.8}
                    />
                  ) : (
                    <ArrowRight
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .second-home-slider {
          background-color: #ffffff !important;
        }

        /*
          الموبايل يحافظ على النسبة الأصلية للصورة.
        */
        .second-home-swiper-frame {
          width: 100%;
          aspect-ratio: 2048 / 1365;
          min-height: 0;
        }

        .second-home-swiper {
          position: relative;
          width: 100%;
          height: 100% !important;
          overflow: hidden;
          background: #ffffff;
        }

        .second-home-swiper .swiper-wrapper {
          width: 100%;
          height: 100% !important;
          align-items: stretch !important;
        }

        .second-home-swiper .swiper-slide {
          position: relative;
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden;
          background: #ffffff;
        }

        .second-home-swiper .swiper-slide > div {
          width: 100%;
          height: 100%;
        }

        .second-home-swiper .swiper-slide img {
          display: block;
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          object-fit: cover !important;
          object-position: center !important;
        }

        .second-home-swiper .swiper-slide-active img {
          transform: scale(1.005);
        }

        .second-home-swiper .swiper-pagination {
          position: absolute !important;
          right: auto !important;
          bottom: 14px !important;
          left: 50% !important;
          z-index: 30 !important;
          display: flex !important;
          width: auto !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          padding: 7px 11px !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 9999px !important;
          background: rgba(35, 0, 5, 0.5) !important;
          backdrop-filter: blur(10px) !important;
          transform: translateX(-50%) !important;
        }

        .second-home-swiper .swiper-pagination-bullet {
          width: 13px !important;
          height: 6px !important;
          margin: 0 !important;
          border-radius: 9999px !important;
          background: rgba(255, 255, 255, 0.7) !important;
          opacity: 1 !important;
          transition:
            width 0.35s ease,
            background-color 0.35s ease,
            box-shadow 0.35s ease !important;
        }

        .second-home-swiper .swiper-pagination-bullet-active {
          width: 34px !important;
          background: #ffd62d !important;
          box-shadow: 0 0 12px rgba(255, 214, 45, 0.8) !important;
        }

        .second-slider-arrow {
          direction: ltr;
        }

        /*
          التابلت:
          ارتفاع محدود بدل زيادة الارتفاع مع العرض.
        */
        @media (min-width: 641px) and (max-width: 1023px) {
          .second-home-swiper-frame {
            height: clamp(380px, 52vw, 520px);
            aspect-ratio: auto;
          }
        }

        /*
          الديسكتوب واللابتوب:
          أقصى ارتفاع 600px.
        */
        @media (min-width: 1024px) {
          .second-home-swiper-frame {
            height: clamp(470px, 38vw, 600px);
            aspect-ratio: auto;
          }
        }

        /*
          الشاشات الكبيرة جدًا لا تكبر السلايدر.
        */
        @media (min-width: 1600px) {
          .second-home-swiper-frame {
            height: 600px;
          }
        }

        @media (max-width: 640px) {
          .second-home-slider {
            padding-top: 26px !important;
            padding-bottom: 26px !important;
          }

          .second-home-swiper-frame {
            aspect-ratio: 2048 / 1365;
          }

          .second-home-swiper .swiper-pagination {
            bottom: 10px !important;
            gap: 5px !important;
            padding: 6px 9px !important;
          }

          .second-home-swiper .swiper-pagination-bullet {
            width: 10px !important;
            height: 5px !important;
          }

          .second-home-swiper .swiper-pagination-bullet-active {
            width: 27px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .second-home-slider *,
          .second-home-slider *::before,
          .second-home-slider *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
