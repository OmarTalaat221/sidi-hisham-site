import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HeaderOption({ text, Icon, href }) {
  const router = useRouter();

  const isActive =
    href === "/"
      ? router.pathname === href
      : router.pathname === href || router.pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-2xl px-3 py-3 transition duration-300 ${
        isActive ? "bg-white/12" : "hover:bg-white/10"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10">
        <OptimizedImage alt={text} src={Icon} width={20} height={20} />
      </div>

      <div className="flex flex-1 items-center justify-between">
        <p
          className={`text-lg font-arabicLight tracking-wide transition duration-300 ${
            isActive ? "text-[#FFD62D]" : "text-white"
          }`}
        >
          {text}
        </p>

        <span
          className={`h-[2px] rounded-full bg-[#FFD62D] transition-all duration-300 ${
            isActive ? "w-8" : "w-0 group-hover:w-6"
          }`}
        />
      </div>
    </Link>
  );
}
