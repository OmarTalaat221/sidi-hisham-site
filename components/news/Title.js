const titleSizes = {
  "[14px]": "text-[14px]",
  "[16px]": "text-[16px]",
  "[18px]": "text-[18px]",
  "[20px]": "text-[20px]",
};

export default function Title({ text, size = "[18px]", local }) {
  const sizeClass = titleSizes[size] || "text-[18px]";

  return (
    <div
      dir={local === "ar" ? "rtl" : "ltr"}
      className="flex w-full min-w-0 justify-start"
    >
      <div
        className={`news-card-title-text ${sizeClass} w-full min-w-0 text-start font-arabicMedium leading-7 tracking-tight text-[#007530] transition-colors duration-300 group-hover:text-[#D40017]`}
      >
        {text}
      </div>
    </div>
  );
}
