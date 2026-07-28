export default function Button({
  text,
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[52px] w-full items-center justify-center rounded-xl bg-primary px-6 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    >
      {text}
    </button>
  );
}
