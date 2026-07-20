import OptimizedImage from "@/components/common/OptimizedImage";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import facebook from "../../public/images/facebook.svg";
import instagram from "../../public/images/instagram.svg";
import Slogan from "../../public/images/slogenG.png";
import twitter from "../../public/images/twitter.svg";
import whatsapp from "../../public/images/whatsapp.svg";
import youtube from "../../public/images/youtube.svg";
import SocialMediaIcon from "./SocialMediaIcon";

export default function Footer() {
  const { cart } = useSelector((state) => state.cart);
  const { local } = useSelector((state) => state.language);
  const router = useRouter();

  const isRTL = local === "ar";
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-40 w-full border-t-2 border-primary bg-[#fafafa] pb-8 pt-12"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* الجزء العلوي: اللوجو والسوشيال */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex justify-center">
            <OptimizedImage
              alt="سيدي هشام"
              src={Slogan}
              height={80}
              width={300}
              className="w-[240px] object-contain md:w-[280px]"
            />
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4">
            <SocialMediaIcon
              src={twitter}
              href="https://twitter.com/Sedihisham1"
            />
            <SocialMediaIcon
              src={whatsapp}
              href="https://api.whatsapp.com/send?phone=%2B963942000971&app=facebook&entry_point=page_cta&fbclid=IwAR23B41qgd7-Z89fxmv0wHhvHxM7dCCrp3qBZgzqyCPNUUaWq0zMHSC_kAQ"
            />
            <SocialMediaIcon
              src={instagram}
              href="https://www.instagram.com/sedi_hisham/?hl=en"
            />
            <SocialMediaIcon
              src={facebook}
              href="https://www.facebook.com/sedihishamm"
            />
            <SocialMediaIcon
              src={youtube}
              href="https://www.youtube.com/channel/UCvkV77H68Fv28xn6jsYFjBw?app=desktop"
            />
          </div>
        </div>

        {/* خط فاصل صريح وواقعي */}
        <div className="my-8 h-[1px] w-full bg-gray-200" />

        {/* الجزء السفلي: الحقوق، الروابط، والمطور */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* الحقوق */}
          <div className="order-2 flex-1 text-center md:order-1 md:text-start">
            <p className="font-arabicLight text-[13px] text-gray-500">
              {isRTL
                ? `جميع الحقوق محفوظة لشركة العقاد - سيدي هشام ${year}`
                : `All rights reserved - Al Akkad company - Sedi Hisham ${year}`}
            </p>
          </div>

          {/* سياسة الخصوصية */}
          <div className="order-1 flex flex-1 justify-center md:order-2">
            <button
              onClick={() => router.push("/privacy-policy")}
              className="group relative font-arabicMedium text-sm text-gray-700 transition-colors hover:text-primary"
            >
              {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              {/* خط ذهبي بيظهر على الـ Hover كـ Accent */}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          </div>

          {/* الشركة المطورة */}
          <div className="order-3 flex flex-1 justify-center md:justify-end">
            <a
              href="https://www.its.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3  transition-all duration-300 "
            >
              {/* <span className="font-arabicLight text-[11px] text-gray-400">
                {isRTL ? "تصميم وتطوير" : "Powered by"}
              </span> */}
              <img
                src="https://www.its.ae/wp-content/uploads/2020/05/bigbang-logo.svg"
                alt="BigBang"
                height={20}
                width={80}
                className="h-[20px] w-auto object-contain  transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
