import Image from "next/image";
import Link from "next/link";
import { useId, useMemo } from "react";
import { useSelector } from "react-redux";
import BottomBg from "./BottomBg";

function ChevronIcon({ isAr }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-3.5 w-3.5 text-white/60 ${isAr ? "rotate-180" : ""}`}
    >
      <path
        d="M7 4.5L12.5 10L7 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function renderHighlightedTitle(title, highlightedWord) {
  if (!highlightedWord || !title.includes(highlightedWord)) {
    return title;
  }

  const parts = title.split(highlightedWord);

  return (
    <>
      {parts[0]}

      <span className="relative mx-[0.14em] inline-block text-[#FFD62D]">
        {highlightedWord}

        <span
          aria-hidden="true"
          className="absolute -bottom-2 left-[8%] right-[8%] h-[3px] rounded-full bg-[#FFD62D] shadow-[0_0_12px_rgba(255,214,45,0.5)]"
        />
      </span>

      {parts.slice(1).join(highlightedWord)}
    </>
  );
}

function PageBanner({
  title,
  highlightedWord,
  description,
  image,
  imageAlt,
  breadcrumbs = [],
  priority = true,
  tornEdgeImage = "/images/shape_white_transparent.png",
  showBottomBg = true,
  bottomBgClassName = "",
  imagePosition = "center center",
}) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const sectionId = useId().replace(/:/g, "");

  const breadcrumbSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        ...(item.href
          ? {
              item: item.href,
            }
          : {}),
      })),
    }),
    [breadcrumbs],
  );

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      aria-labelledby={`page-banner-title-${sectionId}`}
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className="
        page-banner relative isolate w-full overflow-hidden bg-black
        min-h-[390px]
        sm:min-h-[440px]
        md:min-h-[500px]
        lg:min-h-[560px]
        xl:min-h-[590px]
      "
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority={priority}
          quality={95}
          sizes="100vw"
          className="page-banner-background object-cover"
          style={{
            objectPosition: imagePosition,
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-20 mx-auto flex min-h-[390px] w-[calc(100%_-_24px)] max-w-[1380px] flex-col items-center justify-center px-3 pb-20 pt-14 text-center sm:min-h-[440px] sm:px-5 sm:pb-24 md:min-h-[500px] lg:min-h-[560px] xl:min-h-[590px]">
        {breadcrumbs.length > 0 && (
          <nav
            aria-label={isAr ? "مسار الصفحة" : "Breadcrumb"}
            className="page-banner-breadcrumb mb-7"
          >
            <ol className="flex flex-wrap items-center justify-center gap-2 px-0 text-[12px] font-semibold text-white/80 sm:text-[13px] md:text-sm">
              {breadcrumbs.map((item, index) => (
                <li
                  key={`${item.label}-${index}`}
                  className="inline-flex items-center gap-2"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors duration-300 hover:text-[#FFD62D]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-[#FFD62D]">
                      {item.label}
                    </span>
                  )}

                  {index < breadcrumbs.length - 1 && (
                    <ChevronIcon isAr={isAr} />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1
          id={`page-banner-title-${sectionId}`}
          className="
            page-banner-title max-w-[1050px] font-bold text-white
            drop-shadow-[0_5px_18px_rgba(0,0,0,0.55)]
            text-[42px] leading-[1.25]
            sm:text-[52px]
            md:text-[64px]
            lg:text-[76px]
            xl:text-[84px]
          "
        >
          {renderHighlightedTitle(title, highlightedWord)}
        </h1>

        {description && (
          <p
            className="
              page-banner-description mt-8 max-w-[900px]
              text-[14px] font-semibold leading-[2] text-white
              drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]
              sm:text-[15px]
              md:text-[17px]
              lg:text-[18px]
            "
          >
            {description}
          </p>
        )}
      </div>

      {showBottomBg && (
        <BottomBg img={tornEdgeImage} className={bottomBgClassName} />
      )}

      <style jsx global>{`
        @keyframes pageBannerBackgroundEnter {
          from {
            transform: scale(1.055);
          }

          to {
            transform: scale(1);
          }
        }

        @keyframes pageBannerFadeUp {
          from {
            opacity: 0;
            transform: translate3d(0, 24px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .page-banner-background {
          animation: pageBannerBackgroundEnter 1400ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .page-banner-breadcrumb {
          animation: pageBannerFadeUp 650ms 80ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .page-banner-title {
          animation: pageBannerFadeUp 750ms 170ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .page-banner-description {
          animation: pageBannerFadeUp 750ms 290ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .page-banner-background,
          .page-banner-breadcrumb,
          .page-banner-title,
          .page-banner-description {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default PageBanner;
