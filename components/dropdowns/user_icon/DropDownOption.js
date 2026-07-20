import OptimizedImage from "@/components/common/OptimizedImage";
import { useSelector } from "react-redux";

export default function DropDownOption({ text, Icon }) {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="flex w-full items-center gap-3">
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D40017]/8">
        <span className="relative h-[18px] w-[18px]">
          <OptimizedImage
            alt={text}
            src={Icon}
            fill
            showSkeleton={false}
            objectFit="contain"
            sizes="18px"
          />
        </span>
      </span>

      <span className="flex-1 font-arabicLight text-[14px]">{text}</span>

      <span className={`text-gray-300 ${isAr ? "rotate-180" : ""}`}>→</span>
    </div>
  );
}
