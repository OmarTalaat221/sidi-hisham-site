export default function FormTitle({ text, subtitle, local }) {
  const isAr = local === "ar";

  return (
    <header className="text-start">
      <div className="flex items-center gap-3">
        <span className="block h-8 w-[3px] rounded-full bg-primary" />

        <div>
          <p className="text-[11px] font-bold tracking-[0.13em] text-primary">
            {isAr ? "بيانات المتقدم" : "APPLICANT DETAILS"}
          </p>

          <h2 className="mt-1 text-[23px] font-bold leading-[1.4] text-[#7C1422] sm:text-[28px]">
            {text}
          </h2>
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-[12px] font-medium leading-6 text-slate-400 sm:text-[13px]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
