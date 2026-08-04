import SEO from "@/components/SEO";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  ChevronDown,
  ChevronUp,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { A11y, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const API_BASE_URL = "https://api.sedihisham.com/";
const CATEGORIES_URL = `${API_BASE_URL}cooks-categories/findall`;
const FALLBACK_IMAGE = "/images/eim.png";

const PRELOADER_MIN_TIME = 700;
const FIRST_IMAGE_TIMEOUT = 1800;
const SLIDE_SPEED = 760;
const WHEEL_THRESHOLD = 48;

const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function normalizeLocale(value) {
  return String(value || "ar")
    .trim()
    .toLowerCase();
}

function getTranslation(translations, locale) {
  if (!Array.isArray(translations) || translations.length === 0) {
    return null;
  }

  const normalizedLocale = normalizeLocale(locale);

  return (
    translations.find(
      (item) => normalizeLocale(item?.locale) === normalizedLocale,
    ) ||
    translations.find((item) => normalizeLocale(item?.locale) === "ar") ||
    translations.find((item) => normalizeLocale(item?.locale) === "en") ||
    translations[0] ||
    null
  );
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getImageUrl(path) {
  if (!path || typeof path !== "string") {
    return FALLBACK_IMAGE;
  }

  const normalizedPath = path.trim();

  if (!normalizedPath) {
    return FALLBACK_IMAGE;
  }

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://") ||
    normalizedPath.startsWith("/images/")
  ) {
    return normalizedPath;
  }

  return `${API_BASE_URL}${normalizedPath.replace(/^\/+/, "")}`;
}

const KitchenArtwork = memo(function KitchenArtwork({
  src,
  alt,
  priority = false,
}) {
  return (
    <img
      src={src || FALLBACK_IMAGE}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable={false}
      className="kitchen-category-image"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = FALLBACK_IMAGE;
      }}
    />
  );
});

const KitchenPreloader = memo(function KitchenPreloader({ isAr, leaving }) {
  return (
    <div
      className={`kitchen-preloader ${leaving ? "is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={isAr ? "جاري تجهيز المطبخ" : "Preparing the kitchen"}
    >
      <div className="kitchen-preloader-pattern" aria-hidden="true" />
      <div className="kitchen-preloader-glow" aria-hidden="true" />

      <div className="kitchen-preloader-inner">
        <div className="kitchen-preloader-mark" aria-hidden="true">
          <span className="kitchen-preloader-ring kitchen-preloader-ring-one" />
          <span className="kitchen-preloader-ring kitchen-preloader-ring-two" />

          <div className="kitchen-preloader-logo-shell">
            <img
              src="/images/logo.png"
              alt=""
              draggable={false}
              className="kitchen-preloader-logo"
            />
          </div>

          <span className="kitchen-steam kitchen-steam-one" />
          <span className="kitchen-steam kitchen-steam-two" />
          <span className="kitchen-steam kitchen-steam-three" />
        </div>

        <p>{isAr ? "جاري تجهيز المطبخ" : "Preparing the kitchen"}</p>

        <div className="kitchen-preloader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
});

const KitchenSlide = memo(function KitchenSlide({
  category,
  index,
  isAr,
  playAnimation,
}) {
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const href = `/ketchen/recipes/${category.id}`;

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className={`kitchen-slide ${isAr ? "is-rtl" : "is-ltr"} ${
        playAnimation ? "is-animated" : ""
      }`}
      aria-label={category.title}
    >
      <div className="kitchen-slide-surface" aria-hidden="true" />
      <div
        className="kitchen-slide-light kitchen-slide-light-one"
        aria-hidden="true"
      />
      <div
        className="kitchen-slide-light kitchen-slide-light-two"
        aria-hidden="true"
      />
      <div
        className="kitchen-decoration kitchen-decoration-one"
        aria-hidden="true"
      />
      <div
        className="kitchen-decoration kitchen-decoration-two"
        aria-hidden="true"
      />
      <div
        className="kitchen-decoration kitchen-decoration-three"
        aria-hidden="true"
      />

      <div className="kitchen-slide-shell">
        <div className="kitchen-slide-visual">
          <div className="kitchen-plate-shadow" aria-hidden="true" />

          <Link
            href={href}
            prefetch={false}
            className="kitchen-plate"
            aria-label={
              isAr
                ? `فتح وصفات ${category.title}`
                : `Open ${category.title} recipes`
            }
          >
            <span
              className="kitchen-plate-ring kitchen-plate-ring-one"
              aria-hidden="true"
            />

            <span
              className="kitchen-plate-ring kitchen-plate-ring-two"
              aria-hidden="true"
            />

            <KitchenArtwork
              src={category.image}
              alt={category.title}
              priority={index === 0}
            />
          </Link>
        </div>

        <div className="kitchen-slide-content" dir={isAr ? "rtl" : "ltr"}>
          <div className="kitchen-kicker kitchen-animate-text">
            <ChefHat aria-hidden="true" />
            <span>{isAr ? "مطبخ سيدي هشام" : "Sedi Hisham Kitchen"}</span>
          </div>

          <p className="kitchen-overline kitchen-animate-text">
            {isAr ? "اكتشف نكهة جديدة" : "Discover a new flavour"}
          </p>

          <h2 className="kitchen-category-title kitchen-animate-text">
            {category.title}
          </h2>

          <span
            className="kitchen-title-line kitchen-animate-text"
            aria-hidden="true"
          />

          <p className="kitchen-category-description kitchen-animate-text">
            {category.description ||
              (isAr
                ? "اكتشف وصفات شهية محضّرة بمكونات سيدي هشام وخطوات واضحة وسهلة."
                : "Discover delicious recipes made with Sedi Hisham ingredients and simple, clear steps.")}
          </p>

          <div className="kitchen-tags kitchen-animate-text">
            <span>
              <UtensilsCrossed aria-hidden="true" />
              {isAr ? "وصفات متنوعة" : "Varied recipes"}
            </span>

            <span>
              <Sparkles aria-hidden="true" />
              {isAr ? "تحضير سهل" : "Easy preparation"}
            </span>
          </div>

          <Link
            href={href}
            prefetch={false}
            className="kitchen-category-cta kitchen-animate-text group"
            aria-label={
              isAr
                ? `استكشف وصفات ${category.title}`
                : `Explore ${category.title} recipes`
            }
          >
            <span>{isAr ? "استكشف الوصفات" : "Explore recipes"}</span>
            <ArrowIcon aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
});

function KitchenError({ isAr, onRetry }) {
  return (
    <main dir={isAr ? "rtl" : "ltr"} className="kitchen-state">
      <div className="kitchen-error-card">
        <ChefHat aria-hidden="true" />

        <h1>
          {isAr
            ? "تعذر تحميل أقسام المطبخ"
            : "Could not load kitchen categories"}
        </h1>

        <p>
          {isAr
            ? "حدثت مشكلة أثناء الاتصال بالخادم. حاول مرة أخرى."
            : "There was a problem connecting to the server. Please try again."}
        </p>

        <button type="button" onClick={onRetry}>
          {isAr ? "إعادة المحاولة" : "Try again"}
        </button>
      </div>
    </main>
  );
}

function KitchenStyles() {
  return (
    <style jsx global>{`
      body:has(.kitchen-runtime-root) footer,
      body:has(.kitchen-runtime-root) #footer,
      body:has(.kitchen-runtime-root) .footer,
      body:has(.kitchen-runtime-root) .site-footer,
      body:has(.kitchen-runtime-root) [data-footer],
      body.kitchen-immersive-page footer,
      body.kitchen-immersive-page #footer,
      body.kitchen-immersive-page .footer,
      body.kitchen-immersive-page .site-footer,
      body.kitchen-immersive-page [data-footer] {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      html:has(.kitchen-runtime-root),
      body:has(.kitchen-runtime-root),
      body.kitchen-immersive-page {
        overflow: hidden !important;
        overscroll-behavior: none !important;
      }

      .kitchen-runtime-root {
        display: contents;
      }

      .kitchen-page,
      .kitchen-state,
      .kitchen-preloader {
        --kitchen-red: #d7192d;
        --kitchen-red-dark: #b80f23;
        --kitchen-wine: #8a1826;
        --kitchen-wine-light: #a62435;
        --kitchen-dark: #5a0912;
        --kitchen-deep: #3f060c;
        --kitchen-gold: #ffd62d;
        --kitchen-gold-light: #ffe36c;
        --kitchen-cream: #fff7e8;

        position: fixed;
        inset: 0;

        width: 100%;
        height: 100vh;
        height: 100svh;

        overflow: hidden;

        font-family: var(--font-el-messiri);
      }

      @supports (height: 100dvh) {
        .kitchen-page,
        .kitchen-state,
        .kitchen-preloader {
          height: 100dvh;
        }
      }

      .kitchen-page {
        z-index: 60;
        overscroll-behavior: none;
        background: var(--kitchen-deep);
      }

      .kitchen-state {
        z-index: 61;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        color: white;
        background:
          radial-gradient(
            circle at 50% 30%,
            rgba(255, 214, 45, 0.13),
            transparent 35%
          ),
          radial-gradient(
            circle at 15% 75%,
            rgba(215, 25, 45, 0.19),
            transparent 32%
          ),
          linear-gradient(145deg, #8b1725 0%, #68101b 48%, #44070e 100%);
      }

      .kitchen-error-card {
        width: min(100%, 470px);
        padding: 34px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 28px;
        background: rgba(255, 255, 255, 0.1);
        text-align: center;
        box-shadow: 0 24px 70px rgba(55, 3, 10, 0.24);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }

      .kitchen-error-card > svg {
        width: 48px;
        height: 48px;
        margin-inline: auto;
        color: var(--kitchen-gold);
      }

      .kitchen-error-card h1 {
        margin-top: 18px;
        font-size: 24px;
        font-weight: 700;
      }

      .kitchen-error-card p {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.9;
        color: rgba(255, 255, 255, 0.82);
      }

      .kitchen-error-card button {
        min-width: 150px;
        min-height: 44px;
        margin-top: 22px;
        border: 0;
        border-radius: 999px;
        background: var(--kitchen-gold);
        color: var(--kitchen-wine);
        font-weight: 700;
        cursor: pointer;
        transition:
          transform 240ms ease,
          background-color 240ms ease;
      }

      .kitchen-error-card button:hover {
        transform: translateY(-2px);
        background: var(--kitchen-gold-light);
      }

      .kitchen-preloader {
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        isolation: isolate;
        color: white;
        background:
          radial-gradient(
            circle at 50% 42%,
            rgba(255, 214, 45, 0.16),
            transparent 34%
          ),
          radial-gradient(
            circle at 16% 20%,
            rgba(255, 255, 255, 0.09),
            transparent 25%
          ),
          radial-gradient(
            circle at 84% 78%,
            rgba(215, 25, 45, 0.22),
            transparent 34%
          ),
          linear-gradient(145deg, #8b1725 0%, #68101b 48%, #44070e 100%);
        opacity: 1;
        transition:
          opacity 420ms ease,
          visibility 420ms ease;
      }

      .kitchen-preloader.is-leaving {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .kitchen-preloader-pattern {
        position: absolute;
        inset: 0;
        opacity: 0.2;
        background-image:
          radial-gradient(
            circle at 10% 20%,
            rgba(255, 255, 255, 0.42) 0 1px,
            transparent 1.6px
          ),
          radial-gradient(
            circle at 76% 22%,
            rgba(255, 214, 45, 0.52) 0 1px,
            transparent 1.7px
          ),
          radial-gradient(
            circle at 40% 78%,
            rgba(255, 255, 255, 0.28) 0 1px,
            transparent 1.6px
          );
        background-size:
          100px 100px,
          145px 145px,
          175px 175px;
      }

      .kitchen-preloader-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        width: min(78vw, 700px);
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(255, 214, 45, 0.13),
          transparent 66%
        );
        filter: blur(18px);
        transform: translate(-50%, -50%);
      }

      .kitchen-preloader-inner {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .kitchen-preloader-mark {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: clamp(160px, 18vw, 230px);
        aspect-ratio: 1;
      }

      .kitchen-preloader-ring {
        position: absolute;
        border-radius: 50%;
      }

      .kitchen-preloader-ring-one {
        inset: 0;
        border: 2px solid rgba(255, 255, 255, 0.15);
        border-top-color: var(--kitchen-gold);
        border-right-color: rgba(255, 214, 45, 0.64);
        animation: kitchenPreloaderSpin 2.1s linear infinite;
      }

      .kitchen-preloader-ring-two {
        inset: 12%;
        border: 1px dashed rgba(255, 255, 255, 0.27);
        animation: kitchenPreloaderSpinReverse 3.8s linear infinite;
      }

      .kitchen-preloader-logo-shell {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 68%;
        height: 68%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.11);
        box-shadow:
          inset 0 0 0 8px rgba(255, 255, 255, 0.04),
          0 24px 54px rgba(55, 3, 10, 0.24);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .kitchen-preloader-logo {
        display: block;
        width: 86%;
        height: 70%;
        object-fit: contain;
        filter: drop-shadow(0 7px 11px rgba(55, 3, 10, 0.3));
        animation: kitchenLogoBreath 1.9s ease-in-out infinite;
      }

      .kitchen-steam {
        position: absolute;
        top: 6%;
        width: 2px;
        height: 24px;
        border-radius: 999px;
        background: linear-gradient(
          to top,
          transparent,
          rgba(255, 255, 255, 0.68)
        );
        opacity: 0;
        animation: kitchenSteam 1.8s ease-in-out infinite;
      }

      .kitchen-steam-one {
        left: 43%;
      }

      .kitchen-steam-two {
        left: 50%;
        animation-delay: 300ms;
      }

      .kitchen-steam-three {
        left: 57%;
        animation-delay: 600ms;
      }

      .kitchen-preloader-inner > p {
        margin-top: 20px;
        font-size: clamp(14px, 1.3vw, 17px);
        color: rgba(255, 255, 255, 0.9);
      }

      .kitchen-preloader-dots {
        display: flex;
        gap: 7px;
        margin-top: 12px;
      }

      .kitchen-preloader-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--kitchen-gold);
        animation: kitchenDot 1.2s ease-in-out infinite;
      }

      .kitchen-preloader-dots span:nth-child(2) {
        animation-delay: 150ms;
      }

      .kitchen-preloader-dots span:nth-child(3) {
        animation-delay: 300ms;
      }

      @keyframes kitchenPreloaderSpin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes kitchenPreloaderSpinReverse {
        to {
          transform: rotate(-360deg);
        }
      }

      @keyframes kitchenLogoBreath {
        0%,
        100% {
          transform: scale(0.96);
        }
        50% {
          transform: scale(1.02);
        }
      }

      @keyframes kitchenSteam {
        0% {
          opacity: 0;
          transform: translate3d(0, 9px, 0) scaleY(0.7);
        }
        35% {
          opacity: 0.75;
        }
        100% {
          opacity: 0;
          transform: translate3d(0, -15px, 0) scaleY(1.15);
        }
      }

      @keyframes kitchenDot {
        0%,
        100% {
          opacity: 0.32;
          transform: translateY(0);
        }
        50% {
          opacity: 1;
          transform: translateY(-4px);
        }
      }

      .kitchen-swiper.swiper {
        position: relative;
        z-index: 1;
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        touch-action: none;
        overscroll-behavior: none;
      }

      .kitchen-swiper .swiper-wrapper {
        position: relative;
        z-index: 1;
        display: flex;
        width: 100%;
        height: 100%;
        box-sizing: content-box;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }

      .kitchen-swiper.swiper-vertical .swiper-wrapper {
        flex-direction: column;
      }

      .kitchen-swiper.swiper-fade .swiper-slide {
        pointer-events: none;
        transition-property: opacity !important;
        transition-timing-function: ease !important;
      }

      .kitchen-swiper.swiper-fade .swiper-slide-active {
        pointer-events: auto;
      }

      .kitchen-swiper .swiper-slide {
        position: relative;
        display: block;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        backface-visibility: hidden;
      }

      .kitchen-slide {
        position: relative;
        isolation: isolate;
        width: 100%;
        height: 100%;
        overflow: hidden;
        color: white;
        background:
          radial-gradient(
            circle at 15% 24%,
            rgba(255, 214, 45, 0.17),
            transparent 29%
          ),
          radial-gradient(
            circle at 78% 72%,
            rgba(215, 25, 45, 0.22),
            transparent 38%
          ),
          radial-gradient(
            circle at 52% 0%,
            rgba(255, 255, 255, 0.075),
            transparent 32%
          ),
          linear-gradient(118deg, #59101a 0%, #861524 48%, #4b0811 100%);
      }

      .kitchen-slide-surface {
        position: absolute;
        inset: 0;
        z-index: -5;
        opacity: 0.34;
        background-image:
          radial-gradient(
            circle at 10% 18%,
            rgba(255, 255, 255, 0.45) 0 1px,
            transparent 1.6px
          ),
          radial-gradient(
            circle at 82% 26%,
            rgba(255, 214, 45, 0.56) 0 1.2px,
            transparent 1.8px
          ),
          radial-gradient(
            circle at 34% 82%,
            rgba(255, 255, 255, 0.32) 0 1px,
            transparent 1.7px
          );
        background-size:
          88px 88px,
          124px 124px,
          154px 154px;
      }

      .kitchen-slide::after {
        position: absolute;
        inset: 0;
        z-index: -3;
        content: "";
        background:
          linear-gradient(
            90deg,
            rgba(55, 3, 10, 0.08),
            transparent 42%,
            rgba(55, 3, 10, 0.13)
          ),
          radial-gradient(
            ellipse at center,
            transparent 42%,
            rgba(45, 2, 8, 0.2) 100%
          );
        pointer-events: none;
      }

      .kitchen-slide-light {
        position: absolute;
        z-index: -4;
        border-radius: 50%;
        filter: blur(25px);
        pointer-events: none;
      }

      .kitchen-slide-light-one {
        top: 8%;
        left: 3%;
        width: 26vw;
        height: 26vw;
        background: rgba(255, 214, 45, 0.075);
      }

      .kitchen-slide-light-two {
        right: 5%;
        bottom: 4%;
        width: 31vw;
        height: 31vw;
        background: rgba(255, 255, 255, 0.045);
      }

      .kitchen-decoration {
        position: absolute;
        z-index: -2;
        border: 1px solid rgba(255, 214, 45, 0.16);
        border-radius: 50%;
        pointer-events: none;
      }

      .kitchen-decoration-one {
        top: -31vw;
        left: -22vw;
        width: 72vw;
        height: 72vw;
      }

      .kitchen-decoration-two {
        right: -20vw;
        bottom: -34vw;
        width: 58vw;
        height: 58vw;
        border-color: rgba(255, 255, 255, 0.1);
      }

      .kitchen-decoration-three {
        top: 12%;
        right: 8%;
        width: 140px;
        height: 140px;
        border-style: dashed;
        border-color: rgba(255, 214, 45, 0.13);
      }

      .kitchen-slide-shell {
        position: relative;
        z-index: 4;
        direction: ltr;
        display: grid;
        grid-template-columns: minmax(320px, 0.88fr) minmax(0, 1.12fr);
        grid-template-areas: "visual content";
        align-items: center;
        width: min(100%, 1500px);
        height: 100%;
        margin-inline: auto;
        gap: clamp(28px, 4.8vw, 78px);
        padding: calc(clamp(104px, 11vh, 138px) + env(safe-area-inset-top))
          clamp(74px, 7vw, 120px)
          calc(clamp(66px, 7vh, 94px) + env(safe-area-inset-bottom));
      }

      .kitchen-slide-content {
        grid-area: content;
        align-self: center;
        width: 100%;
        max-width: 640px;
        min-width: 0;
        text-align: start;
      }

      .kitchen-slide-visual {
        position: relative;
        grid-area: visual;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        height: min(60vh, 560px);
        opacity: 0;
        transform: translate3d(-70px, -10px, 0) scale(0.86) rotate(-3deg);
        filter: blur(7px);
        transition:
          opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
          transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
          filter 720ms cubic-bezier(0.22, 1, 0.36, 1);
        transition-delay: 0ms;
        will-change: transform, opacity, filter;
      }

      .kitchen-animate-text {
        opacity: 0;
        transform: translate3d(54px, 18px, 0);
        transition:
          opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
          transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
        transition-delay: 0ms;
        will-change: transform, opacity;
      }

      .kitchen-slide.is-animated .kitchen-animate-text {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(1) {
        transition-delay: 80ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(2) {
        transition-delay: 150ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(3) {
        transition-delay: 230ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(4) {
        transition-delay: 320ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(5) {
        transition-delay: 400ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(6) {
        transition-delay: 490ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-content > :nth-child(7) {
        transition-delay: 570ms;
      }

      .kitchen-slide.is-animated .kitchen-slide-visual {
        opacity: 1;
        transform: translate3d(-8px, -8px, 0) scale(1) rotate(0deg);
        filter: blur(0);
        transition-delay: 1220ms;
      }

      .kitchen-kicker {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        gap: 9px;
        padding: 8px 13px;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.94);
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(55, 3, 10, 0.1);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }

      .kitchen-kicker svg {
        width: 17px;
        height: 17px;
        color: var(--kitchen-gold);
      }

      .kitchen-overline {
        margin-top: 25px;
        color: var(--kitchen-gold-light);
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
      }

      .kitchen-category-title {
        margin-top: 9px;
        color: white;
        font-size: clamp(48px, 5.3vw, 82px);
        font-weight: 700;
        line-height: 1.08;
        letter-spacing: -0.035em;
        text-shadow: 0 8px 26px rgba(55, 3, 10, 0.2);
        text-wrap: balance;
      }

      .kitchen-title-line {
        display: block;
        width: 92px;
        height: 3px;
        margin-top: 22px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          var(--kitchen-gold),
          rgba(255, 227, 108, 0.24)
        );
        box-shadow: 0 0 14px rgba(255, 214, 45, 0.24);
        transform-origin: right center;
      }

      .kitchen-category-description {
        display: -webkit-box;
        max-width: 560px;
        margin-top: 21px;
        overflow: hidden;
        color: rgba(255, 255, 255, 0.9);
        font-size: clamp(15px, 1.3vw, 18px);
        line-height: 1.95;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }

      .kitchen-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 24px;
      }

      .kitchen-tags span {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 8px 12px;
        border: 1px solid rgba(255, 255, 255, 0.22);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.9);
        font-size: 11px;
        box-shadow: 0 8px 18px rgba(55, 3, 10, 0.08);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      .kitchen-tags svg {
        width: 15px;
        height: 15px;
        color: var(--kitchen-gold);
      }

      .kitchen-category-cta {
        position: relative;
        isolation: isolate;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        min-width: 190px;
        min-height: 52px;
        gap: 11px;
        margin-top: 30px;
        padding: 12px 25px;
        overflow: hidden;
        border: 1px solid #ffdf49;
        border-radius: 13px;
        background:
          linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.05) 24%,
            rgba(123, 66, 0, 0.16) 100%
          ),
          linear-gradient(
            90deg,
            #9a5500 0%,
            #c98508 10%,
            #f0b91d 24%,
            #fff078 43%,
            #ffd62d 50%,
            #fff18a 57%,
            #f0b91d 76%,
            #c98508 90%,
            #925000 100%
          );
        color: #5a0712;
        font-size: 14px;
        font-weight: 800;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
        box-shadow:
          0 14px 30px rgba(59, 4, 12, 0.28),
          inset 0 1px 0 rgba(255, 255, 255, 0.72),
          inset 0 -2px 0 rgba(120, 65, 0, 0.3),
          inset 1px 0 0 rgba(255, 235, 115, 0.4),
          inset -1px 0 0 rgba(113, 58, 0, 0.25);
        transform: translateZ(0);
        transition:
          transform 280ms cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1),
          filter 280ms cubic-bezier(0.22, 1, 0.36, 1);
        will-change: transform;
      }

      .kitchen-category-cta::after {
        position: absolute;
        top: 1px;
        bottom: 1px;
        left: 50%;
        z-index: -1;
        width: 42%;
        border-radius: inherit;
        background: radial-gradient(
          ellipse at center,
          rgba(255, 255, 214, 0.48) 0%,
          rgba(255, 238, 108, 0.22) 45%,
          transparent 78%
        );
        content: "";
        transform: translateX(-50%);
        pointer-events: none;
      }

      .kitchen-category-cta::before {
        position: absolute;
        top: 0;
        left: -55%;
        z-index: 2;
        width: 34%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.55),
          transparent
        );
        content: "";
        transform: skewX(-22deg);
        transition: left 650ms cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: none;
      }

      .kitchen-category-cta > span,
      .kitchen-category-cta > svg {
        position: relative;
        z-index: 3;
      }

      .kitchen-category-cta svg {
        width: 19px;
        height: 19px;
        color: #6b0712;
        stroke-width: 2.2;
        filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.25));
        transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .kitchen-category-cta:hover {
        transform: translateY(-3px);
        filter: brightness(1.06) saturate(1.06);
        box-shadow:
          0 19px 40px rgba(59, 4, 12, 0.34),
          0 0 20px rgba(255, 214, 45, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.82),
          inset 0 -2px 0 rgba(120, 65, 0, 0.32);
      }

      .kitchen-category-cta:hover::before {
        left: 125%;
      }

      .kitchen-category-cta:active {
        transform: translateY(-1px) scale(0.985);
        box-shadow:
          0 8px 20px rgba(59, 4, 12, 0.25),
          inset 0 2px 4px rgba(118, 62, 0, 0.22);
      }

      .kitchen-category-cta:focus-visible {
        outline: none;
        box-shadow:
          0 0 0 3px rgba(255, 214, 45, 0.35),
          0 0 0 6px rgba(122, 8, 24, 0.35),
          0 16px 36px rgba(59, 4, 12, 0.3);
      }

      .kitchen-slide.is-rtl .kitchen-category-cta:hover svg {
        transform: translateX(-4px);
      }

      .kitchen-slide.is-ltr .kitchen-category-cta:hover svg {
        transform: translateX(4px);
      }

      .kitchen-plate {
        position: relative;

        display: flex;
        align-items: center;
        justify-content: center;

        width: min(41vw, 600px);
        aspect-ratio: 1;

        border: 1px solid rgba(255, 214, 45, 0.55);
        border-radius: 50%;

        background: radial-gradient(
          circle at 42% 35%,
          #ffffff 0%,
          #fffaf0 45%,
          #f3d99f 70%,
          #a62a36 73%,
          #5a0912 78%
        );

        box-shadow:
          inset 0 0 0 12px rgba(255, 255, 255, 0.23),
          0 36px 76px rgba(49, 3, 9, 0.3);

        transform: translateZ(0);

        transition:
          transform 440ms cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 440ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .kitchen-plate:hover {
        transform: translateY(-6px) rotate(1.2deg);

        box-shadow:
          inset 0 0 0 12px rgba(255, 255, 255, 0.28),
          0 50px 96px rgba(49, 3, 9, 0.4);
      }

      .kitchen-plate-ring {
        position: absolute;

        border-radius: 50%;

        pointer-events: none;
      }

      .kitchen-plate-ring-one {
        inset: 7.5%;

        border: 1px solid rgba(124, 20, 34, 0.26);
      }

      .kitchen-plate-ring-two {
        inset: 14%;

        border: 1px dashed rgba(124, 20, 34, 0.21);
      }

      .kitchen-category-image {
        position: relative;
        z-index: 3;

        display: block;

        width: 78%;
        height: 78%;

        object-fit: contain;
        object-position: center;

        filter: drop-shadow(0 22px 24px rgba(63, 12, 7, 0.22));

        transform: translateZ(0) scale(0.94);

        transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);

        user-select: none;
      }

      .kitchen-plate:hover .kitchen-category-image {
        transform: translateZ(0) scale(1.01) rotate(-1deg);
      }

      .kitchen-plate-shadow {
        position: absolute;

        bottom: 3%;
        left: 50%;

        width: 62%;
        height: 13%;

        border-radius: 50%;

        background: rgba(55, 3, 10, 0.32);

        filter: blur(28px);

        transform: translateX(-50%);
      }

      .kitchen-pagination {
        position: absolute;
        top: 50%;
        left: clamp(22px, 2.8vw, 46px);
        z-index: 30;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 9px;
        transform: translateY(-50%);
      }

      .kitchen-pagination button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }

      .kitchen-pagination button > span {
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.5);
        transition:
          width 300ms ease,
          height 300ms ease,
          background-color 300ms ease,
          box-shadow 300ms ease;
      }

      .kitchen-pagination button.is-active > span {
        width: 7px;
        height: 30px;
        background: var(--kitchen-gold);
        box-shadow: 0 0 16px rgba(255, 214, 45, 0.58);
      }

      .kitchen-slider-controls {
        position: absolute;
        left: clamp(22px, 2.8vw, 46px);
        bottom: calc(28px + env(safe-area-inset-bottom));
        z-index: 30;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .kitchen-slider-controls > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        padding: 0;
        border: 1px solid rgba(255, 255, 255, 0.28);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.15);
        color: white;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(50, 3, 9, 0.16);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition:
          transform 240ms ease,
          border-color 240ms ease,
          background-color 240ms ease,
          color 240ms ease;
      }

      .kitchen-slider-controls > button:hover:not(:disabled) {
        transform: translateY(-2px);
        border-color: rgba(255, 214, 45, 0.68);
        background: rgba(255, 214, 45, 0.2);
        color: var(--kitchen-gold);
      }

      .kitchen-slider-controls > button:disabled {
        opacity: 0.32;
        cursor: not-allowed;
      }

      .kitchen-slider-controls svg {
        width: 20px;
        height: 20px;
      }

      .kitchen-wheel-hint {
        position: absolute;
        left: 50%;
        bottom: calc(30px + env(safe-area-inset-bottom));
        z-index: 24;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.66);
        pointer-events: none;
      }

      .kitchen-wheel-hint > span {
        position: relative;
        width: 20px;
        height: 32px;
        border: 1px solid rgba(255, 255, 255, 0.42);
        border-radius: 999px;
      }

      .kitchen-wheel-hint > span::after {
        position: absolute;
        top: 6px;
        left: 50%;
        width: 3px;
        height: 6px;
        border-radius: 999px;
        background: var(--kitchen-gold);
        content: "";
        transform: translateX(-50%);
        animation: kitchenWheel 1.8s ease-in-out infinite;
      }

      .kitchen-wheel-hint p {
        font-size: 10px;
      }

      @keyframes kitchenWheel {
        0% {
          opacity: 0;
          transform: translate3d(-50%, 0, 0);
        }
        35% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translate3d(-50%, 10px, 0);
        }
      }

      @media (max-width: 1100px) {
        .kitchen-slide-shell {
          grid-template-columns: minmax(300px, 0.88fr) minmax(0, 1.12fr);
          gap: 30px;
          padding-inline: 58px;
        }

        .kitchen-plate {
          width: min(39vw, 460px);
        }

        .kitchen-category-title {
          font-size: clamp(42px, 5vw, 64px);
        }
      }

      @media (max-width: 767px) {
        .kitchen-slide {
          background:
            radial-gradient(
              circle at 50% 18%,
              rgba(255, 214, 45, 0.16),
              transparent 31%
            ),
            radial-gradient(
              circle at 82% 76%,
              rgba(215, 25, 45, 0.2),
              transparent 38%
            ),
            linear-gradient(165deg, #8a1826 0%, #68101b 54%, #490810 100%);
        }

        .kitchen-slide-shell {
          grid-template-columns: minmax(0, 1fr);

          grid-template-rows:
            minmax(0, 1.08fr)
            auto;

          grid-template-areas:
            "visual"
            "content";

          gap: 0;

          padding: calc(76px + env(safe-area-inset-top)) 18px
            calc(82px + env(safe-area-inset-bottom));
        }

        .kitchen-slide-visual {
          align-self: stretch;

          display: flex;
          align-items: center;
          justify-content: center;

          height: auto;
          min-height: 0;

          transform: translate3d(-28px, 0, 0) scale(0.86);
        }

        .kitchen-slide.is-animated .kitchen-slide-visual {
          transform: translate3d(0, 0, 0) scale(1);

          transition-delay: 1050ms;
        }

        /* نفس الطبق القديم، لكن أكبر على الموبايل */
        .kitchen-plate {
          width: min(74vw, 370px);
          max-height: 40vh;
        }

        /* تكبير المنتج داخل الطبق قليلًا */
        .kitchen-category-image {
          width: 82%;
          height: 82%;

          transform: translateZ(0) scale(0.96);
        }

        .kitchen-plate:hover .kitchen-category-image {
          transform: translateZ(0) scale(1.01);
        }

        .kitchen-plate-shadow {
          bottom: 2%;

          width: 64%;
          height: 12%;

          background: rgba(55, 3, 10, 0.25);

          filter: blur(25px);
        }
        .kitchen-slide-content {
          align-self: end;
          width: 100%;
          max-width: 560px;
          margin-inline: auto;
          text-align: center;
        }

        .kitchen-kicker,
        .kitchen-category-cta {
          margin-inline: auto;
        }

        .kitchen-overline {
          margin-top: 12px;
          font-size: 11px;
        }

        .kitchen-kicker {
          padding: 6px 10px;
          font-size: 10px;
        }

        .kitchen-category-title {
          margin-top: 6px;
          font-size: clamp(31px, 9vw, 45px);
          line-height: 1.12;
        }

        .kitchen-title-line {
          width: 64px;
          height: 2px;
          margin: 10px auto 0;
        }

        .kitchen-category-description {
          max-width: 470px;
          margin: 12px auto 0;
          font-size: 13px;
          line-height: 1.7;
          -webkit-line-clamp: 2;
        }

        .kitchen-tags {
          justify-content: center;
          margin-top: 12px;
        }

        .kitchen-tags span {
          padding: 6px 9px;
          font-size: 9.5px;
        }

        .kitchen-category-cta {
          min-width: 182px;
          min-height: 48px;
          margin-top: 14px;
          padding: 10px 20px;
          border-radius: 11px;
          font-size: 12px;
          box-shadow:
            0 10px 23px rgba(59, 4, 12, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.68),
            inset 0 -2px 0 rgba(120, 65, 0, 0.25);
        }

        .kitchen-category-cta svg {
          width: 17px;
          height: 17px;
        }

        .kitchen-pagination {
          top: auto;
          right: auto;
          bottom: calc(17px + env(safe-area-inset-bottom));
          left: 50%;
          flex-direction: row;
          gap: 6px;
          transform: translateX(-50%);
        }

        .kitchen-pagination button.is-active > span {
          width: 26px;
          height: 6px;
        }

        .kitchen-slider-controls {
          right: 13px;
          bottom: calc(12px + env(safe-area-inset-bottom));
          left: auto;
          gap: 6px;
        }

        .kitchen-slider-controls > button {
          width: 38px;
          height: 38px;
        }

        .kitchen-slider-controls svg {
          width: 17px;
          height: 17px;
        }

        .kitchen-wheel-hint {
          display: none;
        }
      }

      @media (max-width: 767px) and (max-height: 700px) {
        .kitchen-slide-shell {
          grid-template-rows: minmax(0, 0.9fr) auto;
          padding-top: calc(70px + env(safe-area-inset-top));
          padding-bottom: calc(68px + env(safe-area-inset-bottom));
        }

        .kitchen-plate {
          width: min(62vw, 285px);
          max-height: 32vh;
        }

        .kitchen-category-image {
          width: 80%;
          height: 80%;
        }

        .kitchen-kicker {
          display: none;
        }

        .kitchen-overline {
          margin-top: 0;
        }

        .kitchen-category-title {
          font-size: clamp(27px, 8vw, 36px);
        }

        .kitchen-tags {
          display: none;
        }

        .kitchen-category-cta {
          margin-top: 10px;
        }
      }

      @media (min-width: 768px) and (max-height: 700px) {
        .kitchen-slide-shell {
          padding-top: calc(91px + env(safe-area-inset-top));
          padding-bottom: calc(50px + env(safe-area-inset-bottom));
        }

        .kitchen-slide-visual {
          height: min(57vh, 480px);
        }

        .kitchen-plate {
          width: min(34vw, 430px);
        }

        .kitchen-category-title {
          font-size: clamp(38px, 4.6vw, 58px);
        }

        .kitchen-overline {
          margin-top: 17px;
        }

        .kitchen-title-line {
          margin-top: 15px;
        }

        .kitchen-category-description {
          margin-top: 14px;
          font-size: 14px;
          -webkit-line-clamp: 2;
        }

        .kitchen-tags {
          margin-top: 15px;
        }

        .kitchen-category-cta {
          min-height: 44px;
          margin-top: 18px;
        }
      }

      @media (max-width: 950px) and (orientation: landscape) and (max-height: 600px) {
        .kitchen-slide-shell {
          grid-template-columns: minmax(0, 0.9fr) minmax(270px, 1.1fr);
          grid-template-rows: 1fr;
          grid-template-areas: "visual content";
          gap: 24px;
          padding: calc(67px + env(safe-area-inset-top)) 58px
            calc(40px + env(safe-area-inset-bottom));
        }

        .kitchen-slide-content {
          align-self: center;
          text-align: start;
        }

        .kitchen-kicker,
        .kitchen-category-cta {
          margin-inline: 0;
        }

        .kitchen-plate {
          width: min(36vw, 230px);
          max-height: 62vh;
        }

        .kitchen-category-title {
          font-size: clamp(28px, 5vw, 42px);
        }

        .kitchen-overline {
          margin-top: 9px;
        }

        .kitchen-title-line {
          margin-top: 9px;
        }

        .kitchen-category-description {
          margin-inline: 0;
          font-size: 11px;
        }

        .kitchen-tags {
          display: none;
        }

        .kitchen-category-cta {
          margin-top: 10px;
        }
      }

      @media (hover: none) {
        .kitchen-category-cta:hover,
        .kitchen-plate:hover {
          transform: none;
        }

        .kitchen-category-cta:hover::before {
          left: -55%;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .kitchen-preloader-ring,
        .kitchen-preloader-logo,
        .kitchen-steam,
        .kitchen-preloader-dots span,
        .kitchen-slide-visual,
        .kitchen-animate-text,
        .kitchen-category-cta,
        .kitchen-category-cta::before,
        .kitchen-category-cta svg,
        .kitchen-plate,
        .kitchen-category-image,
        .kitchen-pagination button > span,
        .kitchen-slider-controls > button {
          transition: none !important;
          animation: none !important;
        }

        .kitchen-slide.is-animated .kitchen-slide-visual,
        .kitchen-slide.is-animated .kitchen-animate-text {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }

        .kitchen-wheel-hint {
          display: none;
        }
      }
    `}</style>
  );
}

export default function KitchenPage() {
  const { local = "ar" } = useSelector((state) => state.language);

  const isAr = normalizeLocale(local) === "ar";

  const pageRef = useRef(null);
  const swiperRef = useRef(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelLockRef = useRef(false);
  const wheelUnlockTimerRef = useRef(null);
  const wheelResetTimerRef = useRef(null);

  const [rawCategories, setRawCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [pageReady, setPageReady] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const categories = useMemo(() => {
    const usedIds = new Set();

    return rawCategories
      .map((category) => {
        if (!category?.id || usedIds.has(category.id)) {
          return null;
        }

        const translation = getTranslation(
          category?.cooks_category_translations,
          local,
        );

        if (!translation) {
          return null;
        }

        const title = stripHtml(translation?.title);

        if (!title) {
          return null;
        }

        usedIds.add(category.id);

        return {
          id: category.id,
          title,
          description: stripHtml(translation?.description),
          image: getImageUrl(category?.image_url),
        };
      })
      .filter(Boolean);
  }, [local, rawCategories]);

  useSafeLayoutEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlStyle = html.style.cssText;
    const previousBodyStyle = body.style.cssText;

    const footerSelectors = [
      "footer",
      "#footer",
      ".footer",
      ".site-footer",
      "[data-footer]",
    ];

    const footerElements = Array.from(
      new Set(
        footerSelectors.flatMap((selector) =>
          Array.from(document.querySelectorAll(selector)),
        ),
      ),
    );

    const footerStyles = footerElements.map((element) => ({
      element,
      style: element.style.cssText,
    }));

    body.classList.add("kitchen-immersive-page");

    html.style.setProperty("overflow", "hidden", "important");
    body.style.setProperty("overflow", "hidden", "important");
    html.style.setProperty("overscroll-behavior", "none", "important");
    body.style.setProperty("overscroll-behavior", "none", "important");

    footerElements.forEach((element) => {
      element.style.setProperty("display", "none", "important");
      element.style.setProperty("visibility", "hidden", "important");
      element.style.setProperty("pointer-events", "none", "important");
    });

    return () => {
      body.classList.remove("kitchen-immersive-page");

      html.style.cssText = previousHtmlStyle;
      body.style.cssText = previousBodyStyle;

      footerStyles.forEach(({ element, style }) => {
        element.style.cssText = style;
      });
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      setDataLoading(true);
      setPageReady(false);
      setShowPreloader(true);
      setError(false);

      try {
        const response = await axios.get(CATEGORIES_URL);

        if (!mounted) {
          return;
        }

        setRawCategories(Array.isArray(response?.data) ? response.data : []);
      } catch {
        if (!mounted) {
          return;
        }

        setRawCategories([]);
        setError(true);
      } finally {
        if (mounted) {
          setDataLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, [retryKey]);

  useEffect(() => {
    if (dataLoading || typeof window === "undefined") {
      setPageReady(false);
      return undefined;
    }

    let cancelled = false;
    let completed = false;
    let revealTimer = null;
    let timeoutTimer = null;

    const startedAt = performance.now();

    const finish = () => {
      if (cancelled || completed) {
        return;
      }

      completed = true;

      const remaining = Math.max(
        0,
        PRELOADER_MIN_TIME - (performance.now() - startedAt),
      );

      revealTimer = window.setTimeout(() => {
        if (!cancelled) {
          setPageReady(true);
        }
      }, remaining);
    };

    if (error || categories.length === 0) {
      finish();

      return () => {
        cancelled = true;

        if (revealTimer !== null) {
          window.clearTimeout(revealTimer);
        }
      };
    }

    const image = new window.Image();

    image.decoding = "async";
    image.onload = finish;
    image.onerror = finish;
    image.src = categories[0].image;

    if (image.complete) {
      finish();
    }

    timeoutTimer = window.setTimeout(finish, FIRST_IMAGE_TIMEOUT);

    return () => {
      cancelled = true;

      image.onload = null;
      image.onerror = null;

      if (revealTimer !== null) {
        window.clearTimeout(revealTimer);
      }

      if (timeoutTimer !== null) {
        window.clearTimeout(timeoutTimer);
      }
    };
  }, [categories, dataLoading, error]);

  useEffect(() => {
    if (!pageReady) {
      setShowPreloader(true);
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setShowPreloader(false);
    }, 430);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pageReady]);

  useEffect(() => {
    setActiveIndex(0);
    swiperRef.current?.slideTo(0, 0);
  }, [local]);

  useEffect(() => {
    const node = pageRef.current;

    if (!node || categories.length === 0) {
      return undefined;
    }

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const swiper = swiperRef.current;

      if (!swiper || wheelLockRef.current || Math.abs(event.deltaY) < 1) {
        return;
      }

      if (
        wheelAccumulatorRef.current !== 0 &&
        Math.sign(wheelAccumulatorRef.current) !== Math.sign(event.deltaY)
      ) {
        wheelAccumulatorRef.current = 0;
      }

      wheelAccumulatorRef.current += event.deltaY;

      if (wheelResetTimerRef.current !== null) {
        window.clearTimeout(wheelResetTimerRef.current);
      }

      wheelResetTimerRef.current = window.setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 180);

      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_THRESHOLD) {
        return;
      }

      const shouldMoveNext = wheelAccumulatorRef.current > 0;

      wheelAccumulatorRef.current = 0;

      if (
        (shouldMoveNext && swiper.isEnd) ||
        (!shouldMoveNext && swiper.isBeginning)
      ) {
        return;
      }

      wheelLockRef.current = true;

      if (shouldMoveNext) {
        swiper.slideNext();
      } else {
        swiper.slidePrev();
      }

      wheelUnlockTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, SLIDE_SPEED + 180);
    };

    node.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      node.removeEventListener("wheel", handleWheel);

      if (wheelUnlockTimerRef.current !== null) {
        window.clearTimeout(wheelUnlockTimerRef.current);
      }

      if (wheelResetTimerRef.current !== null) {
        window.clearTimeout(wheelResetTimerRef.current);
      }
    };
  }, [categories.length]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const goToSlide = useCallback((index) => {
    if (index === swiperRef.current?.activeIndex) {
      return;
    }

    swiperRef.current?.slideTo(index);
  }, []);

  const goPrevious = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const animationReady = pageReady && !showPreloader;
  const hasContent = !error && categories.length > 0;

  return (
    <div className="kitchen-runtime-root">
      <SEO
        title={
          isAr
            ? "مطبخ سيدي هشام - وصفات وأفكار شهية"
            : "Sedi Hisham Kitchen - Delicious Recipes and Ideas"
        }
        description={
          isAr
            ? "اكتشف أقسام مطبخ سيدي هشام وأشهى الوصفات المحضرة بمكونات ومنتجات موثوقة."
            : "Explore Sedi Hisham kitchen categories and delicious recipes made with trusted ingredients and products."
        }
        keywords={
          isAr
            ? "مطبخ سيدي هشام, وصفات, معكرونة, أرز, معجنات, طبخ"
            : "Sedi Hisham kitchen, recipes, pasta, rice, pastries, cooking"
        }
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />

      {showPreloader && <KitchenPreloader isAr={isAr} leaving={pageReady} />}

      {!dataLoading && !hasContent ? (
        <KitchenError
          isAr={isAr}
          onRetry={() => setRetryKey((current) => current + 1)}
        />
      ) : (
        <main
          ref={pageRef}
          dir={isAr ? "rtl" : "ltr"}
          className={`kitchen-page ${isAr ? "is-rtl" : "is-ltr"}`}
          aria-busy={!animationReady}
        >
          <h1 className="sr-only">
            {isAr ? "أقسام مطبخ سيدي هشام" : "Sedi Hisham Kitchen Categories"}
          </h1>

          {categories.length > 0 && (
            <Swiper
              modules={[EffectFade, Keyboard, A11y]}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              direction="vertical"
              slidesPerView={1}
              speed={SLIDE_SPEED}
              threshold={12}
              resistanceRatio={0}
              followFinger={false}
              simulateTouch
              allowTouchMove
              preventInteractionOnTransition
              watchSlidesProgress
              observer
              observeParents
              keyboard={{
                enabled: true,
                onlyInViewport: false,
                pageUpDown: true,
              }}
              a11y={{
                enabled: true,
                prevSlideMessage: isAr ? "القسم السابق" : "Previous category",
                nextSlideMessage: isAr ? "القسم التالي" : "Next category",
                firstSlideMessage: isAr ? "أول قسم" : "First category",
                lastSlideMessage: isAr ? "آخر قسم" : "Last category",
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.activeIndex);
              }}
              onSlideChange={handleSlideChange}
              onSlideChangeTransitionStart={handleSlideChange}
              onSlideChangeTransitionEnd={() => {
                wheelLockRef.current = false;
              }}
              className="kitchen-swiper"
            >
              {categories.map((category, index) => (
                <SwiperSlide key={category.id}>
                  <KitchenSlide
                    category={category}
                    index={index}
                    isAr={isAr}
                    playAnimation={animationReady && activeIndex === index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {categories.length > 1 && (
            <>
              <nav
                className="kitchen-pagination"
                aria-label={
                  isAr
                    ? "التنقل بين أقسام المطبخ"
                    : "Kitchen category navigation"
                }
              >
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    aria-label={
                      isAr
                        ? `الانتقال إلى قسم ${category.title}`
                        : `Go to ${category.title}`
                    }
                    aria-current={activeIndex === index ? "true" : undefined}
                    className={activeIndex === index ? "is-active" : ""}
                  >
                    <span />
                  </button>
                ))}
              </nav>

              <div className="kitchen-slider-controls">
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={activeIndex === 0}
                  aria-label={isAr ? "القسم السابق" : "Previous category"}
                >
                  <ChevronUp aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeIndex === categories.length - 1}
                  aria-label={isAr ? "القسم التالي" : "Next category"}
                >
                  <ChevronDown aria-hidden="true" />
                </button>
              </div>

              <div className="kitchen-wheel-hint" aria-hidden="true">
                <span />
                <p>{isAr ? "مرر لاكتشاف المزيد" : "Scroll to explore"}</p>
              </div>
            </>
          )}
        </main>
      )}

      <KitchenStyles />
    </div>
  );
}
