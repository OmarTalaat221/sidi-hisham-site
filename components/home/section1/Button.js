// components/home/section1/Button.js

export default function Button({ bgColor, text }) {
  return (
    <div
      className={`
        h-32 w-32 flex justify-center items-center 
        bg-${bgColor} 
        rounded-xl
        backdrop-blur-sm
        border border-white/10
        hover:scale-105
        transition-all duration-300
        cursor-pointer
      `}
    >
      <p className="text-base font-arabicMedium text-white">{text}</p>
    </div>
  );
}
