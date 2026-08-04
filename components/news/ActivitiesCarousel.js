import { useSelector } from "react-redux";
import ActivityCard from "./ActivityCard";
import { richTextToPlainText } from "./richTextPreview";

const ActivitiesCarousel = ({
  activities = [],
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

  const defaultTitle = isRTL ? "الفعاليات" : "Activities";

  const defaultDescription = isRTL
    ? "تابع الفعاليات والمشاركات المختلفة الخاصة بسيدي هشام."
    : "Follow Sedi Hisham activities and participations.";

  const emptyMessage =
    emptyText ||
    (isRTL ? "لا توجد فعاليات لعرضها" : "There are no activities to show");

  return (
    <section
      className="activities-listing-section w-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {!hideHeader && (
        <div className="mb-8 sm:mb-10">
          <h2 className="font-arabicBold text-2xl leading-tight text-gray-900 sm:text-3xl">
            {sectionTitle || defaultTitle}
          </h2>

          <div className="mt-3 h-[3px] w-14 rounded-full bg-[#7C1422]" />

          <p className="mt-4 max-w-2xl font-arabicLight text-sm leading-7 text-gray-500 sm:text-base">
            {sectionDescription || defaultDescription}
          </p>
        </div>
      )}

      {activities.length === 0 ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
          <p className="font-arabicMedium text-base text-gray-500 sm:text-lg">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-2 min-[560px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {activities.map((activity) => {
            const translation = getTranslation(activity?.activity_translations);

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

      <style jsx global>{`
        .activities-listing-section .news-card-media > div {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
        }

        .activities-listing-section .news-card-media span {
          position: absolute !important;
          inset: 0 !important;
          display: block !important;
          width: 100% !important;
          height: 100% !important;
        }

        .activities-listing-section .news-card-media img {
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

export default ActivitiesCarousel;
