import useHeaderScrolled from "@/hooks/useHeaderScrolled";
import {
  Briefcase,
  ChefHat,
  Headphones,
  Info,
  Newspaper,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import CartDropDown from "../dropdowns/cart/CartDropDown";
import MenuIconDropDown from "../dropdowns/menu/MenuIconDropDown";
import SearchIconDropDown from "../dropdowns/search/SearchIconDropDown";
import UserIconDropDown from "../dropdowns/user_icon/UserIconDropDown";
import HeaderOption from "./HeaderOption";

function DesktopHeaderBar({
  isAr,
  isHome,
  variant = "static",
  priorityLogo = false,
}) {
  const isStatic = variant === "static";

  return (
    <div
      dir="ltr"
      className={`pointer-events-auto relative mx-auto grid transform-gpu items-center border bg-[#7C1422] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isStatic
          ? "h-[94px] w-full max-w-none grid-cols-[auto_minmax(0,1fr)_118px_minmax(0,1fr)_auto] gap-2 rounded-none border-x-0 border-t-0 border-b-white/15 px-5 shadow-[0_12px_38px_rgba(0,0,0,0.28)]"
          : "mt-3 h-[68px] w-[calc(100%-24px)] max-w-[1380px] grid-cols-[auto_minmax(0,1fr)_84px_minmax(0,1fr)_auto] gap-1.5 rounded-full border-white/15 px-3 shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:grid-cols-[auto_minmax(0,1fr)_96px_minmax(0,1fr)_auto]"
      }`}
    >
      <div className="z-20 flex shrink-0 items-center justify-start gap-1.5">
        <MenuIconDropDown />

        <UserIconDropDown />
      </div>

      <nav
        dir={isAr ? "rtl" : "ltr"}
        className="flex min-w-0 items-center justify-center gap-0.5 lg:gap-1 xl:gap-2"
      >
        <HeaderOption
          href="/job-application"
          text={isAr ? "شاركنا النجاح" : "Join us"}
          Icon={Briefcase}
          scrolled={!isStatic}
        />

        <HeaderOption
          href="/contactus"
          text={isAr ? "اتصل بنا" : "Contact us"}
          Icon={Headphones}
          scrolled={!isStatic}
        />

        <HeaderOption
          href="/whoweare"
          text={isAr ? "من نحن" : "About us"}
          Icon={Info}
          scrolled={!isStatic}
        />
      </nav>

      <div aria-hidden="true" />

      <nav
        dir={isAr ? "rtl" : "ltr"}
        className="flex min-w-0 items-center justify-center gap-0.5 lg:gap-1 xl:gap-2"
      >
        <HeaderOption
          href="/categories"
          text={isAr ? "المنتجات" : "Products"}
          Icon={Package}
          scrolled={!isStatic}
        />

        <HeaderOption
          href="/ketchen"
          text={isAr ? "المطبخ" : "Kitchen"}
          Icon={ChefHat}
          scrolled={!isStatic}
        />

        <HeaderOption
          href="/news"
          text={isAr ? "الأخبار" : "News"}
          Icon={Newspaper}
          scrolled={!isStatic}
        />
      </nav>

      <div className="z-20 flex shrink-0 items-center justify-end gap-1.5">
        <SearchIconDropDown />

        <CartDropDown />
      </div>

      <Link
        href="/"
        aria-label={isAr ? "الرئيسية" : "Home"}
        aria-current={isHome ? "page" : undefined}
        className="group absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      >
        <span
          className={`relative block transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isStatic
              ? "h-[62px] w-[112px]"
              : "h-[76px] w-[76px] overflow-hidden rounded-full border-[3px] border-[#FFD62D] bg-white p-2 shadow-[0_16px_38px_rgba(0,0,0,0.26)]"
          }`}
        >
          <Image
            alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
            src={logo}
            fill
            priority={priorityLogo}
            sizes={isStatic ? "112px" : "76px"}
            className="object-contain"
            draggable={false}
          />
        </span>

        <span
          dir={isAr ? "rtl" : "ltr"}
          className={`absolute top-full whitespace-nowrap text-start font-arabicLight text-[11px] text-[#FFD62D] transition-all duration-300 ${
            isStatic && isHome
              ? "mt-1 translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {isAr ? "الرئيسية" : "Home"}
        </span>
      </Link>
    </div>
  );
}

export default function NavBar() {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const scrolled = useHeaderScrolled();

  const [hydrated, setHydrated] = useState(false);

  const isAr = local === "ar";
  const isHome = router.pathname === "/";

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      <header className="navbar relative z-[110] hidden h-[94px] w-full md:block">
        <DesktopHeaderBar
          isAr={isAr}
          isHome={isHome}
          variant="static"
          priorityLogo
        />
      </header>

      {hydrated && (
        <header
          aria-hidden={!scrolled}
          className={`navbar fixed inset-x-0 top-0 z-[120] hidden transform-gpu transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${
            scrolled
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-[130%] opacity-0"
          } ${scrolled ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <DesktopHeaderBar
            isAr={isAr}
            isHome={isHome}
            variant="fixed"
            priorityLogo={false}
          />
        </header>
      )}
    </>
  );
}
