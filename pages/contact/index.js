import axios from "axios";
import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";
import logo from "../../public/images/logo.png";
import wheat from "../../public/images/wheat.png";
import { clearMessage, setMessage } from "../../redux/message";
import { Mail, Phone, User, FileText, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

const initialState = {
  sender_name: "",
  sender_phone: "",
  sender_email: "",
  subject: "",
  message: "",
};

export default function Index() {
  const [values, setValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.message);
  const { local } = useSelector((state) => state.language);
  const isAr = local === "ar";

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [values, dispatch]);

  const sendMessage = async () => {
    setIsSubmitting(true);
    await axios
      .post("https://api.sedihisham.com/messaging/send", values)
      .then((res) => {
        dispatch(
          setMessage(
            isAr
              ? "تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا"
              : "Your message has been sent successfully"
          )
        );
        setValues(initialState);
      })
      .catch((error) => {
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message
          )
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { sender_name, sender_email, sender_phone, subject, message } =
      values;
    if (
      !sender_name ||
      !sender_phone ||
      !sender_email ||
      !subject ||
      !message
    ) {
      dispatch(
        setMessage(
          isAr
            ? "يرجى ملء جميع الحقول المطلوبة"
            : "Please fill all required fields"
        )
      );
    } else {
      sendMessage();
    }
  };

  const isSuccess =
    message && (message.includes("sent") || message.includes("بنجاح"));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fields = [
    {
      name: "sender_name",
      type: "text",
      icon: User,
      labelAr: "الاسم الكامل",
      labelEn: "Full Name",
      placeholderAr: "الاسم الكامل",
      placeholderEn: "Full name",
    },
    {
      name: "sender_phone",
      type: "text",
      icon: Phone,
      labelAr: "الهاتف الخلوي",
      labelEn: "Phone Number",
      placeholderAr: "الهاتف",
      placeholderEn: "Phone number",
    },
    {
      name: "sender_email",
      type: "email",
      icon: Mail,
      labelAr: "البريد الإلكتروني",
      labelEn: "Email",
      placeholderAr: "الإلكتروني",
      placeholderEn: "Email address",
    },
    {
      name: "subject",
      type: "text",
      icon: FileText,
      labelAr: "الموضوع",
      labelEn: "Subject",
      placeholderAr: "الموضوع",
      placeholderEn: "Subject",
    },
  ];

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#b0a9a966] via-[#52040faa] to-[#2b02096c] text-white py-12 px-4 selection:bg-red-500 selection:text-white flex items-center justify-center"
      dir={isAr ? "rtl" : "ltr"}
    >
      <SEO
        title={isAr ? "تواصل معنا - سيدي هشام" : "Contact Us - Sedi Hisham"}
        description={
          isAr
            ? "تواصل مع فريق سيدي هشام - شركة العقاد للصناعة والتجارة. نحن هنا للإجابة على جميع استفساراتك."
            : "Get in touch with Sedi Hisham team - Al-Aqad Company for Industry & Trade."
        }
        keywords="تواصل معنا, سيدي هشام, شركة العقاد, خدمة العملاء, اتصل بنا"
      />

      {/* خلفية الحبوب */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-overlay">
        <OptimizedImage
          src={wheat}
          alt="خلفية سيدي هشام"
          fill
          objectFit="cover"
          priority
        />
      </div>

      {/* تأثيرات الإضاءة الخلفية */}
      <motion.div
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-10 w-96 h-96 bg-red-500/25 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 -right-10 w-[28rem] h-[28rem] bg-red-700/20 blur-[150px] rounded-full pointer-events-none"
      />

      {/* الحاوية الرئيسية بتصميم Grid (الصورة بجانب الفورم) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl w-full mx-auto my-auto"
      >
        <div className="bg-[#42030c]/80 backdrop-blur-2xl rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 grid grid-cols-1 lg:grid-cols-12">
          
          {/* شريط علوي زخرفي رفيع */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8f0815] via-[#e61c24] to-[#8f0815] z-20" />

          {/* القسم الجانبي (الصورة والشعار والنبذة) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-black/20 to-black/40 p-8 sm:p-10 flex flex-col items-center justify-between text-center border-b lg:border-b-0 lg:border-e border-white/10 relative">
            <div className="w-full flex flex-col items-center justify-center my-auto">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="w-48 md:w-56 relative mb-6"
              >
                <OptimizedImage
                  src={logo}
                  alt="سيدي هشام - SEDI HISHAM"
                  width={240}
                  height={105}
                  objectFit="contain"
                  priority
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="text-xl sm:text-2xl font-bold text-white mb-3"
              >
                {isAr ? "تواصل معنا" : "Get in Touch"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-sm"
              >
                {isAr
                  ? "خبرتنا الواسعة ، فريق العمل الموهوب ، الرؤية والخيال تضيف إلى خدمة فريدة وجميلة"
                  : "Our vast experience, talented team, vision and imagination add up to our unique and beautiful service"}
              </motion.p>
            </div>

            <div className="mt-8 text-xs text-gray-400">
              © {new Date().getFullYear()} Sedi Hisham. All rights reserved.
            </div>
          </div>

          {/* قسم الفورم */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <form onSubmit={onSubmit} noValidate>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fields.map(({ name, type, icon: Icon, labelAr, labelEn, placeholderAr, placeholderEn }) => (
                    <motion.div key={name} variants={itemVariants} className="space-y-1.5">
                      <label className="block text-xs sm:text-sm font-bold text-white">
                        {isAr ? labelAr : labelEn}
                      </label>
                      <div className="relative group">
                        <Icon
                          size={18}
                          strokeWidth={2}
                          className={`absolute top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300 ${
                            isAr ? "right-3.5" : "left-3.5"
                          }`}
                        />
                        <input
                          type={type}
                          name={name}
                          value={values[name]}
                          onChange={handleChange}
                          placeholder={isAr ? placeholderAr : placeholderEn}
                          className={`w-full py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-gray-400 ${
                            isAr ? "pr-11 pl-4 text-right" : "pl-11 pr-4 text-left"
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* حقل الرسالة */}
                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-white">
                    {isAr ? "الرسالة" : "Message"}
                  </label>
                  <div className="relative group">
                    <MessageSquare
                      size={18}
                      strokeWidth={2}
                      className={`absolute top-3.5 text-gray-400 group-focus-within:text-red-400 transition-colors duration-300 ${
                        isAr ? "right-3.5" : "left-3.5"
                      }`}
                    />
                    <textarea
                      rows="4"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      placeholder={isAr ? "اكتب الرسالة هنا" : "Your message here"}
                      className={`w-full py-3 text-sm sm:text-base bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-500 focus:bg-white/10 transition-all duration-300 text-white placeholder:text-gray-400 resize-none ${
                        isAr ? "pr-11 pl-4 text-right" : "pl-11 pr-4 text-left"
                      }`}
                    />
                  </div>
                </motion.div>

                {/* شريط التنبيهات */}
                <AnimatePresence mode="wait">
                  {message && (
                    <motion.div
                      key={message}
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`flex items-center gap-2 p-3 rounded-xl text-sm font-medium border shadow-sm ${
                        isSuccess
                          ? "bg-emerald-900/40 text-emerald-200 border-emerald-500/30"
                          : "bg-red-900/40 text-red-200 border-red-500/30"
                      } ${isAr ? "flex-row-reverse text-right" : "text-left"}`}
                      role="alert"
                    >
                      {isSuccess ? (
                        <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle size={18} className="shrink-0 text-red-400" />
                      )}
                      <span>{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* زر الإرسال */}
                <motion.div variants={itemVariants} className="pt-2 flex justify-center">
                  <motion.button
                    whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 12px 28px -6px rgba(220, 38, 38, 0.5)" } : {}}
                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[220px] px-10 py-3.5 bg-gradient-to-r from-[#ba0d1b] via-[#e61c24] to-[#ba0d1b] hover:from-[#d1101e] hover:to-[#960812] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block"
                        />
                        {isAr ? "جاري الإرسال..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <Send size={16} className={isAr ? "scale-x-[-1]" : ""} />
                        {isAr ? "ارسال الرسالة" : "Send message"}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </form>
          </div>

        </div>
      </motion.div>
    </div>
  );
}