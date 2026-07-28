export default function RadioButton({
  id,
  label,
  name,
  value,
  isChecked,
  handleChange,
}) {
  return (
    <label
      htmlFor={id}
      className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
        isChecked
          ? "border-primary bg-primary/[0.06] text-primary ring-1 ring-primary/10"
          : "border-slate-200 bg-white text-slate-600 hover:border-primary/30"
      }`}
    >
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
          isChecked ? "border-primary" : "border-slate-300"
        }`}
      >
        {isChecked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>

      <input
        id={id}
        type="radio"
        value={value}
        onChange={handleChange}
        checked={isChecked}
        name={name}
        className="sr-only"
      />

      <span>{label}</span>
    </label>
  );
}
