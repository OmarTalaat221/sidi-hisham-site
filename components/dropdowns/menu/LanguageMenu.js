import OptimizedImage from "@/components/common/OptimizedImage";
import { useSelector } from "react-redux";

export default function LanguageMenuOption({
  text,
  name,
  Icon,
  value,
  handleChange,
}) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-gray-50"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D40017]/8">
        <span className="relative h-5 w-5">
          <OptimizedImage
            alt={text}
            src={Icon}
            fill
            showSkeleton={false}
            objectFit="contain"
            sizes="20px"
          />
        </span>
      </span>

      <label
        htmlFor={name}
        className="flex-1 font-arabicLight text-[14px] text-gray-700"
      >
        {text}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="min-w-[72px] rounded-xl border border-gray-200 bg-white px-2 py-1.5 text-center text-xs font-medium text-[#A00012] outline-none transition focus:border-[#D40017] focus:ring-2 focus:ring-[#D40017]/10"
      >
        <option value="ar">AR</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
