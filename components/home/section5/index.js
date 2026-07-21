export default function SponsorSection({ title, desc }) {
  return (
    <div>
      <div className="flex flex-col  items-center justify-center">
        <h1 className="font-arabicBold tracking-wide text-sm md:text-2xl opacity-75 my-1">
          {title}
        </h1>
        <span className="mt-3 h-[3px] w-14 rounded-full bg-[#D40017]" />
        <p className="py-2 mb-6 font-arabicMedium text-center  text-sm md:text-[18px] opacity-60">
          {desc}
        </p>
      </div>
    </div>
  );
}
