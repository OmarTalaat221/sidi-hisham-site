import PageBanner from "@/components/common/PageBanner";
import SEO from "@/components/SEO";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormOne from "../../components/job-application/FormOne";

const API_BASE_URL = "https://api.sedihisham.com/";

function getImageUrl(path) {
  if (!path) {
    return "/images/career-banner.webp";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}${path.replace(/^\/+/, "")}`;
}

export default function JobApplicationPage() {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [backImage, setBackImage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function getBackImage() {
      try {
        const response = await axios.get(
          "https://api.sedihisham.com/pages/getall/career",
        );

        if (!cancelled) {
          setBackImage(response.data?.[0]?.path_image || "");
        }
      } catch {
        if (!cancelled) {
          setBackImage("");
        }
      }
    }

    getBackImage();

    return () => {
      cancelled = true;
    };
  }, []);

  const pageDescription = isAr
    ? "قدّم طلب التوظيف للانضمام إلى فريق عمل سيدي هشام."
    : "Submit your application to join the Sedi Hisham team.";

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className="min-h-screen bg-white"
    >
      <SEO
        title={
          isAr
            ? "التقديم على وظيفة | سيدي هشام"
            : "Job Application | Sedi Hisham"
        }
        description={pageDescription}
        keywords={
          isAr
            ? "وظائف سيدي هشام, طلب توظيف, شركة العقاد, الصناعات الغذائية"
            : "Sedi Hisham careers, job application, Al-Aqad Company"
        }
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      <PageBanner
        title={isAr ? "انضم إلى فريقنا" : "Join our team"}
        highlightedWord={isAr ? "فريقنا" : "team"}
        description={pageDescription}
        image={"/images/application-banner.webp"}
        imageAlt={
          isAr
            ? "فرص العمل في سيدي هشام"
            : "Career opportunities at Sedi Hisham"
        }
        breadcrumbs={[
          {
            label: isAr ? "الرئيسية" : "Home",
            href: "/",
          },
          {
            label: isAr ? "التقديم على وظيفة" : "Job application",
          },
        ]}
        imagePosition="center center"
        showBottomBg
      />

      <section className="pattern-section pattern-section-wheat relative isolate overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.32]"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 1px 1px,
                rgba(124, 20, 34, 0.1) 1px,
                transparent 0
              )
            `,
            backgroundSize: "30px 30px",
          }}
        />

        <div className="mx-auto w-[calc(100%_-_24px)] max-w-[1050px] px-3">
          <FormOne />
        </div>
      </section>

      <style jsx global>{`
        .pattern-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          background-color: #ffffff !important;
        }

        .pattern-section::before {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-repeat: repeat;
          background-position: center top;
          background-size: 560px 560px;
          opacity: 0.2;
          pointer-events: none;
          content: "";
        }

        .pattern-section-wheat::before {
          background-image: url("/images/sedi-hisham-wheat-pattern-transparent.webp");
        }

        .pattern-section-spices::before {
          background-image: url("/images/sedi-hisham-spices-pattern-transparent.webp");
        }
      `}</style>
    </main>
  );
}
