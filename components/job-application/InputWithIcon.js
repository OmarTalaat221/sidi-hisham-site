export default function InputWithIcon({
  label,
  inputType = "text",
  placeholder,
  name,
  handleChange,
  value,
  Icon,
  required = true,
  autoComplete,
  isAr,
}) {
  const iconClasses = isAr
    ? "border-l border-slate-100"
    : "border-r border-slate-100";

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2 block text-start text-[13px] font-semibold text-slate-600"
      >
        {label}

        {required && <span className="mx-1 text-red-500">*</span>}
      </label>

      <div
        className={`group flex h-[54px] overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/[0.07] ${
          isAr ? "flex-row-reverse" : ""
        }`}
      >
        <span
          className={`flex w-12 shrink-0 items-center justify-center bg-[#FAFAFA] text-slate-400 transition-colors group-focus-within:text-primary ${iconClasses}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>

        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          value={value}
          autoComplete={autoComplete}
          className={`min-w-0 flex-1 border-0 bg-transparent px-4 text-[14px] font-medium text-slate-700 outline-none placeholder:text-slate-300 ${
            isAr ? "text-right" : "text-left"
          }`}
        />
      </div>
    </div>
  );
}
