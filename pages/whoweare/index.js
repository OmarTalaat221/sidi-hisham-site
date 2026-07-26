import React, { useEffect, useState, useRef } from "react";
import CertificatesGallery from "../../components/whoweare/CertificatesSlider";
import OptimizedImage from "@/components/common/OptimizedImage";
import axios from "axios";
import { useSelector } from "react-redux";
import SEO from "@/components/SEO";
import { motion, useReducedMotion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, A11y, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  SparklesIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  InformationCircleIcon,
  BadgeCheckIcon,
  AcademicCapIcon,
  GlobeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

export default function Index() {
  const [whoWeAreData, setWhoWeAreData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const quoteRef = useRef(null);
  const pageRef = useRef(null);

  // Story carousel controls
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplayProgress, setAutoplayProgress] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getWhoWeAreData = async () => {
    try {
      const response = await axios.get("https://api.sedihisham.com/pages/getall/who_we_are");
      setWhoWeAreData(response.data);
      setHasError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasError(true);
    }
  };

  useEffect(() => {
    getWhoWeAreData();
  }, []);

  // Scroll progress bar under navbar
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Intersection observer for quote section animation trigger
  useEffect(() => {
    if (!quoteRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setQuoteVisible(true); },
      { threshold: 0.35 }
    );
    observer.observe(quoteRef.current);
    return () => observer.disconnect();
  }, []);

  const languageState = useSelector((state) => state?.language);
  const local = isMounted ? languageState?.local || "ar" : "ar";
  const isRTL = local === "ar";
  const shouldReduceMotion = useReducedMotion();

  const heroImage =
    "https://api.sedihisham.com/" +
    whoWeAreData.secondpart?.find(
      (item) => item.categoryImage === "Who_we_are_page"
    )?.path_image;

  const t = (arKey, enKey) => {
    if (whoWeAreData?.firstpart && whoWeAreData.firstpart[0]) {
      const val = local === "ar" ? whoWeAreData.firstpart[0]?.[arKey] : whoWeAreData.firstpart[0]?.[enKey];
      if (val && typeof val === "string" && val.trim() !== "") return val;
    }
    return null;
  };

  const sections = [
    {
      key: "intro",
      icon: InformationCircleIcon,
      badgeAr: "عن المجموعة",
      badgeEn: "About Group",
      titleAr: "مقدمة وتاريخ عريق",
      titleEn: "Introduction & Legacy",
      content:
        t("intro_ar", "intro_en") ||
        (isRTL
          ? "تعتبر شركة العقاد للصناعة والتجارة - سيدي هشام - من الشركات الرائدة في مجال تصنيع وتعبئة الأغذية، حيث نمتلك تاريخاً عريقاً يمتد لسنوات من الجودة والتميز في تقديم أفضل المنتجات الغذائية لكل بيت."
          : "Al-Aqad Industry & Trade Company - Sedi Hisham - is a leading pioneer in food manufacturing and packaging, built on years of excellence in delivering premium food products."),
      accent: "from-emerald-700 via-emerald-600 to-teal-500",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
      image: "/images/who 1.jpg",
      tagAr: "تاريخ عريق",
      tagEn: "Rich History",
      num: "01",
    },
    {
      key: "values",
      icon: ShieldCheckIcon,
      badgeAr: "ركائز التميز",
      badgeEn: "Core Principles",
      titleAr: "قيمنا ورسالتنا",
      titleEn: "Our Values & Mission",
      content:
        t("our_value_ar", "our_value_en") ||
        (isRTL
          ? "تتمثل رسالتنا في الالتزام بالشفافية وأعلى معايير سلامة الأغذية، مع السعي المستمر لتقديم منتجات صحية وطبيعية 100% تجمع بين المذاق الأصيل والجودة العالمية."
          : "Our mission is to maintain transparency and the highest food safety standards, delivering 100% natural products combining authentic taste and global quality."),
      accent: "from-amber-600 via-amber-500 to-yellow-500",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200/70",
      image: "/images/who 2.jpg",
      tagAr: "قيم ثابتة",
      tagEn: "Firm Values",
      num: "02",
    },
    {
      key: "goal",
      icon: LightBulbIcon,
      badgeAr: "رؤية المستقبل",
      badgeEn: "Future Vision",
      titleAr: "هدفنا ورؤيتنا المستقبلية",
      titleEn: "Our Goal & Vision",
      content:
        t("our_goal_ar", "our_goal_en") ||
        (isRTL
          ? "نتطلع إلى التوسع المستمر وتعزيز مكانتنا كخيار أول للمستهلك في الأسواق المحلية والإقليمية، من خلال الاستثمار في التكنولوجيا الحديثة والتطوير المستمر لخطوط إنتاجنا."
          : "We aim to expand continuously and strengthen our position as the preferred choice in local and regional markets through modern technology and innovation."),
      accent: "from-emerald-800 via-teal-600 to-cyan-600",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200/70",
      image: "/images/who 3.jpg",
      tagAr: "رؤية طموحة",
      tagEn: "Ambitious Vision",
      num: "03",
    },
    {
      key: "quality",
      icon: SparklesIcon,
      badgeAr: "التميز والجودة",
      badgeEn: "Quality & Excellence",
      titleAr: "جودة المنتجات والابتكار الصناعي",
      titleEn: "Product Quality & Industrial Innovation",
      content:
        t("our_quality_ar", "our_quality_en") ||
        (isRTL
          ? "نلتزم في شركة العقاد للصناعة والتجارة بأعلى معايير الجودة والتميز، من خلال الاعتماد على أحدث الخطوط الإنتاجية لتقديم منتجات غذائية فاخرة تلبي رغبات عملائنا وتفوق تطلعاتهم."
          : "At Al-Aqad Industry & Trade Company, we adhere to the highest international quality standards through state-of-the-art production lines to deliver premium food products."),
      accent: "from-red-700 via-rose-600 to-amber-600",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200/70",
      image: "/images/who 5.jpg",
      tagAr: "جودة معتمدة",
      tagEn: "Certified Quality",
      num: "04",
    },
  ];

  const highlights = [
    {
      icon: GlobeIcon,
      valueAr: "معايير عالمية",
      valueEn: "Global Standards",
      labelAr: "منتجات غذائية عالية الجودة",
      labelEn: "Premium Food Production",
    },
    {
      icon: BadgeCheckIcon,
      valueAr: "100% موثوقية",
      valueEn: "100% Trusted",
      labelAr: "علامة سيدي هشام الرائدة",
      labelEn: "Leading Sedi Hisham Brand",
    },
    {
      icon: AcademicCapIcon,
      valueAr: "خبرة متطورة",
      valueEn: "Advanced Expertise",
      labelAr: "تقنيات تصنيع حديثة",
      labelEn: "Modern Manufacturing Tech",
    },
  ];

  // Motion presets — quiet, consistent, respects reduced-motion preference
  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const staggerParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  // Small reusable presentational bits (plain Tailwind, no component library)
  const Pill = ({ children, className = "" }) => (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-arabicBold border ${className}`}
    >
      {children}
    </span>
  );

  const SkeletonLine = ({ className = "" }) => (
    <div className={`h-4 rounded-full bg-stone-200 animate-pulse ${className}`} />
  );

  return (
    <div
      ref={pageRef}
      className="bg-stone-50 text-stone-900 overflow-hidden font-arabicMedium relative selection:bg-emerald-700 selection:text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ── Scroll progress bar — sits just below the static navbar ── */}
      <motion.div
        style={{ scaleX, transformOrigin: isRTL ? "right" : "left" }}
        className="fixed top-[94px] left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 z-[9998] shadow-[0_0_8px_rgba(16,185,129,.65)]"
      />
      <SEO
        title="سيدي هشام - من نحن | شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة, من نحن"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      {/* Ambient background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_theme(colors.emerald.50),_transparent_60%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0" />

      {/* Ambient floating orbs */}
      <motion.div
        className="absolute top-24 -start-32 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none z-0"
        animate={shouldReduceMotion ? undefined : { y: [0, -28, 0], x: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -end-32 w-[520px] h-[520px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none z-0"
        animate={shouldReduceMotion ? undefined : { y: [0, 32, 0], x: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero — full viewport height so it bleeds edge-to-edge below the navbar */}
      <section className="relative h-[calc(100vh-94px)] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            initial={shouldReduceMotion ? false : { scale: 1.12 }}
            animate={shouldReduceMotion ? undefined : { scale: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover pointer-events-none filter brightness-[0.65]"
          >
            <source
              src="/videos/WhatsApp Video 2026-07-25 at 11.16.16 AM.mp4"
              type="video/mp4"
            />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent}
          className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <Pill className="bg-emerald-500/15 text-emerald-200 border-emerald-400/30 backdrop-blur-md mb-6">
              <span>{isRTL ? "شركة العقاد للصناعة والتجارة" : "Al-Aqad Industry & Trade"}</span>
            </Pill>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-arabicBold text-white tracking-tight leading-tight drop-shadow-2xl"
          >
            {isRTL ? "من نحن" : "Who We Are"}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base sm:text-lg md:text-xl text-stone-200 font-arabicMedium max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            {isRTL
              ? "نصنع تميزنا بثقة عبر علاماتنا التجارية الرائدة سيدي هشام، لتقديم أجود المنتجات الغذائية لكل بيت"
              : "Crafting excellence with trust through our leading Sedi Hisham brands, delivering premium food products."}
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Fetch error state — non-blocking, sits quietly above content */}
      {hasError && (
        <div className="whoweare-shell -mt-6 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl p-4 sm:p-5 shadow-sm"
          >
            <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
            <div>
              <p className="font-arabicBold text-sm sm:text-base">
                {isRTL ? "تعذر تحميل بعض البيانات" : "Some content couldn't load"}
              </p>
              <p className="font-arabicMedium text-red-700/90 text-xs sm:text-sm mt-0.5">
                {isRTL
                  ? "حدثت مشكلة أثناء الاتصال بالخادم. يرجى تحديث الصفحة أو المحاولة لاحقًا."
                  : "There was a problem reaching the server. Please refresh the page or try again shortly."}
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Highlights */}
      <section className="whoweare-shell -mt-14 relative z-30 mb-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerParent}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-stone-200/80 shadow-2xl shadow-stone-300/40"
        >
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50/70 border border-stone-100 hover:bg-emerald-50/60 hover:border-emerald-200 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-arabicBold text-stone-900">
                    {isRTL ? h.valueAr : h.valueEn}
                  </h4>
                  <p className="text-xs text-stone-500 font-arabicMedium mt-0.5">
                    {isRTL ? h.labelAr : h.labelEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Section Title Header */}
      <div className="whoweare-shell mb-12 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <Pill className="bg-emerald-50 text-emerald-700 border-emerald-200/70 mb-3">
            <SparklesIcon className="w-4 h-4 text-emerald-600" />
            <span>{isRTL ? "قصة نجاحنا وتميزنا" : "Our Journey & Legacy"}</span>
          </Pill>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-arabicBold text-stone-900 mb-3">
            {isRTL ? "ركائز التميز في سيدي هشام" : "Pillars of Excellence at Sedi Hisham"}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-arabicMedium max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? "نبتكر الجودة ونضمن الثقة في كل منتج نقدمه لعملائنا عبر مسيرة صناعية حافلة بالإنجازات"
              : "Innovating quality and building trust in every product across a rich industrial journey."}
          </p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full mx-auto" />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
           Story Carousel — image + description slides
      ══════════════════════════════════════════════ */}
      <section className="whoweare-shell relative z-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Progress + numbered dots control bar */}
          <div className="flex items-center justify-between gap-4 mb-6 px-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-arabicBold text-stone-400 tabular-nums w-5">
                {String(activeSlide + 1).padStart(2, "0")}
              </span>
              <div className="w-20 sm:w-32 h-1 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-[width] duration-100 ease-linear"
                  style={{ width: `${autoplayProgress * 100}%` }}
                />
              </div>
              <span className="text-xs font-arabicMedium text-stone-400 tabular-nums w-5">
                {String(sections.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {sections.map((sec, idx) => (
                <button
                  key={sec.key}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                  aria-label={isRTL ? sec.titleAr : sec.titleEn}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? `w-7 bg-gradient-to-r ${sec.accent}`
                      : "w-2 bg-stone-300 hover:bg-stone-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Slider Container */}
          <div className="relative group/slider  max-w-6xl mx-auto">
            <Swiper
              key={isRTL ? "rtl" : "ltr"}
              modules={[Autoplay, Keyboard, A11y, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              dir={isRTL ? "rtl" : "ltr"}
              loop
              speed={800}
              keyboard={{ enabled: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              onSwiper={(sw) => {
                swiperRef.current = sw;
              }}
              onSlideChange={(sw) => setActiveSlide(sw.realIndex)}
              onAutoplayTimeLeft={(sw, time, progress) => setAutoplayProgress(1 - progress)}
              className="rounded-3xl overflow-hidden shadow-2xl    "
            >
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <SwiperSlide key={s.key}>
                    <div className="relative rounded-3xl border border-stone-200/80 bg-white/95 backdrop-blur-xl shadow-xl shadow-stone-200/50 p-6 sm:p-8 lg:p-12">
                      <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${s.accent} opacity-90 z-10 rounded-t-3xl`} />

                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
                        {/* Image Frame Container */}
                        <div className="w-full lg:w-[48%] h-64 sm:h-80 lg:h-[380px] relative overflow-hidden rounded-2xl shrink-0 shadow-lg border border-stone-100 flex items-center justify-center">
                          <OptimizedImage
                            src={s.image}
                            alt={isRTL ? s.titleAr : s.titleEn}
                            fill
                            sizes="(max-width: 1024px) 100vw, 48vw"
                            objectFit="cover"
                            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out [.swiper-slide-active_&]:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent z-10 pointer-events-none" />
                          <div className="absolute top-4 start-4 z-20 bg-stone-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-arabicBold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{isRTL ? s.tagAr : s.tagEn}</span>
                          </div>
                          <div className="absolute bottom-3 end-4 z-20 text-4xl sm:text-5xl font-black text-white/30 font-arabicBold select-none tracking-tighter">
                            {s.num}
                          </div>
                        </div>

                        {/* Content Container - 100% Centered Alignment */}
                        <div className="flex-1 w-full flex flex-col items-center justify-center text-center space-y-4">
                          <div className="flex items-center justify-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.accent} text-white flex items-center justify-center shadow-md shadow-emerald-700/20 shrink-0`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <Pill className={s.badgeColor}>
                              <span>{isRTL ? s.badgeAr : s.badgeEn}</span>
                            </Pill>
                          </div>

                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-arabicBold text-stone-900 leading-snug text-center">
                            {isRTL ? s.titleAr : s.titleEn}
                          </h3>

                          <div className="h-1 rounded-full bg-gradient-to-r from-emerald-600 to-amber-500 w-20 mx-auto" />

                          <div className="w-full flex justify-center">
                            {s.content !== undefined && s.content !== null ? (
                              <div
                                className="text-stone-600 font-arabicMedium leading-relaxed text-base sm:text-lg prose prose-emerald max-w-none pt-1 text-center [&>p]:text-center [&>p]:mx-auto"
                                dangerouslySetInnerHTML={{ __html: s.content }}
                              />
                            ) : (
                              <div className="space-y-3 pt-2 w-full max-w-md mx-auto">
                                <SkeletonLine className="w-full" />
                                <SkeletonLine className="w-[92%] mx-auto" />
                                <SkeletonLine className="w-[75%] mx-auto" />
                              </div>
                            )}
                          </div>

                          <div className="pt-3 flex flex-wrap justify-center items-center gap-2.5">
                            <div className="inline-flex items-center gap-1.5 text-xs font-arabicMedium text-emerald-800 bg-emerald-50/90 px-3.5 py-2 rounded-xl border border-emerald-200/60 shadow-sm">
                              <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                              <span>{isRTL ? "معايير عالمية" : "Global Standards"}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-arabicMedium text-stone-700 bg-stone-100/90 px-3.5 py-2 rounded-xl border border-stone-200/70 shadow-sm">
                              <BadgeCheckIcon className="w-4 h-4 text-stone-500" />
                              <span>{isRTL ? "جودة مضمونة" : "Guaranteed Quality"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Nav arrows — centered vertically */}
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={isRTL ? "الشريحة التالية" : "Previous slide"}
              className="hidden sm:flex absolute top-1/2 -translate-y-1/2 start-0 -translate-x-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl items-center justify-center text-stone-700 hover:text-emerald-700 hover:border-emerald-400 hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label={isRTL ? "الشريحة السابقة" : "Next slide"}
              className="hidden sm:flex absolute top-1/2 -translate-y-1/2 end-0 translate-x-1/2 z-30 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl items-center justify-center text-stone-700 hover:text-emerald-700 hover:border-emerald-400 hover:scale-110 active:scale-95 transition-all duration-200 opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
           General Manager Statement  — Premium Edition
      ══════════════════════════════════════════════ */}
      <section
        ref={quoteRef}
        className="relative py-24 lg:py-36 overflow-hidden my-12"
        aria-label={isRTL ? "كلمة المدير العام" : "General Manager Statement"}
      >
        {/* ── Deep layered background ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030a06] via-[#050f08] to-[#020706]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(16,185,129,.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(245,158,11,.07),transparent)]" />

        {/* ── Animated grid overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,1) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,1) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* ── Floating orbs ── */}
        <motion.div
          className="absolute -top-24 -start-24 w-[420px] h-[420px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -end-20 w-[380px] h-[380px] bg-amber-500/8 rounded-full blur-[90px] pointer-events-none"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* ── Animated SVG decorative arcs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.svg
            viewBox="0 0 1440 200"
            className="absolute top-0 left-0 w-full text-emerald-500/[0.06]"
            fill="none"
            preserveAspectRatio="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={quoteVisible ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.path
              d="M0 100 Q360 0 720 100 Q1080 200 1440 100"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={quoteVisible ? { pathLength: 1 } : {}}
              transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
            />
            <motion.path
              d="M0 120 Q360 20 720 120 Q1080 220 1440 120"
              stroke="currentColor"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={quoteVisible ? { pathLength: 1 } : {}}
              transition={{ duration: 2.4, ease: "easeOut", delay: 0.5 }}
            />
          </motion.svg>
          <motion.svg
            viewBox="0 0 1440 200"
            className="absolute bottom-0 left-0 w-full text-emerald-400/[0.05]"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0 100 Q360 200 720 100 Q1080 0 1440 100"
              stroke="currentColor"
              strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              animate={quoteVisible ? { pathLength: 1 } : {}}
              transition={{ duration: 2.6, ease: "easeOut", delay: 0.7 }}
            />
          </motion.svg>
        </div>

        {/* ── Floating particles ── */}
        {!shouldReduceMotion && [
          { w: 6, h: 6, top: "15%", left: "8%",  delay: 0 },
          { w: 4, h: 4, top: "70%", left: "5%",  delay: 1.2 },
          { w: 5, h: 5, top: "30%", right: "6%", delay: 0.6 },
          { w: 3, h: 3, top: "80%", right: "10%",delay: 2 },
          { w: 4, h: 4, top: "50%", left: "18%", delay: 1.8 },
          { w: 3, h: 3, top: "20%", right: "20%",delay: 0.9 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/30 pointer-events-none"
            style={{ width: p.w, height: p.h, top: p.top, left: p.left ?? undefined, right: p.right ?? undefined }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}

        {/* ── Main content ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={quoteVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="whoweare-shell relative z-10"
        >
          {/* Section label */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0, y: -12 }}
            animate={quoteVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-300 text-sm font-arabicBold backdrop-blur-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              {isRTL ? "كلمة المدير العام" : "General Manager's Message"}
            </span>
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={quoteVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            {/* Card glow border */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 via-transparent to-amber-500/10 p-px pointer-events-none z-0">
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-stone-900/95 to-stone-950" />
            </div>

            {/* Card glass body */}
            <div className="relative z-10 bg-stone-900/80 backdrop-blur-2xl rounded-[2rem] border border-emerald-900/30 p-8 sm:p-12 lg:p-16 shadow-[0_32px_80px_rgba(0,0,0,.7),0_0_0_1px_rgba(16,185,129,.08)]">
              {/* Shimmer top accent line */}
              <div className="absolute top-0 inset-x-0 h-[2px] overflow-hidden rounded-t-[2rem]">
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
                />
              </div>

              {/* Big decorative quote mark */}
              <motion.div
                className="absolute -top-4 -start-2 text-[9rem] leading-none text-emerald-500/10 font-serif pointer-events-none select-none"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={quoteVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                &ldquo;
              </motion.div>

              {/* Quote text */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={quoteVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="text-lg sm:text-xl md:text-2xl font-light font-arabicMedium leading-[2] text-stone-200 mb-10"
                >
                  {t("word_director_ar", "word_director_en") ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: t("word_director_ar", "word_director_en") }}
                      className="[&>p]:mb-4 [&>p:last-child]:mb-0"
                    />
                  ) : (
                    <div className="space-y-4">
                      <SkeletonLine className="w-full bg-stone-800" />
                      <SkeletonLine className="w-[90%] bg-stone-800" />
                      <SkeletonLine className="w-[75%] bg-stone-800" />
                      <SkeletonLine className="w-[55%] bg-stone-800" />
                    </div>
                  )}
                </motion.div>

                {/* Separator */}
                <div className="relative mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-emerald-800/60 to-transparent" />
                  <motion.div
                    className="absolute inset-y-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent w-1/3"
                    animate={{ x: ["0%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  />
                </div>

                {/* Director info */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={quoteVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  className="flex items-center gap-5"
                >
                  {/* Avatar ring */}
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 p-px shadow-xl shadow-emerald-500/25">
                      <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                        <CheckCircleIcon className="w-7 h-7 text-emerald-400" />
                      </div>
                    </div>
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-500/40"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>

                  <div>
                    <p className="font-arabicBold font-bold text-white text-base sm:text-lg">
                      {isRTL ? "المدير العام" : "General Manager"}
                    </p>
                    <p className="text-sm text-emerald-400/90 font-arabicMedium mt-0.5">
                      {isRTL
                        ? "شركة العقاد للصناعة والتجارة — سيدي هشام"
                        : "Al-Aqad Industry & Trade Company — Sedi Hisham"}
                    </p>
                    {/* Verified badge */}
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[11px] text-emerald-500/80 font-arabicMedium">
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      {isRTL ? "موثَّق" : "Verified"}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Certifications */}
      <section className="whoweare-shell pb-24 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <Pill className="bg-emerald-50 text-emerald-700 border-emerald-200/60 mb-3">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
            <span>{isRTL ? "الاعتمادات والجودة العالمية" : "Global Accreditations"}</span>
          </Pill>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-arabicBold text-stone-900 mb-4">
            {isRTL ? "شهادات الجودة المعتمَدة" : "Quality Certifications"}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base font-arabicMedium max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? "نفخر بشهادات الجودة الدولية التي تؤكد التزامنا بالمعايير العالية والتميز في صناعة الغذائيات"
              : "We take pride in our international quality certifications validating our commitment to excellence."}
          </p>

          <div className="mt-5 w-16 h-1 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/80 shadow-2xl shadow-stone-200/60"
        >
          <CertificatesGallery data={whoWeAreData.secondpart} />
        </motion.div>
      </section>
      <style jsx global>{`
        .whoweare-shell {
          width: calc(100% - 24px);
          max-width: 1380px;
          margin-inline: auto;
          padding-inline: 12px;
        }

        @media (max-width: 639px) {
          .whoweare-shell {
            width: calc(100% - 16px);
            padding-inline: 8px;
          }
        }
      `}</style>
    </div>
  );
}