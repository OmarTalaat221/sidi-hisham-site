import OptimizedImage from "@/components/common/OptimizedImage";
import { useSelector } from "react-redux";

export default function MenuOption({ text, Icon, onClick, disabled = false }) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      dir={isAr ? "rtl" : "ltr"}
      className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-start transition duration-200 ${
        disabled ? "cursor-not-allowed opacity-40" : "hover:bg-[#FFF1F3]"
      }`}
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

      <span className="flex-1 font-arabicLight text-[14px] text-gray-700 transition group-hover:text-[#A00012]">
        {text}
      </span>

      <span
        className={`text-gray-300 transition group-hover:text-[#D40017] ${
          isAr ? "rotate-180" : ""
        }`}
      >
        →
      </span>
    </button>
  );
}
