import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Footer from "../footer/Footer";
import MobileN from "../mobileNav";
import NavBar from "../navbar/NavBar";
import SideNav from "../sideNav";

export default function Layout({ children }) {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  useEffect(() => {
    if (!document?.body) {
      return undefined;
    }

    document.body.classList.toggle("arVersion", isAr);

    return () => {
      document.body.classList.remove("arVersion");
    };
  }, [isAr]);

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={local === "en" ? "font-english" : "font-arabic"}
    >
      <NavBar />

      <MobileN />

      <SideNav />

      <main>{children}</main>

      {!router.pathname.startsWith("/cart") && <Footer />}
    </div>
  );
}
