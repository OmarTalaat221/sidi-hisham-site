import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Breadcrumb() {
  const { local } = useSelector((state) => state.language);
  return (
    <div>
      {/* {local === "ar" 
    ?
    <Breadcrumbs>
    <Link
      href="/cart"
      className={`opacity-60 text-[16px] tracking-wide  font-bold ${local === "ar" ? "order-3" : "order-1"}`}
    >
      {local === "ar" ?"محتويات المنتج" : "Cart content"}
    </Link>
    <Link
      href="/products"
      className="opacity-60 text-[16px] order-2 tracking-wide  font-bold"
    >
       {local === "ar" ?"المنتجات" : "Products"}
    </Link>
    <Link
      href="/"
      className={`opacity-60 text-[16px] tracking-wide  font-bold ${local === "ar" ? "order-1" : "order-3"}`}
    >
       {local === "ar" ?" الرئيسية" : "Home"}
    </Link>
  </Breadcrumbs>
    :
    <Breadcrumbs>
   <Link
      href="/"
      className={`opacity-60 text-[16px] tracking-wide  font-bold ${local === "ar" ? "order-1" : "order-3"}`}
    >
       {local === "ar" ?" الرئيسية" : "Home"}
    </Link>
    <Link
      href="/products"
      className="opacity-60 text-[16px] order-2 tracking-wide  font-bold"
    >
       {local === "ar" ?"المنتجات" : "Products"}
    </Link>
    <Link
      href="/cart"
      className={`opacity-60 text-[16px] tracking-wide  font-bold ${local === "ar" ? "order-3" : "order-1"}`}
    >
      {local === "ar" ?"محتويات المنتج" : "Cart content"}
    </Link>
   
  </Breadcrumbs>
    } */}
    </div>
  );
}
