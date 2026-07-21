import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import { useSelector } from "react-redux";
import Slogan from "../../public/images/slogen.png";

const DEFAULT_HERO_IMAGE =
  "https://api.sedihisham.com/uploads/category/images/ketchupcopy3b609725-f787-4dc9-8501-5df31cbd57bc.webp";

function getApiImageUrl(path) {
  if (!path || typeof path !== "string") {
    return "";
  }

  const normalizedPath = path.trim();

  if (!normalizedPath) {
    return "";
  }

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    return normalizedPath;
  }

  return `https://api.sedihisham.com/${normalizedPath.replace(/^\/+/, "")}`;
}

function SlideImage({ src, alt, priority }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  if (!src || errored) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      objectPosition="center center"
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="100vw"
      unoptimized
      draggable={false}
      onLoadingComplete={() => setLoaded(true)}
      onError={() => setErrored(true)}
      className={`hero-slider-image transition-opacity duration-500 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export default function Slider({
  sliderImages = [],
  initialHeroImage = DEFAULT_HERO_IMAGE,
}) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const carouselRef = useRef(null);
  const loopTimeoutRef = useRef(null);

  const slides = useMemo(() => {
    if (!Array.isArray(sliderImages)) {
      return [];
    }

    return sliderImages.filter(
      (item) =>
        item?.categoryImage === "home_page_main_slider" &&
        item?.externalLink === false &&
        typeof item?.path_image === "string" &&
        item.path_image.trim() !== "",
    );
  }, [sliderImages]);

  const firstSlideSrc = useMemo(() => {
    const firstSlideImage = getApiImageUrl(slides[0]?.path_image);

    return firstSlideImage || initialHeroImage || DEFAULT_HERO_IMAGE;
  }, [slides, initialHeroImage]);

  useEffect(() => {
    return () => {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || slides.length <= 1) {
      return undefined;
    }

    const preloadImages = slides.slice(1).map((item) => {
      const imageSrc = getApiImageUrl(item.path_image);
      const preloadImage = new window.Image();

      preloadImage.src = imageSrc;

      return preloadImage;
    });

    return () => {
      preloadImages.forEach((preloadImage) => {
        preloadImage.src = "";
      });
    };
  }, [slides]);

  const hasSlides = slides.length > 0;
  const showControls = slides.length > 1;

  const handleNextEnd = useCallback(
    ({ index }) => {
      if (!showControls || index !== slides.length - 1) {
        return;
      }

      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
      }

      loopTimeoutRef.current = setTimeout(() => {
        carouselRef.current?.goTo(0);
      }, 4500);
    },
    [showControls, slides.length],
  );

  const renderArrow = useCallback(
    ({ type, onClick, isEdge }) => {
      const isPreviousType = type === consts.PREV;

      const isPhysicalLeft = isAr ? !isPreviousType : isPreviousType;

      const arrowPosition = isPhysicalLeft
        ? "left-3 sm:left-4 md:left-5 xl:left-8"
        : "right-3 sm:right-4 md:right-5 xl:right-8";

      const arrowIcon = isPhysicalLeft ? "←" : "→";

      const ariaLabel = isPreviousType
        ? isAr
          ? "الشريحة السابقة"
          : "Previous slide"
        : isAr
          ? "الشريحة التالية"
          : "Next slide";

      return (
        <button
          type="button"
          onClick={onClick}
          disabled={isEdge}
          aria-label={ariaLabel}
          className={`
            absolute top-1/2 z-30 hidden
            -translate-y-1/2 md:flex
            ${arrowPosition}
            ${isEdge ? "cursor-not-allowed opacity-40" : ""}
          `}
        >
          <span
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full border border-white/20
              bg-white/10 text-white
              backdrop-blur-md
              transition-all duration-300
              hover:bg-white hover:text-primary
              md:h-11 md:w-11
            "
          >
            {arrowIcon}
          </span>
        </button>
      );
    },
    [isAr],
  );

  const renderPagination = useCallback(
    ({ pages, activePage, onClick }) => {
      if (!showControls) {
        return null;
      }

      return (
        <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-4 md:bottom-8">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onClick(page)}
              aria-label={
                isAr
                  ? `الانتقال إلى الشريحة ${page + 1}`
                  : `Go to slide ${page + 1}`
              }
              className={`h-[3px] rounded-full transition-all duration-500 ${
                activePage === page
                  ? "w-8 bg-[#FFD62D] shadow-[0_0_10px_#FFD62D] md:w-10"
                  : "w-4 bg-white/30 md:w-5"
              }`}
            />
          ))}
        </div>
      );
    },
    [isAr, showControls],
  );

  return (
    <section
      className="hero-responsive relative w-full overflow-hidden bg-white"
      style={{
        backgroundImage: firstSlideSrc ? `url("${firstSlideSrc}")` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {hasSlides && (
        <Carousel
          ref={carouselRef}
          renderArrow={showControls ? renderArrow : () => null}
          renderPagination={renderPagination}
          enableAutoPlay={showControls}
          autoPlaySpeed={4500}
          transitionMs={800}
          itemsToShow={1}
          onNextEnd={handleNextEnd}
          enableMouseSwipe={false}
          isRTL={isAr}
          showArrows={showControls}
          pagination={showControls}
          className="h-full w-full"
        >
          {slides.map((item, index) => {
            const imageSrc = getApiImageUrl(item.path_image);

            return (
              <div
                key={item.id || `${item.path_image}-${index}`}
                className="hero-slide-height relative w-full overflow-hidden bg-white"
                style={{
                  backgroundImage: imageSrc
                    ? `url("${imageSrc}")`
                    : `url("${firstSlideSrc}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <SlideImage
                  src={imageSrc}
                  alt={
                    isAr
                      ? `منتجات سيدي هشام - الشريحة ${index + 1}`
                      : `Sedi Hisham products - slide ${index + 1}`
                  }
                  priority={index === 0}
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/30"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(
                      circle at ${isAr ? "80%" : "20%"} 50%,
                      transparent 0%,
                      rgba(0, 0, 0, 0.5) 100%
                    )`,
                  }}
                />
              </div>
            );
          })}
        </Carousel>
      )}

      <div className="hero-content-layer pointer-events-none absolute inset-0 z-20 flex items-center">
        <div
          dir={isAr ? "rtl" : "ltr"}
          className="mx-auto flex w-full max-w-[1440px] justify-start px-4 sm:px-6 lg:px-10 xl:px-16"
        >
          <div className="hero-content-stack flex w-full max-w-[650px] flex-col items-start justify-start text-start">
            <div
              className="animate-reveal-up opacity-0"
              style={{
                animationDelay: "0.2s",
              }}
            >
              <div className="mb-3 inline-flex items-center justify-start gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 shadow-lg backdrop-blur-md sm:mb-4 md:mb-6 md:gap-3 md:px-4 md:py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD62D] shadow-[0_0_8px_#FFD62D]" />

                <span className="text-start font-arabicMedium text-[9px] uppercase tracking-widest text-white md:text-[11px]">
                  {isAr ? "منتجات بروح عصرية" : "Modern Quality Products"}
                </span>
              </div>
            </div>

            <div
              className="animate-reveal-up relative w-[180px] opacity-0 drop-shadow-2xl sm:w-[230px] md:w-[420px] lg:w-[480px]"
              style={{
                animationDelay: "0.4s",
              }}
            >
              <Image
                src={Slogan}
                alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham Slogan"}
                priority
              />
            </div>

            <div
              aria-hidden="true"
              className="mt-3 h-[3px] w-[80px] overflow-hidden rounded-full sm:mt-4 md:mt-6"
            >
              <div
                className="hero-line-draw h-full w-full rounded-full bg-[#FFD62D] opacity-0 shadow-[0_0_20px_rgba(255,214,45,0.5)]"
                style={{
                  animationDelay: "0.6s",
                }}
              />
            </div>

            <p
              className="animate-reveal-up mt-3 w-full max-w-[500px] text-start font-arabicLight text-[11px] leading-relaxed text-white/90 opacity-0 sm:text-xs md:mt-6 md:text-lg"
              style={{
                animationDelay: "0.7s",
              }}
            >
              {isAr
                ? "اختيارات يومية بجودة ثابتة وطعم يعتمد عليه."
                : "Everyday choices with consistent quality."}
            </p>

            <div
              className="animate-reveal-up pointer-events-auto mt-4 flex justify-start opacity-0 sm:mt-5 md:mt-10"
              style={{
                animationDelay: "0.9s",
              }}
            >
              <Link href="/categories">
                <div className="group relative flex cursor-pointer items-center justify-start gap-3 rounded-full bg-white px-5 py-2.5 shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all hover:scale-105 active:scale-95 md:gap-4 md:px-7 md:py-3.5">
                  <span className="whitespace-nowrap text-start font-arabicMedium text-xs text-primary sm:text-sm md:text-base">
                    {isAr ? "اكتشف المنتجات" : "Explore Products"}
                  </span>

                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFD62D] text-xs text-primary transition-transform duration-300 md:h-8 md:w-8 md:text-base ${
                      isAr
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  >
                    {isAr ? "←" : "→"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawLineLeftToRight {
          from {
            opacity: 0;
            transform: scaleX(0);
          }

          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .animate-reveal-up {
          animation: revealUp 0.9s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }

        .hero-line-draw {
          transform: scaleX(0);
          transform-origin: left center;
          animation: drawLineLeftToRight 1.2s cubic-bezier(0.2, 1, 0.3, 1)
            forwards;
        }

        .hero-responsive {
          height: 62.5vw;
          min-height: 0;
          max-height: 100vh;
          background-color: #ffffff;
        }

        .hero-slide-height {
          height: 100%;
          min-height: 0;
        }

        .hero-content-layer {
          padding-top: 72px;
        }

        .hero-content-stack {
          transform-origin: center center;
          padding-inline-start: 0;
        }

        .hero-slider-image {
          object-fit: cover !important;
          object-position: center center !important;
        }

        .hero-responsive .rec-carousel-wrapper,
        .hero-responsive .rec-carousel,
        .hero-responsive .rec-slider-container,
        .hero-responsive .rec-slider,
        .hero-responsive .rec-carousel-item,
        .hero-responsive .rec-carousel-item > div {
          height: 100% !important;
          min-height: 0 !important;
          background: transparent !important;
        }

        .hero-responsive .rec-slider-container {
          margin: 0 !important;
        }

        .hero-responsive .rec-carousel-item:focus {
          outline: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }

        @media (max-width: 374px) {
          .hero-responsive {
            height: 68vw;
            max-height: none;
          }

          .hero-content-layer {
            padding-top: 56px;
          }

          .hero-content-stack {
            transform: scale(0.76);
          }
        }

        @media (min-width: 375px) and (max-width: 479px) {
          .hero-responsive {
            height: 64vw;
            max-height: none;
          }

          .hero-content-layer {
            padding-top: 58px;
          }

          .hero-content-stack {
            transform: scale(0.8);
          }
        }

        @media (min-width: 480px) and (max-width: 640px) {
          .hero-responsive {
            height: 62.5vw;
            max-height: none;
          }

          .hero-content-layer {
            padding-top: 62px;
          }

          .hero-content-stack {
            transform: scale(0.86);
          }
        }

        @media (min-width: 641px) and (max-width: 767px) {
          .hero-responsive {
            height: 62.5vw;
            max-height: none;
          }

          .hero-content-layer {
            padding-top: 68px;
          }

          .hero-content-stack {
            transform: scale(0.92);
          }
        }

        @media (min-width: 768px) {
          .hero-responsive {
            height: min(62.5vw, 100vh);
          }

          .hero-content-layer {
            padding-top: 84px;
          }

          .hero-content-stack {
            transform: none;
            padding-inline-start: 76px;
          }
        }

        @media (min-width: 1024px) {
          .hero-content-stack {
            padding-inline-start: 92px;
          }
        }

        @media (min-width: 1200px) {
          .hero-responsive {
            height: min(56.25vw, 100vh);
          }

          .hero-content-stack {
            padding-inline-start: 108px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-reveal-up,
          .hero-line-draw {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .hero-slider-image {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
