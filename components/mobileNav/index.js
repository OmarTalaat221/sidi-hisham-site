import { shouldUseTransparentHeader } from "@/components/common/headerMode";
import useHeaderScrolled from "@/hooks/useHeaderScrolled";
import { Dialog, Transition } from "@headlessui/react";
import {
  Briefcase,
  ChefHat,
  Headphones,
  Info,
  Menu,
  Newspaper,
  Package,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import MenuIconDropDown from "../dropdowns/menu/MenuIconDropDown";
import SearchIconDropDown from "../dropdowns/search/SearchIconDropDown";
import UserIconDropDown from "../dropdowns/user_icon/UserIconDropDown";

const NAV_ITEMS = [
  {
    href: "/job-application",
    ar: "شاركنا النجاح",
    en: "Join us",
    Icon: Briefcase,
  },
  {
    href: "/contactus",
    ar: "اتصل بنا",
    en: "Contact us",
    Icon: Headphones,
  },
  {
    href: "/whoweare",
    ar: "من نحن",
    en: "About us",
    Icon: Info,
  },
  {
    href: "/categories",
    ar: "المنتجات",
    en: "Products",
    Icon: Package,
  },
  {
    href: "/ketchen",
    ar: "المطبخ",
    en: "Kitchen",
    Icon: ChefHat,
  },
  {
    href: "/news",
    ar: "الأخبار",
    en: "News",
    Icon: Newspaper,
  },
];

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

const MobileMenuItem = memo(function MobileMenuItem({
  item,
  isAr,
  isActive,
  index,
  onNavigate,
}) {
  const Icon = item.Icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      style={{
        animationDelay: `${90 + index * 50}ms`,
        "--mobile-item-enter-x": isAr ? "14px" : "-14px",
      }}
      className={`mobile-sidebar-item group relative flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985] ${
        isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.045]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-3 w-[3px] rounded-full bg-[#FFD62D] shadow-[0_0_10px_rgba(255,214,45,0.55)] transition-[transform,opacity] duration-300 ${
          isAr ? "right-0" : "left-0"
        } ${
          isActive
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 group-hover:scale-y-75 group-hover:opacity-40"
        }`}
      />

      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 group-hover:-translate-y-[1px] ${
          isActive
            ? "bg-[#FFD62D]/12 text-[#FFD62D]"
            : "bg-white/[0.055] text-white/75 group-hover:bg-white/[0.08] group-hover:text-white"
        }`}
      >
        <Icon
          aria-hidden="true"
          className="h-[19px] w-[19px]"
          strokeWidth={1.8}
        />
      </span>

      <span
        className={`min-w-0 flex-1 truncate pt-[2px] text-[15px] font-semibold leading-6 transition-colors duration-300 ${
          isActive ? "text-[#FFD62D]" : "text-white/90 group-hover:text-white"
        }`}
      >
        {isAr ? item.ar : item.en}
      </span>

      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-[background-color,box-shadow,transform,opacity] duration-300 ${
          isActive
            ? "scale-100 bg-[#FFD62D] opacity-100 shadow-[0_0_8px_rgba(255,214,45,0.6)]"
            : "scale-75 bg-white/30 opacity-50 group-hover:scale-100 group-hover:bg-white/60"
        }`}
      />
    </Link>
  );
});

function MobileNav({ open, onClose, isAr, currentPath }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        dir={isAr ? "rtl" : "ltr"}
        className="relative z-[2147483647] md:hidden"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#180003]/75 backdrop-blur-[4px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            enterFrom={isAr ? "translate-x-full" : "-translate-x-full"}
            enterTo="translate-x-0"
            leave="transform transition duration-300 ease-[cubic-bezier(0.4,0,1,1)]"
            leaveFrom="translate-x-0"
            leaveTo={isAr ? "translate-x-full" : "-translate-x-full"}
          >
            <Dialog.Panel
              id="mobile-navigation-dialog"
              style={{
                insetInlineStart: 0,
                fontFamily: "var(--font-el-messiri)",
              }}
              className="absolute top-0 flex h-full w-[88%] max-w-[370px] flex-col overflow-hidden bg-[linear-gradient(180deg,#4A0006_0%,#72000D_42%,#520008_100%)] shadow-[0_0_70px_rgba(0,0,0,0.55)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_-18%,rgba(255,214,45,0.13),transparent_66%)]" />

                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#D40017]/10 blur-3xl" />
              </div>

              <div className="relative z-10 px-4 pb-4 pt-4">
                <div className="grid grid-cols-[44px_1fr_44px] items-start gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
                    className="group flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.065] text-white/80 transition-[background-color,color,transform] duration-300 active:scale-95 hover:rotate-90 hover:bg-white/10 hover:text-[#FFD62D]"
                  >
                    <X className="h-5 w-5" strokeWidth={2} />
                  </button>

                  <Link
                    href="/"
                    onClick={onClose}
                    aria-label={
                      isAr ? "الانتقال إلى الصفحة الرئيسية" : "Go to home page"
                    }
                    className="group relative mx-auto block h-[82px] w-[160px]"
                  >
                    <Image
                      alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
                      src={logo}
                      fill
                      sizes="160px"
                      className="object-contain drop-shadow-[0_7px_12px_rgba(0,0,0,0.32)] transition-transform duration-300 group-hover:scale-[1.025]"
                      draggable={false}
                    />
                  </Link>

                  <span aria-hidden="true" className="h-11 w-11" />
                </div>

                <div className="mt-3 text-center">
                  <Dialog.Title className="text-[18px] font-bold leading-7 text-white">
                    {isAr ? "استكشف الموقع" : "Explore"}
                  </Dialog.Title>

                  <p className="mt-0.5 text-[11px] leading-5 text-white/50">
                    {isAr
                      ? "انتقل إلى القسم الذي تريده"
                      : "Choose where you want to go"}
                  </p>
                </div>
              </div>

              <div className="relative z-10 mx-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <nav className="mobile-sidebar-scroll relative z-10 flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, index) => (
                    <MobileMenuItem
                      key={item.href}
                      item={item}
                      isAr={isAr}
                      index={index}
                      isActive={isPathActive(currentPath, item.href)}
                      onNavigate={onClose}
                    />
                  ))}
                </div>
              </nav>

              <div className="relative z-10 px-5 pb-6 pt-3">
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <p className="mt-4 text-center text-[11px] leading-5 text-white/45">
                  {isAr
                    ? "جودة ثابتة وطعم يعتمد عليه."
                    : "Consistent quality and taste."}
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

function MobileBrand({ isAr, variant, priorityLogo }) {
  const isStatic = variant === "static";

  return (
    <Link
      href="/"
      aria-label={isAr ? "الرئيسية" : "Home"}
      className={`group relative mx-1 block shrink-0 transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isStatic ? "h-[62px] w-[120px]" : "h-[47px] w-[92px]"
      }`}
    >
      <Image
        alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
        src={logo}
        fill
        priority={priorityLogo}
        sizes={isStatic ? "120px" : "92px"}
        className="object-contain drop-shadow-[0_5px_9px_rgba(0,0,0,0.32)] transition-transform duration-300 group-hover:scale-[1.025]"
        draggable={false}
      />
    </Link>
  );
}

function MobileActionButton({
  children,
  label,
  onClick,
  compact = false,
  expanded,
  controls,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D40017] text-white shadow-[0_7px_18px_rgba(34,0,5,0.32)] transition-[width,height,background-color,color,transform,box-shadow] duration-300 active:scale-95 hover:bg-[#E30720] hover:shadow-[0_9px_22px_rgba(34,0,5,0.42)] ${
        compact ? "h-9 w-9" : "h-10 w-10"
      }`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_62%)]" />

      <span className="relative z-10">{children}</span>
    </button>
  );
}

function MobileHeaderBar({
  isAr,
  transparentHeader = false,
  open,
  setOpen,
  variant = "static",
  priorityLogo = false,
}) {
  const isStatic = variant === "static";
  const isTransparent = isStatic && transparentHeader;

  return (
    <div
      dir="ltr"
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
      className={`pointer-events-auto relative mx-auto grid transform-gpu grid-cols-[1fr_auto_1fr] items-center transition-[height,width,margin-top,border-radius,padding,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isStatic
          ? isTransparent
            ? "h-[82px] w-full px-2.5 pb-3"
            : "h-[68px] w-full border-b border-[#FFD62D]/25 px-2.5 shadow-[0_10px_28px_rgba(35,0,5,0.27)]"
          : "mt-2 h-[57px] w-[calc(100%_-_14px)] rounded-[18px] px-2 shadow-[0_14px_34px_rgba(35,0,5,0.34)]"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 overflow-hidden ${
          isStatic ? "" : "rounded-[17px]"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isTransparent
              ? "bg-[linear-gradient(180deg,rgba(55,0,8,0.96)_0%,rgba(77,0,12,0.78)_42%,rgba(77,0,12,0.38)_70%,rgba(77,0,12,0)_100%)]"
              : "bg-[linear-gradient(112deg,#520007_0%,#7C1422_48%,#520007_100%)]"
          }`}
        />

        {!isTransparent && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,214,45,0.15),transparent_48%)]" />

            <div className="absolute inset-0 opacity-[0.04] [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_19px,#ffffff_20px,transparent_21px)]" />

            <div className="absolute inset-x-[8%] bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFD62D] to-transparent opacity-75" />
          </>
        )}
      </div>

      <div className="relative z-20 flex min-w-0 items-center justify-start gap-0.5">
        <MenuIconDropDown />

        <UserIconDropDown />
      </div>

      <MobileBrand isAr={isAr} variant={variant} priorityLogo={priorityLogo} />

      <div className="relative z-20 flex min-w-0 items-center justify-end gap-0.5">
        <SearchIconDropDown />

        <button
          type="button"
          aria-label={
            open
              ? isAr
                ? "إغلاق القائمة"
                : "Close menu"
              : isAr
                ? "فتح القائمة"
                : "Open menu"
          }
          aria-expanded={open}
          aria-controls="mobile-navigation-dialog"
          onClick={() => setOpen(true)}
          className={`group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#FFD62D]/35 bg-[#FFD62D]/[0.06] text-white shadow-[0_7px_18px_rgba(0,0,0,0.18)] transition-[width,height,border-color,background-color,color,transform] duration-300 active:scale-95 hover:border-[#FFD62D]/65 hover:bg-[#FFD62D]/10 hover:text-[#FFD62D] ${
            isStatic ? "h-10 w-10" : "h-9 w-9"
          }`}
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,214,45,0.13),transparent_65%)]" />

          <Menu
            className={`relative z-10 ${
              isStatic ? "h-5 w-5" : "h-[18px] w-[18px]"
            }`}
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}

export default function NavbarM() {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const scrolled = useHeaderScrolled();

  const isAr = local === "ar";

  const currentPath = normalizePath(router.asPath);

  const transparentHeader = shouldUseTransparentHeader(router.pathname);

  const closeNavigation = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  return (
    <>
      <div
        className={`z-[110] w-full md:hidden ${
          transparentHeader ? "absolute inset-x-0 top-0" : "relative h-[68px]"
        }`}
      >
        <MobileNav
          open={open}
          onClose={closeNavigation}
          isAr={isAr}
          currentPath={currentPath}
        />

        <MobileHeaderBar
          isAr={isAr}
          transparentHeader={transparentHeader}
          open={open}
          setOpen={setOpen}
          variant="static"
          priorityLogo
        />
      </div>

      {hydrated && (
        <nav
          aria-hidden={!scrolled}
          className={`fixed inset-x-0 top-0 z-[120] transform-gpu transition-[transform,opacity,visibility,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
            scrolled
              ? "visible translate-y-0 scale-100 opacity-100 blur-0"
              : "invisible -translate-y-[125%] scale-[0.97] opacity-0 blur-sm"
          } ${scrolled ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <MobileHeaderBar
            isAr={isAr}
            transparentHeader={false}
            open={open}
            setOpen={setOpen}
            variant="fixed"
            priorityLogo={false}
          />
        </nav>
      )}

      <style jsx global>{`
        @keyframes mobileSidebarItemEnter {
          from {
            opacity: 0;
            transform: translate3d(var(--mobile-item-enter-x), 8px, 0);
          }

          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .mobile-sidebar-item {
          opacity: 0;
          animation: mobileSidebarItemEnter 460ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        .mobile-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 214, 45, 0.4) transparent;
        }

        .mobile-sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .mobile-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-sidebar-scroll::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: rgba(255, 214, 45, 0.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-sidebar-item {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
}
