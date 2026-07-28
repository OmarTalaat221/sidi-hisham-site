export default function Button({
  text,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  isAr = false,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-[14px] font-bold text-white shadow-[0_10px_25px_rgba(0,117,48,0.16)] transition-all duration-200 hover:bg-[#7C1422] disabled:pointer-events-none disabled:opacity-50"
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <>
          <span>{text}</span>

          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`}
          >
            <path
              d="M4 10H16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M11 5L16 10L11 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      )}
    </button>
  );
}
