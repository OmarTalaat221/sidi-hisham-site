import axios from "axios";
import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useEffect, useState } from "react";
import FormOne from "../../components/job-application/FormOne";
import SEO from "@/components/SEO";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Index() {
  const [backImage, setBackImage] = useState("");

  // جلب لغة الموقع لضبط الاتجاه RTL / LTR
  const languageState = useSelector((state) => state?.language);
  const isRTL = languageState?.local === "ar";

  const getBackImage = async () => {
    try {
      const res = await axios.get(
        "https://api.sedihisham.com/pages/getall/career"
      );
      if (res.data && res.data[0]?.path_image) {
        setBackImage(res.data[0]?.path_image);
      }
    } catch (error) {
      console.error("Error fetching career background:", error);
    }
  };

  useEffect(() => {
    getBackImage();
  }, []);

  function GraphCMSImageLoader({ src }) {
    if (src && src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/` + src;
    }
    return "/images/eim.png";
  }

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white overflow-hidden pb-24 relative"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <SEO
        title={isRTL ? "انضم لفريقنا - سيدي هشام" : "Join Our Team - Sedi Hisham"}
        description="انضم إلى شركة العقاد للصناعة والتجارة وابدأ مسيرتك المهنية مع علاماتنا التجارية الرائدة سيدي هشام"
        keywords="توظيف, سيدي هشام, شركة العقاد, وظائف, انضم إلينا"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[65vh] w-full overflow-hidden flex items-center justify-center">
        {/* Animated Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-50 contrast-125 opacity-70"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-red-abstract-line-lights-background-40093-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dynamic Background Image (If loaded from API) */}
        {backImage && (
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <OptimizedImage
              alt="صورة التوظيف"
              loader={GraphCMSImageLoader}
              src={backImage}
              fill
              objectFit="cover"
              priority
            />
          </div>
        )}

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 z-10" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-red-600/20 blur-[140px] rounded-full pointer-events-none z-10" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs md:text-sm font-semibold tracking-wider text-red-400 bg-red-950/80 border border-red-500/40 rounded-full backdrop-blur-md uppercase shadow-lg shadow-red-950/50">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            {isRTL ? "فرص عمل واعدة" : "Career Opportunities"}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
            {isRTL ? (
              <>
                ابنِ مستقبلك المهني مع{" "}
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
                  سيدي هشام
                </span>
              </>
            ) : (
              <>
                Build Your Future with{" "}
                <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">
                  Sedi Hisham
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-lg max-w-2xl mx-auto leading-relaxed opacity-95">
            {isRTL
              ? "نرحب بالمواهب والخبرات الطموحة للانضمام إلى عائلة شركة العقاد للصناعة والتجارة"
              : "We welcome ambitious talents to join Al-Aqad Company for Industry and Trade family."}
          </p>
        </motion.div>
      </section>

      {/* Main Content & Application Form Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 -mt-12 sm:-mt-16 md:-mt-20 relative z-30">
        {/* Feature Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-base flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">
                {isRTL ? "بيئة عمل محفزة" : "Inspiring Environment"}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400">
                {isRTL ? "دعم مستمر للتطور والابتكار" : "Continuous support & growth"}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-base flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">
                {isRTL ? "تطوير مهاراتك" : "Skill Enhancement"}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400">
                {isRTL ? "برامج تدريبية متقدمة" : "Advanced training programs"}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-bold text-base flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-sm">
                {isRTL ? "فريق عمل متكامل" : "Great Teamwork"}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400">
                {isRTL ? "العمل مع أفضل الخبرات" : "Collaborate with experts"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Application Form Solid Card Container */}
        <div className="bg-slate-900 border border-slate-800/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden opacity-100">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Form Header Title */}
          <div className="text-center mb-8 pb-6 border-b border-slate-800/80 relative z-10">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white mb-2">
              {isRTL ? "نموذج طلب التوظيف" : "Job Application Form"}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
              {isRTL
                ? "يرجى ملء البيانات المطلوبة بعناية وسنتواصل معك في أقرب وقت"
                : "Please fill out the required details and we will get back to you shortly."}
            </p>
          </div>

          {/* Render Form Components inside custom styled wrapper */}
          <div className="relative z-10 text-slate-100 opacity-100">
            <FormOne />
          </div>
        </div>
      </main>
    </div>
  );
}