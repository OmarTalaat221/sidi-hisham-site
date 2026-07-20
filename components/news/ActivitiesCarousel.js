import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useState, useRef, useEffect } from "react";
import NewsCard from "./NewsCard";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import ActivityCard from "./ActivityCard";

const ActivitiesCarousel = ({ activities }) => {
  const { local } = useSelector((state) => state.language);
  const isRTL = local === "ar";

  return (
    <section 
      className="w-full py-8 px-4 md:px-6 lg:px-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {local === 'ar' ? 'الفعاليات' : 'Activities'}
          </h2>
        </div>
        
        {activities?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">
              {local === 'ar' 
                ? 'لا توجد فعاليات لعرضها' 
                : 'There is no activities to show'}
            </p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 ${local === 'ar' ? 'direction-rtl text-right' : 'direction-ltr text-left'}`}>
            {activities?.map((activity, index) => (
              <div
                key={index}
                className="h-full"
              >
                <ActivityCard
                  local={local}
                  id={activity.id}
                  image={
                    "https://api.sedihisham.com/" +
                    activity.image_url[0]?.image_url
                  }
                  title={
                    activity.activity_translations.length > 0 &&
                    parse(
                      activity.activity_translations.find(
                        (item) => item.locale === local
                      ).title
                    )
                  }
                  description={
                    activity.activity_translations.length > 0 &&
                    activity.activity_translations.find(
                      (item) => item.locale === local
                    ).descrition
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ActivitiesCarousel;
