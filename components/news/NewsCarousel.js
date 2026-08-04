import Link from "next/link";
import { useSelector } from "react-redux";
import ActivityCard from "./ActivityCard";
import NewsCard from "./NewsCard";
import { richTextToPlainText } from "./richTextPreview";

const NewsCarousel = ({
  news = [],
  activities = [],
  type,
  hideHeader = false,
  sectionTitle,
  sectionDescription,
  emptyText,
  local: localProp,
}) => {
  const { local: reduxLocal } = useSelector((state) => state.language);

  const local = localProp || reduxLocal;
  const isRTL = local === "ar";

  const getTranslation = (translations = []) => {
    if (!Array.isArray(translations) || translations.length === 0) {
      return {};
    }

    return (
      translations.find(
        (item) =>
          String(item?.locale || "").toLowerCase() ===
          String(local || "").toLowerCase(),
      ) ||
      translations[0] ||
      {}
    );
  };

  const getImageSrc = (images = []) => {
    const imagePath = images?.[0]?.image_url;

    if (!imagePath || typeof imagePath !== "string") {
      return "/images/eim.png";
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    return `https://api.sedihisham.com/${imagePath.replace(/^\/+/, "")}`;
  };

  const visibleNews = type === "homepage" ? news.slice(0, 4) : news;

  const hasNoContent = visibleNews.length === 0 && activities.length === 0;

  const defaultTitle = isRTL
    ? "أخبار وفعاليات سيدي هشام"
    : "Sedi Hisham News & Activities";

  const defaultDescription = isRTL
    ? "تابع آخر الأخبار والمستجدات الخاصة بسيدي هشام."
    : "Follow the latest Sedi Hisham news and updates.";

  const emptyMessage =
    emptyText ||
    (isRTL
      ? "لا توجد أخبار أو فعاليات لعرضها"
      : "There is no news or activities to show");

  return (
    <section
      className="news-listing-section w-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {!hideHeader && (
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="font-arabicBold text-2xl leading-tight text-gray-900 sm:text-3xl">
            {sectionTitle || defaultTitle}
          </h2>

          <div className="mt-3 h-[3px] w-14 rounded-full bg-primary mx-auto" />

          <p className="mt-4 font-arabicLight text-sm leading-7 text-gray-500 sm:text-base">
            {sectionDescription || defaultDescription}
          </p>
        </div>
      )}

      {hasNoContent ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
          <p className="font-arabicMedium text-base text-gray-500 sm:text-lg">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <>
          {type === "homepage" ? (
            <>
              <div className="grid w-full grid-cols-1 items-stretch gap-2 min-[560px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visibleNews.map((item) => {
                  const translation = getTranslation(item?.new_translations);

                  return (
                    <div key={item?.id} className="h-full w-full min-w-0">
                      <NewsCard
                        local={local}
                        id={item?.id}
                        image={getImageSrc(item?.image_url)}
                        title={richTextToPlainText(translation?.title)}
                        description={richTextToPlainText(
                          translation?.descrition,
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-center sm:mt-10">
                <Link
                  href="/news"
                  className="inline-flex min-h-[46px] min-w-[140px] items-center justify-center rounded-xl bg-[#D40017] px-7 py-2.5 text-center font-arabicMedium text-sm text-white shadow-[0_10px_25px_rgba(212,0,23,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B60014] hover:shadow-[0_14px_30px_rgba(212,0,23,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C1422]"
                >
                  {isRTL ? "المزيد" : "More"}
                </Link>
              </div>
            </>
          ) : (
            <div className="grid w-full grid-cols-1 items-stretch gap-6 min-[560px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleNews.map((item) => {
                const translation = getTranslation(item?.new_translations);

                return (
                  <div key={item?.id} className="h-full w-full min-w-0">
                    <NewsCard
                      local={local}
                      id={item?.id}
                      image={getImageSrc(item?.image_url)}
                      title={richTextToPlainText(translation?.title)}
                      description={richTextToPlainText(translation?.descrition)}
                    />
                  </div>
                );
              })}

              {activities.map((activity) => {
                const translation = getTranslation(
                  activity?.activity_translations,
                );

                return (
                  <div key={activity?.id} className="h-full w-full min-w-0">
                    <ActivityCard
                      local={local}
                      id={activity?.id}
                      image={getImageSrc(activity?.image_url)}
                      title={richTextToPlainText(translation?.title)}
                      description={richTextToPlainText(translation?.descrition)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <style jsx global>{`
        .news-listing-section .news-card-media > div {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }

        .news-listing-section .news-card-media span {
          position: absolute !important;
          inset: 0 !important;
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }

        .news-listing-section .news-card-media img {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
        }
      `}</style>
    </section>
  );
};

export default NewsCarousel;
