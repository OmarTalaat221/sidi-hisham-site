import React from "react";
import FormThree from "../../components/job-application/formThree/FormThree";
import SEO from "@/components/SEO";
import { useSelector } from "react-redux";

export default function AddCertificate() {
  const languageState = useSelector((state) => state?.language);
  const isRTL = languageState?.local === "ar";

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white pt-24 pb-20 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <SEO
        title={isRTL ? "طلب التوظيف - الخطوة 3" : "Job Application - Step 3"}
        description="إضافة الشهادات والخبرات لطلب التوظيف لدى سيدي هشام"
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <main className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl">
          <FormThree />
        </div>
      </main>
    </div>
  );
}
