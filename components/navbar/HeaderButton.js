import { useEffect, useState } from "react";

export default function HeaderButton({
  as: Component = "button",
  Icon,
  onClick,
  sup = 0,
  label = "",
  open = false,
  className = "",
  iconClassName = "",
  ...props
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const numericCount = Number(sup);

  const count =
    Number.isFinite(numericCount) && numericCount > 0
      ? Math.floor(numericCount)
      : 0;

  const showBadge = mounted && count > 0;

  return (
    <Component
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-300 md:h-11 md:w-11 ${
        open
          ? "border-[#FFD62D]/70 bg-[#FFD62D]/15 text-[#FFD62D] ring-4 ring-[#FFD62D]/10"
          : "border-white/25 bg-[#500711]/75 hover:-translate-y-0.5 hover:border-[#FFD62D]/70 hover:bg-[#650914] hover:text-[#FFD62D]"
      } ${className}`}
      {...props}
    >
      {showBadge && (
        <span className="absolute -right-1 -top-1 z-20 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-[#620812] bg-[#FFD62D] px-1 text-[10px] font-bold leading-none text-[#72000c] shadow-md">
          {count > 99 ? "99+" : count}
        </span>
      )}

      {Icon && (
        <Icon
          aria-hidden="true"
          strokeWidth={2}
          className={`h-5 w-5 shrink-0 transition-all duration-300 md:h-[22px] md:w-[22px] ${iconClassName}`}
        />
      )}
    </Component>
  );
}
