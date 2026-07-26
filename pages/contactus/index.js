import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Locations from "../../components/contactus/leftside/Locations";
import BreadCrumb from "../../components/contactus/BreadCrumb";
import Button from "../../components/contactus/leftside/Button";
import ShareCard from "../../components/contactus/leftside/ShareCard";
import InfoCard from "../../components/contactus/rightside/InfoCard";
import {
  ClockIcon,
  PhoneIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { TruckIcon } from "@heroicons/react/solid";
import SEO from "@/components/SEO";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SimpleMap from "../../components/contactus/rightside/MapPicker";

export default function ContactUs() {
  const [branches, setBranches] = useState([]);
  const [branche, setBranche] = useState("");
  const [zoom, setZoom] = useState(5);
  const [location, setLocation] = useState({
    lat: 28,
    lng: 46,
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { branchID } = useSelector((state) => state.branch);
  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";
  const shouldReduceMotion = useReducedMotion();

  const getBranches = async () => {
    await axios
      .get("https://api.sedihisham.com/branches/getallbranches")
      .then((response) => {
        setBranches(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getBranchData = async () => {
    if (!branchID) return;
    await axios
      .get("https://api.sedihisham.com/branches/" + branchID)
      .then((response) => {
        setBranche(response.data);
        if (response.data.Location) {
          setLocation(JSON.parse(response.data.Location));
        }
      })
      .catch((error) => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      });
  };

  useEffect(() => {
    getBranches();
  }, []);

  useEffect(() => {
    getBranchData();
  }, [branchID]);

  const infoTiles = [
    {
      icon: ClockIcon,
      title: isAr ? "أوقات العمل" : "Opening Hours",
      desc: branche?.openings_time,
      tint: "bg-red-50 text-[#7c1422] border-red-100",
    },
    {
      icon: PhoneIcon,
      title: isAr ? "الهاتف" : "Telephone",
      desc: branche?.phone_number,
      tint: "bg-sky-50 text-sky-700 border-sky-100",
    },
    {
      icon: WhatsappIcon,
      title: isAr ? "الفاكس" : "Fax",
      desc: branche?.fax,
      tint: "bg-amber-50 text-amber-700 border-amber-100",
      isCustomIcon: true,
    },
    {
      icon: TruckIcon,
      title: isAr ? "وقت التوصيل" : "Delivery Time",
      desc: branche?.delivery_time,
      tint: "bg-rose-50 text-rose-700 border-rose-100",
    },
  ];

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="relative min-h-screen bg-stone-50 overflow-hidden pb-24 pt-4 font-arabicMedium">
      <SEO
        title="سيدي هشام - شركة العقاد للصناعة والتجارة | تواصل معنا"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة, تواصل معنا"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      {/* ---------- Decorative background layer ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* base wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_theme(colors.red.50),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_theme(colors.amber.50),_transparent_50%)]" />
        {/* fine dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00000012_1px,transparent_1px)] bg-[size:22px_22px] opacity-60" />
        {/* soft ambient blobs */}
        <motion.div
          className="absolute -top-24 -start-24 w-[420px] h-[420px] rounded-full bg-[#7c1422]/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, 24, 0], y: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -end-32 w-[480px] h-[480px] rounded-full bg-amber-400/10 blur-3xl"
          animate={shouldReduceMotion ? undefined : { x: [0, -20, 0], y: [0, 24, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* header curve */}
        <svg
          className="absolute top-0 inset-x-0 w-full text-[#7c1422]/[0.035]"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,96 C240,180 480,0 720,32 C960,64 1200,200 1440,120 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ---------- Header band ---------- */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pt-8 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10"
        >
          <div className={isAr ? "text-right" : "text-left"}>
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7c1422]/10 text-[#7c1422] border border-[#7c1422]/15 text-xs font-bold mb-3 ${
                isAr ? "font-arabicBold" : ""
              }`}
            >
              <LocationMarkerIcon className="w-3.5 h-3.5" />
              {isAr ? "الفروع والتواصل" : "Branches & Contact"}
            </span>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight ${
                isAr ? "font-arabicBold" : ""
              }`}
            >
              {isAr ? "مركز التواصل والفروع" : "Contact & Branches Center"}
            </h1>
            <p className={`text-sm sm:text-base text-stone-500 mt-2 max-w-xl ${isAr ? "font-arabicMedium" : ""}`}>
              {isAr
                ? "تعرف على عناوين فروعنا وأوقات العمل وتواصل معنا مباشرة"
                : "Find branch locations, working hours, and reach out to us directly"}
            </p>
          </div>

          <div className={`flex ${isAr ? "justify-start md:justify-end" : "justify-start"}`}>
            <BreadCrumb local={local} />
          </div>
        </motion.div>

        {/* ---------- Main layout ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:sticky lg:top-24 space-y-5"
          >
            <div className="rounded-3xl border border-stone-200/70 bg-white/80 backdrop-blur-xl shadow-sm shadow-stone-200/60 p-1.5">
              <Locations local={local} locations={branches} setZoom={setZoom} />
            </div>

            <Button
              onClick={() => router.push("/contact")}
              text={isAr ? "تراسل معنا الآن" : "Send us a Message"}
            />

            <div className="rounded-3xl border border-stone-200/70 bg-white/80 backdrop-blur-xl shadow-sm shadow-stone-200/60 overflow-hidden">
              <ShareCard local={local} />
            </div>
          </motion.aside>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Branch detail card */}
            <div className="relative rounded-3xl border border-stone-200/70 bg-white/90 backdrop-blur-xl shadow-lg shadow-stone-200/50 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#7c1422] via-[#b11d30] to-amber-400" />

              <div className="p-6 sm:p-8">
                <div className={`flex flex-col ${isAr ? "items-start text-right" : "items-start text-left"}`}>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#7c1422] text-xs font-bold mb-3 border border-red-200/60 ${
                      isAr ? "font-arabicBold" : ""
                    }`}
                  >
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-[#7c1422]" />
                    </span>
                    <span>{isAr ? "الفرع المحدد" : "Selected Branch"}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={branche?.name || "branch-name"}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25 }}
                      className={`text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight w-full ${
                        isAr ? "font-arabicBold text-right" : "text-left"
                      }`}
                    >
                      {branche?.name || (isAr ? "اختر فرعاً لعرض التفاصيل" : "Select a branch to view details")}
                    </motion.h2>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    {branche?.description && (
                      <motion.p
                        key={branche?.description}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`mt-3 text-sm sm:text-base text-stone-600 leading-relaxed w-full ${
                          isAr ? "font-arabicMedium text-right" : "text-left"
                        }`}
                      >
                        {branche?.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5 pt-6 mt-5 border-t border-stone-100">
                  {infoTiles.map((tile, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * idx }}
                      whileHover={{ y: -3 }}
                      className={`p-3.5 rounded-2xl border flex ${tile.tint} bg-opacity-60 hover:shadow-md transition-all duration-200`}
                    >
                      <InfoCard
                        Icon={tile.icon}
                        title={tile.title}
                        desc={tile.desc}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="relative rounded-3xl border border-stone-200/70 bg-white/90 backdrop-blur-xl shadow-lg shadow-stone-200/50 p-2 overflow-hidden"
            >
              <div className="absolute -top-10 -end-10 w-40 h-40 bg-[#7c1422]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="rounded-2xl overflow-hidden border border-stone-200/60 shadow-inner min-h-[380px] relative">
                <SimpleMap
                  name={branche?.name}
                  lat={location.lat}
                  lng={location.lng}
                  zoom={zoom}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const WhatsappIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 28.713 28.851"
    >
      <path
        id="whatsapp"
        d="M24.78,4.193a14.3,14.3,0,0,0-22.5,17.25L.25,28.851l7.579-1.988a14.281,14.281,0,0,0,6.832,1.74h.006A14.3,14.3,0,0,0,24.78,4.193Zm-10.113,22h0a11.868,11.868,0,0,1-6.048-1.656l-.434-.258-4.5,1.18,1.2-4.385L4.6,20.62a11.883,11.883,0,1,1,10.066,5.569Zm6.518-8.9c-.357-.179-2.113-1.043-2.441-1.162s-.566-.179-.8.179-.923,1.162-1.131,1.4-.417.268-.774.089a9.757,9.757,0,0,1-2.873-1.773,10.775,10.775,0,0,1-1.987-2.474c-.208-.358,0-.533.157-.729a10.1,10.1,0,0,0,.893-1.222.657.657,0,0,0-.03-.626c-.089-.179-.8-1.937-1.1-2.653-.29-.7-.584-.6-.8-.613s-.446-.013-.685-.013a1.312,1.312,0,0,0-.953.447,4.007,4.007,0,0,0-1.25,2.98,6.949,6.949,0,0,0,1.459,3.7,15.923,15.923,0,0,0,6.1,5.394A20.446,20.446,0,0,0,17,20.962a4.9,4.9,0,0,0,2.25.142,3.68,3.68,0,0,0,2.411-1.7,2.985,2.985,0,0,0,.208-1.7c-.089-.149-.327-.238-.684-.417Zm0,0"
        transform="translate(-0.25)"
        fill="#7c1422"
        fillRule="evenodd"
      />
    </svg>
  );
};