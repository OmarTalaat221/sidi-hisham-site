import { useRouter } from "next/router";

export default function StepsProgress({ stepNumber, local }) {
  const router = useRouter();
  const isAr = local === "ar";

  const steps = [
    {
      number: 1,
      label: isAr ? "البيانات الأساسية" : "Basic details",
      route: "/job-application",
    },
    {
      number: 2,
      label: isAr ? "الخبرات والمؤهلات" : "Experience",
      route: "/job-application/addInfo",
    },
    {
      number: 3,
      label: isAr ? "مراجعة وإرسال" : "Review",
      route: null,
    },
  ];

  const goToStep = (step) => {
    if (step.number < stepNumber && step.route) {
      router.push(step.route);
    }
  };

  return (
    <div className="relative mx-auto max-w-[700px]">
      <div className="absolute left-[15%] right-[15%] top-5 h-[2px] bg-slate-200" />

      <div
        className={`absolute top-5 h-[2px] bg-primary transition-all duration-300 ${
          isAr ? "right-[15%]" : "left-[15%]"
        }`}
        style={{
          width: stepNumber === 1 ? "0%" : stepNumber === 2 ? "35%" : "70%",
        }}
      />

      <ol className="relative z-10 grid grid-cols-3">
        {steps.map((step) => {
          const active = step.number === stepNumber;

          const completed = step.number < stepNumber;

          return (
            <li key={step.number} className="text-center">
              <button
                type="button"
                disabled={!completed}
                onClick={() => goToStep(step)}
                className="flex w-full flex-col items-center disabled:cursor-default"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-[12px] font-bold transition-all ${
                    active
                      ? "border-primary bg-primary text-white shadow-[0_7px_18px_rgba(0,117,48,0.2)]"
                      : completed
                        ? "border-primary bg-white text-primary"
                        : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {completed ? (
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                      <path
                        d="M5 10L8.2 13.2L15 6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </span>

                <span
                  className={`mt-2 text-[10px] font-bold leading-5 sm:text-[12px] ${
                    active || completed ? "text-[#7C1422]" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
