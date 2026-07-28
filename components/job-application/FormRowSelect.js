import { AcademicCapIcon, ChevronDownIcon } from "@heroicons/react/outline";

export default function FormRowSelect({
  labelText,
  name,
  value,
  handleChange,
  list,
  isTrue = false,
  local,
  placeholder,
  disabled = false,
  required = true,
  Icon = AcademicCapIcon,
}) {
  const isAr = local === "ar";

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2 block text-start text-[13px] font-semibold text-slate-600"
      >
        {labelText || name}

        {required && <span className="mx-1 text-red-500">*</span>}
      </label>

      <div
        className={`group relative flex h-[54px] overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/[0.07] ${
          isAr ? "flex-row-reverse" : ""
        }`}
      >
        <span
          className={`flex w-12 shrink-0 items-center justify-center bg-[#FAFAFA] text-slate-400 transition-colors group-focus-within:text-primary ${
            isAr ? "border-l border-slate-100" : "border-r border-slate-100"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>

        <select
          id={name}
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          disabled={disabled}
          className={`min-w-0 flex-1 appearance-none border-0 bg-transparent px-4 text-[14px] font-medium text-slate-700 outline-none disabled:cursor-not-allowed disabled:text-slate-400 ${
            isAr ? "pl-11 text-right" : "pr-11 text-left"
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {list?.map((itemValue, index) => {
            const optionValue = isTrue ? itemValue.id : itemValue;

            const optionLabel = isTrue
              ? isAr
                ? itemValue.name_ar || itemValue.name_en
                : itemValue.name_en || itemValue.name_ar
              : itemValue;

            return (
              <option
                key={isTrue ? itemValue.id : `${itemValue}-${index}`}
                value={optionValue}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>

        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary ${
            isAr ? "left-4" : "right-4"
          }`}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
