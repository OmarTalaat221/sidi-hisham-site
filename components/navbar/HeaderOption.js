import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function HeaderOption({
  text,
  Icon,
  href,
  variant = "desktop",
  scrolled = false,
  onNavigate,
}) {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const isActive =
    href === "/"
      ? router.pathname === "/"
      : router.pathname === href || router.pathname.startsWith(`${href}/`);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        dir={isAr ? "rtl" : "ltr"}
        className={`group flex w-full items-center justify-start gap-3 rounded-2xl border px-3 py-3 transition-all duration-300 ${
          isActive
            ? "border-[#FFD62D]/30 bg-[#FFD62D]/10"
            : "border-transparent hover:border-white/10 hover:bg-white/10"
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isActive
              ? "border-[#FFD62D]/50 bg-[#FFD62D]/10 text-[#FFD62D]"
              : "border-white/15 bg-white/10 text-white group-hover:border-[#FFD62D]/40 group-hover:text-[#FFD62D]"
          }`}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
        </span>

        <span
          className={`flex-1 text-start font-arabicLight text-[15px] transition-colors duration-300 ${
            isActive ? "text-[#FFD62D]" : "text-white group-hover:text-white"
          }`}
        >
          {text}
        </span>

        <span
          className={`h-[2px] shrink-0 rounded-full bg-[#FFD62D] transition-all duration-300 ${
            isActive ? "w-7" : "w-0 group-hover:w-5"
          }`}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      dir={isAr ? "rtl" : "ltr"}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex shrink-0 flex-col items-center justify-center rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "h-11 w-11 border-transparent bg-transparent px-1 hover:bg-white/10 lg:min-w-[62px] xl:min-w-[80px]"
          : "h-14 w-11 border-transparent bg-transparent px-1 hover:border-white/15 hover:bg-white/10 lg:min-w-[82px] xl:min-w-[96px]"
      } ${
        isActive
          ? "border-[#FFD62D]/20 bg-[#FFD62D]/10 text-[#FFD62D]"
          : "text-white"
      }`}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.9}
        className={`shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] transition-all duration-500 ${
          scrolled ? "h-[19px] w-[19px]" : "h-[22px] w-[22px]"
        }`}
      />

      <span
        className={`w-full whitespace-nowrap text-center font-arabicLight drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)] transition-all duration-500 ${
          scrolled
            ? "hidden text-[10px] xl:mt-1 xl:block xl:text-[11px]"
            : "hidden text-[11px] lg:mt-1 lg:block"
        } ${
          isActive ? "text-[#FFD62D]" : "text-white/95 group-hover:text-white"
        }`}
      >
        {text}
      </span>

      <span
        className={`absolute bottom-0.5 h-[2px] rounded-full bg-[#FFD62D] transition-all duration-300 ${
          isActive ? "w-6" : "w-0 group-hover:w-5"
        }`}
      />
    </Link>
  );
}
