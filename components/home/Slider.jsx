import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";

const API_BASE_URL = "https://api.sedihisham.com/";
const DEFAULT_HERO_IMAGE = "/images/videoframe_0.webp";
const DEMO_HERO_VIDEO = "/videos/sedi-hisham-factory-demo.mp4";

function getApiImageUrl(path) {
  if (!path || typeof path !== "string") return "";
  const normalizedPath = path.trim();
  if (!normalizedPath) return "";
  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    return normalizedPath;
  }
  return `${API_BASE_URL}${normalizedPath.replace(/^\/+/, "")}`;
}

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
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setVideoReady(false);
    setVideoFailed(false);
  }, [videoSrc]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
    } else {
      mq.addListener(update);
    }
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", update);
      } else {
        mq.removeListener(update);
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
      {/* Poster */}
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
          className="object-cover object-center"
        />
      </div>

      {/* Video */}
      {!reduceMotion && !videoFailed ? (
        <video
          key={videoSrc}
          className={`hero-video absolute inset-0 z-[1] h-full w-full object-cover ${
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

      {/* Overlay */}
      <div
        aria-hidden="true"
        className={`hero-overlay pointer-events-none absolute inset-0 z-[2] ${
          isAr ? "hero-overlay-rtl" : "hero-overlay-ltr"
        }`}
      />

      {/* Content */}
      <div className="hero-container relative z-10 mx-auto flex w-full flex-col justify-center">
        <div
          className={`hero-content flex w-full flex-col items-start justify-center text-start ${
            isAr ? "hero-content-rtl ml-auto" : "hero-content-ltr mr-auto"
          }`}
        >
          {/* 1 — Logo */}
          <div
            className="hero-item hero-logo relative"
            style={{ "--d": "0ms" }}
          >
            <Image
              src={logo}
              alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
              fill
              priority
              sizes="180px"
              draggable={false}
              className={`object-contain ${
                isAr ? "object-right" : "object-left"
              }`}
            />
          </div>

          {/* 2 — Eyebrow badge */}
          <div
            className="hero-item hero-eyebrow inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
            style={{ "--d": "80ms" }}
          >
            <span className="hero-dot shrink-0 rounded-full bg-[#FFD62D]" />
            <span className="font-arabicMedium text-white">
              {isAr ? "من المصنع إلى مائدتك" : "From our factory to your table"}
            </span>
          </div>

          {/* 3 — Brand name */}
          <p
            className="hero-item hero-brand font-arabicMedium text-[#FFD62D]"
            style={{ "--d": "160ms" }}
          >
            {isAr ? "سيدي هشام" : "Sedi Hisham"}
          </p>

          {/* 4 — Heading */}
          <h2
            className="hero-item hero-heading font-arabicBold text-white"
            style={{ "--d": "240ms" }}
          >
            {isAr
              ? "شركة العقاد للصناعة والتجارة"
              : "Al Akkad Industry and Trading Company"}
          </h2>

          {/* 5 — Divider */}
          <div
            className={`hero-line hero-divider rounded-full bg-[#FFD62D] ${
              isAr ? "origin-right" : "origin-left"
            }`}
            style={{ "--d": "340ms" }}
            aria-hidden="true"
          />

          {/* 6 — Description */}
          <p
            className="hero-item hero-desc font-arabicLight text-white/90"
            style={{ "--d": "420ms" }}
          >
            {isAr
              ? "نصنع منتجات غذائية موثوقة بجودة ثابتة، من مراحل الإنتاج والتعبئة وحتى تصل منتجاتنا إلى كل بيت."
              : "We produce trusted food products with consistent quality, from production and packaging until they reach every home."}
          </p>

          {/* 7 — Tags */}
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

          {/* 8 — CTAs */}
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
        /* ══════════════════════════════════════════
           SECTION HEIGHT — Proportional Responsive
        ══════════════════════════════════════════ */
        .hero-section {
          min-height: 62.5vw;
          max-height: calc(100vh - 78px);
          max-height: calc(100svh - 78px);
          contain: layout paint;
        }

        /* موبايل صغير جدًا */
        @media (max-width: 374px) {
          .hero-section {
            min-height: 440px;
            max-height: none;
          }
        }
        /* موبايل عادي */
        @media (min-width: 375px) and (max-width: 479px) {
          .hero-section {
            min-height: 480px;
            max-height: none;
          }
        }
        /* موبايل كبير */
        @media (min-width: 480px) and (max-width: 639px) {
          .hero-section {
            min-height: 500px;
            max-height: none;
          }
        }
        /* تابلت صغير */
        @media (min-width: 640px) and (max-width: 767px) {
          .hero-section {
            min-height: 64vw;
            max-height: none;
          }
        }
        /* تابلت / لابتوب */
        @media (min-width: 768px) {
          .hero-section {
            min-height: min(62.5vw, calc(100vh - 94px));
            min-height: min(62.5vw, calc(100svh - 94px));
            max-height: calc(100vh - 94px);
            max-height: calc(100svh - 94px);
          }
        }
        /* ديسكتوب */
        @media (min-width: 1280px) {
          .hero-section {
            min-height: min(56.25vw, calc(100vh - 94px));
            min-height: min(56.25vw, calc(100svh - 94px));
          }
        }

        /* ══════════════════════════════════════════
           CONTAINER — يرث min-height من الـ section
        ══════════════════════════════════════════ */
        .hero-container {
          min-height: inherit;
          padding-inline: 18px;
          padding-block: 32px;
          max-width: 1380px;
        }
        @media (min-width: 375px) {
          .hero-container {
            padding-block: 36px;
          }
        }
        @media (min-width: 480px) {
          .hero-container {
            padding-inline: 22px;
            padding-block: 40px;
          }
        }
        @media (min-width: 640px) {
          .hero-container {
            padding-inline: 30px;
            padding-block: 44px;
          }
        }
        @media (min-width: 768px) {
          .hero-container {
            padding-inline: 44px;
            padding-block: 40px;
          }
        }
        @media (min-width: 1024px) {
          .hero-container {
            padding-inline: 60px;
          }
        }

        .hero-content {
          max-width: 100%;
        }
        @media (min-width: 640px) {
          .hero-content {
            max-width: 560px;
          }
        }
        @media (min-width: 768px) {
          .hero-content {
            max-width: 620px;
          }
        }
        @media (min-width: 1024px) {
          .hero-content {
            max-width: 690px;
          }
        }

        /* ══════════════════════════════════════════
           LOGO
        ══════════════════════════════════════════ */
        .hero-logo {
          width: 96px;
          height: 48px;
          margin-bottom: 12px;
        }
        @media (min-width: 375px) {
          .hero-logo {
            width: 108px;
            height: 54px;
            margin-bottom: 14px;
          }
        }
        @media (min-width: 480px) {
          .hero-logo {
            width: 120px;
            height: 60px;
            margin-bottom: 16px;
          }
        }
        @media (min-width: 640px) {
          .hero-logo {
            width: 132px;
            height: 66px;
          }
        }
        @media (min-width: 768px) {
          .hero-logo {
            width: 148px;
            height: 74px;
            margin-bottom: 18px;
          }
        }
        @media (min-width: 1024px) {
          .hero-logo {
            width: 168px;
            height: 84px;
            margin-bottom: 20px;
          }
        }
        @media (min-width: 1280px) {
          .hero-logo {
            width: 180px;
            height: 92px;
          }
        }

        /* ══════════════════════════════════════════
           EYEBROW BADGE
        ══════════════════════════════════════════ */
        .hero-eyebrow {
          padding: 5px 10px;
          gap: 6px;
          margin-bottom: 10px;
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
            padding: 5px 11px;
            margin-bottom: 11px;
          }
          .hero-eyebrow span:last-child {
            font-size: 10.5px;
          }
        }
        @media (min-width: 480px) {
          .hero-eyebrow {
            padding: 6px 12px;
            margin-bottom: 12px;
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
            padding: 6px 13px;
            margin-bottom: 13px;
          }
          .hero-eyebrow span:last-child {
            font-size: 11.5px;
          }
        }
        @media (min-width: 768px) {
          .hero-eyebrow {
            padding: 7px 14px;
            gap: 8px;
            margin-bottom: 15px;
          }
          .hero-eyebrow span:last-child {
            font-size: 12px;
          }
          .hero-dot {
            width: 8px;
            height: 8px;
          }
        }

        /* ══════════════════════════════════════════
           BRAND NAME
        ══════════════════════════════════════════ */
        .hero-brand {
          font-size: 12px;
          margin-bottom: 3px;
        }
        @media (min-width: 375px) {
          .hero-brand {
            font-size: 13px;
          }
        }
        @media (min-width: 480px) {
          .hero-brand {
            font-size: 14px;
            margin-bottom: 4px;
          }
        }
        @media (min-width: 640px) {
          .hero-brand {
            font-size: 15px;
            margin-bottom: 5px;
          }
        }
        @media (min-width: 768px) {
          .hero-brand {
            font-size: 17px;
            margin-bottom: 6px;
          }
        }
        @media (min-width: 1024px) {
          .hero-brand {
            font-size: 19px;
            margin-bottom: 8px;
          }
        }
        @media (min-width: 1280px) {
          .hero-brand {
            font-size: 20px;
          }
        }

        /* ══════════════════════════════════════════
           HEADING (Main Title)
        ══════════════════════════════════════════ */
        .hero-heading {
          font-size: 20px;
          line-height: 1.22;
          max-width: 100%;
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
            font-size: 38px;
            max-width: 620px;
          }
        }
        @media (min-width: 1024px) {
          .hero-heading {
            font-size: 46px;
            max-width: 650px;
          }
        }
        @media (min-width: 1280px) {
          .hero-heading {
            font-size: 54px;
          }
        }

        /* ══════════════════════════════════════════
           DIVIDER
        ══════════════════════════════════════════ */
        .hero-divider {
          height: 2px;
          width: 52px;
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
            height: 3px;
            width: 82px;
            margin: 16px 0;
          }
        }
        @media (min-width: 1024px) {
          .hero-divider {
            width: 96px;
            margin: 18px 0;
          }
        }

        /* ══════════════════════════════════════════
           DESCRIPTION
        ══════════════════════════════════════════ */
        .hero-desc {
          font-size: 12px;
          line-height: 1.6;
          max-width: 100%;
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
            font-size: 15px;
            line-height: 1.75;
            max-width: 560px;
          }
        }
        @media (min-width: 1024px) {
          .hero-desc {
            font-size: 17px;
            line-height: 1.8;
            max-width: 590px;
          }
        }

        /* ══════════════════════════════════════════
           TAGS
        ══════════════════════════════════════════ */
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
            padding: 4px 10px;
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
            margin-top: 18px;
          }
          .hero-tag {
            padding: 6px 12px;
            font-size: 12px;
          }
        }

        /* ══════════════════════════════════════════
           CTAs
        ══════════════════════════════════════════ */
        .hero-ctas {
          gap: 8px;
          margin-top: 16px;
        }
        .hero-btn {
          padding: 9px 15px;
          min-height: 38px;
          font-size: 11.5px;
          gap: 7px;
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
            padding: 10px 16px;
            min-height: 40px;
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
            padding: 10px 17px;
            min-height: 42px;
            font-size: 12.5px;
            gap: 8px;
          }
        }
        @media (min-width: 640px) {
          .hero-ctas {
            gap: 11px;
            margin-top: 20px;
          }
          .hero-btn {
            padding: 11px 19px;
            min-height: 44px;
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
            margin-top: 26px;
          }
          .hero-btn {
            padding: 12px 22px;
            min-height: 46px;
            font-size: 14px;
            gap: 10px;
          }
          .hero-btn-icon {
            width: 16px;
            height: 16px;
          }
        }
        @media (min-width: 1024px) {
          .hero-btn {
            padding: 14px 28px;
            min-height: 50px;
            font-size: 15px;
          }
        }

        /* ══════════════════════════════════════════
           OVERLAY — static, no animation
        ══════════════════════════════════════════ */
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

        /* ══════════════════════════════════════════
           VIDEO
        ══════════════════════════════════════════ */
        .hero-video {
          opacity: 0;
          transition: opacity 1s ease;
        }
        .hero-video-on {
          opacity: 1;
        }

        /* ══════════════════════════════════════════
           REVEAL ANIMATION
        ══════════════════════════════════════════ */
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

        /* ══════════════════════════════════════════
           DOT PULSE
        ══════════════════════════════════════════ */
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

        /* ══════════════════════════════════════════
           BUTTONS
        ══════════════════════════════════════════ */
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
          background-color: white;
          border-color: rgba(255, 255, 255, 0.8);
          color: #7c1422;
        }

        /* ══════════════════════════════════════════
           TAGS HOVER
        ══════════════════════════════════════════ */
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

        /* ══════════════════════════════════════════
           TOUCH DEVICES
        ══════════════════════════════════════════ */
        @media (hover: none) {
          .hero-btn:hover,
          .hero-tag:hover {
            transform: none;
          }
        }

        /* ══════════════════════════════════════════
           REDUCED MOTION
        ══════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .hero-item,
          .hero-line {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
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
