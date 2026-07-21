import OptimizedImage from "@/components/common/OptimizedImage";
import useHeaderScrolled from "@/hooks/useHeaderScrolled";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  ChefHat,
  Headphones,
  Info,
  Menu,
  Newspaper,
  Package,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";
import CartDropDown from "../dropdowns/cart/CartDropDown";
import MenuIconDropDown from "../dropdowns/menu/MenuIconDropDown";
import SearchIconDropDown from "../dropdowns/search/SearchIconDropDown";
import UserIconDropDown from "../dropdowns/user_icon/UserIconDropDown";

function MobileNav({ open, setOpen }) {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const navItems = useMemo(
    () => [
      {
        href: "/job-application",
        text: isAr ? "شاركنا النجاح" : "Join us",
        description: isAr
          ? "انضم إلى فريق سيدي هشام"
          : "Join the Sedi Hisham team",
        Icon: Briefcase,
      },
      {
        href: "/contactus",
        text: isAr ? "اتصل بنا" : "Contact us",
        description: isAr ? "تواصل معنا مباشرة" : "Get in touch with us",
        Icon: Headphones,
      },
      {
        href: "/whoweare",
        text: isAr ? "من نحن" : "About us",
        description: isAr ? "تعرف على قصتنا" : "Discover our story",
        Icon: Info,
      },
      {
        href: "/categories",
        text: isAr ? "المنتجات" : "Products",
        description: isAr ? "استكشف جميع منتجاتنا" : "Explore all products",
        Icon: Package,
      },
      {
        href: "/ketchen",
        text: isAr ? "المطبخ" : "Kitchen",
        description: isAr ? "وصفات وأفكار مميزة" : "Recipes and ideas",
        Icon: ChefHat,
      },
      {
        href: "/news",
        text: isAr ? "الأخبار" : "News",
        description: isAr ? "تابع أحدث أخبارنا" : "Read our latest news",
        Icon: Newspaper,
      },
    ],
    [isAr],
  );

  const isItemActive = (href) => {
    if (href === "/") {
      return router.pathname === "/";
    }

    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        dir={isAr ? "rtl" : "ltr"}
        className="relative z-[10000000000]"
        onClose={setOpen}
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="transform transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            enterFrom={isAr ? "translate-x-full" : "-translate-x-full"}
            enterTo="translate-x-0"
            leave="transform transition duration-300 ease-in"
            leaveFrom="translate-x-0"
            leaveTo={isAr ? "translate-x-full" : "-translate-x-full"}
          >
            <Dialog.Panel
              style={{ insetInlineStart: 0 }}
              className="
                absolute top-0 flex h-full
                w-[88%] max-w-[390px]
                flex-col overflow-hidden
                bg-primary
                shadow-[0_0_80px_rgba(0,0,0,0.5)]
              "
            >
              <div className="border-b border-white/10 p-4">
                <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="relative h-14 w-28"
                  >
                    <OptimizedImage
                      alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
                      src={logo}
                      fill
                      priority
                      showSkeleton={false}
                      objectFit="contain"
                      sizes="112px"
                    />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-full border border-white/20
                      bg-white/10 text-white
                      transition duration-300
                      hover:rotate-90
                      hover:border-[#FFD62D]/70
                      hover:bg-white/20
                      hover:text-[#FFD62D]
                    "
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-5 text-start">
                  <Dialog.Title className="font-arabicMedium text-base text-[#FFD62D]">
                    {isAr ? "القائمة الرئيسية" : "Main navigation"}
                  </Dialog.Title>

                  <p className="mt-1 font-arabicLight text-xs text-white/55">
                    {isAr
                      ? "اختر الصفحة التي تريد الانتقال إليها"
                      : "Choose where you want to go"}
                  </p>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="flex flex-col items-stretch justify-start gap-2">
                  {navItems.map((item) => {
                    const active = isItemActive(item.href);
                    const Icon = item.Icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`group relative z-10 flex w-full cursor-pointer items-center justify-start gap-3 rounded-2xl border p-3 text-start transition duration-300 ${
                          active
                            ? "border-[#FFD62D]/35 bg-[#FFD62D]/10 shadow-[0_10px_25px_rgba(0,0,0,0.12)]"
                            : "border-transparent hover:border-white/15 hover:bg-white/10"
                        }`}
                      >
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition duration-300 ${
                            active
                              ? "border-[#FFD62D]/45 bg-[#FFD62D]/10 text-[#FFD62D]"
                              : "border-white/15 bg-white/10 text-white group-hover:border-[#FFD62D]/35 group-hover:text-[#FFD62D]"
                          }`}
                        >
                          <Icon
                            className="h-[22px] w-[22px]"
                            strokeWidth={1.9}
                          />
                        </span>

                        <span className="min-w-0 flex-1 text-start">
                          <span
                            className={`block font-arabicMedium text-[15px] transition ${
                              active ? "text-[#FFD62D]" : "text-white"
                            }`}
                          >
                            {item.text}
                          </span>

                          <span className="mt-1 block font-arabicLight text-xs text-white/50 transition group-hover:text-white/65">
                            {item.description}
                          </span>
                        </span>

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                            active
                              ? "bg-[#FFD62D] text-primary"
                              : "bg-white/5 text-white/45 group-hover:bg-white/15 group-hover:text-[#FFD62D]"
                          }`}
                        >
                          <ArrowIcon className="h-4 w-4" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-white/10 p-4">
                <p className="text-start font-arabicLight text-xs leading-5 text-white/45">
                  {isAr
                    ? "منتجات بجودة ثابتة وطعم يعتمد عليه."
                    : "Consistent quality and a taste you can trust."}
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

function MobileHeaderBar({
  isAr,
  open,
  setOpen,
  variant = "static",
  priorityLogo = false,
}) {
  const isStatic = variant === "static";

  return (
    <div
      dir="ltr"
      className={`pointer-events-auto relative mx-auto grid transform-gpu grid-cols-[1fr_auto_1fr] items-center border bg-[#7C1422] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isStatic
          ? `
            h-[78px] w-full max-w-none
            rounded-none
            border-x-0 border-t-0 border-b-white/15
            px-3
            shadow-[0_12px_35px_rgba(0,0,0,0.28)]
          `
          : `
            mt-2 h-[62px]
            w-[calc(100%-16px)]
            rounded-full
            border-white/15
            px-2
            shadow-[0_16px_40px_rgba(0,0,0,0.3)]
            backdrop-blur-xl
          `
      }`}
    >
      <div className="flex min-w-0 items-center justify-start gap-1">
        <MenuIconDropDown />

        <UserIconDropDown />
      </div>

      <Link
        href="/"
        aria-label={isAr ? "الرئيسية" : "Home"}
        className={`relative mx-1 transition-all duration-500 ${
          isStatic ? "h-12 w-[84px]" : "h-10 w-[66px]"
        }`}
      >
        <OptimizedImage
          alt={isAr ? "شعار سيدي هشام" : "Sedi Hisham logo"}
          src={logo}
          fill
          priority={priorityLogo}
          showSkeleton={false}
          objectFit="contain"
          sizes={isStatic ? "84px" : "66px"}
        />
      </Link>

      <div className="flex min-w-0 items-center justify-end gap-1">
        <SearchIconDropDown />

        <CartDropDown />

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
          onClick={() => setOpen(true)}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-full border border-white/25
            bg-white/10 text-white
            shadow-[0_8px_24px_rgba(0,0,0,0.22)]
            transition-all duration-300
            hover:border-[#FFD62D]/60
            hover:text-[#FFD62D]
          "
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default function NavbarM() {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const [open, setOpen] = useState(false);

  const scrolled = useHeaderScrolled();

  const isAr = local === "ar";

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  return (
    <>
      {/* الهيدر الأساسي: كامل عرض الموبايل */}
      <div className="relative z-[110] h-[78px] w-full md:hidden">
        <MobileNav open={open} setOpen={setOpen} />

        <MobileHeaderBar
          isAr={isAr}
          open={open}
          setOpen={setOpen}
          variant="static"
          priorityLogo
        />
      </div>

      {/* الهيدر الثابت: صغير ودائري */}
      <nav
        aria-hidden={!scrolled}
        className={`fixed inset-x-0 top-0 z-[120] transform-gpu transition-[transform,opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          scrolled
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-[130%] opacity-0"
        } ${scrolled ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <MobileHeaderBar
          isAr={isAr}
          open={open}
          setOpen={setOpen}
          variant="fixed"
          priorityLogo={false}
        />
      </nav>
    </>
  );
}
