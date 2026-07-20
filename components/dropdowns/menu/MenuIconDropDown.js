import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import catalog from "../../../public/catalog.svg";
import crypto from "../../../public/crypto.svg";
import language from "../../../public/language.svg";
import privacy from "../../../public/privacy.svg";
import { toggleCurrency, toggleLanguage } from "../../../redux/languageSlice";
import HeaderButton from "../../navbar/HeaderButton";
import CurrencyMenuOption from "./CurrencyMenuOption";
import LanguageMenuOption from "./LanguageMenu";
import MenuOption from "./MenuOption";

function MenuLinesIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}

export default function MenuIconDropDown() {
  const dispatch = useDispatch();

  const { local, currency } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [catalogPath, setCatalogPath] = useState("");

  useEffect(() => {
    let mounted = true;

    const getCatalog = async () => {
      try {
        const response = await axios.get(
          "https://api.sedihisham.com/pages/getall/home",
        );

        const items = Array.isArray(response?.data) ? response.data : [];

        const catalogItem = items.find(
          (item) => item?.categoryImage === "catalog" && item?.path_image,
        );

        if (mounted) {
          setCatalogPath(catalogItem?.path_image || "");
        }
      } catch (error) {
        console.error("Failed to load catalogue:", error);
      }
    };

    getCatalog();

    return () => {
      mounted = false;
    };
  }, []);

  const catalogUrl = useMemo(() => {
    if (!catalogPath) return "";

    if (catalogPath.startsWith("http")) {
      return catalogPath;
    }

    return `https://api.sedihisham.com/${catalogPath.replace(/^\/+/, "")}`;
  }, [catalogPath]);

  const handleLanguageChange = (event) => {
    dispatch(toggleLanguage(event.target.value));
  };

  const handleCurrencyChange = (event) => {
    dispatch(toggleCurrency(event.target.value));
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <HeaderButton
            as={Popover.Button}
            Icon={MenuLinesIcon}
            open={open}
            label={isAr ? "الإعدادات" : "Settings"}
            iconClassName="h-6 w-6"
          />

          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="translate-y-2 scale-95 opacity-0"
            enterTo="translate-y-0 scale-100 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="translate-y-0 scale-100 opacity-100"
            leaveTo="translate-y-2 scale-95 opacity-0"
          >
            <Popover.Panel
              dir={isAr ? "rtl" : "ltr"}
              className="absolute left-0 z-[220] mt-3 w-[min(290px,calc(100vw-24px))] origin-top-left overflow-hidden rounded-3xl border border-black/5 bg-white/95 p-2 shadow-[0_22px_65px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            >
              <div className="px-3 pb-2 pt-3">
                <p className="font-arabicMedium text-sm text-[#7F0008]">
                  {isAr ? "الإعدادات" : "Settings"}
                </p>

                <p className="mt-1 font-arabicLight text-xs text-gray-500">
                  {isAr
                    ? "تحكم في اللغة والعملة والروابط المهمة"
                    : "Language, currency and useful links"}
                </p>
              </div>

              <div className="my-1 h-px bg-gray-100" />

              <LanguageMenuOption
                name="locale"
                value={local}
                handleChange={handleLanguageChange}
                text={isAr ? "لغة الموقع" : "Language"}
                Icon={language}
              />

              <CurrencyMenuOption
                name="currency"
                text={isAr ? "العملة" : "Currency"}
                value={currency}
                handleChange={handleCurrencyChange}
                Icon={crypto}
              />

              <div className="my-1 h-px bg-gray-100" />

              <MenuOption
                text={isAr ? "كتالوج المنتجات" : "Products catalogue"}
                Icon={catalog}
                disabled={!catalogUrl}
                onClick={() => {
                  if (!catalogUrl) return;

                  window.open(catalogUrl, "_blank", "noopener,noreferrer");

                  close();
                }}
              />

              <MenuOption
                text={isAr ? "سياسة الخصوصية" : "Privacy policy"}
                Icon={privacy}
                onClick={() => {
                  window.location.href = "/privacy-policy";
                  close();
                }}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
