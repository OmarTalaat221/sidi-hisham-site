export default function InfoCard({
  Icon,
  title,
  desc,
  loading = false,
  emptyText = "Not available",
}) {
  return (
    <article className="flex min-h-[108px] items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-primary/30 sm:gap-4 sm:p-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>

      <div className="min-w-0 text-start">
        <p className="text-[11px] font-semibold text-slate-400 sm:text-xs">
          {title}
        </p>

        {loading ? (
          <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-100" />
        ) : (
          <p
            dir="ltr"
            className="mt-1 break-words text-[13px] font-bold leading-6 text-primary sm:text-sm !text-end"
          >
            {desc || emptyText}
          </p>
        )}
      </div>
    </article>
  );
}
