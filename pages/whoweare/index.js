import BottomBg from "@/components/common/BottomBg";
import PageBanner from "@/components/common/PageBanner";
import SEO from "@/components/SEO";
import {
  BadgeCheckIcon,
  ExclamationCircleIcon,
  FlagIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useId, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CertificatesGallery from "../../components/whoweare/CertificatesSlider";

const API_URL = "https://api.sedihisham.com/pages/getall/who_we_are";

function stripHtml(value = "") {
  return String(value)
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function BrandPattern({ color = "#7C1422", opacity = 0.08, className = "" }) {
  const patternId = useId().replace(/:/g, "");

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width="150"
          height="150"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            opacity={opacity}
          >
            <path d="M38 126V31" />

            <path d="M38 47C27 46 21 39 21 29C32 30 38 37 38 47Z" />
            <path d="M38 66C25 64 19 56 19 45C31 47 38 55 38 66Z" />
            <path d="M38 86C25 83 19 75 20 64C32 67 38 75 38 86Z" />
            <path d="M38 106C27 102 22 94 23 84C34 88 39 96 38 106Z" />

            <path d="M38 47C49 46 55 39 55 29C44 30 38 37 38 47Z" />
            <path d="M38 66C51 64 57 56 57 45C45 47 38 55 38 66Z" />
            <path d="M38 86C51 83 57 75 56 64C44 67 38 75 38 86Z" />
            <path d="M38 106C49 102 54 94 53 84C42 88 37 96 38 106Z" />

            <path d="M106 22C98 34 94 46 94 59C94 74 100 86 111 97" />
            <path d="M94 44C84 41 77 34 75 24C85 26 92 33 94 44Z" />
            <path d="M97 67C86 64 79 57 78 46C89 49 96 56 97 67Z" />
            <path d="M104 87C94 85 86 79 83 69C94 70 101 77 104 87Z" />

            <circle cx="112" cy="119" r="3" fill={color} stroke="none" />

            <circle cx="126" cy="109" r="1.5" fill={color} stroke="none" />

            <circle cx="96" cy="124" r="1.5" fill={color} stroke="none" />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

function TextSkeleton() {
  return (
    <div className="space-y-3">
      <span className="block h-4 w-full animate-pulse rounded bg-slate-100" />
      <span className="block h-4 w-[94%] animate-pulse rounded bg-slate-100" />
      <span className="block h-4 w-[82%] animate-pulse rounded bg-slate-100" />
      <span className="block h-4 w-[65%] animate-pulse rounded bg-slate-100" />
    </div>
  );
}

function ExpandIcon({ expanded }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-4 w-4 transition-transform duration-200 ${
        expanded ? "rotate-180" : ""
      }`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RichTextPreview({
  content,
  loading,
  isRTL,
  collapsedHeight = 210,
  longContentLength = 440,
}) {
  const [expanded, setExpanded] = useState(false);

  if (loading) {
    return <TextSkeleton />;
  }

  if (!content) {
    return (
      <p className="text-sm font-medium text-slate-400">
        {isRTL
          ? "لا يوجد محتوى متاح حاليًا."
          : "No content is currently available."}
      </p>
    );
  }

  const longContent = stripHtml(content).length > longContentLength;

  return (
    <div>
      <div
        className={`relative ${
          longContent && !expanded ? "overflow-hidden" : ""
        }`}
        style={{
          maxHeight: longContent && !expanded ? `${collapsedHeight}px` : "none",
        }}
      >
        <div
          className="about-rich-text text-[15px] font-medium leading-[2.05] text-slate-600 sm:text-[16px]"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

        {longContent && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/95 to-transparent" />
        )}
      </div>

      {longContent && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-primary transition-opacity hover:opacity-75"
        >
          <span className="border-b border-primary/35 pb-0.5">
            {expanded
              ? isRTL
                ? "عرض أقل"
                : "Show less"
              : isRTL
                ? "استكمال القراءة"
                : "Continue reading"}
          </span>

          <ExpandIcon expanded={expanded} />
        </button>
      )}
    </div>
  );
}

function FeatureIcon({ Icon }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
      <Icon className="h-6 w-6" strokeWidth={1.7} />
    </span>
  );
}

function ContentCard({ number, title, Icon, content, loading, isRTL }) {
  return (
    <article className="group relative isolate overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 sm:p-8">
      <BrandPattern color="#7C1422" opacity={0.025} className="-z-10" />

      <span className="absolute inset-y-8 start-0 w-[3px] rounded-e-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-4">
        <FeatureIcon Icon={Icon} />

        <div className="text-start">
          <span className="text-[11px] font-bold tracking-[0.12em] text-primary/65">
            {number}
          </span>

          <h3 className="mt-1 text-[22px] font-bold leading-[1.5] text-[#7C1422] sm:text-[25px]">
            {title}
          </h3>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-6">
        <RichTextPreview
          content={content}
          loading={loading}
          isRTL={isRTL}
          collapsedHeight={165}
          longContentLength={310}
        />
      </div>
    </article>
  );
}

export default function WhoWeArePage() {
  const { local } = useSelector((state) => state.language);

  const isRTL = local === "ar";

  const [whoWeAreData, setWhoWeAreData] = useState({
    firstpart: [],
    secondpart: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadWhoWeAreData() {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get(API_URL);

        if (cancelled) {
          return;
        }

        setWhoWeAreData({
          firstpart: Array.isArray(response.data?.firstpart)
            ? response.data.firstpart
            : [],
          secondpart: Array.isArray(response.data?.secondpart)
            ? response.data.secondpart
            : [],
        });
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWhoWeAreData();

    return () => {
      cancelled = true;
    };
  }, []);

  const contentData = whoWeAreData.firstpart?.[0] || {};

  const translateContent = (arKey, enKey) =>
    isRTL ? contentData?.[arKey] : contentData?.[enKey];

  const introduction = translateContent("intro_ar", "intro_en");

  const values = translateContent("our_value_ar", "our_value_en");

  const goal = translateContent("our_goal_ar", "our_goal_en");

  const directorMessage = translateContent(
    "word_director_ar",
    "word_director_en",
  );

  const pageDescription = isRTL
    ? "من المصنع إلى الأسواق، نبني ثقة تمتد مع كل منتج يحمل اسم سيدي هشام."
    : "From manufacturing to the market, we build trust through every product carrying the Sedi Hisham name.";

  const introductionLabels = useMemo(
    () =>
      isRTL
        ? [
            "تصنيع المنتجات الغذائية",
            "التعبئة ومراقبة الجودة",
            "التجارة والوصول إلى الأسواق",
          ]
        : [
            "Food manufacturing",
            "Packaging and quality control",
            "Trade and market reach",
          ],
    [isRTL],
  );

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className="min-h-screen bg-white"
    >
      <SEO
        title={isRTL ? "من نحن | سيدي هشام" : "About us | Sedi Hisham"}
        description={pageDescription}
        keywords={
          isRTL
            ? "سيدي هشام, شركة العقاد, الصناعات الغذائية, تصنيع وتعبئة الأغذية"
            : "Sedi Hisham, Al-Aqad Company, food industry, food manufacturing"
        }
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      <PageBanner
        title={isRTL ? "من نحن" : "About us"}
        highlightedWord={isRTL ? "نحن" : "About"}
        description={pageDescription}
        image="/images/about-banner.webp"
        imageAlt={
          isRTL
            ? "مصنع سيدي هشام للصناعات الغذائية"
            : "Sedi Hisham food manufacturing factory"
        }
        breadcrumbs={[
          {
            label: isRTL ? "الرئيسية" : "Home",
            href: "/",
          },
          {
            label: isRTL ? "من نحن" : "About us",
          },
        ]}
        imagePosition="center center"
        showBottomBg
      />

      <section className="relative isolate overflow-hidden bg-white">
        <BrandPattern color="#7C1422" opacity={0.035} className="-z-10" />

        <div className="absolute -start-32 top-28 -z-10 h-[380px] w-[380px] rounded-full bg-primary/[0.04] blur-[90px]" />

        <div className="mx-auto w-[calc(100%_-_24px)] max-w-[1380px] px-3 py-16 sm:py-20 lg:py-24">
          {error && (
            <div className="mx-auto mb-9 flex max-w-[700px] items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm font-semibold text-red-700">
              <ExclamationCircleIcon className="h-5 w-5 shrink-0" />

              <span>
                {isRTL
                  ? "تعذر تحميل محتوى الصفحة حاليًا."
                  : "Unable to load the page content."}
              </span>
            </div>
          )}

          <header className="mx-auto max-w-[750px] text-center">
            <p className="text-[12px] font-bold tracking-[0.15em] text-primary">
              {isRTL
                ? "شركة العقاد للصناعة والتجارة"
                : "AL-AQAD COMPANY FOR INDUSTRY AND TRADE"}
            </p>

            <h2 className="mt-4 text-[30px] font-bold leading-[1.45] text-[#7C1422] sm:text-[38px] lg:text-[44px]">
              {isRTL
                ? "صناعة غذائية تبدأ بالجودة وتستمر بالثقة"
                : "Food manufacturing built on quality and sustained by trust"}
            </h2>

            <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-medium leading-7 text-slate-500 sm:text-[16px]">
              {isRTL
                ? "نهتم بالتفاصيل في كل مرحلة، من اختيار المنتج وحتى وصوله إلى الأسواق."
                : "We care about every stage, from product preparation to reaching the market."}
            </p>

            <span className="mx-auto mt-5 block h-[3px] w-16 rounded-full bg-primary" />
          </header>

          <article className="mt-12 overflow-hidden rounded-[28px] border border-slate-200 bg-white sm:mt-14">
            <div className="grid lg:grid-cols-[330px_minmax(0,1fr)]">
              <div className="relative isolate overflow-hidden bg-[#7C1422] px-7 py-10 text-white sm:px-9 lg:min-h-[410px] lg:px-10 lg:py-12">
                <BrandPattern
                  color="#FFFFFF"
                  opacity={0.12}
                  className="-z-10"
                />

                <div className="absolute -bottom-24 -end-24 -z-10 h-72 w-72 rounded-full border-[52px] border-white/[0.045]" />

                <span className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary px-3 py-3 text-white">
                  <InformationCircleIcon
                    className="h-7 w-7"
                    strokeWidth={1.7}
                  />
                </span>

                <p className="mt-7 text-[12px] font-bold tracking-[0.13em] text-white/60">
                  {isRTL ? "قصتنا" : "OUR STORY"}
                </p>

                <h2 className="mt-3 text-[27px] font-bold leading-[1.55] text-white sm:text-[32px]">
                  {isRTL
                    ? "من داخل المصنع نصنع قيمة تصل إلى المستهلك"
                    : "From our factory, we create value that reaches consumers"}
                </h2>

                <div className="mt-8 space-y-4">
                  {introductionLabels.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[14px] font-semibold text-white/85"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] text-white">
                        {index + 1}
                      </span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-9 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
                <div className="flex items-center gap-4">
                  <span className="text-[12px] font-bold text-primary">01</span>
                  <h3 className="text-[22px] font-bold text-[#7C1422] sm:text-[27px]">
                    {isRTL ? "نبذة عن الشركة" : "About the company"}
                  </h3>
                </div>

                <div className="mt-7">
                  <RichTextPreview
                    content={introduction}
                    loading={loading}
                    isRTL={isRTL}
                    collapsedHeight={220}
                    longContentLength={420}
                  />
                </div>
              </div>
            </div>
          </article>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ContentCard
              number="02"
              title={isRTL ? "قيمنا" : "Our values"}
              Icon={BadgeCheckIcon}
              content={values}
              loading={loading}
              isRTL={isRTL}
            />

            <ContentCard
              number="03"
              title={isRTL ? "هدفنا" : "Our goal"}
              Icon={FlagIcon}
              content={goal}
              loading={loading}
              isRTL={isRTL}
            />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#F7F7F8] py-16 sm:py-20 lg:py-24">
        <BottomBg
          img="/images/shape_white_transparent.png"
          className="!absolute !top-0 !left-0 !right-0 rotate-180"
        />

        <BottomBg
          img="/images/shape_white_transparent.png"
          className="!absolute !bottom-0 !left-0 !right-0"
        />
        <BrandPattern color="#7C1422" opacity={0.025} className="-z-10" />

        <div className="mx-auto grid w-[calc(100%_-_24px)] max-w-[1120px] overflow-hidden rounded-[30px] border border-slate-200 bg-white lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="relative isolate overflow-hidden bg-[#7C1422] px-7 py-10 text-white sm:px-10 sm:py-12 lg:min-h-[470px]">
            <BrandPattern color="#FFFFFF" opacity={0.14} className="-z-10" />

            <div className="absolute -bottom-24 -start-20 -z-10 h-72 w-72 rounded-full border-[55px] border-white/[0.045]" />

            <svg
              aria-hidden="true"
              className="h-11 w-11 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>

            <p className="mt-7 text-[12px] font-bold tracking-[0.14em] text-white/60">
              {isRTL ? "من الإدارة" : "FROM MANAGEMENT"}
            </p>

            <h2 className="mt-3 text-[29px] font-bold leading-[1.5] text-white sm:text-[34px]">
              {isRTL ? "رسالة المدير العام" : "General Manager Message"}
            </h2>

            <span className="mt-6 block h-[3px] w-14 rounded-full bg-primary" />

            <p className="mt-7 text-[14px] font-medium leading-7 text-white/70">
              {isRTL
                ? "رؤية تقود العمل، ومسؤولية تحافظ على ثقة العملاء وجودة المنتجات."
                : "A vision that guides our work and a responsibility that protects product quality and customer trust."}
            </p>
          </div>

          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            {loading ? (
              <TextSkeleton />
            ) : directorMessage ? (
              <RichTextPreview
                content={directorMessage}
                loading={false}
                isRTL={isRTL}
                collapsedHeight={250}
                longContentLength={560}
              />
            ) : (
              <p className="text-sm font-medium text-slate-400">
                {isRTL
                  ? "لا توجد رسالة متاحة حاليًا."
                  : "No message is currently available."}
              </p>
            )}

            <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                GM
              </span>

              <div className="text-start">
                <p className="font-bold text-[#7C1422]">
                  {isRTL ? "المدير العام" : "General Manager"}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {isRTL
                    ? "شركة العقاد للصناعة والتجارة"
                    : "Al-Aqad Company for Industry and Trade"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white">
        <BrandPattern color="#7C1422" opacity={0.03} className="-z-10" />

        <div className="mx-auto w-[calc(100%_-_24px)] max-w-[1380px] px-3 py-16 sm:py-20 lg:py-24">
          <header className="mx-auto max-w-[720px] text-center">
            <p className="text-[12px] font-bold tracking-[0.15em] text-primary">
              {isRTL ? "الجودة والاعتماد" : "QUALITY AND ACCREDITATION"}
            </p>

            <h2 className="mt-3 text-[30px] font-bold text-[#7C1422] sm:text-[37px]">
              {isRTL ? "شهادات الجودة" : "Quality Certifications"}
            </h2>

            <p className="mx-auto mt-4 max-w-[650px] text-[14px] font-medium leading-7 text-slate-500 sm:text-[16px]">
              {isRTL
                ? "اعتمادات تؤكد التزامنا بمعايير الجودة والسلامة في التصنيع الغذائي."
                : "Certifications confirming our commitment to food quality and safety standards."}
            </p>

            <span className="mx-auto mt-5 block h-[3px] w-14 rounded-full bg-primary" />
          </header>

          <div className="mt-11 sm:mt-14">
            <CertificatesGallery
              data={whoWeAreData.secondpart}
              loading={loading}
            />
          </div>
        </div>
      </section>

      <style jsx global>{`
        .about-rich-text {
          overflow-wrap: anywhere;
          color: inherit;
        }

        .about-rich-text,
        .about-rich-text * {
          font-family: var(--font-el-messiri) !important;
        }

        .about-rich-text p,
        .about-rich-text div,
        .about-rich-text span,
        .about-rich-text li {
          color: inherit !important;
          background: transparent !important;
          font-size: inherit !important;
          line-height: inherit !important;
        }

        .about-rich-text p {
          margin: 0;
        }

        .about-rich-text p + p {
          margin-top: 14px;
        }

        .about-rich-text h1,
        .about-rich-text h2,
        .about-rich-text h3,
        .about-rich-text h4 {
          margin: 18px 0 10px;
          color: #7c1422 !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          line-height: 1.7 !important;
        }

        .about-rich-text ul,
        .about-rich-text ol {
          margin-top: 14px;
          padding-inline-start: 23px;
        }

        .about-rich-text ul {
          list-style: disc;
        }

        .about-rich-text ol {
          list-style: decimal;
        }

        .about-rich-text li + li {
          margin-top: 7px;
        }

        .about-rich-text strong,
        .about-rich-text b {
          color: #7c1422 !important;
          font-weight: 700 !important;
        }

        .about-rich-text img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </main>
  );
}
