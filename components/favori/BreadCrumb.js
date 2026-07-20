import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Breadcrumb() {
  const { local } = useSelector((state) => state.language);
  return (
    <div>
      {/* {local === "ar" ? <Breadcrumbs>
      <Link
        href="#"
        className="opacity-60 text-[16px] text-green-600 tracking-wide  font-bold"
      >
        قائمة المفضلة
      </Link>
      <Link
        href="/"
        className="opacity-60 text-[16px] tracking-wide  font-bold"
      >
        الرئيسية
      </Link>
    </Breadcrumbs> :
    <Breadcrumbs>
    
    <Link
      href="/"
      className="opacity-60 text-[16px] tracking-wide  font-bold"
    >
      Home
    </Link><Link
      href="#"
      className="opacity-60 text-[16px] text-green-600 tracking-wide  font-bold"
    >
     Favorites
    </Link>
  </Breadcrumbs>
    } */}
    </div>
  );
}
