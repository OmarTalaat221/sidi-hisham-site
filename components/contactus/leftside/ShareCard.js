import { MailIcon, UserAddIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import facebook from "../../../public/images/facebook.svg";
import instagram from "../../../public/images/instagram.svg";
import twitter from "../../../public/images/twitter.svg";
import whatsapp from "../../../public/images/whatsapp.svg";

const SOCIAL_LINKS = [
  {
    name: "Twitter",
    icon: twitter,
    href: "https://twitter.com/sedihisham1",
  },
  {
    name: "WhatsApp",
    icon: whatsapp,
    href: "https://api.whatsapp.com/send?phone=%2B963942000971",
  },
  {
    name: "Instagram",
    icon: instagram,
    href: "https://www.instagram.com/sedi_hisham/?hl=en",
  },
  {
    name: "Facebook",
    icon: facebook,
    href: "https://www.facebook.com/sedihishamm",
  },
];

export default function ShareCard({ local }) {
  const isAr = local === "ar";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
          <UserAddIcon className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>

        <div className="min-w-0 text-start">
          <p className="text-[14px] font-bold text-primary">
            {isAr ? "انضم إلى سيدي هشام" : "Join Sedi Hisham"}
          </p>

          <Link
            href="/signup"
            className="mt-0.5 inline-block text-xs font-medium text-slate-500 transition-colors hover:text-primary"
          >
            {isAr ? "إنشاء حساب جديد" : "Create a new account"}
          </Link>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-start text-xs font-semibold text-slate-400">
          {isAr ? "تابعنا على مواقع التواصل" : "Follow us"}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white transition-colors duration-200 hover:border-primary hover:bg-primary/5"
            >
              <Image
                src={item.icon}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain"
              />
            </Link>
          ))}
        </div>

        <div className="my-4 h-px bg-slate-100" />

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
            <MailIcon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </span>

          <div className="min-w-0 text-start">
            <p className="text-xs font-semibold text-slate-400">
              {isAr ? "البريد الإلكتروني" : "Email addresses"}
            </p>

            <div className="mt-2 flex flex-col gap-1">
              <Link
                href="mailto:sales@sedihisham.com"
                className="break-all text-[13px] font-semibold text-primary hover:underline"
              >
                sales@sedihisham.com
              </Link>

              <Link
                href="mailto:info@sedihisham.com"
                className="break-all text-[13px] font-semibold text-primary hover:underline"
              >
                info@sedihisham.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
