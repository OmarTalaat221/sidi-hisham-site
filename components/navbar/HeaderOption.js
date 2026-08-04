import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, memo } from "react";
import { useSelector } from "react-redux";

function normalizePath(asPath = "/") {
  const path = asPath.split(/[?#]/)[0];

  return path || "/";
}

function isPathActive(currentPath, href) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function MobileHeaderOption({ text, Icon, href, onNavigate }) {
  const router = useRouter();

  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const currentPath = normalizePath(router.asPath);

  const isActive = isPathActive(currentPath, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      dir={isAr ? "rtl" : "ltr"}
      aria-current={isActive ? "page" : undefined}
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
        {Icon && (
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
        )}
      </span>

      <span
        className={`flex-1 text-start font-arabicLight text-[15px] transition-colors duration-300 ${
          isActive ? "text-[#FFD62D]" : "text-white group-hover:text-white"
        }`}
      >
        {text}
      </span>

      <span
        aria-hidden="true"
        className={`h-[2px] shrink-0 rounded-full bg-[#FFD62D] transition-all duration-300 ${
          isActive ? "w-7" : "w-0 group-hover:w-5"
        }`}
      />
    </Link>
  );
}

const DesktopHeaderOption = memo(
  forwardRef(function DesktopHeaderOption(
    { text, href, scrolled = false, isActive = false, isAr = false },
    ref,
  ) {
    const stateClasses = scrolled
      ? isActive
        ? "bg-white/15 text-[#FFD62D] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        : "text-white/90 hover:bg-white/10 hover:text-white"
      : isActive
        ? "text-[#FFD62D]"
        : "text-white/95 hover:text-[#FFD62D]";

    return (
      <Link
        ref={ref}
        href={href}
        dir={isAr ? "rtl" : "ltr"}
        aria-current={isActive ? "page" : undefined}
        className={`group relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap text-center font-semibold leading-none transition-[height,padding,color,background-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] ${
          scrolled
            ? "h-9 rounded-full px-2 text-[11px] lg:px-3 lg:text-[12px] xl:px-4 xl:text-[13px]"
            : "h-12 px-1.5 text-[11px] lg:px-3 lg:text-[14px] xl:px-5 xl:text-[15px]"
        } ${isAr ? "tracking-normal" : "tracking-[0.015em]"} ${stateClasses}`}
      >
        <span className="relative transform-gpu drop-shadow-[0_2px_5px_rgba(0,0,0,0.38)] transition-transform duration-300 group-hover:-translate-y-[1px]">
          {text}
        </span>
      </Link>
    );
  }),
);

DesktopHeaderOption.displayName = "DesktopHeaderOption";

const ConnectedDesktopHeaderOption = forwardRef(
  function ConnectedDesktopHeaderOption(props, ref) {
    const router = useRouter();

    const { local } = useSelector((state) => state.language);

    const isAr = local === "ar";

    const currentPath = normalizePath(router.asPath);

    const isActive = isPathActive(currentPath, props.href);

    return (
      <DesktopHeaderOption
        ref={ref}
        {...props}
        isAr={isAr}
        isActive={isActive}
      />
    );
  },
);

ConnectedDesktopHeaderOption.displayName = "ConnectedDesktopHeaderOption";

const HeaderOption = memo(
  forwardRef(function HeaderOption(
    { variant = "desktop", isActive, isAr, ...props },
    ref,
  ) {
    if (variant === "mobile") {
      return <MobileHeaderOption {...props} />;
    }

    const hasDesktopState =
      typeof isActive === "boolean" && typeof isAr === "boolean";

    if (!hasDesktopState) {
      return <ConnectedDesktopHeaderOption ref={ref} {...props} />;
    }

    return (
      <DesktopHeaderOption
        ref={ref}
        {...props}
        isActive={isActive}
        isAr={isAr}
      />
    );
  }),
);

HeaderOption.displayName = "HeaderOption";

export default HeaderOption;
