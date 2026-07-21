import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Slogan from "../../public/images/slogen.png";

const DEFAULT_HERO_IMAGE =
  "https://api.sedihisham.com/uploads/category/images/ketchupcopy3b609725-f787-4dc9-8501-5df31cbd57bc.webp";

const AUTOPLAY_DELAY = 4500;
const TRANSITION_DURATION = 800;

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

function HeroSlide({ item, index, isAr, shouldAnimate, layerClassName }) {
  const [hasError, setHasError] = useState(false);

  const imageSrc = getApiImageUrl(item?.path_image);

  useEffect(() => {
    setHasError(false);
  }, [imageSrc]);

  if (!imageSrc || hasError) {
    return null;
  }

  const priority = index === 0;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${layerClassName} ${
        shouldAnimate ? "hero-slide-fade-in" : ""
      }`}
    >
      <Image
        src={imageSrc}
        alt={
          isAr
            ? `منتجات سيدي هشام - الشريحة ${index + 1}`
            : `Sedi Hisham products - slide ${index + 1}`
        }
        layout="fill"
        objectFit="cover"
        objectPosition="center center"
        priority={priority}
        loading={priority ? undefined : "eager"}
        quality={82}
        sizes="100vw"
        draggable={false}
        onError={() => setHasError(true)}
        className="hero-slider-image"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-black/30" />

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
}

export default function Slider({ sliderImages = [] }) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [activeIndex, setActiveIndex] = useState(0);

  const [previousIndex, setPreviousIndex] = useState(null);

  const activeIndexRef = useRef(0);
  const transitionTimeoutRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const slides = useMemo(() => {
    const filteredSlides = Array.isArray(sliderImages)
      ? sliderImages.filter(
          (item) =>
            item?.categoryImage === "home_page_main_slider" &&
            item?.externalLink === false &&
            typeof item?.path_image === "string" &&
            item.path_image.trim() !== "",
        )
      : [];

    if (filteredSlides.length > 0) {
      return filteredSlides;
    }

    return [
      {
        id: "default-hero-image",
        path_image: DEFAULT_HERO_IMAGE,
        categoryImage: "home_page_main_slider",
        externalLink: false,
      },
    ];
  }, [sliderImages]);

  const showControls = slides.length > 1;

  const goToSlide = useCallback(
    (requestedIndex) => {
      if (slides.length <= 1) {
        return;
      }

      const currentIndex = activeIndexRef.current;

      const normalizedIndex =
        ((requestedIndex % slides.length) + slides.length) % slides.length;

      if (normalizedIndex === currentIndex) {
        return;
      }

      window.clearTimeout(transitionTimeoutRef.current);

      setPreviousIndex(currentIndex);

      activeIndexRef.current = normalizedIndex;

      setActiveIndex(normalizedIndex);

      transitionTimeoutRef.current = window.setTimeout(() => {
        setPreviousIndex(null);
      }, TRANSITION_DURATION);
    },
    [slides.length],
  );

  const goToNextSlide = useCallback(() => {
    goToSlide(activeIndexRef.current + 1);
  }, [goToSlide]);

  const goToPreviousSlide = useCallback(() => {
    goToSlide(activeIndexRef.current - 1);
  }, [goToSlide]);

  useEffect(() => {
    if (activeIndexRef.current >= slides.length) {
      activeIndexRef.current = 0;
      setActiveIndex(0);
      setPreviousIndex(null);
    }
  }, [slides.length]);

  useEffect(() => {
    if (!showControls) {
      return undefined;
    }

    autoplayIntervalRef.current = window.setInterval(() => {
      if (!document.hidden) {
        goToNextSlide();
      }
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(autoplayIntervalRef.current);
    };
  }, [goToNextSlide, showControls]);

  useEffect(() => {
    if (!showControls || typeof window === "undefined") {
      return undefined;
    }

    let preloadTimeoutId;
    let preloadImage;

    const preloadNextImage = () => {
      preloadTimeoutId = window.setTimeout(() => {
        const nextIndex = (activeIndexRef.current + 1) % slides.length;

        const nextImageSrc = getApiImageUrl(slides[nextIndex]?.path_image);

        if (nextImageSrc) {
          preloadImage = new window.Image();

          preloadImage.decoding = "async";
          preloadImage.src = nextImageSrc;
        }
      }, 800);
    };

    if (document.readyState === "complete") {
      preloadNextImage();
    } else {
      window.addEventListener("load", preloadNextImage, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("load", preloadNextImage);

      window.clearTimeout(preloadTimeoutId);

      if (preloadImage) {
        preloadImage.src = "";
      }
    };
  }, [activeIndex, showControls, slides]);

  useEffect(() => {
    return () => {
      window.clearTimeout(transitionTimeoutRef.current);

      window.clearInterval(autoplayIntervalRef.current);
    };
  }, []);

  const activeSlide = slides[activeIndex];

  const previousSlide = previousIndex !== null ? slides[previousIndex] : null;

  return (
    <section
      className="hero-responsive relative w-full overflow-hidden bg-white"
      aria-roledescription="carousel"
      aria-label={
        isAr ? "سلايدر منتجات سيدي هشام" : "Sedi Hisham products slider"
      }
    >
      <div className="absolute inset-0 bg-white">
        {previousSlide && (
          <HeroSlide
            item={previousSlide}
            index={previousIndex}
            isAr={isAr}
            shouldAnimate={false}
            layerClassName="z-0 opacity-100"
          />
        )}

        <HeroSlide
          key={`active-slide-${activeIndex}`}
          item={activeSlide}
          index={activeIndex}
          isAr={isAr}
          shouldAnimate={previousIndex !== null}
          layerClassName="z-10 opacity-100"
        />
      </div>

      {showControls && (
        <>
          <button
            type="button"
            onClick={goToPreviousSlide}
            aria-label={isAr ? "الشريحة السابقة" : "Previous slide"}
            className={`absolute top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-primary md:flex ${
              isAr ? "right-5 xl:right-8" : "left-5 xl:left-8"
            }`}
          >
            {isAr ? "→" : "←"}
          </button>

          <button
            type="button"
            onClick={goToNextSlide}
            aria-label={isAr ? "الشريحة التالية" : "Next slide"}
            className={`absolute top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-primary md:flex ${
              isAr ? "left-5 xl:left-8" : "right-5 xl:right-8"
            }`}
          >
            {isAr ? "←" : "→"}
          </button>

          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-4 md:bottom-8">
            {slides.map((slide, index) => (
              <button
                key={slide.id || `${slide.path_image}-${index}`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={
                  isAr
                    ? `الانتقال إلى الشريحة ${index + 1}`
                    : `Go to slide ${index + 1}`
                }
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-[3px] rounded-full transition-[width,background-color] duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-[#FFD62D] md:w-10"
                    : "w-4 bg-white/40 md:w-5"
                }`}
              />
            ))}
          </div>
        </>
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
              <div className="mb-3 inline-flex items-center justify-start gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md sm:mb-4 md:mb-6 md:gap-3 md:px-4 md:py-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD62D]" />

                <span className="text-start font-arabicMedium text-[9px] uppercase tracking-widest text-white md:text-[11px]">
                  {isAr ? "منتجات بروح عصرية" : "Modern Quality Products"}
                </span>
              </div>
            </div>

            <div
              className="animate-reveal-up relative w-[180px] opacity-0 sm:w-[230px] md:w-[420px] lg:w-[480px]"
              style={{
                animationDelay: "0.4s",
              }}
            >
              <Image
                src={Slogan}
                alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham Slogan"}
              />
            </div>

            <div
              aria-hidden="true"
              className="mt-3 h-[3px] w-[80px] overflow-hidden rounded-full sm:mt-4 md:mt-6"
            >
              <div
                className="hero-line-draw h-full w-full rounded-full bg-[#FFD62D] opacity-0"
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
                <div className="group relative flex cursor-pointer items-center justify-start gap-3 rounded-full bg-white px-5 py-2.5 transition-transform duration-300 hover:scale-105 active:scale-95 md:gap-4 md:px-7 md:py-3.5">
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
        @keyframes heroSlideFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translateY(24px);
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

        .hero-slide-fade-in {
          animation: heroSlideFadeIn ${TRANSITION_DURATION}ms ease-in-out
            forwards;
        }

        .animate-reveal-up {
          animation: revealUp 0.75s cubic-bezier(0.2, 1, 0.3, 1) forwards;
        }

        .hero-line-draw {
          transform: scaleX(0);
          transform-origin: left center;
          animation: drawLineLeftToRight 1s cubic-bezier(0.2, 1, 0.3, 1)
            forwards;
        }

        .hero-responsive {
          height: 62.5vw;
          min-height: 0;
          max-height: calc(100vh - 94px);
          contain: layout paint;
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
          .hero-slide-fade-in,
          .animate-reveal-up,
          .hero-line-draw {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
