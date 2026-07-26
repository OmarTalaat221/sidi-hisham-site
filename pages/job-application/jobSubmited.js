import React from "react";
import JobApplicationSent from "../../components/alert/JobApplicationSent";
import SEO from "@/components/SEO";
import { useSelector } from "react-redux";

export default function JobSubmited() {
  const languageState = useSelector((state) => state?.language);
  const isRTL = languageState?.local === "ar";

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-500 selection:text-white pt-24 pb-20 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <SEO
        title={isRTL ? "تم استلام الطلب - سيدي هشام" : "Application Submitted - Sedi Hisham"}
        description="تم استلام طلب التوظيف بنجاح"
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none z-0" />

      <main className="max-w-3xl mx-auto px-4 relative z-10">
        <JobApplicationSent />
      </main>
    </div>
  );
}
