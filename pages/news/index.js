import OptimizedImage from "@/components/common/OptimizedImage";
import SEO from "@/components/SEO";
import Tabs from "../../components/news/Tabs";
import news from "../../public/images/news.jpg";
import newsBack from "../../public/images/NewsBack.png";
export default function Index() {
  return (
    <div>
      <SEO
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />
      <div className="absolute invisible md:visible  object-cover opacity-50 w-full h-full rounded-xl">
        <OptimizedImage alt="صورة سيدي هشام" src={newsBack} />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <OptimizedImage alt="صورة سيدي هشام" src={news} />
      </div>
      {/* الأخبار والفعاليات — باترن البهارات */}
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

        .news-page-banner {
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.07),
            0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .news-page-banner > div {
          display: block !important;
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
        }

        .news-page-banner span {
          display: block !important;
          width: 100% !important;
          max-width: none !important;
        }

        .news-page-banner img {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          object-fit: cover !important;
          object-position: center !important;
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
          opacity: 0.1;
          pointer-events: none;
          content: "";
        }

        .pattern-section-news::before {
          background-image: url("/images/sedi-hisham-news-pattern-transparent.webp");
        }

        /*
         * إلغاء أي Container أو Padding زائد
         * موجود داخل Tabs حتى يطابق محاذاة الهيدر.
         */
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

          .news-page-banner {
            border-radius: 16px;
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

        @media (prefers-reduced-motion: reduce) {
          .news-page-banner,
          .news-page-banner * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
