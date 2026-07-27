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
      className="news-card group relative isolate flex h-full min-h-[490px] w-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-white"
    >
      <span
        aria-hidden="true"
        className="news-card-gold-border pointer-events-none absolute inset-0 z-20 rounded-[22px] border-2 border-[#FFD62D] opacity-0"
      />

      <div className="news-card-media relative h-[220px] w-full shrink-0 overflow-hidden rounded-t-[22px] bg-gray-100">
        <SEOImage
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loader={GraphCMSImageLoader}
          src={image || "/images/eim.png"}
          alt={isRTL ? "صورة خبر سيدي هشام" : "Sidi Hisham news image"}
          className="news-card-image"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="news-card-title-wrapper">
            <Title local={local} text={title} size="[18px]" />
          </div>

          {subTitle && (
            <div className="mt-3 text-start font-arabicMedium text-sm leading-6 text-primary">
              {subTitle}
            </div>
          )}

          <p
            className="news-card-description mt-3 text-start font-arabicLight text-sm leading-7 text-gray-600"
            title={description || ""}
          >
            {description || ""}
          </p>
        </div>

        <Link
          href={`/news/newsDetails/${id}`}
          className="news-card-cta mt-5 inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-center font-arabicMedium text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={isRTL ? "عرض تفاصيل الخبر" : "View news details"}
        >
          {isRTL ? "التفاصيل" : "Details"}
        </Link>
      </div>

      <style jsx global>{`
        .news-card {
          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.08),
            0 4px 10px rgba(0, 0, 0, 0.05);
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .news-card-gold-border {
          transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .news-card-image {
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        .news-card-cta {
          transition:
            background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .news-card-title-wrapper {
          min-width: 0;
          min-height: 3.5rem;
          max-height: 3.5rem;
          overflow: hidden;
        }

        .news-card-title-wrapper > * {
          display: -webkit-box !important;
          overflow: hidden !important;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin: 0 !important;
          text-align: start !important;
          overflow-wrap: anywhere;
        }

        .news-card-description {
          display: -webkit-box;
          width: 100%;
          height: 5.25rem;
          min-height: 5.25rem;
          max-height: 5.25rem;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          white-space: normal;
          word-break: normal;
          overflow-wrap: anywhere;
        }

        @media (hover: hover) and (pointer: fine) {
          .news-card:hover {
            transform: translate3d(0, -4px, 0);
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.14),
              0 8px 16px rgba(0, 0, 0, 0.07);
          }

          .news-card:hover .news-card-gold-border {
            opacity: 1;
          }

          .news-card:hover .news-card-image {
            transform: scale(1.045);
          }

          .news-card:hover .news-card-cta {
            background-color: #b80014 !important;
          }
        }

        @media (hover: none) {
          .news-card:hover {
            transform: none;
          }
        }

        @media (max-width: 559px) {
          .news-card {
            min-height: 470px;
          }

          .news-card-media {
            height: 210px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-card,
          .news-card-image,
          .news-card-cta,
          .news-card-gold-border {
            transition: none !important;
          }

          .news-card:hover,
          .news-card:hover .news-card-image {
            transform: none !important;
          }
        }
      `}</style>
    </article>
  );
}
