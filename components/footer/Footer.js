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
import StyledBackground from "./StyledBackground";

function WheatDecoration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M108 246C104 187 109 118 151 35"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M116 211C87 202 67 182 55 154C84 160 106 179 116 211Z"
        fill="currentColor"
      />

      <path
        d="M122 184C151 174 170 154 181 126C152 133 131 153 122 184Z"
        fill="currentColor"
      />

      <path
        d="M126 157C98 148 79 128 68 101C96 107 117 126 126 157Z"
        fill="currentColor"
      />

      <path
        d="M134 130C161 120 179 100 188 74C161 81 142 100 134 130Z"
        fill="currentColor"
      />

      <path
        d="M141 102C117 93 101 76 92 52C116 58 133 76 141 102Z"
        fill="currentColor"
      />

      <path
        d="M151 72C170 63 182 48 188 29C169 35 156 49 151 72Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const { local } = useSelector((state) => state.language);
  const router = useRouter();

  const isRTL = local === "ar";
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      src: twitter,
      href: "https://twitter.com/Sedihisham1",
      label: isRTL ? "تويتر" : "Twitter",
    },
    {
      src: whatsapp,
      href: "https://api.whatsapp.com/send?phone=%2B963942000971&app=facebook&entry_point=page_cta&fbclid=IwAR23B41qgd7-Z89fxmv0wHhvHxM7dCCrp3qBZgzqyCPNUUaWq0zMHSC_kAQ",
      label: isRTL ? "واتساب" : "WhatsApp",
    },
    {
      src: instagram,
      href: "https://www.instagram.com/sedi_hisham/?hl=en",
      label: isRTL ? "إنستغرام" : "Instagram",
    },
    {
      src: facebook,
      href: "https://www.facebook.com/sedihishamm",
      label: isRTL ? "فيسبوك" : "Facebook",
    },
    {
      src: youtube,
      href: "https://www.youtube.com/channel/UCvkV77H68Fv28xn6jsYFjBw?app=desktop",
      label: isRTL ? "يوتيوب" : "YouTube",
    },
  ];

  return (
    <StyledBackground wave variant="footer" motion="soft" className="mt-40">
      <footer
        className="relative isolate w-full overflow-hidden bg-[#7C1422] text-white [font-family:var(--font-el-messiri)]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.01)_42%,rgba(72,4,16,0.28)_100%)]" />

        <WheatDecoration className="pointer-events-none absolute -bottom-16 -right-8 h-72 w-60 text-[#FFD62D]/[0.15]" />

        <WheatDecoration className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-56 -scale-x-100 text-[#FFD62D]/10" />

        <div className="relative z-10 mx-auto max-w-[1380px] px-6 pb-8 pt-10 md:px-12 md:pb-9 md:pt-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-12">
            <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-start">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white px-5 py-3 shadow-[0_12px_30px_rgba(55,0,12,0.16)]">
                <span className="absolute inset-x-5 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD62D] to-transparent" />

                <OptimizedImage
                  alt={isRTL ? "سيدي هشام" : "Sedi Hisham"}
                  src={Slogan}
                  height={80}
                  width={300}
                  wrapperClassName="flex items-center justify-center w-full"
                  className="mx-auto w-[235px] max-w-full object-contain sm:w-[260px] md:w-[275px]"
                />
              </div>

              <div className="h-[3px] w-14 rounded-full bg-[#FFD62D]" />
            </div>

            <div className="flex flex-col items-center gap-5 md:items-end">
              <p className="font-arabicMedium text-sm text-white/70">
                {isRTL ? "تابعونا على" : "Follow us"}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                {socialLinks.map((item) => (
                  <SocialMediaIcon
                    key={item.label}
                    src={item.src}
                    href={item.href}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid items-center gap-5 text-center md:grid-cols-3 md:gap-8">
            <p
              suppressHydrationWarning
              className="order-2 font-arabicLight text-[13px] leading-6 text-white/70 md:order-1 md:text-start"
            >
              {isRTL
                ? `جميع الحقوق محفوظة لشركة العقاد - سيدي هشام ${year}`
                : `All rights reserved - Al Akkad company - Sedi Hisham ${year}`}
            </p>

            <div className="order-1 flex justify-center md:order-2">
              <button
                type="button"
                onClick={() => router.push("/privacy-policy")}
                className="group relative font-arabicMedium text-sm text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D]/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#7C1422]"
              >
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}

                <span className="absolute -bottom-2 left-0 h-[2px] w-full origin-center scale-x-50 rounded-full bg-[#FFD62D] transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </div>

            <div className="order-3 flex justify-center md:justify-end">
              <a
                href="https://www.its.ae/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BigBang"
                className="inline-flex items-center rounded-full border border-white/20 bg-white px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFD62D]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD62D]/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#7C1422]"
              >
                <img
                  src="https://www.its.ae/wp-content/uploads/2020/05/bigbang-logo.svg"
                  alt="BigBang"
                  height={20}
                  width={80}
                  loading="lazy"
                  decoding="async"
                  className="h-[20px] w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </StyledBackground>
  );
}
