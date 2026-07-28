import OptimizedImage from "@/components/common/OptimizedImage";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://api.sedihisham.com/";

function getImageUrl(path) {
  if (!path) {
    return "";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path.replace(/^\/+/, "")}`;
}

function CertificateSkeleton() {
  return (
    <div className="certificate-slide min-w-full snap-start sm:min-w-[calc(50%_-_8px)] lg:min-w-[calc(33.333%_-_11px)]">
      <div className="flex min-h-[430px] animate-pulse items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 sm:min-h-[460px]">
        <div className="h-[350px] w-[76%] rounded-xl bg-slate-100 sm:h-[395px]" />
      </div>
    </div>
  );
}

function SliderButton({ direction, onClick, disabled, label }) {
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

export default function CertificatesGallery({ data, loading = false }) {
  const { local } = useSelector((state) => state.language);

  const isRTL = local === "ar";
  const trackRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(false);

  const [hasOverflow, setHasOverflow] = useState(false);

  const certificates = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(
      (item) =>
        item?.categoryImage === "Quality_certificates" && item?.path_image,
    );
  }, [data]);

  const updateNavigation = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maximumScroll = Math.max(track.scrollWidth - track.clientWidth, 0);

    const currentScroll = Math.max(track.scrollLeft, 0);

    const overflowExists = maximumScroll > 5;

    setHasOverflow(overflowExists);

    setCanScrollLeft(overflowExists && currentScroll > 4);

    setCanScrollRight(overflowExists && currentScroll < maximumScroll - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    track.scrollTo({
      left: 0,
      behavior: "auto",
    });

    const frame = window.requestAnimationFrame(updateNavigation);

    let resizeObserver;

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateNavigation);

      resizeObserver.observe(track);
    }

    window.addEventListener("resize", updateNavigation);

    track.addEventListener("scroll", updateNavigation, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);

      resizeObserver?.disconnect();

      window.removeEventListener("resize", updateNavigation);

      track.removeEventListener("scroll", updateNavigation);
    };
  }, [certificates.length, loading, updateNavigation]);

  const getScrollAmount = () => {
    const track = trackRef.current;

    if (!track) {
      return 0;
    }

    const firstSlide = track.querySelector("[data-certificate-slide]");

    if (!firstSlide) {
      return Math.max(track.clientWidth * 0.82, 280);
    }

    const trackStyles = window.getComputedStyle(track);

    const gap =
      Number.parseFloat(trackStyles.columnGap) ||
      Number.parseFloat(trackStyles.gap) ||
      16;

    return firstSlide.getBoundingClientRect().width + gap;
  };

  const scrollSlider = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const amount = getScrollAmount();

    track.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div dir="ltr" className="flex gap-4 overflow-hidden">
        <CertificateSkeleton />
        <CertificateSkeleton />
        <CertificateSkeleton />
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary">
          <PhotographIcon className="h-7 w-7" strokeWidth={1.7} />
        </span>

        <h3 className="mt-5 text-lg font-bold text-[#7C1422]">
          {isRTL ? "لا توجد شهادات متاحة" : "No certificates available"}
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          {isRTL
            ? "سيتم عرض شهادات الجودة هنا بعد إضافتها."
            : "Quality certificates will appear here once added."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {hasOverflow && (
        <div dir="ltr" className="mb-5 flex items-center justify-end gap-2">
          <SliderButton
            direction="left"
            disabled={!canScrollLeft}
            onClick={() => scrollSlider("left")}
            label={
              isRTL ? "تحريك الشهادات إلى اليسار" : "Scroll certificates left"
            }
          />

          <SliderButton
            direction="right"
            disabled={!canScrollRight}
            onClick={() => scrollSlider("right")}
            label={
              isRTL ? "تحريك الشهادات إلى اليمين" : "Scroll certificates right"
            }
          />
        </div>
      )}

      <div
        ref={trackRef}
        dir="ltr"
        className={`certificates-track flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 ${
          hasOverflow ? "justify-start" : "justify-center"
        }`}
      >
        {certificates.map((certificate, index) => (
          <article
            data-certificate-slide
            key={certificate.id || `${certificate.path_image}-${index}`}
            className="certificate-slide group min-w-full snap-start sm:min-w-[calc(50%_-_8px)] lg:min-w-[calc(33.333%_-_11px)]"
          >
            <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-200 hover:border-primary/30 sm:min-h-[460px]">
              <span className="absolute inset-x-10 top-0 h-[3px] origin-center scale-x-0 rounded-b-full bg-primary transition-transform duration-300 group-hover:scale-x-100" />

              <div className="relative flex h-[365px] w-full items-center justify-center sm:h-[395px]">
                <OptimizedImage
                  width={380}
                  height={500}
                  src={getImageUrl(certificate.path_image)}
                  alt={
                    isRTL
                      ? `شهادة جودة سيدي هشام رقم ${index + 1}`
                      : `Sedi Hisham quality certificate ${index + 1}`
                  }
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <style jsx global>{`
        .certificates-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
          overscroll-behavior-inline: contain;
        }

        .certificates-track::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .certificates-track {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </div>
  );
}
