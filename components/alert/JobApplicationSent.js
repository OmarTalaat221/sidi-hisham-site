import OptimizedImage from "@/components/common/OptimizedImage";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import logo from "../../public/images/logo.png";

export default function JobApplicationSent() {
  const { local } = useSelector((state) => state.language);
  const router = useRouter();
  const isRTL = local === "ar";

  return (
    <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl max-w-xl mx-auto flex flex-col items-center justify-center text-center p-8 sm:p-12 shadow-2xl space-y-6 my-12">
      <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
        <OptimizedImage src={logo} alt="Sedi Hisham Logo" width={180} height={75} />
      </div>

      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-950/40 animate-bounce">
        ✓
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-arabicBold font-bold text-white">
          {isRTL ? "شكراً جزيلًا لك!" : "Thank You Very Much!"}
        </h3>
        <p className="font-arabicMedium text-slate-300 text-sm sm:text-base max-w-md mx-auto">
          {isRTL
            ? "تم استلام طلب التوظيف الخاص بكم بنجاح وسيتواصل معكم فريق الموارد البشرية قريباً."
            : "Thank you. Your job application has been successfully received and our HR team will contact you soon."}
        </p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="px-8 py-3.5 bg-gradient-to-r from-[#ba0d1b] via-[#e61c24] to-[#ba0d1b] hover:from-[#d1101e] hover:to-[#960812] text-white font-arabicBold font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
      >
        {isRTL ? "العودة للرئيسية" : "Back to Home"}
      </button>
    </div>
  );
}
