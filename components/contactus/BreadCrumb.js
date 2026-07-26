import React from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from "@heroicons/react/solid";

export default function Breadcrumb({ local }) {
  const isAr = local === "ar";
  const Chevron = isAr ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 font-arabicMedium py-1">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#7c1422] transition-colors font-medium cursor-pointer"
      >
        <HomeIcon className="w-4 h-4 text-[#7c1422]" />
        <span>{isAr ? "الرئيسية" : "Home"}</span>
      </Link>
      
      <Chevron className="w-4 h-4 text-gray-400 shrink-0 mx-1" />

      <span className="text-[#7c1422] font-bold font-arabicBold">
        {isAr ? "اتصل بنا" : "Contact Us"}
      </span>
    </nav>
  );
}
