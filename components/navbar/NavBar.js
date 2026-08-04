import { shouldUseTransparentHeader } from "@/components/common/headerMode";
import useHeaderScrolled from "@/hooks/useHeaderScrolled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import MenuIconDropDown from "../dropdowns/menu/MenuIconDropDown";
import SearchIconDropDown from "../dropdowns/search/SearchIconDropDown";
import UserIconDropDown from "../dropdowns/user_icon/UserIconDropDown";
import HeaderOption from "./HeaderOption";

const LEFT_NAV_ITEMS = [
  {
    href: "/job-application",
    ar: "شاركنا النجاح",
    en: "Join us",
  },
  {
    href: "/contactus",
    ar: "اتصل بنا",
    en: "Contact us",
  },
  {
    href: "/whoweare",
    ar: "من نحن",
    en: "About us",
  },
];

const RIGHT_NAV_ITEMS = [
  {
    href: "/categories",
    ar: "المنتجات",
    en: "Products",
  },
  {
    href: "/ketchen",
    ar: "المطبخ",
    en: "Kitchen",
  },
  {
    href: "/news",
    ar: "الأخبار",
    en: "News",
  },
];

const ALL_NAV_ITEMS = [...LEFT_NAV_ITEMS, ...RIGHT_NAV_ITEMS];

function normalizePath(asPath = "/") {
  const path = asPath.split(/[?#]/)[0];

  return path || "/";
}

function isPathActive(currentPath, href) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function getElementOffsetLeft(element, parent) {
  if (!element || !parent) {
    return 0;
  }

  let currentElement = element;
  let offsetLeft = 0;

  while (currentElement && currentElement !== parent) {
    offsetLeft += currentElement.offsetLeft;
    currentElement = currentElement.offsetParent;
  }

  if (currentElement === parent) {
    return offsetLeft;
  }

  const parentRect = parent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  return elementRect.left - parentRect.left;
}

function DesktopNavigation({ isAr, currentPath, variant, visible = true }) {
  const navigationRef = useRef(null);
  const linkRefs = useRef(new Map());

  const isFixed = variant === "fixed";

  const [indicator, setIndicator] = useState({
    x: 0,
    width: 0,
    visible: false,
  });

  const activeItem = ALL_NAV_ITEMS.find((item) =>
    isPathActive(currentPath, item.href),
  );

  const activeHref = activeItem?.href;

  const setLinkRef = useCallback((href, node) => {
    if (node) {
      linkRefs.current.set(href, node);
      return;
    }

    linkRefs.current.delete(href);
  }, []);

  const measureIndicator = useCallback(() => {
    const navigation = navigationRef.current;

    const activeLink = activeHref ? linkRefs.current.get(activeHref) : null;

    if (!navigation || !activeLink) {
      setIndicator((current) => {
        if (!current.visible) {
          return current;
        }

        return {
          ...current,
          visible: false,
        };
      });

      return;
    }

    const nextIndicator = {
      x: Math.round(getElementOffsetLeft(activeLink, navigation)),
      width: Math.round(activeLink.offsetWidth),
      visible: true,
    };

    setIndicator((current) => {
      const unchanged =
        current.x === nextIndicator.x &&
        current.width === nextIndicator.width &&
        current.visible === nextIndicator.visible;

      return unchanged ? current : nextIndicator;
    });
  }, [activeHref]);

  useEffect(() => {
    if (!visible) {
      setIndicator((current) => ({
        ...current,
        visible: false,
      }));

      return undefined;
    }

    let firstFrame = null;
    let secondFrame = null;
    let settleTimer = null;
    let resizeObserver = null;
    let cancelled = false;

    const scheduleMeasure = () => {
      if (firstFrame !== null) {
        cancelAnimationFrame(firstFrame);
      }

      if (secondFrame !== null) {
        cancelAnimationFrame(secondFrame);
      }

      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(measureIndicator);
      });
    };

    scheduleMeasure();

    settleTimer = window.setTimeout(measureIndicator, isFixed ? 560 : 120);

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(scheduleMeasure);

      if (navigationRef.current) {
        resizeObserver.observe(navigationRef.current);
      }

      const activeLink = activeHref ? linkRefs.current.get(activeHref) : null;

      if (activeLink) {
        resizeObserver.observe(activeLink);
      }
    }

    window.addEventListener("resize", scheduleMeasure, {
      passive: true,
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          scheduleMeasure();
        }
      });
    }

    return () => {
      cancelled = true;

      resizeObserver?.disconnect();

      window.removeEventListener("resize", scheduleMeasure);

      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }

      if (firstFrame !== null) {
        cancelAnimationFrame(firstFrame);
      }

      if (secondFrame !== null) {
        cancelAnimationFrame(secondFrame);
      }
    };
  }, [activeHref, isAr, isFixed, measureIndicator, variant, visible]);

  return (
    <div
      ref={navigationRef}
      dir="ltr"
      className={`relative grid h-full min-w-0 items-center transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isFixed
          ? "grid-cols-[minmax(0,1fr)_150px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_170px_minmax(0,1fr)]"
          : "grid-cols-[minmax(0,1fr)_195px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_238px_minmax(0,1fr)]"
      }`}
    >
      <nav
        dir={isAr ? "rtl" : "ltr"}
        aria-label={isAr ? "روابط معلومات الشركة" : "Company information"}
        className="grid h-full min-w-0 grid-cols-3 items-center justify-items-center gap-0"
      >
        {LEFT_NAV_ITEMS.map((item) => {
          const isActive = isPathActive(currentPath, item.href);

          return (
            <HeaderOption
              key={`${variant}-${item.href}`}
              ref={(node) => setLinkRef(item.href, node)}
              href={item.href}
              text={isAr ? item.ar : item.en}
              isAr={isAr}
              isActive={isActive}
              scrolled={isFixed}
            />
          );
        })}
      </nav>

      <div aria-hidden="true" />

      <nav
        dir={isAr ? "rtl" : "ltr"}
        aria-label={isAr ? "روابط أقسام الموقع" : "Website sections"}
        className="grid h-full min-w-0 grid-cols-3 items-center justify-items-center gap-0"
      >
        {RIGHT_NAV_ITEMS.map((item) => {
          const isActive = isPathActive(currentPath, item.href);

          return (
            <HeaderOption
              key={`${variant}-${item.href}`}
              ref={(node) => setLinkRef(item.href, node)}
              href={item.href}
              text={isAr ? item.ar : item.en}
              isAr={isAr}
              isActive={isActive}
              scrolled={isFixed}
            />
          );
        })}
      </nav>

      <span
        aria-hidden="true"
        style={{
          width: `${indicator.width}px`,
          transform: `translate3d(${indicator.x}px, 0, 0)`,
        }}
        className={`pointer-events-none absolute left-0 z-20 will-change-[transform,width] transition-[transform,width,opacity,bottom] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isFixed ? "bottom-[5px]" : "bottom-[7px]"
        } ${indicator.visible ? "opacity-100" : "opacity-0"}`}
      >
        <span className="absolute bottom-0 left-[14%] right-[14%] h-[2px] rounded-full bg-[#FFD62D] shadow-[0_0_10px_rgba(255,214,45,0.72)]" />

        <span className="absolute bottom-[-2px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rotate-45 rounded-[1px] bg-[#FFD62D] shadow-[0_0_12px_rgba(255,214,45,0.88)]" />
      </span>
    </div>
  );
}

function BrandLogo({ isAr, isHome, variant, priorityLogo = false }) {
  const isFixed = variant === "fixed";

  return (
    <Link
      href="/"
      aria-label={isAr ? "الرئيسية" : "Home"}
      aria-current={isHome ? "page" : undefined}
      className={`group pointer-events-auto absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform-gpu ${
        isFixed
          ? "h-[46px] w-[145px] lg:w-[160px]"
          : "h-[72px] w-[195px] lg:h-[78px] lg:w-[220px] xl:h-[82px] xl:w-[238px]"
      }`}
    >
      <Image
        alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
        src={logo}
        fill
        priority={priorityLogo}
        sizes={
          isFixed
            ? "(min-width: 1024px) 160px, 145px"
            : "(min-width: 1280px) 238px, (min-width: 1024px) 220px, 195px"
        }
        className={`object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 ${
          isFixed
            ? "drop-shadow-[0_5px_10px_rgba(30,0,5,0.35)]"
            : "scale-[1.02] drop-shadow-[0_7px_12px_rgba(28,0,5,0.38)]"
        }`}
        draggable={false}
      />
    </Link>
  );
}

function RightHeaderOrnament() {
  return (
    <div
      aria-hidden="true"
      className="sedi-header-ornament-shell pointer-events-none absolute right-0 top-[72px] z-[7] hidden w-[46%] max-w-[650px] overflow-visible lg:block xl:max-w-[700px]"
    >
      <div className="absolute right-0 top-5 h-[72%] w-[85%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(82,0,12,0.2)_0%,rgba(60,0,9,0.08)_44%,transparent_75%)] blur-2xl" />

      <img
        src="/images/header-gold-ornament-clean.svg"
        alt=""
        draggable={false}
        className="sedi-header-gold-ornament relative block h-auto w-full object-contain object-right-top drop-shadow-[0_10px_16px_rgba(24,0,4,0.28)]"
      />
    </div>
  );
}

function DesktopHeaderBar({
  isAr,
  currentPath,
  variant,
  transparentHeader = false,
  visible = true,
  priorityLogo = false,
}) {
  const isFixed = variant === "fixed";
  const isHome = currentPath === "/";
  const isTransparent = transparentHeader && !isFixed;

  return (
    <div
      dir="ltr"
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className={`pointer-events-auto relative isolate transform-gpu ${
        isFixed
          ? "mx-auto mt-2 h-[64px] w-[93%] max-w-[1380px] rounded-[20px] border border-white/25 bg-[#7C1422]/70 shadow-[0_16px_42px_rgba(44,0,7,0.28)] backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]"
          : isTransparent
            ? "h-[112px] w-full overflow-visible"
            : "h-[82px] w-full overflow-visible border-b border-[#FFD62D]/40 shadow-[0_12px_30px_rgba(34,0,5,0.24)]"
      }`}
    >
      {!isFixed && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute inset-0 ${
              isTransparent
                ? "bg-[linear-gradient(180deg,rgba(55,0,8,0.96)_0%,rgba(77,0,12,0.82)_38%,rgba(77,0,12,0.52)_64%,rgba(77,0,12,0.16)_86%,rgba(77,0,12,0)_100%)]"
                : "bg-[linear-gradient(112deg,#4A0006_0%,#72000D_22%,#980019_50%,#72000D_78%,#4A0006_100%)]"
            }`}
          />

          {!isTransparent && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(255,214,45,0.19),transparent_44%)]" />

              <div className="absolute inset-0 opacity-[0.052] [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_24px,#ffffff_25px,transparent_26px)]" />

              <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              <div className="sedi-static-header-sheen absolute inset-y-0 -left-[35%] w-[24%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            </>
          )}
        </div>
      )}

      {isFixed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[19px]"
        >
          <div className="absolute inset-0 bg-white/[0.045]" />

          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <div className="absolute -left-16 -top-24 h-48 w-48 rounded-full bg-white/[0.08] blur-3xl" />

          <div className="absolute -bottom-28 right-[8%] h-52 w-52 rounded-full bg-[#D40017]/10 blur-3xl" />
        </div>
      )}

      <div
        className={`relative mx-auto h-full w-full max-w-[1380px] ${
          isFixed
            ? "px-3 lg:px-4 xl:px-5"
            : isTransparent
              ? "px-5 pb-[30px] lg:px-8 xl:px-10"
              : "px-5 lg:px-8 xl:px-10"
        }`}
      >
        {isTransparent && <RightHeaderOrnament />}

        <div
          className={`relative z-10 grid h-full items-center ${
            isFixed
              ? "grid-cols-[92px_minmax(0,1fr)_92px] lg:grid-cols-[100px_minmax(0,1fr)_100px]"
              : "grid-cols-[104px_minmax(0,1fr)_104px] lg:grid-cols-[116px_minmax(0,1fr)_116px] xl:grid-cols-[124px_minmax(0,1fr)_124px]"
          }`}
        >
          <div
            aria-label={isAr ? "القائمة والحساب" : "Menu and account"}
            className={`relative z-30 flex shrink-0 items-center justify-start ${
              isFixed
                ? "sedi-fixed-header-actions gap-0.5 lg:gap-1"
                : "gap-1 lg:gap-1.5"
            }`}
          >
            <MenuIconDropDown />

            <UserIconDropDown />
          </div>
          <DesktopNavigation
            isAr={isAr}
            currentPath={currentPath}
            variant={variant}
            visible={visible}
          />
          <div
            aria-label={isAr ? "البحث وسلة التسوق" : "Search and cart"}
            className={`relative z-30 flex shrink-0 items-center justify-end ${
              isFixed
                ? "sedi-fixed-header-actions gap-0.5 lg:gap-1"
                : "gap-1 lg:gap-1.5"
            }`}
          >
            <SearchIconDropDown />
          </div>
        </div>

        <BrandLogo
          isAr={isAr}
          isHome={isHome}
          variant={variant}
          priorityLogo={priorityLogo}
        />
      </div>
    </div>
  );
}

export default function NavBar() {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const scrolled = useHeaderScrolled();

  const [hydrated, setHydrated] = useState(false);

  const isAr = local === "ar";

  const currentPath = normalizePath(router.asPath);

  const transparentHeader = shouldUseTransparentHeader(router.pathname);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <header
        className={`navbar sedi-static-header-enter z-[110] hidden w-full md:block ${
          transparentHeader ? "absolute inset-x-0 top-0" : "relative"
        }`}
      >
        <DesktopHeaderBar
          isAr={isAr}
          currentPath={currentPath}
          variant="static"
          transparentHeader={transparentHeader}
          visible
          priorityLogo
        />
      </header>

      {hydrated && (
        <header
          aria-hidden={!scrolled}
          className={`navbar fixed inset-x-0 top-0 z-[120] hidden transform-gpu transition-[transform,opacity,visibility,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${
            scrolled
              ? "visible translate-y-0 scale-100 opacity-100 blur-0"
              : "invisible -translate-y-[125%] scale-[0.97] opacity-0 blur-sm"
          } ${scrolled ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <DesktopHeaderBar
            isAr={isAr}
            currentPath={currentPath}
            variant="fixed"
            transparentHeader={false}
            visible={scrolled}
            priorityLogo={false}
          />
        </header>
      )}

      <style jsx global>{`
        @keyframes sediStaticHeaderEnter {
          from {
            opacity: 0;
            transform: translate3d(0, -28px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes sediStaticHeaderSheen {
          0% {
            transform: translate3d(0, 0, 0) skewX(-20deg);
            opacity: 0;
          }

          18% {
            opacity: 1;
          }

          65%,
          100% {
            transform: translate3d(680%, 0, 0) skewX(-20deg);
            opacity: 0;
          }
        }

        @keyframes sediHeaderOrnamentEnter {
          from {
            opacity: 0;
            transform: translate3d(36px, -10px, 0) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes sediHeaderOrnamentFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, 4px, 0);
          }
        }

        .sedi-static-header-enter {
          animation: sediStaticHeaderEnter 750ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .sedi-static-header-sheen {
          animation: sediStaticHeaderSheen 1650ms 420ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sedi-header-ornament-shell {
          transform-origin: right top;
          animation: sediHeaderOrnamentEnter 980ms 180ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .sedi-header-gold-ornament {
          animation: sediHeaderOrnamentFloat 8s 1.2s ease-in-out infinite;
        }

        .sedi-fixed-header-actions > button,
        .sedi-fixed-header-actions > a,
        .sedi-fixed-header-actions > div > button,
        .sedi-fixed-header-actions > div > a {
          width: 38px !important;
          height: 38px !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.94) !important;
          box-shadow: 0 5px 14px rgba(36, 0, 5, 0.14) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .sedi-fixed-header-actions > button:hover,
        .sedi-fixed-header-actions > a:hover,
        .sedi-fixed-header-actions > div > button:hover,
        .sedi-fixed-header-actions > div > a:hover {
          border-color: rgba(255, 214, 45, 0.42) !important;
          background: rgba(255, 255, 255, 0.16) !important;
          color: #ffd62d !important;
        }

        .sedi-fixed-header-actions svg {
          color: currentColor !important;
          stroke: currentColor !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .sedi-static-header-enter,
          .sedi-static-header-sheen,
          .sedi-header-ornament-shell,
          .sedi-header-gold-ornament {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
}
