import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const VideoImagesSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const getSliderImages = async () => {
      try {
        const response = await axios.get(
          "https://api.sedihisham.com/pages/getall/home",
        );
        if (mounted) {
          setSliderImages(response?.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    getSliderImages();
    return () => {
      mounted = false;
    };
  }, []);

  const galleryImages = sliderImages.filter(
    (item) =>
      item.categoryImage === "gallery_image" &&
      item.externalLink === false &&
      !item?.path_image?.endsWith(".mp4"),
  );

  const goPrev = useCallback(() => {
    if (swiperRef.current) {
      isAr ? swiperRef.current.slideNext() : swiperRef.current.slidePrev();
    }
  }, [isAr]);

  const goNext = useCallback(() => {
    if (swiperRef.current) {
      isAr ? swiperRef.current.slidePrev() : swiperRef.current.slideNext();
    }
  }, [isAr]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-full h-[280px] bg-gray-100 animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (galleryImages.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-400 font-arabicMedium">
          {isAr ? "لا توجد صور للعرض" : "No images available"}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 md:px-8 group">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        centeredSlides={true}
        initialSlide={Math.floor(galleryImages.length / 2)}
        loop={galleryImages.length > 3}
        speed={700}
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2,
          slideShadows: false,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay, EffectCoverflow]}
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
          <SwiperSlide key={item.id || index} className="!h-auto">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.15)] group/card">
              <Image
                src={`https://api.sedihisham.com/${item.path_image}`}
                alt={`معرض سيدي هشام ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={85}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                className="transition-transform duration-700 group-hover/card:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD62D] to-transparent transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={goPrev}
        aria-label={isAr ? "التالي" : "Previous"}
        className={`absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white hover:scale-110 ${
          isAr ? "right-2 md:right-4" : "left-2 md:left-4"
        }`}
      >
        {isAr ? (
          <ChevronRightIcon className="w-5 h-5" />
        ) : (
          <ChevronLeftIcon className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={goNext}
        aria-label={isAr ? "السابق" : "Next"}
        className={`absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white hover:scale-110 ${
          isAr ? "left-2 md:left-4" : "right-2 md:right-4"
        }`}
      >
        {isAr ? (
          <ChevronLeftIcon className="w-5 h-5" />
        ) : (
          <ChevronRightIcon className="w-5 h-5" />
        )}
      </button>

      <style jsx global>{`
        .gallery-swiper .swiper-slide {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.5;
          transform: scale(0.85);
        }

        .gallery-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        .gallery-swiper .swiper-slide-prev,
        .gallery-swiper .swiper-slide-next {
          opacity: 0.75;
          transform: scale(0.92);
        }
      `}</style>
    </div>
  );
};

export default VideoImagesSlider;
