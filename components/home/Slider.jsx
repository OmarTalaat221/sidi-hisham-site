import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const DEFAULT_HERO_IMAGE = "/images/videoframe_0.webp";
const DEMO_HERO_VIDEO = "/videos/sidi-hisham-banner-optimized.mp4";

export default function Slider({
  sliderImages = [],
  videoSrc = DEMO_HERO_VIDEO,
}) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const posterImage = useMemo(() => {
    return DEFAULT_HERO_IMAGE;
  }, [sliderImages]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    setVideoReady(false);
    setVideoFailed(false);
  }, [videoSrc]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
    };

    updateMotionPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference);
    } else {
      mediaQuery.addListener(updateMotionPreference);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      } else {
        mediaQuery.removeListener(updateMotionPreference);
      }
    };
  }, []);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`hero-section relative isolate w-full overflow-hidden bg-black ${
        mounted ? "hero-go" : ""
      }`}
      aria-label={
        isAr ? "القسم الرئيسي لشركة سيدي هشام" : "Sedi Hisham hero section"
      }
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={posterImage}
          alt={
            isAr ? "منتجات ومصنع سيدي هشام" : "Sedi Hisham products and factory"
          }
          fill
          priority
          quality={78}
          sizes="100vw"
          draggable={false}
          className="hero-background-media object-cover object-center"
        />
      </div>

      {!reduceMotion && !videoFailed ? (
        <video
          key={videoSrc}
          className={`hero-video hero-background-media absolute inset-0 z-[1] h-full w-full object-cover object-center ${
            videoReady ? "hero-video-on" : ""
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterImage}
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            setVideoReady(false);
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden="true"
        className={`hero-overlay pointer-events-none absolute inset-0 z-[2] ${
          isAr ? "hero-overlay-rtl" : "hero-overlay-ltr"
        }`}
      />

      <div className="hero-container relative z-10 mx-auto flex w-full flex-col justify-center">
        <div
          className={`hero-content flex w-full flex-col items-start justify-center text-start ${
            isAr ? "hero-content-rtl ml-auto" : "hero-content-ltr mr-auto"
          }`}
        >
          <div
            className="hero-item hero-eyebrow inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
            style={{ "--d": "80ms" }}
          >
            <span className="hero-dot shrink-0 rounded-full bg-[#FFD62D]" />

            <span className="font-arabicMedium text-white">
              {isAr ? "من المصنع إلى مائدتك" : "From our factory to your table"}
            </span>
          </div>

          <p
            className="hero-item hero-brand font-arabicMedium text-[#FFD62D]"
            style={{ "--d": "160ms" }}
          >
            {isAr ? "سيدي هشام" : "Sedi Hisham"}
          </p>

          <h2
            className="hero-item hero-heading font-arabicBold text-white"
            style={{ "--d": "240ms" }}
          >
            {isAr
              ? "شركة العقاد للصناعة والتجارة"
              : "Al Akkad Industry and Trading Company"}
          </h2>

          <div
            className={`hero-line hero-divider rounded-full bg-[#FFD62D] ${
              isAr ? "origin-right" : "origin-left"
            }`}
            style={{ "--d": "340ms" }}
            aria-hidden="true"
          />

          <p
            className="hero-item hero-desc font-arabicLight text-white/90"
            style={{ "--d": "420ms" }}
          >
            {isAr
              ? "نصنع منتجات غذائية موثوقة بجودة ثابتة، من مراحل الإنتاج والتعبئة وحتى تصل منتجاتنا إلى كل بيت."
              : "We produce trusted food products with consistent quality, from production and packaging until they reach every home."}
          </p>

          <div
            className="hero-item hero-tags flex flex-wrap items-center"
            style={{ "--d": "520ms" }}
          >
            {(isAr
              ? ["الإنتاج", "التعبئة", "الجودة"]
              : ["Production", "Packaging", "Quality"]
            ).map((tag) => (
              <span
                key={tag}
                className="hero-tag rounded-full border border-white/15 bg-black/20 font-arabicLight text-white/85 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="hero-item hero-ctas flex w-full flex-row flex-wrap items-center"
            style={{ "--d": "620ms" }}
          >
            <Link
              href="/categories"
              className="hero-btn hero-btn-primary group relative flex items-center justify-center overflow-hidden rounded-full bg-[#FFD62D] font-arabicMedium text-[#7C1422]"
            >
              <span className="relative z-10">
                {isAr ? "تعرف على منتجاتنا" : "Explore our products"}
              </span>

              <ArrowIcon
                aria-hidden="true"
                className={`hero-btn-icon relative z-10 transition-transform duration-300 ${
                  isAr
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </Link>

            <Link
              href="/whoweare"
              className="hero-btn hero-btn-ghost group relative flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 font-arabicMedium text-white backdrop-blur-md"
            >
              <span className="relative z-10">
                {isAr ? "تعرف على الشركة" : "About the company"}
              </span>

              <ArrowIcon
                aria-hidden="true"
                className={`hero-btn-icon relative z-10 transition-transform duration-300 ${
                  isAr
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /*
         * الارتفاع الأساسي للموبايل.
         * لا نستخدم 100vh هنا لأن شريط المتصفح في الموبايل
         * يغيّر الارتفاع ويؤدي إلى قفزات في التصميم.
         */
        .hero-section {
          width: 100%;
          max-width: 100%;
          height: 450px;
          min-height: 450px;
          max-height: none;
          overflow: hidden;
        }

        /*
         * موبايل عادي.
         */
        @media (min-width: 375px) and (max-width: 479px) {
          .hero-section {
            height: clamp(470px, 126vw, 545px);
            min-height: clamp(470px, 126vw, 545px);
          }
        }

        /*
         * موبايل كبير.
         */
        @media (min-width: 480px) and (max-width: 639px) {
          .hero-section {
            height: clamp(490px, 108vw, 575px);
            min-height: clamp(490px, 108vw, 575px);
          }
        }

        /*
         * تابلت صغير:
         * الفيديو يبدأ في التصغير بنسبة مرتبطة بعرض الشاشة.
         */
        @media (min-width: 640px) and (max-width: 767px) {
          .hero-section {
            height: clamp(500px, 70vw, 550px);
            min-height: clamp(500px, 70vw, 550px);
          }
        }

        /*
         * تابلت:
         * نفس الفكرة القديمة التي كانت تعمل مع الهيدر،
         * لذلك لا نفرض 100vh على هذا المقاس.
         */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-section {
            height: clamp(520px, 62.5vw, 640px);
            min-height: clamp(520px, 62.5vw, 640px);
          }
        }

        /*
         * لابتوب صغير ومتوسط:
         * نحافظ على النسبة القديمة كي يبقى الهيدر مريحًا،
         * والارتفاع لا يتجاوز ارتفاع الشاشة.
         */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .hero-section {
            height: min(62.5vw, 100vh);
            height: min(62.5vw, 100svh);
            min-height: min(560px, 100vh);
            min-height: min(560px, 100svh);
          }
        }

        /*
         * الديسكتوب الحقيقي:
         * هنا فقط يصبح السلايدر بطول الشاشة بالكامل.
         */
        @media (min-width: 1280px) {
          .hero-section {
            height: 100vh;
            height: 100svh;
            min-height: 100vh;
            min-height: 100svh;
          }
        }

        /*
         * ضبط تمركز الفيديو حسب حجم الشاشة.
         */
        .hero-background-media {
          object-position: center center;
        }

        @media (max-width: 767px) {
          .hero-background-media {
            object-position: 52% center;
          }
        }

        /*
         * الحاوية تساوي ارتفاع السلايدر،
         * وتترك مساحة علوية آمنة للهيدر من غير تعديل الهيدر نفسه.
         */
        .hero-container {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          min-height: 100%;
          max-width: 1380px;
          padding-inline: 18px;
          padding-top: 92px;
          padding-bottom: 24px;
        }

        @media (min-width: 375px) {
          .hero-container {
            padding-inline: 20px;
            padding-top: 94px;
            padding-bottom: 28px;
          }
        }

        @media (min-width: 480px) {
          .hero-container {
            padding-inline: 22px;
            padding-top: 98px;
            padding-bottom: 30px;
          }
        }

        @media (min-width: 640px) {
          .hero-container {
            padding-inline: 30px;
            padding-top: 104px;
            padding-bottom: 34px;
          }
        }

        /*
         * مساحة الهيدر الشفاف في التابلت والديسكتوب.
         * الهيدر لا يتغير، لكن محتوى السلايدر يبدأ بعد مساحته.
         */
        @media (min-width: 768px) {
          .hero-container {
            padding-inline: 44px;
            padding-top: 122px;
            padding-bottom: 36px;
          }
        }

        @media (min-width: 1024px) {
          .hero-container {
            padding-inline: 60px;
            padding-top: 126px;
            padding-bottom: 42px;
          }
        }

        @media (min-width: 1280px) {
          .hero-container {
            padding-top: 130px;
            padding-bottom: 48px;
          }
        }

        .hero-content {
          width: 100%;
          max-width: 100%;
        }

        @media (min-width: 640px) {
          .hero-content {
            max-width: 540px;
          }
        }

        @media (min-width: 768px) {
          .hero-content {
            max-width: 600px;
          }
        }

        @media (min-width: 1024px) {
          .hero-content {
            max-width: 650px;
          }
        }

        @media (min-width: 1280px) {
          .hero-content {
            max-width: 690px;
          }
        }

        .hero-eyebrow {
          gap: 6px;
          margin-bottom: 10px;
          padding: 5px 10px;
        }

        .hero-eyebrow span:last-child {
          font-size: 10px;
        }

        .hero-dot {
          width: 6px;
          height: 6px;
        }

        @media (min-width: 375px) {
          .hero-eyebrow {
            margin-bottom: 11px;
            padding: 5px 11px;
          }

          .hero-eyebrow span:last-child {
            font-size: 10.5px;
          }
        }

        @media (min-width: 480px) {
          .hero-eyebrow {
            margin-bottom: 12px;
            padding: 6px 12px;
          }

          .hero-eyebrow span:last-child {
            font-size: 11px;
          }

          .hero-dot {
            width: 7px;
            height: 7px;
          }
        }

        @media (min-width: 640px) {
          .hero-eyebrow {
            margin-bottom: 13px;
            padding: 6px 13px;
          }

          .hero-eyebrow span:last-child {
            font-size: 11.5px;
          }
        }

        @media (min-width: 768px) {
          .hero-eyebrow {
            gap: 8px;
            margin-bottom: 14px;
            padding: 7px 14px;
          }

          .hero-eyebrow span:last-child {
            font-size: 12px;
          }

          .hero-dot {
            width: 8px;
            height: 8px;
          }
        }

        .hero-brand {
          margin-bottom: 3px;
          font-size: 12px;
        }

        @media (min-width: 375px) {
          .hero-brand {
            font-size: 13px;
          }
        }

        @media (min-width: 480px) {
          .hero-brand {
            margin-bottom: 4px;
            font-size: 14px;
          }
        }

        @media (min-width: 640px) {
          .hero-brand {
            margin-bottom: 5px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .hero-brand {
            margin-bottom: 6px;
            font-size: 17px;
          }
        }

        @media (min-width: 1024px) {
          .hero-brand {
            margin-bottom: 7px;
            font-size: 18px;
          }
        }

        @media (min-width: 1280px) {
          .hero-brand {
            margin-bottom: 8px;
            font-size: 20px;
          }
        }

        .hero-heading {
          max-width: 100%;
          font-size: 20px;
          line-height: 1.22;
        }

        @media (min-width: 375px) {
          .hero-heading {
            font-size: 22px;
          }
        }

        @media (min-width: 480px) {
          .hero-heading {
            font-size: 26px;
          }
        }

        @media (min-width: 640px) {
          .hero-heading {
            font-size: 30px;
          }
        }

        @media (min-width: 768px) {
          .hero-heading {
            max-width: 580px;
            font-size: 36px;
          }
        }

        @media (min-width: 1024px) {
          .hero-heading {
            max-width: 620px;
            font-size: 44px;
          }
        }

        @media (min-width: 1280px) {
          .hero-heading {
            max-width: 650px;
            font-size: clamp(48px, 4.2vw, 54px);
          }
        }

        .hero-divider {
          width: 52px;
          height: 2px;
          margin: 10px 0;
        }

        @media (min-width: 375px) {
          .hero-divider {
            width: 58px;
            margin: 11px 0;
          }
        }

        @media (min-width: 480px) {
          .hero-divider {
            width: 64px;
            margin: 12px 0;
          }
        }

        @media (min-width: 640px) {
          .hero-divider {
            width: 72px;
            margin: 13px 0;
          }
        }

        @media (min-width: 768px) {
          .hero-divider {
            width: 80px;
            height: 3px;
            margin: 15px 0;
          }
        }

        @media (min-width: 1024px) {
          .hero-divider {
            width: 90px;
            margin: 16px 0;
          }
        }

        @media (min-width: 1280px) {
          .hero-divider {
            width: 96px;
            margin: 18px 0;
          }
        }

        .hero-desc {
          max-width: 100%;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (min-width: 375px) {
          .hero-desc {
            font-size: 12.5px;
            line-height: 1.65;
          }
        }

        @media (min-width: 480px) {
          .hero-desc {
            font-size: 13px;
            line-height: 1.7;
          }
        }

        @media (min-width: 640px) {
          .hero-desc {
            font-size: 14px;
            line-height: 1.72;
          }
        }

        @media (min-width: 768px) {
          .hero-desc {
            max-width: 530px;
            font-size: 15px;
            line-height: 1.7;
          }
        }

        @media (min-width: 1024px) {
          .hero-desc {
            max-width: 560px;
            font-size: 16px;
            line-height: 1.75;
          }
        }

        @media (min-width: 1280px) {
          .hero-desc {
            max-width: 590px;
            font-size: 17px;
            line-height: 1.8;
          }
        }

        .hero-tags {
          gap: 6px;
          margin-top: 12px;
        }

        .hero-tag {
          padding: 4px 10px;
          font-size: 10px;
        }

        @media (min-width: 375px) {
          .hero-tags {
            gap: 7px;
            margin-top: 13px;
          }

          .hero-tag {
            font-size: 10.5px;
          }
        }

        @media (min-width: 480px) {
          .hero-tags {
            gap: 8px;
            margin-top: 14px;
          }

          .hero-tag {
            padding: 5px 11px;
            font-size: 11px;
          }
        }

        @media (min-width: 640px) {
          .hero-tags {
            gap: 9px;
            margin-top: 15px;
          }

          .hero-tag {
            padding: 5px 12px;
            font-size: 11.5px;
          }
        }

        @media (min-width: 768px) {
          .hero-tags {
            gap: 10px;
            margin-top: 17px;
          }

          .hero-tag {
            padding: 6px 12px;
            font-size: 12px;
          }
        }

        .hero-ctas {
          gap: 8px;
          margin-top: 16px;
        }

        .hero-btn {
          min-height: 38px;
          gap: 7px;
          padding: 9px 15px;
          font-size: 11.5px;
        }

        .hero-btn-icon {
          width: 13px;
          height: 13px;
        }

        @media (min-width: 375px) {
          .hero-ctas {
            gap: 9px;
            margin-top: 17px;
          }

          .hero-btn {
            min-height: 40px;
            padding: 10px 16px;
            font-size: 12px;
          }

          .hero-btn-icon {
            width: 14px;
            height: 14px;
          }
        }

        @media (min-width: 480px) {
          .hero-ctas {
            gap: 10px;
            margin-top: 18px;
          }

          .hero-btn {
            min-height: 42px;
            gap: 8px;
            padding: 10px 17px;
            font-size: 12.5px;
          }
        }

        @media (min-width: 640px) {
          .hero-ctas {
            gap: 11px;
            margin-top: 20px;
          }

          .hero-btn {
            min-height: 44px;
            padding: 11px 19px;
            font-size: 13px;
          }

          .hero-btn-icon {
            width: 15px;
            height: 15px;
          }
        }

        @media (min-width: 768px) {
          .hero-ctas {
            gap: 12px;
            margin-top: 23px;
          }

          .hero-btn {
            min-height: 46px;
            gap: 9px;
            padding: 12px 21px;
            font-size: 14px;
          }

          .hero-btn-icon {
            width: 16px;
            height: 16px;
          }
        }

        @media (min-width: 1024px) {
          .hero-btn {
            min-height: 48px;
            padding: 13px 25px;
            font-size: 14px;
          }
        }

        @media (min-width: 1280px) {
          .hero-btn {
            min-height: 50px;
            padding: 14px 28px;
            font-size: 15px;
          }
        }

        .hero-overlay {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }

        .hero-overlay-rtl {
          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.02) 0%,
              rgba(0, 0, 0, 0.12) 35%,
              rgba(0, 0, 0, 0.82) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.6) 0%,
              rgba(0, 0, 0, 0.06) 30%,
              transparent 55%
            ),
            rgba(0, 0, 0, 0.24);
        }

        .hero-overlay-ltr {
          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.12) 65%,
              rgba(0, 0, 0, 0.02) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.6) 0%,
              rgba(0, 0, 0, 0.06) 30%,
              transparent 55%
            ),
            rgba(0, 0, 0, 0.24);
        }

        .hero-video {
          opacity: 0;
          transition: opacity 1s ease;
        }

        .hero-video-on {
          opacity: 1;
        }

        .hero-item {
          opacity: 0;
          transform: translateY(20px);
        }

        .hero-line {
          opacity: 0;
          transform: scaleX(0);
        }

        .hero-go .hero-item {
          animation: heroFadeUp 700ms cubic-bezier(0.25, 1, 0.5, 1)
            var(--d, 0ms) forwards;
        }

        .hero-go .hero-line {
          animation: heroLineGrow 600ms cubic-bezier(0.25, 1, 0.5, 1)
            var(--d, 0ms) forwards;
        }

        @keyframes heroFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroLineGrow {
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .hero-dot {
          box-shadow:
            0 0 0 3px rgba(255, 214, 45, 0.12),
            0 0 10px rgba(255, 214, 45, 0.4);
          animation: dotPulse 2.8s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 3px rgba(255, 214, 45, 0.12),
              0 0 10px rgba(255, 214, 45, 0.4);
          }

          50% {
            box-shadow:
              0 0 0 6px rgba(255, 214, 45, 0.06),
              0 0 18px rgba(255, 214, 45, 0.55);
          }
        }

        .hero-btn {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            background-color 300ms ease,
            border-color 300ms ease,
            color 300ms ease;
        }

        .hero-btn:hover {
          transform: translateY(-2px);
        }

        .hero-btn:active {
          transform: translateY(0);
        }

        .hero-btn-primary {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
        }

        .hero-btn-primary:hover {
          background-color: #ffe052;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
        }

        .hero-btn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.8);
          background-color: white;
          color: #7c1422;
        }

        .hero-tag {
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            background-color 300ms ease;
        }

        .hero-tag:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.3);
          background-color: rgba(255, 255, 255, 0.1);
        }

        /*
         * شاشات اللابتوب القصيرة:
         * نحافظ على الهيدر كما هو، ونضغط محتوى السلايدر فقط.
         */
        @media (min-width: 768px) and (max-height: 720px) {
          .hero-container {
            padding-top: 112px;
            padding-bottom: 22px;
          }

          .hero-eyebrow {
            margin-bottom: 8px;
            padding-block: 5px;
          }

          .hero-brand {
            margin-bottom: 3px;
            font-size: 15px;
          }

          .hero-heading {
            max-width: 560px;
            font-size: clamp(32px, 4vw, 42px);
          }

          .hero-divider {
            width: 74px;
            margin-block: 11px;
          }

          .hero-desc {
            max-width: 520px;
            font-size: 14px;
            line-height: 1.6;
          }

          .hero-tags {
            margin-top: 11px;
          }

          .hero-ctas {
            margin-top: 15px;
          }

          .hero-btn {
            min-height: 42px;
            padding: 9px 19px;
            font-size: 12.5px;
          }
        }

        @media (min-width: 768px) and (max-height: 610px) {
          .hero-container {
            padding-top: 104px;
            padding-bottom: 14px;
          }

          .hero-eyebrow {
            margin-bottom: 6px;
            padding: 4px 10px;
          }

          .hero-eyebrow span:last-child {
            font-size: 10.5px;
          }

          .hero-brand {
            margin-bottom: 2px;
            font-size: 13px;
          }

          .hero-heading {
            max-width: 510px;
            font-size: clamp(28px, 3.5vw, 36px);
          }

          .hero-divider {
            width: 62px;
            margin-block: 8px;
          }

          .hero-desc {
            max-width: 490px;
            font-size: 12.5px;
            line-height: 1.5;
          }

          .hero-tags {
            gap: 6px;
            margin-top: 8px;
          }

          .hero-tag {
            padding: 4px 9px;
            font-size: 10px;
          }

          .hero-ctas {
            margin-top: 11px;
          }

          .hero-btn {
            min-height: 38px;
            padding: 7px 16px;
            font-size: 11.5px;
          }

          .hero-btn-icon {
            width: 13px;
            height: 13px;
          }
        }

        @media (hover: none) {
          .hero-btn:hover,
          .hero-tag:hover {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-item,
          .hero-line {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }

          .hero-video {
            display: none !important;
          }

          .hero-dot {
            animation: none !important;
          }

          .hero-btn,
          .hero-tag {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
