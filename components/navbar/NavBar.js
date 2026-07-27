import useHeaderScrolled from "@/hooks/useHeaderScrolled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import CartDropDown from "../dropdowns/cart/CartDropDown";
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
      setIndicator((current) => {
        if (!current.visible) {
          return current;
        }

        return {
          ...current,
          visible: false,
        };
      });

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
          ? "grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_136px_minmax(0,1fr)]"
          : "grid-cols-[minmax(0,1fr)_138px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_158px_minmax(0,1fr)]"
      }`}
    >
      <nav
        dir={isAr ? "rtl" : "ltr"}
        aria-label={isAr ? "روابط معلومات الشركة" : "Company information"}
        className={`flex min-w-0 items-center justify-center ${
          isFixed ? "gap-0.5 lg:gap-2 xl:gap-4" : "gap-1 lg:gap-4 xl:gap-7"
        }`}
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
        className={`flex min-w-0 items-center justify-center ${
          isFixed ? "gap-0.5 lg:gap-2 xl:gap-4" : "gap-1 lg:gap-4 xl:gap-7"
        }`}
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
        <span className="absolute bottom-0 left-[14%] right-[14%] h-[2px] rounded-full bg-[#FFD62D] shadow-[0_0_10px_rgba(255,214,45,0.75)]" />

        <span className="absolute bottom-[-2px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rotate-45 rounded-[1px] bg-[#FFD62D] shadow-[0_0_12px_rgba(255,214,45,0.95)]" />
      </span>
    </div>
  );
}

function BrandCrest({ isAr, isHome, variant, priorityLogo = false }) {
  const isFixed = variant === "fixed";

  return (
    <Link
      href="/"
      aria-label={isAr ? "الرئيسية" : "Home"}
      aria-current={isHome ? "page" : undefined}
      className={`group pointer-events-auto absolute left-1/2 z-40 -translate-x-1/2 transform-gpu ${
        isFixed
          ? "top-[calc(50%+8px)] h-[92px] w-[108px] -translate-y-1/2"
          : "top-0 h-[118px] w-[138px] lg:w-[146px]"
      }`}
    >
      <span
        className={`absolute inset-0 overflow-hidden border-[#FFD62D] bg-[linear-gradient(180deg,#8E0013_0%,#65000C_48%,#410006_100%)] transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 ${
          isFixed
            ? "rounded-b-[46px] rounded-t-[14px] border shadow-[0_15px_32px_rgba(30,0,4,0.42),0_0_20px_rgba(255,214,45,0.22)]"
            : "rounded-b-[59px] border-x border-b shadow-[0_19px_38px_rgba(30,0,4,0.36)]"
        } ${
          isHome
            ? "shadow-[0_18px_38px_rgba(30,0,4,0.4),0_0_21px_rgba(255,214,45,0.25)]"
            : ""
        }`}
      >
        <span className="absolute inset-[6px] rounded-[inherit] border border-white/10" />

        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(255,255,255,0.18),transparent_44%)]" />

        <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD62D]/80 to-transparent" />
      </span>

      <span
        className={`absolute left-1/2 z-10 -translate-x-1/2 ${
          isFixed
            ? "top-[10px] h-[65px] w-[94px]"
            : "top-[12px] h-[80px] w-[120px] lg:w-[128px]"
        }`}
      >
        <Image
          alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
          src={logo}
          fill
          priority={priorityLogo}
          sizes={isFixed ? "94px" : "(min-width: 1024px) 128px, 120px"}
          className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)]"
          draggable={false}
        />
      </span>
    </Link>
  );
}

function DecorativeWave() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[34px] translate-y-full overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 34"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="staticHeaderWaveFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#560007" />

            <stop offset="50%" stopColor="#7C1422" />

            <stop offset="100%" stopColor="#560007" />
          </linearGradient>

          <linearGradient id="staticHeaderWaveLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD62D" stopOpacity="0" />

            <stop offset="18%" stopColor="#FFD62D" stopOpacity="0.7" />

            <stop offset="50%" stopColor="#FFD62D" />

            <stop offset="82%" stopColor="#FFD62D" stopOpacity="0.7" />

            <stop offset="100%" stopColor="#FFD62D" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="
            M0 0
            H390
            C425 0 433 10 468 10
            H610
            C660 10 671 32 720 32
            C769 32 780 10 830 10
            H972
            C1007 10 1015 0 1050 0
            H1440
            V0
            H0
            Z
          "
          fill="url(#staticHeaderWaveFill)"
        />

        <path
          d="
            M0 0
            H390
            C425 0 433 10 468 10
            H610
            C660 10 671 32 720 32
            C769 32 780 10 830 10
            H972
            C1007 10 1015 0 1050 0
            H1440
          "
          fill="none"
          stroke="url(#staticHeaderWaveLine)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          className="sedi-static-wave-line"
        />
      </svg>
    </div>
  );
}

function DesktopHeaderBar({
  isAr,
  currentPath,
  variant,
  visible = true,
  priorityLogo = false,
}) {
  const isFixed = variant === "fixed";
  const isHome = currentPath === "/";

  return (
    <div
      dir="ltr"
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className={`pointer-events-auto relative isolate transform-gpu overflow-visible border-[#FFD62D]/40 ${
        isFixed
          ? "mx-auto mt-2 h-[64px] w-[calc(100%_-_20px)] max-w-[1480px] rounded-[19px] border px-3 shadow-[0_18px_45px_rgba(34,0,5,0.34)] lg:px-5"
          : "h-[82px] w-full rounded-none border-x-0 border-t-0 border-b px-5 shadow-[0_12px_30px_rgba(34,0,5,0.24)] lg:px-8 xl:px-12"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 overflow-hidden ${
          isFixed ? "rounded-[18px]" : "rounded-none"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(112deg,#4A0006_0%,#72000D_22%,#980019_50%,#72000D_78%,#4A0006_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-30%,rgba(255,214,45,0.19),transparent_44%)]" />

        <div className="absolute inset-0 opacity-[0.052] [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_24px,#ffffff_25px,transparent_26px)]" />

        {!isFixed && (
          <div className="sedi-static-header-sheen absolute inset-y-0 -left-[35%] w-[24%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        )}

        <div className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFD62D] to-transparent ${
            isFixed ? "opacity-90" : "opacity-0"
          }`}
        />
      </div>

      {!isFixed && <DecorativeWave />}

      <div className="relative z-10 grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center">
        <div
          aria-label={isAr ? "القائمة والحساب" : "Menu and account"}
          className={`relative z-30 flex shrink-0 items-center justify-start ${
            isFixed ? "gap-0.5 lg:gap-1" : "gap-1 lg:gap-1.5"
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
            isFixed ? "gap-0.5 lg:gap-1" : "gap-1 lg:gap-1.5"
          }`}
        >
          <SearchIconDropDown />

          <CartDropDown />
        </div>
      </div>

      <BrandCrest
        isAr={isAr}
        isHome={isHome}
        variant={variant}
        priorityLogo={priorityLogo}
      />

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#FFD62D] blur-[11px] ${
          isFixed
            ? "-bottom-[21px] h-2 w-16 opacity-35"
            : "-bottom-[33px] h-2 w-20 opacity-50"
        }`}
      />
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

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <header className="navbar sedi-static-header-enter relative z-[110] hidden w-full md:block">
        <DesktopHeaderBar
          isAr={isAr}
          currentPath={currentPath}
          variant="static"
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

        @keyframes sediStaticWaveDraw {
          from {
            stroke-dasharray: 2200;
            stroke-dashoffset: 2200;
          }

          to {
            stroke-dasharray: 2200;
            stroke-dashoffset: 0;
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

        .sedi-static-wave-line {
          animation: sediStaticWaveDraw 1250ms 170ms
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .sedi-static-header-enter,
          .sedi-static-header-sheen,
          .sedi-static-wave-line {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
}
