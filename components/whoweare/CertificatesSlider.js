"use client";
import { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { XIcon, ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from "@heroicons/react/outline";
import OptimizedImage from "@/components/common/OptimizedImage";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = "https://api.sedihisham.com/";

const CertificatesGallery = ({ data }) => {
  const languageState = useSelector((state) => state?.language);
  const isRTL = languageState?.local === "ar";

  const certificates = data?.filter(
    (img) => img.categoryImage === "Quality_certificates"
  ) || [];

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = useCallback(() => setLightbox({ open: false, index: 0 }), []);

  const goPrev = useCallback(() =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + certificates.length) % certificates.length,
    })), [certificates.length]);

  const goNext = useCallback(() =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % certificates.length,
    })), [certificates.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox.open) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") (isRTL ? goNext : goPrev)();
      if (e.key === "ArrowRight") (isRTL ? goPrev : goNext)();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, isRTL, goPrev, goNext, closeLightbox]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox.open]);

  if (certificates.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-stone-400">
        <p className="font-arabicMedium text-base">
          {isRTL ? "لا توجد شهادات لعرضها" : "No certificates to display"}
        </p>
      </div>
    );
  }

  const currentCert = certificates[lightbox.index];

  return (
    <>
      {/* ─── Swiper ─── */}
      <div className="cert-swiper-wrapper px-2 py-4" dir="ltr">
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Keyboard]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={certificates.length > 2}
          autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
          keyboard={{ enabled: true }}
          coverflowEffect={{
            rotate: 28,
            stretch: 0,
            depth: 180,
            modifier: 1.4,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            prevEl: ".cert-prev",
            nextEl: ".cert-next",
          }}
          className="cert-swiper"
        >
          {certificates.map((item, index) => (
            <SwiperSlide key={item.id ?? index} className="cert-slide">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="cert-card group cursor-pointer"
                onClick={() => openLightbox(index)}
                role="button"
                aria-label={isRTL ? `عرض الشهادة ${index + 1}` : `View certificate ${index + 1}`}
              >
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white">
                  <OptimizedImage
                    src={BASE_URL + item.path_image}
                    alt={item.title || (isRTL ? `شهادة ${index + 1}` : `Certificate ${index + 1}`)}
                    width={320}
                    height={440}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-5">
                    <div className="flex items-center gap-2 text-white font-arabicMedium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                      <ZoomInIcon className="w-4 h-4" />
                      <span>{isRTL ? "عرض مكبَّر" : "View full"}</span>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 end-3 bg-emerald-600 text-white text-xs font-arabicBold px-2.5 py-1 rounded-full shadow-lg">
                    {index + 1}/{certificates.length}
                  </div>
                </div>

                {/* Title if exists */}
                {item.title && (
                  <div className="mt-3 text-center">
                    <p className="text-stone-700 font-arabicBold text-sm truncate px-2">
                      {item.title}
                    </p>
                  </div>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav arrows */}
        <button className="cert-prev cert-nav-btn" aria-label="Previous">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button className="cert-next cert-nav-btn" aria-label="Next">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {lightbox.open && currentCert && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            {/* Modal content */}
            <motion.div
              key="lightbox-content"
              initial={{ opacity: 0, scale: 0.82, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white">
                <OptimizedImage
                  src={BASE_URL + currentCert.path_image}
                  alt={currentCert.title || "Certificate"}
                  width={700}
                  height={900}
                  className="max-w-[80vw] max-h-[78vh] w-auto h-auto object-contain block"
                />
              </div>

              {/* Counter */}
              <div className="mt-4 text-white/70 text-sm font-arabicMedium">
                {lightbox.index + 1} / {certificates.length}
              </div>

              {/* Title */}
              {currentCert.title && (
                <p className="mt-1 text-white font-arabicBold text-base text-center px-4">
                  {currentCert.title}
                </p>
              )}

              {/* Close btn */}
              <button
                onClick={closeLightbox}
                className="absolute -top-3 -end-3 bg-white text-stone-800 rounded-full p-1.5 shadow-xl hover:bg-red-50 hover:text-red-600 transition-colors duration-200 z-10"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Prev / Next Arrows */}
            {certificates.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="fixed left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-all duration-200 border border-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="fixed right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-all duration-200 border border-white/20"
                  aria-label="Next"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scoped Styles */}
      <style jsx global>{`
        .cert-swiper-wrapper {
          position: relative;
        }
        .cert-swiper {
          padding-bottom: 52px !important;
          padding-top: 16px !important;
        }
        .cert-slide {
          width: 260px !important;
          height: 360px !important;
        }
        @media (min-width: 640px) {
          .cert-slide {
            width: 300px !important;
            height: 420px !important;
          }
        }
        .cert-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
          background: #fff;
          overflow: visible;
          padding: 10px;
        }
        .cert-card > div:first-child {
          flex: 1;
        }
        .cert-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d6d3d1;
          opacity: 1;
          transition: all 0.25s;
        }
        .cert-swiper .swiper-pagination-bullet-active {
          background: #059669;
          width: 20px;
          border-radius: 4px;
        }
        .cert-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(calc(-50% - 26px));
          z-index: 10;
          background: #ffffff;
          border: 1px solid #e7e5e4;
          color: #1c1917;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .cert-nav-btn:hover {
          background: #ecfdf5;
          box-shadow: 0 6px 20px rgba(5,150,105,0.18);
          transform: translateY(calc(-50% - 26px)) scale(1.08);
          color: #059669;
        }
        .cert-prev { left: -4px; }
        .cert-next { right: -4px; }
        @media (min-width: 768px) {
          .cert-prev { left: -20px; }
          .cert-next { right: -20px; }
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          border-radius: 16px;
        }
      `}</style>
    </>
  );
};

export default CertificatesGallery;
