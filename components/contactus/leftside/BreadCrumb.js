import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";

export default function Breadcrumb({ step }) {
  return (
    <Breadcrumbs>
      {/* <Link
        href="/cart"
        className="opacity-60 text-[16px] tracking-wide text-green-700 font-arabicMedium"
      >
        {step}
      </Link>
      <Link
        href="#"
        className="opacity-60 text-[16px] tracking-wide  font-arabicMedium"
      >
        المنتجات
      </Link>
      <Link
        href="/"
        className="opacity-60 text-[16px] tracking-wide  font-arabicMedium"
      >
        الرئيسية
      </Link> */}
    </Breadcrumbs>
  );
}
