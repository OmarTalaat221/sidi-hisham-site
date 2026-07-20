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

    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }

    return `https://api.sedihisham.com/${src.replace(/^\/+/, "")}`;
  }

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="carousel-card news-card group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-gray-100 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D40017]/20 hover:shadow-[0_18px_48px_rgba(0,0,0,0.13)]"
    >
      <div className="news-card-media relative h-[220px] w-full shrink-0 overflow-hidden rounded-t-[22px] bg-gray-100">
        <SEOImage
          width={900}
          height={560}
          loader={GraphCMSImageLoader}
          src={image}
          alt={isRTL ? "صورة خبر سيدي هشام" : "Sidi Hisham news image"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

        {/* <span className="absolute bottom-0 start-0 h-[3px] w-0 bg-[#D40017] transition-all duration-500 group-hover:w-full" /> */}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <Title local={local} text={title} size="[18px]" />

          {subTitle && (
            <div className="text-start font-arabicMedium text-sm leading-6 text-[#007530]">
              {subTitle}
            </div>
          )}

          <div className="news-card-description line-clamp-3 text-start font-arabicLight text-sm leading-7 text-gray-600">
            {description}
          </div>
        </div>

        <Link href={`/news/newsDetails/${id}`} className="mt-5 block w-full">
          <button
            type="button"
            className="min-h-[44px] w-full rounded-xl bg-[#D40017] px-5 py-2.5 font-arabicMedium text-sm text-white transition-all duration-300 hover:bg-[#B60014] active:scale-[0.98]"
          >
            {isRTL ? "التفاصيل" : "Details"}
          </button>
        </Link>
      </div>

      <style jsx global>{`
        .news-card-description {
          display: -webkit-box !important;
          min-height: 84px;
          max-height: 84px;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        .news-card-description > * {
          margin: 0 !important;
          padding: 0 !important;
          font: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          text-align: start !important;
        }
      `}</style>
    </div>
  );
}
