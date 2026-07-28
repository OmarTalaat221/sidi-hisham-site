import PageBanner from "@/components/common/PageBanner";
import SEO from "@/components/SEO";
import { ClockIcon, PhoneIcon, PrinterIcon } from "@heroicons/react/outline";
import { TruckIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/contactus/leftside/Button";
import Locations from "../../components/contactus/leftside/Locations";
import ShareCard from "../../components/contactus/leftside/ShareCard";
import InfoCard from "../../components/contactus/rightside/InfoCard";
import SimpleMap from "../../components/contactus/rightside/MapPicker";
import { setBranchId } from "../../redux/branchSlice";

const API_URL = "https://api.sedihisham.com/branches";

const DEFAULT_LOCATION = {
  lat: 28,
  lng: 46,
};

function parseLocation(value) {
  if (!value) {
    return DEFAULT_LOCATION;
  }

  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;

    const lat = Number(parsed?.lat);
    const lng = Number(parsed?.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return DEFAULT_LOCATION;
    }

    return {
      lat,
      lng,
    };
  } catch {
    return DEFAULT_LOCATION;
  }
}

export default function ContactUs() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { local } = useSelector((state) => state.language);

  const { branchID } = useSelector((state) => state.branch);

  const initialBranchIdRef = useRef(branchID);

  const isAr = local === "ar";

  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);

  const [location, setLocation] = useState(DEFAULT_LOCATION);

  const [zoom, setZoom] = useState(5);

  const [branchesLoading, setBranchesLoading] = useState(true);

  const [branchLoading, setBranchLoading] = useState(false);

  const [branchesError, setBranchesError] = useState(false);

  const [branchError, setBranchError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadBranches() {
      setBranchesLoading(true);
      setBranchesError(false);

      try {
        const response = await axios.get(`${API_URL}/getallbranches`);

        if (cancelled) {
          return;
        }

        const receivedBranches = Array.isArray(response.data)
          ? response.data
          : [];

        setBranches(receivedBranches);

        if (receivedBranches.length === 0) {
          setBranch(null);
          return;
        }

        const storedBranchId = initialBranchIdRef.current;

        const storedBranchExists = receivedBranches.some(
          (item) => String(item.id) === String(storedBranchId),
        );

        const initialBranchId = storedBranchExists
          ? storedBranchId
          : receivedBranches[0].id;

        if (String(branchID) !== String(initialBranchId)) {
          dispatch(setBranchId(initialBranchId));
        }
      } catch {
        if (!cancelled) {
          setBranchesError(true);
        }
      } finally {
        if (!cancelled) {
          setBranchesLoading(false);
        }
      }
    }

    loadBranches();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (branchID === null || branchID === undefined || branchID === "") {
      return undefined;
    }

    let cancelled = false;

    async function loadBranch() {
      setBranchLoading(true);
      setBranchError(false);

      try {
        const response = await axios.get(`${API_URL}/${branchID}`);

        if (cancelled) {
          return;
        }

        const branchData = response.data;

        setBranch(branchData);

        setLocation(parseLocation(branchData?.Location));

        setZoom(16);
      } catch {
        if (!cancelled) {
          setBranchError(true);
        }
      } finally {
        if (!cancelled) {
          setBranchLoading(false);
        }
      }
    }

    loadBranch();

    return () => {
      cancelled = true;
    };
  }, [branchID]);

  const pageDescription = isAr
    ? "اختر الفرع الأقرب إليك لعرض بيانات التواصل ومواعيد العمل وموقعه على الخريطة."
    : "Choose the nearest branch to view its contact details, opening times and location.";

  const infoItems = useMemo(
    () => [
      {
        Icon: ClockIcon,
        title: isAr ? "مواعيد العمل" : "Opening times",
        value: branch?.openings_time,
      },
      {
        Icon: PhoneIcon,
        title: isAr ? "رقم الهاتف" : "Telephone",
        value: branch?.phone_number,
      },
      {
        Icon: PrinterIcon,
        title: isAr ? "الفاكس" : "Fax",
        value: branch?.fax,
      },
      {
        Icon: TruckIcon,
        title: isAr ? "مدة التوصيل" : "Delivery time",
        value: branch?.delivery_time,
      },
    ],
    [branch, isAr],
  );

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className="min-h-screen bg-white"
    >
      <SEO
        title={isAr ? "تواصل معنا | سيدي هشام" : "Contact us | Sedi Hisham"}
        description={pageDescription}
        keywords={
          isAr
            ? "سيدي هشام, فروع سيدي هشام, تواصل معنا, عناوين الفروع"
            : "Sedi Hisham, branches, contact us, branch addresses"
        }
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      <PageBanner
        title={isAr ? "تواصل معنا" : "Contact us"}
        highlightedWord={isAr ? "تواصل" : "Contact"}
        description={pageDescription}
        image="/images/contact-banner.webp"
        imageAlt={
          isAr ? "التواصل مع فروع سيدي هشام" : "Contact Sedi Hisham branches"
        }
        breadcrumbs={[
          {
            label: isAr ? "الرئيسية" : "Home",
            href: "/",
          },
          {
            label: isAr ? "تواصل معنا" : "Contact us",
          },
        ]}
        imagePosition="center center"
        showBottomBg
      />

      <section className="contact-content-section relative isolate overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.045]"
          style={{
            backgroundImage:
              "url('/images/sedi-hisham-news-pattern-transparent.webp')",
            backgroundPosition: "center top",
            backgroundRepeat: "repeat",
            backgroundSize: "560px 560px",
          }}
        />

        <div className="mx-auto w-[calc(100%_-_24px)] max-w-[1380px] px-3 pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="text-[28px] font-bold leading-[1.4] text-[#7C1422] sm:text-[34px] lg:text-[40px]">
              {isAr ? "فروع سيدي هشام" : "Sedi Hisham branches"}
            </h2>

            <p className="mx-auto mt-3 max-w-[650px] text-[13px] font-medium leading-7 text-slate-500 sm:text-[15px]">
              {isAr
                ? "اختر أحد الفروع لعرض بيانات الاتصال ومواعيد العمل وموقعه على الخريطة."
                : "Select a branch to view its contact details, opening times and map location."}
            </p>

            <span className="mx-auto mt-5 block h-[3px] w-14 rounded-full bg-primary" />
          </div>

          {(branchesError || branchError) && (
            <div className="mx-auto mt-8 max-w-[760px] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
              {branchesError
                ? isAr
                  ? "تعذر تحميل قائمة الفروع حاليًا."
                  : "Unable to load the branches."
                : isAr
                  ? "تعذر تحميل بيانات الفرع المحدد."
                  : "Unable to load the selected branch."}
            </div>
          )}

          <div className="mt-10 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 lg:gap-4">
            {infoItems.map((item) => (
              <InfoCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                desc={item.value}
                loading={branchLoading}
                emptyText={isAr ? "غير متاح" : "Not available"}
              />
            ))}
          </div>

          <div
            dir="ltr"
            className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]"
          >
            <section
              dir={isAr ? "rtl" : "ltr"}
              className="order-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.07)] lg:order-1"
            >
              <div className="flex min-h-[100px] items-center justify-between gap-5 border-b border-slate-100 px-5 py-4 sm:px-7">
                <div className="min-w-0 text-start">
                  <p className="text-xs font-semibold text-primary">
                    {isAr ? "الفرع المحدد" : "Selected branch"}
                  </p>

                  {branchLoading ? (
                    <div className="mt-2 h-6 w-44 animate-pulse rounded-md bg-slate-100" />
                  ) : (
                    <h3 className="mt-1 truncate text-[20px] font-bold text-[#7C1422] sm:text-[23px]">
                      {branch?.name ||
                        (isAr ? "اختر أحد الفروع" : "Select a branch")}
                    </h3>
                  )}

                  {branch?.description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-6 text-slate-500 sm:text-[13px]">
                      {branch.description}
                    </p>
                  )}
                </div>

                <span className="hidden h-12 w-[3px] shrink-0 rounded-full bg-primary sm:block" />
              </div>

              <SimpleMap
                name={branch?.name}
                lat={location.lat}
                lng={location.lng}
                zoom={zoom}
                loading={branchLoading}
                language={isAr ? "ar" : "en"}
              />
            </section>

            <aside
              dir={isAr ? "rtl" : "ltr"}
              className="order-1 space-y-4 lg:order-2"
            >
              <Locations
                local={local}
                locations={branches}
                setZoom={setZoom}
                loading={branchesLoading}
              />

              <Button
                onClick={() => router.push("/contact")}
                text={isAr ? "أرسل لنا رسالة" : "Send us a message"}
              />

              <ShareCard local={local} />
            </aside>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .contact-content-section {
          position: relative;
          isolation: isolate;
        }

        .contact-content-section .branch-list::-webkit-scrollbar {
          width: 4px;
        }

        .contact-content-section .branch-list::-webkit-scrollbar-track {
          background: transparent;
        }

        .contact-content-section .branch-list::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(100, 116, 139, 0.35);
        }

        .contact-content-section .branch-list {
          scrollbar-width: thin;
          scrollbar-color: rgba(100, 116, 139, 0.35) transparent;
        }

        @media (max-width: 639px) {
          .contact-content-section {
            background-size: 420px 420px;
          }
        }

        @media (min-width: 1400px) {
          .contact-content-section {
            background-size: 620px 620px;
          }
        }
      `}</style>
    </main>
  );
}
