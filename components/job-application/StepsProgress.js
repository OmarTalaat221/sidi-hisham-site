import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

export default function StepsProgress({ stepNumber }) {
  const router = useRouter();
  const { local } = useSelector((state) => state?.language || { local: "ar" });
  const isRTL = local === "ar";

  const steps = [
    { number: 1, title: isRTL ? "البيانات الأساسية" : "Basic Details", path: "/job-application" },
    { number: 2, title: isRTL ? "المعلومات الإضافية" : "Additional Info", path: "/job-application/addInfo" },
    { number: 3, title: isRTL ? "الشهادات والخبرات" : "Certificates", path: "/job-application/addCertificate" },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-2">
      <div className="flex items-center justify-between relative">
        {/* Progress Background Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full" />
        
        {/* Progress Active Bar */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-red-600 to-red-500 -translate-y-1/2 z-0 transition-all duration-500 rounded-full"
          style={{
            width: stepNumber === 1 ? "0%" : stepNumber === 2 ? "50%" : "100%",
            right: isRTL ? (stepNumber === 1 ? "100%" : stepNumber === 2 ? "50%" : "0%") : "auto",
          }}
        />

        {steps.map((step) => {
          const isActive = stepNumber === step.number;
          const isCompleted = stepNumber > step.number;

          return (
            <div
              key={step.number}
              onClick={() => {
                if (isCompleted) {
                  router.push(step.path);
                }
              }}
              className={`relative z-10 flex flex-col items-center gap-1.5 ${
                isCompleted ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white ring-4 ring-red-500/20 scale-110"
                    : isCompleted
                    ? "bg-red-950 border border-red-500/60 text-red-400"
                    : "bg-slate-900 border border-slate-700 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-arabicMedium whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-red-400 font-bold"
                    : isCompleted
                    ? "text-slate-300"
                    : "text-slate-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
