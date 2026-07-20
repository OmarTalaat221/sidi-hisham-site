import React, { useEffect, useState } from "react";
import CertificatesGallery from "../../components/whoweare/CertificatesSlider";
import axios from "axios";
import { useSelector } from "react-redux";
import SEO from '@/components/SEO';

export default function Index() {
  //Get who_we_are page data
  const [whoWeAreData, setWhoWeAreData] = useState([]);
  const getWhoWeAreData = async () => {
    await axios
      .get("https://api.sedihisham.com/pages/getall/who_we_are")
      .then((response) => {
        setWhoWeAreData(response.data);
      });
  };

  useEffect(() => {
    getWhoWeAreData();
  }, []);

  const { local } = useSelector((state) => state.language);
  const isRTL = local === "ar";

  const heroImage =
    "https://api.sedihisham.com/" +
    whoWeAreData.secondpart?.find(
      (item) => item.categoryImage === "Who_we_are_page"
    )?.path_image;

  const t = (arKey, enKey) =>
    whoWeAreData.firstpart !== undefined
      ? local === "ar"
        ? whoWeAreData.firstpart[0]?.[arKey]
        : whoWeAreData.firstpart[0]?.[enKey]
      : null;

  const sections = [
    {
      key: "intro",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      titleAr: "مقدمة",
      titleEn: "Introduction",
      content: t("intro_ar", "intro_en"),
    },
    {
      key: "values",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      titleAr: "قيمنا",
      titleEn: "Our Values",
      content: t("our_value_ar", "our_value_en"),
    },
    {
      key: "goal",
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      titleAr: "هدفنا",
      titleEn: "Our Goal",
      content: t("our_goal_ar", "our_goal_en"),
    },
  ];

  return (
    <div className="bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <SEO
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      {/* Hero */}
      <section className="relative h-[56vh] md:h-[64vh] w-full overflow-hidden">
        <img
          alt="سيدي هشام"
          src={heroImage}
          style={{ objectFit: "cover" }}
          className="absolute inset-0 w-full h-full"
        />
      </section>

      {/* Content sections */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-20">
        {sections.map((s, i) => (
          <div
            key={s.key}
            className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start ${
              i % 2 === 1 ? (isRTL ? "md:flex-row" : "md:flex-row-reverse") : ""
            }`}
          >
            <div className="flex-shrink-0 flex items-center gap-4 md:flex-col md:items-start w-full md:w-40">
              <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {local === "ar" ? s.titleAr : s.titleEn}
              </h2>
            </div>

            <div className="flex-1 border-t md:border-t-0 md:border-s-2 border-gray-200 pt-6 md:pt-0 md:ps-8">
              {s.content !== undefined && s.content !== null ? (
                <div
                  className="text-gray-600 leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: s.content }}
                />
              ) : (
                <div className="text-gray-400 italic">
                  {local === "ar" ? "جاري تحميل المحتوى..." : "Loading content..."}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* General Manager Message */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <svg className="w-10 h-10 text-red-500 mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
          </svg>
          <p className="text-2xl md:text-3xl font-light leading-relaxed mb-10">
            {t("word_director_ar", "word_director_en") ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: t("word_director_ar", "word_director_en"),
                }}
              />
            ) : (
              <span className="text-gray-400 italic text-lg">
                {local === "ar" ? "جاري تحميل الرسالة..." : "Loading message..."}
              </span>
            )}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-600" />
            <div>
              <p className="font-semibold">
                {local === "ar" ? "المدير العام" : "General Manager"}
              </p>
              <p className="text-sm text-gray-400">
                {local === "ar" ? "شركة العقاد للصناعة والتجارة" : "Al-Aqad Company"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {local === "ar" ? "شهادات الجودة" : "Quality Certifications"}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {local === "ar"
              ? "نفخر بشهادات الجودة الدولية التي تؤكد التزامنا بالمعايير العالية والتميز في الصناعة"
              : "We are proud of our international quality certifications that confirm our commitment to high standards and excellence in industry"}
          </p>
          <div className="mt-6 w-12 h-[3px] bg-red-600 rounded-full mx-auto" />
        </div>

        <CertificatesGallery data={whoWeAreData.secondpart} />
      </section>
    </div>
  );
}
