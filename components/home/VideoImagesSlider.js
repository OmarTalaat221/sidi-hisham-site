import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

const VideoImagesSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isPortalMounted, setIsPortalMounted] = useState(false);

  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const swiperRef = useRef(null);

  useEffect(() => {
    setIsPortalMounted(true);
  }, []);

  useEffect(() => {
    let mounted = true;

    const getSliderImages = async () => {
      try {
        const response = await axios.get(
          "https://api.sedihisham.com/pages/getall/home",
        );

        if (mounted) {
          setSliderImages(Array.isArray(response?.data) ? response.data : []);
        }
      } catch {
        if (mounted) {
          setSliderImages([]);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getSliderImages();

    return () => {
      mounted = false;
    };
  }, []);

  const galleryImages = useMemo(() => {
    return sliderImages.filter(
      (item) =>
        item?.categoryImage === "gallery_image" &&
        item?.externalLink === false &&
        typeof item?.path_image === "string" &&
        item.path_image.trim() !== "" &&
        !item.path_image.toLowerCase().endsWith(".mp4"),
    );
  }, [sliderImages]);

  const activeImage =
    activeImageIndex !== null ? galleryImages[activeImageIndex] : null;

  const getImageUrl = useCallback((path) => {
    if (!path || typeof path !== "string") {
      return "/images/eim.png";
    }

    const normalizedPath = path.trim();

    if (!normalizedPath) {
      return "/images/eim.png";
    }

    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://")
    ) {
      return normalizedPath;
    }

    return `https://api.sedihisham.com/${normalizedPath.replace(/^\/+/, "")}`;
  }, []);

  const goPrev = useCallback(() => {
    if (!swiperRef.current) {
      return;
    }

    if (isAr) {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }
  }, [isAr]);

  const goNext = useCallback(() => {
    if (!swiperRef.current) {
      return;
    }

    if (isAr) {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  }, [isAr]);

  const openImage = useCallback((index) => {
    setActiveImageIndex(index);
    swiperRef.current?.autoplay?.stop();
  }, []);

  const closeImage = useCallback(() => {
    setActiveImageIndex(null);
    swiperRef.current?.autoplay?.start();
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null || galleryImages.length === 0) {
        return null;
      }

      return (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);

  const showNextImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null || galleryImages.length === 0) {
        return null;
      }

      return (currentIndex + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeImage();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, closeImage, showPreviousImage, showNextImage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-[280px] w-full animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="font-arabicMedium text-gray-400">
          {isAr ? "لا توجد صور للعرض" : "No images available"}
        </p>
      </div>
    );
  }

  const portalViewer =
    isPortalMounted && activeImage
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={isAr ? "عرض صورة المعرض" : "Gallery image viewer"}
            className="gallery-portal-viewer fixed inset-0 z-[1000000000]"
            onClick={closeImage}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-[3px]" />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeImage();
              }}
              aria-label={isAr ? "إغلاق الصورة" : "Close image"}
              className="
                absolute right-4 top-4 z-30
                flex h-11 w-11 items-center justify-center
                rounded-full border border-white/20
                bg-white/10 text-white
                backdrop-blur-md
                transition-all duration-300
                hover:scale-105 hover:bg-white hover:text-primary
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-white
                sm:right-6 sm:top-6
              "
            >
              <XIcon className="h-6 w-6" />
            </button>

            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousImage();
                }}
                aria-label={isAr ? "الصورة السابقة" : "Previous image"}
                className="
                  absolute left-3 top-1/2 z-30
                  flex h-11 w-11 -translate-y-1/2
                  items-center justify-center
                  rounded-full border border-white/20
                  bg-white/10 text-white
                  backdrop-blur-md
                  transition-all duration-300
                  hover:bg-white hover:text-primary
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white
                  sm:left-5 sm:h-12 sm:w-12
                "
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
            )}

            <div
              className="
                absolute inset-0 z-20
                flex items-center justify-center
                px-4 py-16
                sm:px-8
              "
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="
                  relative w-full max-w-[1400px]
                  h-[min(84vh,920px)]
                  overflow-hidden rounded-2xl
                
                "
              >
                <Image
                  key={activeImage.path_image}
                  src={getImageUrl(activeImage.path_image)}
                  alt={
                    isAr
                      ? `صورة معرض سيدي هشام ${activeImageIndex + 1}`
                      : `Sedi Hisham gallery image ${activeImageIndex + 1}`
                  }
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  quality={92}
                  sizes="95vw"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextImage();
                }}
                aria-label={isAr ? "الصورة التالية" : "Next image"}
                className="
                  absolute right-3 top-1/2 z-30
                  flex h-11 w-11 -translate-y-1/2
                  items-center justify-center
                  rounded-full border border-white/20
                  bg-white/10 text-white
                  backdrop-blur-md
                  transition-all duration-300
                  hover:bg-white hover:text-primary
                  focus:outline-none focus-visible:ring-2
                  focus-visible:ring-white
                  sm:right-5 sm:h-12 sm:w-12
                "
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            )}

            <div
              className="
                absolute bottom-4 left-1/2 z-30
                -translate-x-1/2
                rounded-full border border-white/15
                bg-black/40 px-4 py-2
                text-xs text-white
                backdrop-blur-md
              "
            >
              {activeImageIndex + 1} / {galleryImages.length}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="gallery-slider-container relative w-full"
      >
        <Swiper
          key={`gallery-slider-${local}-${galleryImages.length}`}
          dir={isAr ? "rtl" : "ltr"}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          centeredSlides
          initialSlide={Math.floor(galleryImages.length / 2)}
          loop={galleryImages.length > 3}
          speed={700}
          effect="coverflow"
          grabCursor
          watchOverflow
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: false,
          }}
          autoplay={
            galleryImages.length > 1
              ? {
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          modules={[Autoplay, EffectCoverflow]}
          breakpoints={{
            0: {
              slidesPerView: 1.3,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 35,
            },
          }}
          className="gallery-swiper !py-10"
        >
          {galleryImages.map((item, index) => (
            <SwiperSlide
              key={item.id || `${item.path_image}-${index}`}
              className="!h-auto"
            >
              <button
                type="button"
                onClick={() => openImage(index)}
                aria-label={
                  isAr
                    ? `فتح صورة معرض سيدي هشام ${index + 1}`
                    : `Open Sedi Hisham gallery image ${index + 1}`
                }
                className="
                  gallery-image-card
                  group/card relative block
                  aspect-[4/5] w-full
                  cursor-zoom-in overflow-hidden
                  rounded-2xl border border-black/5
                  bg-white
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  transition-[transform,box-shadow]
                  duration-500
                  hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)]
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#D40017]
                  focus-visible:ring-offset-2
                "
              >
                <Image
                  src={getImageUrl(item.path_image)}
                  alt={
                    isAr
                      ? `معرض سيدي هشام ${index + 1}`
                      : `Sedi Hisham gallery ${index + 1}`
                  }
                  layout="fill"
                  objectFit="cover"
                  quality={82}
                  sizes="(max-width: 639px) 78vw, (max-width: 1023px) 40vw, 25vw"
                  draggable={false}
                  className="
                    transition-transform
                    duration-700 ease-out
                    group-hover/card:scale-110
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/45 via-transparent to-transparent
                    opacity-0
                    transition-opacity duration-500
                    group-hover/card:opacity-100
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute bottom-0 left-0 right-0
                    h-1 origin-center scale-x-0
                    bg-gradient-to-r
                    from-transparent via-[#FFD62D] to-transparent
                    transition-transform duration-500
                    group-hover/card:scale-x-100
                  "
                />

                <span
                  className="
                    absolute bottom-4 left-1/2
                    -translate-x-1/2 translate-y-2
                    whitespace-nowrap rounded-full
                    border border-white/20
                    bg-black/45 px-4 py-2
                    font-arabicMedium text-xs text-white
                    opacity-0 backdrop-blur-md
                    transition-all duration-300
                    group-hover/card:translate-y-0
                    group-hover/card:opacity-100
                  "
                >
                  {isAr ? "اضغط لعرض الصورة" : "Click to view"}
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label={isAr ? "الصور السابقة" : "Previous images"}
              className={`
                absolute top-1/2 z-30
                flex h-10 w-10 -translate-y-1/2
                items-center justify-center
                rounded-full border border-gray-100
                bg-white/95 text-primary
                shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                backdrop-blur-sm
                transition-all duration-300
                hover:scale-105 hover:bg-primary hover:text-white
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                md:h-12 md:w-12
                ${isAr ? "right-0 md:right-2" : "left-0 md:left-2"}
              `}
            >
              {isAr ? (
                <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label={isAr ? "الصور التالية" : "Next images"}
              className={`
                absolute top-1/2 z-30
                flex h-10 w-10 -translate-y-1/2
                items-center justify-center
                rounded-full border border-gray-100
                bg-white/95 text-primary
                shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                backdrop-blur-sm
                transition-all duration-300
                hover:scale-105 hover:bg-primary hover:text-white
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                md:h-12 md:w-12
                ${isAr ? "left-0 md:left-2" : "right-0 md:right-2"}
              `}
            >
              {isAr ? (
                <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>
          </>
        )}

        <style jsx global>{`
          .gallery-slider-container {
            width: 100%;
            max-width: none;
            margin-inline: auto;
          }

          .gallery-swiper {
            width: 100%;
            overflow: hidden;
          }

          .gallery-swiper .swiper-wrapper {
            align-items: stretch;
          }

          .gallery-swiper .swiper-slide {
            height: auto;
            opacity: 0.5;
            transform: scale(0.85);
            transition:
              opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .gallery-swiper .swiper-slide-active {
            z-index: 5;
            opacity: 1;
            transform: scale(1);
          }

          .gallery-swiper .swiper-slide-prev,
          .gallery-swiper .swiper-slide-next {
            z-index: 3;
            opacity: 0.75;
            transform: scale(0.92);
          }

          @media (hover: none) {
            .gallery-image-card img {
              transform: none !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .gallery-swiper .swiper-slide,
            .gallery-image-card,
            .gallery-image-card img {
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>

      {portalViewer}
    </>
  );
};

export default VideoImagesSlider;
