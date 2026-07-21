import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useWidth } from "../../util/useWidth";
import ActivityCard from "./ActivityCard";
import NewsCard from "./NewsCard";

const NewsCarousel = ({ news = [], activities = [], type }) => {
  const { local } = useSelector((state) => state.language);
  const { isMobile } = useWidth();

  const isRTL = local === "ar";
  const itemsLimit = isMobile ? 4 : 4;

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

  const parseValue = (value) => {
    if (!value) return null;

    return parse(String(value));
  };

  return (
    <section
      className="news-carousel-section w-full bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="news-section-heading relative inline-block text-center font-arabicMedium text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            {isRTL
              ? "أخبار وفعاليات سيدي هشام"
              : "Sidi Hisham News & Activities"}
          </h2>
          <span className="mt-3 h-[3px] w-14 rounded-full bg-[#D40017]" />

          <p className="mt-4 max-w-2xl mx-auto text-center font-arabicLight text-sm leading-7 text-gray-500 sm:text-base">
            {isRTL
              ? "تابع أحدث أخبار وفعاليات سيدي هشام وتعرّف على كل جديد."
              : "Follow the latest Sidi Hisham news, activities, and updates."}
          </p>
        </div>

        {news?.length === 0 && activities?.length === 0 ? (
          <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
            <p className="font-arabicMedium text-base text-gray-500 sm:text-lg">
              {isRTL
                ? "لا توجد أخبار أو فعاليات لعرضها"
                : "There is no news or activities to show"}
            </p>
          </div>
        ) : (
          <>
            {type === "homepage" ? (
              <>
                <div className="grid w-full grid-cols-1 items-stretch gap-6 min-[550px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {news?.slice(0, itemsLimit)?.map((neew) => {
                    const translation = getTranslation(neew?.new_translations);

                    return (
                      <div key={neew.id} className="h-full w-full min-w-0">
                        <NewsCard
                          local={local}
                          id={neew.id}
                          image={
                            "https://api.sedihisham.com/" +
                            neew.image_url[0]?.image_url
                          }
                          title={parseValue(translation?.title)}
                          description={parseValue(translation?.descrition)}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-center sm:mt-10">
                  <a
                    href="/news"
                    className="inline-flex min-h-[46px] min-w-[140px] items-center justify-center rounded-xl bg-[#D40017] px-7 py-2.5 text-center font-arabicMedium text-sm text-white shadow-[0_10px_25px_rgba(212,0,23,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B60014] hover:shadow-[0_14px_30px_rgba(212,0,23,0.25)]"
                  >
                    {isRTL ? "المزيد" : "More"}
                  </a>
                </div>
              </>
            ) : (
              <div className="grid w-full grid-cols-1 items-stretch gap-6 min-[550px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {news?.map((neew) => {
                  const translation = getTranslation(neew?.new_translations);

                  return (
                    <div key={neew.id} className="h-full w-full min-w-0">
                      <NewsCard
                        local={local}
                        id={neew.id}
                        image={
                          "https://api.sedihisham.com/" +
                          neew.image_url[0]?.image_url
                        }
                        title={parseValue(translation?.title)}
                        description={parseValue(translation?.descrition)}
                      />
                    </div>
                  );
                })}

                {activities?.map((activity) => {
                  const translation = getTranslation(
                    activity?.activity_translations,
                  );

                  return (
                    <div key={activity.id} className="h-full w-full min-w-0">
                      <ActivityCard
                        local={local}
                        id={activity.id}
                        image={
                          "https://api.sedihisham.com/" +
                          activity.image_url[0]?.image_url
                        }
                        title={parseValue(translation?.title)}
                        description={parseValue(translation?.descrition)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        .news-carousel-section .carousel-card {
          width: 100% !important;
          min-width: 0 !important;
          max-width: none !important;
          height: 100% !important;
          margin: 0 !important;
        }

        .news-carousel-section .news-card-media,
        .news-carousel-section .news-card-media > div,
        .news-carousel-section .news-card-media > span,
        .news-carousel-section .news-card-media picture {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
        }

        .news-carousel-section .news-card-media img {
          display: block !important;
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
        }

        @media (max-width: 549px) {
          .news-carousel-section .news-card-media {
            height: 220px !important;
          }
        }

        @media (min-width: 550px) and (max-width: 767px) {
          .news-carousel-section .news-card-media {
            height: 185px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .news-carousel-section .news-card-media {
            height: 205px !important;
          }
        }

        @media (min-width: 1024px) {
          .news-carousel-section .news-card-media {
            height: 215px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsCarousel;
