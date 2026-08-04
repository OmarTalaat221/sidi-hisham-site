import PageBanner from "@/components/common/PageBanner";
import SEO from "@/components/SEO";
import { useSelector } from "react-redux";
import Tabs from "../../components/news/Tabs";

export default function Index() {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const pageTitle = isAr ? "الأخبار والفعاليات" : "News and Events";

  const pageDescription = isAr
    ? "تابع أحدث أخبار سيدي هشام، والفعاليات والإنجازات والتحديثات الخاصة بالشركة ومنتجاتها."
    : "Discover the latest Sedi Hisham news, events, achievements and company updates.";

  return (
    <div>
      <SEO
        title={
          isAr
            ? "الأخبار والفعاليات | سيدي هشام"
            : "News and Events | Sedi Hisham"
        }
        description={pageDescription}
        keywords={
          isAr
            ? "سيدي هشام, أخبار سيدي هشام, فعاليات, شركة العقاد, منتجات غذائية"
            : "Sedi Hisham, news, events, Al Akkad company, food products"
        }
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      <PageBanner
        title={pageTitle}
        highlightedWord={isAr ? "الأخبار" : "News"}
        description={pageDescription}
        image={"/images/news-banner.webp"}
        imageAlt={
          isAr
            ? "خلفية صفحة أخبار وفعاليات سيدي هشام"
            : "Sedi Hisham news and events banner"
        }
        breadcrumbs={[
          {
            label: isAr ? "الرئيسية" : "Home",
            href: "/",
          },
          {
            label: isAr ? "الأخبار والفعاليات" : "News and Events",
          },
        ]}
        tornEdgeImage="/images/shape_white_transparent.png"
        showBottomBg
      />

      <section className="pattern-section pattern-section-news relative isolate w-full overflow-hidden bg-white">
        <div className="news-page-shell relative z-10 py-10 sm:py-12 lg:py-14">
          <Tabs />
        </div>
      </section>

      <style jsx global>{`
        .news-page-shell {
          width: calc(100% - 24px);
          max-width: 1380px;
          margin-inline: auto;
          padding-inline: 12px;
        }

        .pattern-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          margin-inline: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background-color: #ffffff !important;
        }

        .pattern-section::before {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-repeat: repeat;
          background-position: center top;
          background-size: 560px 560px;
          opacity: 0.07;
          pointer-events: none;
          content: "";
        }

        .pattern-section-news::before {
          background-image: url("/images/sedi-hisham-news-pattern-transparent.webp");
        }

        .pattern-section-news .news-listing-section,
        .pattern-section-news .activities-listing-section,
        .pattern-section-news .news-carousel-section {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
          padding-inline: 0 !important;
          background: transparent !important;
        }

        .pattern-section-news .news-listing-section > div,
        .pattern-section-news .activities-listing-section > div,
        .pattern-section-news .news-carousel-section > div {
          width: 100% !important;
          max-width: none !important;
          margin-inline: 0 !important;
        }

        @media (max-width: 639px) {
          .news-page-shell {
            width: calc(100% - 16px);
            padding-inline: 8px;
          }

          .pattern-section::before {
            background-size: 420px 420px;
          }
        }

        @media (min-width: 1400px) {
          .pattern-section::before {
            background-size: 620px 620px;
          }
        }
      `}</style>
    </div>
  );
}
