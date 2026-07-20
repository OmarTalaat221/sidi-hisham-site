import OptimizedImage from "@/components/common/OptimizedImage";
import useHeaderScrolled from "@/hooks/useHeaderScrolled";
import {
  Briefcase,
  ChefHat,
  Headphones,
  Info,
  Newspaper,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import CartDropDown from "../dropdowns/cart/CartDropDown";
import MenuIconDropDown from "../dropdowns/menu/MenuIconDropDown";
import SearchIconDropDown from "../dropdowns/search/SearchIconDropDown";
import UserIconDropDown from "../dropdowns/user_icon/UserIconDropDown";
import HeaderOption from "./HeaderOption";

export default function NavBar() {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const scrolled = useHeaderScrolled();

  const isAr = local === "ar";
  const isHome = router.pathname === "/";

  return (
    <header className="navbar pointer-events-none fixed inset-x-0 top-0 z-[120] hidden md:block">
      <div
        dir="ltr"
        className={`pointer-events-auto relative mx-auto grid transform-gpu items-center border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "mt-3 h-[68px] w-[calc(100%-24px)] max-w-[1380px] grid-cols-[auto_minmax(0,1fr)_84px_minmax(0,1fr)_auto] gap-1.5 rounded-full border-white/15 bg-gradient-to-r from-[#4d0610]/95 via-[#8f0a1b]/95 to-[#4d0610]/95 px-3 shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:grid-cols-[auto_minmax(0,1fr)_96px_minmax(0,1fr)_auto]"
            : "mt-0 h-[94px] w-full grid-cols-[auto_minmax(0,1fr)_118px_minmax(0,1fr)_auto] gap-2 rounded-none border-x-0 border-t-0 border-b-white/15 bg-[linear-gradient(180deg,rgba(53,2,11,0.94)_0%,rgba(85,5,18,0.86)_62%,rgba(85,5,18,0.68)_100%)] px-5 shadow-[0_12px_38px_rgba(0,0,0,0.28)] backdrop-blur-xl"
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
            scrolled={scrolled}
          />

          <HeaderOption
            href="/contactus"
            text={isAr ? "اتصل بنا" : "Contact us"}
            Icon={Headphones}
            scrolled={scrolled}
          />

          <HeaderOption
            href="/whoweare"
            text={isAr ? "من نحن" : "About us"}
            Icon={Info}
            scrolled={scrolled}
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
            scrolled={scrolled}
          />

          <HeaderOption
            href="/ketchen"
            text={isAr ? "المطبخ" : "Kitchen"}
            Icon={ChefHat}
            scrolled={scrolled}
          />

          <HeaderOption
            href="/news"
            text={isAr ? "الأخبار" : "News"}
            Icon={Newspaper}
            scrolled={scrolled}
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
            className={`relative flex transform-gpu items-center justify-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              scrolled
                ? "h-[76px] w-[76px] rounded-full border-[3px] border-[#FFD62D] bg-white p-2 shadow-[0_16px_38px_rgba(0,0,0,0.26)]"
                : "h-[62px] w-[112px] rounded-none border border-transparent bg-transparent p-0 shadow-none"
            }`}
          >
            <OptimizedImage
              alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
              src={logo}
              fill
              priority
              showSkeleton={false}
              objectFit="contain"
              sizes={scrolled ? "76px" : "112px"}
            />
          </span>

          <span
            dir={isAr ? "rtl" : "ltr"}
            className={`absolute top-full whitespace-nowrap text-start font-arabicLight text-[11px] text-[#FFD62D] transition-all duration-500 ${
              scrolled && isHome
                ? "mt-1 translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}
          >
            {isAr ? "الرئيسية" : "Home"}
          </span>
        </Link>
      </div>
    </header>
  );
}
