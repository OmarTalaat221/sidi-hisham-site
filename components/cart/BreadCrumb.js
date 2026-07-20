import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Breadcrumb() {
  const { local } = useSelector((state) => state.language);
  return (
    <div>
      {/* {
      local === "ar"? 
      <Breadcrumbs>
      <Link
        href="/cart"
        className="opacity-60 text-[16px] tracking-wide text-green-700 font-bold"
      >
        محتويات السلة
      </Link>
      <Link
        href="#"
        className="opacity-60 text-[16px] tracking-wide  font-bold"
      >
        المنتجات
      </Link>
      <Link
        href="/"
        className="opacity-60 text-[16px] tracking-wide  font-bold"
      >
        الرئيسية
      </Link>
    </Breadcrumbs>
      :

      <Breadcrumbs>
       <Link
        href="/"
        className="opacity-60 text-[16px] tracking-wide  font-bold"
      >
        Home
      </Link>
      <Link
        href="/cart"
        className="opacity-60 text-[16px] tracking-wide text-green-700 font-bold"
      >
       Cart Content
      </Link>
      <Link
        href="#"
        className="opacity-60 text-[16px] tracking-wide  font-bold"
      >
        Products
      </Link>
     
    </Breadcrumbs>
    } */}
    </div>
  );
}
