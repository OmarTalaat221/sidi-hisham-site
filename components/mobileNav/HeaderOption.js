import Link from "next/link";
import { forwardRef, memo } from "react";

const MobileHeaderOption = memo(
  forwardRef(function MobileHeaderOption(
    {
      text,
      description,
      Icon,
      href,
      isActive = false,
      ArrowIcon,
      onNavigate,
      index = 0,
    },
    ref,
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        style={{
          animationDelay: `${90 + index * 55}ms`,
        }}
        className={`mobile-nav-option group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-3 py-3.5 text-start transition-[border-color,background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.985] ${
          isActive
            ? "border-[#FFD62D]/40 bg-[#FFD62D]/10 shadow-[0_12px_28px_rgba(38,0,6,0.16)]"
            : "border-white/[0.08] bg-white/[0.045] hover:border-white/20 hover:bg-white/[0.09]"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-y-3 start-0 w-[3px] rounded-e-full bg-[#FFD62D] shadow-[0_0_12px_rgba(255,214,45,0.75)] transition-[transform,opacity] duration-300 ${
            isActive
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-0 group-hover:scale-y-75 group-hover:opacity-60"
          }`}
        />

        <span
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,color,transform] duration-300 group-hover:-translate-y-0.5 ${
            isActive
              ? "border-[#FFD62D]/50 bg-[#FFD62D]/10 text-[#FFD62D]"
              : "border-white/15 bg-white/[0.07] text-white group-hover:border-[#FFD62D]/35 group-hover:text-[#FFD62D]"
          }`}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />

          {isActive && (
            <span className="absolute inset-[-3px] rounded-full border border-[#FFD62D]/15" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block truncate font-semibold leading-6 transition-colors duration-300 ${
              isActive ? "text-[#FFD62D]" : "text-white group-hover:text-white"
            }`}
          >
            {text}
          </span>

          {description && (
            <span
              className={`mt-0.5 block truncate text-[11px] leading-5 transition-colors duration-300 ${
                isActive
                  ? "text-white/65"
                  : "text-white/45 group-hover:text-white/60"
              }`}
            >
              {description}
            </span>
          )}
        </span>

        <span
          className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[border-color,background-color,color,transform] duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${
            isActive
              ? "border-[#FFD62D] bg-[#FFD62D] text-[#7C1422]"
              : "border-white/10 bg-white/[0.05] text-white/45 group-hover:border-[#FFD62D]/30 group-hover:bg-white/10 group-hover:text-[#FFD62D]"
          }`}
        >
          <ArrowIcon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </span>

        <span
          aria-hidden="true"
          className={`absolute bottom-0 start-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#FFD62D] shadow-[0_0_9px_rgba(255,214,45,0.7)] transition-[width,opacity] duration-300 ${
            isActive
              ? "w-14 opacity-100"
              : "w-0 opacity-0 group-hover:w-10 group-hover:opacity-60"
          }`}
        />
      </Link>
    );
  }),
);

MobileHeaderOption.displayName = "MobileHeaderOption";

export default MobileHeaderOption;
