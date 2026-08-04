import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SEOImage from "../common/SEOImage";
import Title from "./Title";

export default function NewsCard({
  id,
  title,
  subTitle,
  description,
  image,
  local,
}) {
  const isRTL = local === "ar";

  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  function GraphCMSImageLoader({ src }) {
    if (!src || typeof src !== "string") {
      return "/images/eim.png";
    }

    if (
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("/images/")
    ) {
      return src;
    }

    return `https://api.sedihisham.com/${src.replace(/^\/+/, "")}`;
  }

  return (
    <article
      dir={isRTL ? "rtl" : "ltr"}
      className="news-editorial-card group relative flex h-full min-w-0 flex-col pb-8 md:px-5 md:pb-0"
    >
      <Link
        href={`/news/newsDetails/${id}`}
        aria-label={isRTL ? "عرض تفاصيل الخبر" : "View news details"}
        className="news-editorial-media relative block aspect-[16/11] w-full shrink-0 overflow-hidden rounded-tl-[18px] rounded-tr-[18px] bg-[#F2F2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D40017] focus-visible:ring-offset-4"
      >
        <SEOImage
          fill
          priority={false}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          loader={GraphCMSImageLoader}
          src={image || "/images/eim.png"}
          alt={
            title || (isRTL ? "صورة خبر سيدي هشام" : "Sidi Hisham news image")
          }
          className="news-editorial-image"
          objectFit="cover"
          objectPosition="center"
        />
      </Link>

      <div className="flex min-h-0 flex-1 flex-col pt-5 bg-white">
        <Link
          href={`/news/newsDetails/${id}`}
          className="news-editorial-title block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D40017] focus-visible:ring-offset-4"
        >
          <Title local={local} text={title} size="[20px]" />
        </Link>

        {subTitle && (
          <p className="news-editorial-subtitle mt-2 text-start font-arabicMedium text-sm leading-6 text-[#7C1422]">
            {subTitle}
          </p>
        )}

        {description && (
          <p
            className="news-editorial-description mt-3 text-start font-arabicLight text-[14px] leading-7 text-[#666666]"
            title={description}
          >
            {description}
          </p>
        )}

        <Link
          href={`/news/newsDetails/${id}`}
          aria-label={isRTL ? "عرض تفاصيل الخبر" : "View news details"}
          className="news-editorial-button !mt-6 inline-flex min-h-[46px] w-fit min-w-[138px] items-center justify-center gap-2 rounded-[5px] bg-[#D40017] px-6 py-2.5 font-arabicMedium text-sm text-white transition-[background-color,transform,box-shadow] duration-300 hover:bg-[#B50015] hover:shadow-[0_8px_18px_rgba(212,0,23,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D40017] focus-visible:ring-offset-4 active:scale-[0.98]"
        >
          <span>{isRTL ? "التفاصيل" : "Details"}</span>

          <ArrowIcon
            aria-hidden="true"
            className="news-editorial-arrow h-4 w-4 text-white"
            strokeWidth={2.4}
          />
        </Link>
      </div>

      <style jsx global>{`
        .news-editorial-media {
          isolation: isolate;
        }

        .news-editorial-image {
          transition:
            transform 650ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 350ms cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        .news-editorial-title {
          min-width: 0;
          min-height: 3.65rem;
          max-height: 3.65rem;
          overflow: hidden;
        }

        .news-editorial-title > * {
          display: -webkit-box !important;
          margin: 0 !important;
          overflow: hidden !important;
          color: #202020;
          text-align: start !important;
          font-weight: 700;
          line-height: 1.45 !important;
          overflow-wrap: anywhere;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          transition: color 300ms ease;
        }

        .news-editorial-subtitle {
          display: -webkit-box;
          max-height: 3rem;
          overflow: hidden;
          overflow-wrap: anywhere;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .news-editorial-description {
          display: -webkit-box;
          width: 100%;
          height: 6.95rem;
          min-height: 6.95rem;
          max-height: 6.95rem;
          overflow: hidden;
          white-space: normal;
          overflow-wrap: anywhere;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .news-editorial-button {
          margin-top: auto;
        }

        .news-editorial-arrow {
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .news-editorial-separator {
          inset-inline-end: 0;
          top: 10px;
          bottom: 10px;
          width: 1px;
        }

        @media (hover: hover) and (pointer: fine) {
          .news-editorial-card:hover .news-editorial-image {
            transform: scale(1.035);
            filter: saturate(1.04);
          }

          .news-editorial-card:hover .news-editorial-title > * {
            color: #d40017;
          }

          [dir="rtl"] .news-editorial-button:hover .news-editorial-arrow {
            transform: translate3d(-2px, -2px, 0);
          }

          [dir="ltr"] .news-editorial-button:hover .news-editorial-arrow {
            transform: translate3d(2px, -2px, 0);
          }
        }

        @media (max-width: 767px) {
          .news-editorial-card {
            min-height: 0;
          }

          .news-editorial-title {
            min-height: auto;
            max-height: none;
          }

          .news-editorial-description {
            height: auto;
            min-height: 0;
            max-height: 6.95rem;
          }

          .news-editorial-separator {
            inset-inline-start: 0;
            inset-inline-end: 0;
            top: auto;
            bottom: 0;
            width: 100%;
            height: 1px;
          }

          .news-editorial-button {
            margin-top: 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-editorial-image,
          .news-editorial-title > *,
          .news-editorial-arrow,
          .news-editorial-button {
            transition: none !important;
          }

          .news-editorial-card:hover .news-editorial-image,
          .news-editorial-button:hover .news-editorial-arrow {
            transform: none !important;
          }
        }
      `}</style>
    </article>
  );
}
