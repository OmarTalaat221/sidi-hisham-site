import OptimizedImage from "@/components/common/OptimizedImage";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://api.sedihisham.com/";

const ENTER_TRANSFORMS = [
  "translate3d(0, 26px, 0) scale(0.975)",
  "translate3d(0, 32px, 0) scale(0.975)",
  "translate3d(0, 38px, 0) scale(0.975)",
  "translate3d(0, 30px, 0) scale(0.975)",
  "translate3d(0, 36px, 0) scale(0.975)",
  "translate3d(0, 42px, 0) scale(0.975)",
];

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

function getImageSource(item) {
  const path = item?.path_image;

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

  return `${API_BASE_URL}${normalizedPath.replace(/^\/+/, "")}`;
}

function GalleryViewer({ viewer, images, isAr, onClose, onSelect }) {
  if (!viewer || typeof document === "undefined") {
    return null;
  }

  const { item, index, isOpen } = viewer;

  const hasMultipleImages = images.length > 1;

  const previousIndex = index === 0 ? images.length - 1 : index - 1;

  const nextIndex = index === images.length - 1 ? 0 : index + 1;

  return createPortal(
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`editorial-viewer fixed inset-0 z-[10000000000] ${
        isOpen ? "editorial-viewer-open" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={isAr ? "عارض صور سيدي هشام" : "Sedi Hisham image viewer"}
    >
      <button
        type="button"
        aria-label={isAr ? "إغلاق عارض الصور" : "Close image viewer"}
        onClick={onClose}
        className="editorial-viewer-backdrop absolute inset-0 cursor-zoom-out bg-black/80 opacity-0"
      />

      <div className="editorial-viewer-panel absolute inset-3 overflow-hidden rounded-[20px] opacity-0 sm:inset-6 sm:rounded-[24px] lg:inset-10">
        <div
          key={item?.id || `${item?.path_image}-${index}`}
          className="editorial-viewer-image relative h-full w-full p-3 sm:p-5"
        >
          <OptimizedImage
            alt={
              isAr
                ? `صورة سيدي هشام ${index + 1}`
                : `Sedi Hisham image ${index + 1}`
            }
            src={getImageSource(item)}
            loader={GraphCMSImageLoader}
            fill
            showSkeleton
            objectFit="contain"
            objectPosition="center"
            sizes="96vw"
            quality={92}
            wrapperClassName="h-full w-full"
            className="h-full w-full"
            skeletonClassName="bg-white"
          />
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 p-3 sm:p-5">
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 font-arabicMedium text-xs text-[#7C1422] sm:text-sm">
            {index + 1} / {images.length}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? "إغلاق" : "Close"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-[#7C1422] transition-[transform,border-color,color] duration-300 hover:rotate-90 hover:border-[#FFD62D] hover:text-[#D40017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D]"
          >
            <X className="h-5 w-5" strokeWidth={1.9} />
          </button>
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={() => onSelect(previousIndex)}
              aria-label={isAr ? "الصورة السابقة" : "Previous image"}
              className={`absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#7C1422] transition-[transform,border-color,color] duration-300 hover:scale-105 hover:border-[#FFD62D] hover:text-[#D40017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D] sm:h-12 sm:w-12 ${
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
              onClick={() => onSelect(nextIndex)}
              aria-label={isAr ? "الصورة التالية" : "Next image"}
              className={`absolute top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#7C1422] transition-[transform,border-color,color] duration-300 hover:scale-105 hover:border-[#FFD62D] hover:text-[#D40017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D] sm:h-12 sm:w-12 ${
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
    </div>,
    document.body,
  );
}

export default function ElasticCarousel({ sliderImages = [] }) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const galleryRef = useRef(null);
  const closeTimerRef = useRef(null);
  const openFrameRef = useRef(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [viewer, setViewer] = useState(null);

  const galleryImages = useMemo(() => {
    if (!Array.isArray(sliderImages)) {
      return [];
    }

    return sliderImages
      .filter(
        (item) =>
          item?.categoryImage === "home_page_second_slider" &&
          typeof item?.path_image === "string" &&
          item.path_image.trim() !== "",
      )
      .slice(0, 6);
  }, [sliderImages]);

  const galleryCount = Math.max(1, Math.min(galleryImages.length, 6));

  useEffect(() => {
    const galleryElement = galleryRef.current;

    if (!galleryElement) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.12,
        rootMargin: "100px 0px",
      },
    );

    observer.observe(galleryElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const openViewer = useCallback((item, index) => {
    window.clearTimeout(closeTimerRef.current);

    setViewer({
      item,
      index,
      isOpen: false,
    });

    openFrameRef.current = window.requestAnimationFrame(() => {
      openFrameRef.current = window.requestAnimationFrame(() => {
        setViewer((currentViewer) =>
          currentViewer
            ? {
                ...currentViewer,
                isOpen: true,
              }
            : currentViewer,
        );
      });
    });
  }, []);

  const closeViewer = useCallback(() => {
    setViewer((currentViewer) =>
      currentViewer
        ? {
            ...currentViewer,
            isOpen: false,
          }
        : currentViewer,
    );

    closeTimerRef.current = window.setTimeout(() => {
      setViewer(null);
    }, 380);
  }, []);

  const selectViewerImage = useCallback(
    (nextIndex) => {
      const nextItem = galleryImages[nextIndex];

      if (!nextItem) {
        return;
      }

      setViewer((currentViewer) =>
        currentViewer
          ? {
              ...currentViewer,
              item: nextItem,
              index: nextIndex,
              isOpen: true,
            }
          : currentViewer,
      );
    },
    [galleryImages],
  );

  useEffect(() => {
    if (!viewer) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeViewer();
        return;
      }

      if (galleryImages.length <= 1) {
        return;
      }

      if (event.key === "ArrowLeft") {
        const nextIndex = isAr
          ? viewer.index === galleryImages.length - 1
            ? 0
            : viewer.index + 1
          : viewer.index === 0
            ? galleryImages.length - 1
            : viewer.index - 1;

        selectViewerImage(nextIndex);
      }

      if (event.key === "ArrowRight") {
        const nextIndex = isAr
          ? viewer.index === 0
            ? galleryImages.length - 1
            : viewer.index - 1
          : viewer.index === galleryImages.length - 1
            ? 0
            : viewer.index + 1;

        selectViewerImage(nextIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [viewer, galleryImages, isAr, closeViewer, selectViewerImage]);

  useEffect(
    () => () => {
      window.clearTimeout(closeTimerRef.current);

      if (openFrameRef.current !== null) {
        window.cancelAnimationFrame(openFrameRef.current);
      }
    },
    [],
  );

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <>
      <section
        dir={isAr ? "rtl" : "ltr"}
        className="second-home-slider relative z-[60] w-full overflow-hidden bg-transparent py-5 sm:py-7 lg:py-9"
      >
        <div
          ref={galleryRef}
          className={`editorial-gallery editorial-gallery-count-${galleryCount} ${
            hasEntered ? "is-visible" : ""
          }`}
        >
          {galleryImages.map((item, index) => (
            <article
              key={item?.id || `${item?.path_image}-${index}`}
              className={`editorial-gallery-item editorial-gallery-item-${index}`}
              style={{
                "--gallery-delay": `${80 + index * 75}ms`,
                "--gallery-enter-transform":
                  ENTER_TRANSFORMS[index] ||
                  "translate3d(0, 32px, 0) scale(0.975)",
              }}
            >
              <button
                type="button"
                onClick={() => openViewer(item, index)}
                aria-label={
                  isAr
                    ? `فتح صورة سيدي هشام ${index + 1}`
                    : `Open Sedi Hisham image ${index + 1}`
                }
                className="editorial-gallery-button group relative block h-full w-full overflow-hidden border border-transparent bg-transparent text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D]"
              >
                <div className="editorial-gallery-media relative h-full w-full overflow-hidden bg-transparent">
                  <OptimizedImage
                    alt={
                      isAr
                        ? `صورة سيدي هشام ${index + 1}`
                        : `Sedi Hisham image ${index + 1}`
                    }
                    src={getImageSource(item)}
                    loader={GraphCMSImageLoader}
                    fill
                    showSkeleton
                    objectFit="cover"
                    objectPosition="center"
                    sizes="(max-width: 559px) 100vw, (max-width: 1023px) 50vw, 40vw"
                    quality={88}
                    wrapperClassName="h-full w-full"
                    className="editorial-gallery-image h-full w-full"
                    skeletonClassName="bg-transparent"
                  />
                </div>

                <span className="editorial-gallery-border pointer-events-none absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-[#FFD62D]" />

                <span
                  className={`editorial-gallery-expand pointer-events-none absolute bottom-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#7C1422] opacity-0 transition-[transform,opacity,border-color,color] duration-300 group-hover:translate-y-0 group-hover:border-[#FFD62D] group-hover:text-[#D40017] group-hover:opacity-100 ${
                    isAr ? "left-3" : "right-3"
                  }`}
                >
                  <Maximize2 className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
              </button>
            </article>
          ))}
        </div>

        <style jsx global>{`
          .editorial-gallery {
            display: grid;
            width: 100%;
            height: clamp(520px, 46vw, 720px);
            grid-template-columns: repeat(12, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
            gap: 12px;
            background: transparent;
            contain: layout paint;
          }

          .editorial-gallery-item {
            min-width: 0;
            min-height: 0;
            opacity: 0;
            transform: var(
              --gallery-enter-transform,
              translate3d(0, 30px, 0) scale(0.975)
            );
            transition:
              opacity 680ms cubic-bezier(0.22, 1, 0.36, 1)
                var(--gallery-delay, 0ms),
              transform 820ms cubic-bezier(0.22, 1, 0.36, 1)
                var(--gallery-delay, 0ms);
          }

          .editorial-gallery.is-visible .editorial-gallery-item {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          .editorial-gallery-button {
            background: transparent;
            transform: translate3d(0, 0, 0);
            transition:
              transform 360ms cubic-bezier(0.22, 1, 0.36, 1),
              border-color 300ms ease;
          }

          .editorial-gallery-image {
            display: block;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            transform: scale(1.001);
            transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1) !important;
          }

          /*
           * 6 صور:
           * نفس روح المرجع: 3 أعلى و3 أسفل.
           */
          .editorial-gallery-count-6 .editorial-gallery-item-0 {
            grid-column: 1 / 4;
            grid-row: 1;
          }

          .editorial-gallery-count-6 .editorial-gallery-item-1 {
            grid-column: 4 / 9;
            grid-row: 1;
          }

          .editorial-gallery-count-6 .editorial-gallery-item-2 {
            grid-column: 9 / 13;
            grid-row: 1;
          }

          .editorial-gallery-count-6 .editorial-gallery-item-3 {
            grid-column: 1 / 6;
            grid-row: 2;
          }

          .editorial-gallery-count-6 .editorial-gallery-item-4 {
            grid-column: 6 / 10;
            grid-row: 2;
          }

          .editorial-gallery-count-6 .editorial-gallery-item-5 {
            grid-column: 10 / 13;
            grid-row: 2;
          }

          /*
           * 5 صور:
           * 3 أعلى و2 أسفل.
           */
          .editorial-gallery-count-5 .editorial-gallery-item-0 {
            grid-column: 1 / 4;
            grid-row: 1;
          }

          .editorial-gallery-count-5 .editorial-gallery-item-1 {
            grid-column: 4 / 9;
            grid-row: 1;
          }

          .editorial-gallery-count-5 .editorial-gallery-item-2 {
            grid-column: 9 / 13;
            grid-row: 1;
          }

          .editorial-gallery-count-5 .editorial-gallery-item-3 {
            grid-column: 1 / 7;
            grid-row: 2;
          }

          .editorial-gallery-count-5 .editorial-gallery-item-4 {
            grid-column: 7 / 13;
            grid-row: 2;
          }

          /*
           * 4 صور:
           * صفان بتوزيع غير متساوٍ.
           */
          .editorial-gallery-count-4 .editorial-gallery-item-0 {
            grid-column: 1 / 6;
            grid-row: 1;
          }

          .editorial-gallery-count-4 .editorial-gallery-item-1 {
            grid-column: 6 / 13;
            grid-row: 1;
          }

          .editorial-gallery-count-4 .editorial-gallery-item-2 {
            grid-column: 1 / 8;
            grid-row: 2;
          }

          .editorial-gallery-count-4 .editorial-gallery-item-3 {
            grid-column: 8 / 13;
            grid-row: 2;
          }

          .editorial-gallery-count-3 .editorial-gallery-item-0 {
            grid-column: 1 / 8;
            grid-row: 1 / 3;
          }

          .editorial-gallery-count-3 .editorial-gallery-item-1 {
            grid-column: 8 / 13;
            grid-row: 1;
          }

          .editorial-gallery-count-3 .editorial-gallery-item-2 {
            grid-column: 8 / 13;
            grid-row: 2;
          }

          .editorial-gallery-count-2 .editorial-gallery-item-0 {
            grid-column: 1 / 7;
            grid-row: 1 / 3;
          }

          .editorial-gallery-count-2 .editorial-gallery-item-1 {
            grid-column: 7 / 13;
            grid-row: 1 / 3;
          }

          .editorial-gallery-count-1 .editorial-gallery-item-0 {
            grid-column: 1 / 13;
            grid-row: 1 / 3;
          }

          .editorial-viewer {
            pointer-events: none;
          }

          .editorial-viewer-open {
            pointer-events: auto;
          }

          .editorial-viewer-backdrop {
            transition: opacity 360ms ease;
          }

          .editorial-viewer-open .editorial-viewer-backdrop {
            opacity: 1;
          }

          .editorial-viewer-panel {
            transform: translate3d(0, 22px, 0) scale(0.98);
            transition:
              opacity 360ms ease,
              transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          .editorial-viewer-open .editorial-viewer-panel {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }

          .editorial-viewer-image {
            animation: editorialViewerImageIn 380ms
              cubic-bezier(0.22, 1, 0.36, 1);
          }

          @keyframes editorialViewerImageIn {
            from {
              opacity: 0.25;
              transform: scale(0.99);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @media (hover: hover) and (pointer: fine) {
            .editorial-gallery-button:hover {
              transform: translate3d(0, -3px, 0);
            }

            .editorial-gallery-button:hover .editorial-gallery-image {
              transform: scale(1.025);
            }
          }

          @media (max-width: 767px) {
            .editorial-gallery {
              height: auto;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              grid-template-rows: none;
              grid-auto-rows: 190px;
              gap: 8px;
            }

            .editorial-gallery .editorial-gallery-item {
              grid-column: auto;
              grid-row: auto;
            }

            .editorial-gallery .editorial-gallery-item-0 {
              grid-column: 1 / -1;
              grid-row: span 2;
            }

            .editorial-gallery
              .editorial-gallery-item:last-child:nth-child(even) {
              grid-column: 1 / -1;
            }
          }

          @media (max-width: 559px) {
            .editorial-gallery {
              grid-template-columns: 1fr;
              grid-auto-rows: 230px;
              gap: 8px;
            }

            .editorial-gallery .editorial-gallery-item,
            .editorial-gallery .editorial-gallery-item-0,
            .editorial-gallery
              .editorial-gallery-item:last-child:nth-child(even) {
              grid-column: 1;
              grid-row: auto;
            }

            .editorial-gallery .editorial-gallery-item-0 {
              grid-row: span 1;
            }
          }

          @media (min-width: 768px) and (max-width: 1023px) {
            .editorial-gallery {
              height: 560px;
              gap: 10px;
            }
          }

          @media (min-width: 1440px) {
            .editorial-gallery {
              gap: 14px;
            }
          }

          @media (hover: none) {
            .editorial-gallery-expand {
              display: none;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .editorial-gallery-item,
            .editorial-gallery-button,
            .editorial-gallery-image,
            .editorial-viewer-backdrop,
            .editorial-viewer-panel,
            .editorial-viewer-image {
              animation: none !important;
              transition: none !important;
            }

            .editorial-gallery-item {
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      <GalleryViewer
        viewer={viewer}
        images={galleryImages}
        isAr={isAr}
        onClose={closeViewer}
        onSelect={selectViewerImage}
      />
    </>
  );
}
