import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  IoBagHandleOutline,
  IoCartOutline,
  IoChatbubbleEllipsesOutline,
  IoChevronDown,
  IoChevronUp,
  IoDocumentTextOutline,
  IoHeartOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import { useSelector } from "react-redux";

const API_BASE_URL = "https://api.sedihisham.com/";

function SideNavButton({
  href,
  label,
  Icon,
  badge = 0,
  external = false,
  disabled = false,
  accent = "burgundy",
  isRTL,
  onClick,
}) {
  const accentClasses = {
    burgundy: {
      icon: "text-[#75000B]",
      hover:
        "group-hover:bg-[#75000B]/90 group-hover:text-white group-hover:border-[#75000B]/40",
      badge: "bg-[#D40017]",
      glow: "group-hover:shadow-[0_0_20px_rgba(117,0,11,0.35)]",
    },
    red: {
      icon: "text-[#D40017]",
      hover:
        "group-hover:bg-[#D40017]/90 group-hover:text-white group-hover:border-[#D40017]/40",
      badge: "bg-[#D40017]",
      glow: "group-hover:shadow-[0_0_20px_rgba(212,0,23,0.35)]",
    },
    green: {
      icon: "text-[#008B25]",
      hover:
        "group-hover:bg-[#008B25]/90 group-hover:text-white group-hover:border-[#008B25]/40",
      badge: "bg-[#008B25]",
      glow: "group-hover:shadow-[0_0_20px_rgba(0,139,37,0.35)]",
    },
  };

  const selectedAccent = accentClasses[accent] || accentClasses.burgundy;

  const badgeValue = Number.isFinite(Number(badge)) ? Number(badge) : 0;

  const content = (
    <>
      <span
        className={`side-nav-label pointer-events-none absolute bottom-1/2 hidden translate-y-1/2 whitespace-nowrap rounded-xl border border-white/40 bg-white/30 px-3 py-2 font-arabicMedium text-xs text-[#460006] opacity-0 transition-all duration-200 group-hover:opacity-100 md:block ${
          isRTL
            ? "right-full mr-3 translate-x-2 group-hover:translate-x-0"
            : "left-full ml-3 -translate-x-2 group-hover:translate-x-0"
        }`}
      >
        {label}
      </span>

      <span
        className={`glass-icon-btn relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-white/20 transition-all duration-300 group-hover:-translate-y-0.5 sm:h-12 sm:w-12 lg:h-[54px] lg:w-[54px] ${selectedAccent.icon} ${selectedAccent.hover} ${selectedAccent.glow}`}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent opacity-70" />

        <Icon
          className="relative z-10 h-[22px] w-[22px] sm:h-6 sm:w-6"
          aria-hidden="true"
        />

        {badgeValue > 0 && (
          <span
            className={`absolute -top-1 z-20 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white/90 px-1 font-sans text-[10px] font-bold leading-none text-white ${selectedAccent.badge} ${
              isRTL ? "-left-1" : "-right-1"
            }`}
          >
            {badgeValue > 99 ? "99+" : badgeValue}
          </span>
        )}
      </span>
    </>
  );

  const sharedClassName = `
    group relative flex items-center justify-center
    rounded-2xl outline-none
    focus-visible:ring-2
    focus-visible:ring-[#FFD62D]
    focus-visible:ring-offset-2
    ${disabled ? "pointer-events-none opacity-40" : ""}
  `;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={sharedClassName}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={sharedClassName}
      onClick={onClick}
    >
      {content}
    </Link>
  );
}

const SideNav = () => {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const { cart } = useSelector((state) => state.cart);

  const { favorites } = useSelector((state) => state.favorites);

  const isRTL = local === "ar";

  const [sliderImages, setSliderImages] = useState([]);

  const [open, setOpen] = useState(false);

  const hasUserChangedStateRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const getSliderImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}pages/getall/home`);

        if (!isMounted) {
          return;
        }

        setSliderImages(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching side navigation data:", error);

        if (isMounted) {
          setSliderImages([]);
        }
      }
    };

    getSliderImages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");

    const setInitialState = () => {
      if (!hasUserChangedStateRef.current) {
        setOpen(desktopMedia.matches);
      }
    };

    setInitialState();

    const handleBreakpointChange = () => {
      if (!hasUserChangedStateRef.current) {
        setOpen(desktopMedia.matches);
      }
    };

    desktopMedia.addEventListener("change", handleBreakpointChange);

    return () => {
      desktopMedia.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const catalogUrl = useMemo(() => {
    const catalogPath = sliderImages.find(
      (item) => item?.categoryImage === "catalog",
    )?.path_image;

    if (!catalogPath || typeof catalogPath !== "string") {
      return "";
    }

    if (
      catalogPath.startsWith("http://") ||
      catalogPath.startsWith("https://")
    ) {
      return catalogPath;
    }

    return `${API_BASE_URL}${catalogPath.replace(/^\/+/, "")}`;
  }, [sliderImages]);

  const cartCount = Array.isArray(cart) ? cart.length : 0;

  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;

  const isContactPage = router.pathname === "/contact";

  const closeOnMobile = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const handleToggle = () => {
    hasUserChangedStateRef.current = true;

    setOpen((previous) => !previous);
  };

  const navItems = [
    {
      key: "catalog",
      href: catalogUrl || "#",
      label: isRTL ? "كتالوج المنتجات" : "Product catalogue",
      Icon: IoDocumentTextOutline,
      accent: "red",
      external: true,
      disabled: !catalogUrl,
    },
    {
      key: "products",
      href: "/categories",
      label: isRTL ? "المنتجات" : "Products",
      Icon: IoBagHandleOutline,
      accent: "green",
    },
    {
      key: "cart",
      href: "/cart",
      label: isRTL ? "سلة التسوق" : "Shopping cart",
      Icon: IoCartOutline,
      accent: "green",
      badge: cartCount,
    },
    {
      key: "favorites",
      href: "/favori",
      label: isRTL ? "المفضلة" : "Favorites",
      Icon: IoHeartOutline,
      accent: "red",
      badge: favoritesCount,
    },
    isContactPage
      ? {
          key: "whatsapp",
          href: "https://api.whatsapp.com/send?phone=%2B963942000971&app=facebook&entry_point=page_cta",
          label: isRTL ? "تواصل عبر واتساب" : "Contact by WhatsApp",
          Icon: IoLogoWhatsapp,
          accent: "green",
          external: true,
        }
      : {
          key: "contact",
          href: "/contact",
          label: isRTL ? "تواصل معنا" : "Contact us",
          Icon: IoChatbubbleEllipsesOutline,
          accent: "burgundy",
        },
  ];

  return (
    <aside
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={isRTL ? "الروابط السريعة" : "Quick links"}
      className={`side-navigation fixed z-[900] ${
        isRTL ? "right-3 sm:right-4 lg:right-6" : "left-3 sm:left-4 lg:left-6"
      } bottom-3 sm:bottom-4 lg:bottom-6`}
    >
      <div className="relative flex flex-col items-center">
        <nav
          aria-hidden={!open}
          className={`side-navigation-menu relative mb-2 flex max-h-[calc(100svh-110px)] flex-col-reverse items-center gap-2 overflow-visible rounded-[24px] border border-white/40 bg-white/15 p-2 transition-all duration-300 sm:mb-3 sm:gap-2.5 sm:p-2.5 ${
            open
              ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
              : "translate-y-4 scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-[40%] rounded-t-[24px] bg-gradient-to-b from-white/40 to-transparent" />
          <span className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/30" />

          {navItems
            .slice()
            .reverse()
            .map((item, index) => (
              <div
                key={item.key}
                className="side-navigation-item relative z-10"
                style={{
                  transitionDelay: open ? `${index * 45}ms` : "0ms",
                }}
              >
                <SideNavButton
                  {...item}
                  isRTL={isRTL}
                  onClick={closeOnMobile}
                />
              </div>
            ))}
        </nav>

        <button
          type="button"
          onClick={handleToggle}
          aria-label={
            open
              ? isRTL
                ? "إغلاق الروابط السريعة"
                : "Close quick links"
              : isRTL
                ? "فتح الروابط السريعة"
                : "Open quick links"
          }
          aria-expanded={open}
          className="side-navigation-toggle group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-primary/80 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D] sm:h-[54px] sm:w-[54px]"
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />

          <span
            className={`absolute inset-[5px] rounded-[13px] border border-white/30 transition-colors duration-300 group-hover:border-white/50`}
          />

          {open ? (
            <IoChevronDown
              className="relative z-10 h-6 w-6 transition-transform duration-300"
              aria-hidden="true"
            />
          ) : (
            <IoChevronUp
              className="relative z-10 h-6 w-6 transition-transform duration-300"
              aria-hidden="true"
            />
          )}

          {(cartCount > 0 || favoritesCount > 0) && !open && (
            <span className="absolute -top-1 -end-1 z-20 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white/90 bg-[#D40017] px-1 font-sans text-[10px] font-bold leading-none text-white">
              {cartCount + favoritesCount > 99
                ? "99+"
                : cartCount + favoritesCount}
            </span>
          )}
        </button>
      </div>

      <style jsx global>{`
        .side-navigation,
        .side-navigation *,
        .side-navigation *::before,
        .side-navigation *::after {
          box-sizing: border-box;
        }

        .side-navigation {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }

        .side-navigation-menu {
          box-shadow:
            0 20px 45px -12px rgba(62, 0, 7, 0.25),
            0 8px 20px -8px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1);
        }

        .side-navigation-toggle {
          box-shadow:
            0 14px 35px -10px rgba(62, 0, 7, 0.28),
            0 4px 12px -4px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.65),
            inset 0 -1px 0 rgba(255, 255, 255, 0.15);
        }

        .glass-icon-btn {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            0 4px 12px -4px rgba(0, 0, 0, 0.08);
        }

        .side-nav-label {
          z-index: 1000;
          box-shadow:
            0 10px 30px -8px rgba(62, 0, 7, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .side-navigation-menu {
          transform-origin: bottom center;
        }

        .side-navigation-item {
          transform: translateY(0);
          opacity: 1;
          transition:
            transform 0.3s ease,
            opacity 0.3s ease;
        }

        .side-navigation-menu[aria-hidden="true"] .side-navigation-item {
          transform: translateY(8px);
          opacity: 0;
        }

        @supports not (backdrop-filter: blur(1px)) {
          .side-navigation-menu,
          .side-navigation-toggle,
          .glass-icon-btn,
          .side-nav-label {
            background-color: rgba(255, 255, 255, 0.85) !important;
          }
        }

        @media (max-width: 479px) {
          .side-navigation {
            right: auto;
            left: 50%;
            bottom: calc(10px + env(safe-area-inset-bottom, 0px));
            transform: translateX(-50%);
          }

          [dir="rtl"] .side-navigation,
          [dir="ltr"] .side-navigation {
            right: auto !important;
            left: 50% !important;
          }

          .side-navigation-menu {
            position: absolute;
            bottom: calc(100% + 8px);
            left: 50%;
            display: grid;
            width: max-content;
            max-width: calc(100vw - 24px);
            grid-template-columns: repeat(3, minmax(0, 1fr));
            transform-origin: bottom center;
          }

          .side-navigation-menu.translate-y-0 {
            transform: translateX(-50%) translateY(0) scale(1);
          }

          .side-navigation-menu.translate-y-4 {
            transform: translateX(-50%) translateY(16px) scale(0.95);
          }

          .side-navigation-menu .side-navigation-item {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (min-width: 480px) {
          .side-navigation-menu {
            position: relative;
          }
        }

        @media (max-height: 560px) and (min-width: 480px) {
          .side-navigation-menu {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .side-navigation *,
          .side-navigation *::before,
          .side-navigation *::after {
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default SideNav;
