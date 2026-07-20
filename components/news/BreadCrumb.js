import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NewsBreadcrumb({ title }) {
  const { local } = useSelector((state) => state.language);
  return (
    <div className="w-[80%] mx-auto flex justify-end">
      {local === "ar" ? (
        <Breadcrumbs className="">
          <Link
            href="#"
            className="opacity-60 text-[16px] tracking-wide  font-bold"
          >
            تفاصيل الخبر <sub> ({title})</sub>
          </Link>
          <Link
            href="/news"
            className="opacity-60 text-[16px] tracking-wide  font-bold"
          >
            الاخبار
          </Link>
          <Link
            href="/"
            className="opacity-60 text-[16px] tracking-wide  font-bold"
          >
            الرئيسية
          </Link>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs className="w-[80%] mx-auto flex justify-end">
          <Link
            href="/"
            className="opacity-60 text-[16px] tracking-wide  font-bold"
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="opacity-60 text-[16px] tracking-wide  font-bold"
          >
            News
          </Link>
          <Link
            href="#"
            className="opacity-60 text-[16px] tracking-wide text-green-700 font-bold"
          >
            News details
          </Link>
        </Breadcrumbs>
      )}
    </div>
  );
}
