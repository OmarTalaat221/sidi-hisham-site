import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import { motion } from "framer-motion";
import Login from "../../components/login";
import image from "../../public/images/logo.png";
import SignUp from "../../components/signup/SignUp";
import { useSelector } from "react-redux";
import { ShieldCheckIcon, UserGroupIcon, SparklesIcon } from "@heroicons/react/outline";

export default function Index() {
  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const features = [
    {
      icon: ShieldCheckIcon,
      textAr: "بياناتك محمية ومشفّرة بالكامل",
      textEn: "Your data is fully encrypted & protected",
    },
    {
      icon: UserGroupIcon,
      textAr: "انضم لآلاف العملاء الموثوقين",
      textEn: "Join thousands of trusted customers",
    },
    {
      icon: SparklesIcon,
      textAr: "تجربة استخدام سلسة وسريعة",
      textEn: "A smooth, fast experience",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen w-full overflow-hidden bg-stone-50 flex items-center py-20 md:py-28"
    >
      {/* ── خلفية زخرفية ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_theme(colors.red.50),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_theme(colors.amber.50),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <motion.div
          className="absolute -top-24 -start-24 w-[420px] h-[420px] rounded-full bg-[#7c1422]/10 blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -end-24 w-[480px] h-[480px] rounded-full bg-amber-400/10 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, -14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full">
        <div className="flex md:flex-row flex-col-reverse items-center gap-10 md:gap-6">
          {/* ── العمود الترحيبي ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-[50%] w-full flex flex-col items-center md:items-start text-center md:text-start"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <OptimizedImage
                  alt="صورة سيدي هشام"
                  src={image}
                  width={190}
                  height={95}
                />
              </motion.div>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7c1422]/10 text-[#7c1422] border border-[#7c1422]/15 text-xs font-bold mb-4 font-arabicBold"
            >
              <SparklesIcon className="w-4 h-4" />
              {isAr ? "بوابة العملاء" : "Customer Portal"}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight font-arabicBold mb-4"
            >
              {isAr ? "أهلًا بك!" : "Welcome"}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-stone-500 font-arabicMedium text-base sm:text-lg max-w-md leading-relaxed mb-8"
            >
              {isAr
                ? "لأول مرة؟ يجب عليك تسجيل الدخول أو إنشاء حساب جديد للمتابعة"
                : "First time here? Log in or create an account to continue"}
            </motion.p>

            <motion.div variants={itemVariants} className="w-full max-w-md flex flex-col gap-3">
              {features.map(({ icon: Icon, textAr, textEn }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm border border-stone-200/60 rounded-xl px-4 py-3 shadow-sm"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#7c1422]/10 text-[#7c1422] shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-arabicMedium text-sm text-stone-600">
                    {isAr ? textAr : textEn}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── عمود التسجيل ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex-[50%] w-full"
          >
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-white/60 p-1.5 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#7c1422] via-[#e61c24] to-[#7c1422]" />
              <div className="rounded-[22px] p-5 sm:p-7">
                <SignUp />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}