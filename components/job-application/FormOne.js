import React, { useEffect, useState, useRef } from "react";
import FormTitle from "./FormTitle";
import InputWithIcon from "./InputWithIcon";
import { HomeIcon, UserIcon, CalendarIcon } from "@heroicons/react/outline";
import RadioButton from "./RadioButton";
import FormRowSelect from "./FormRowSelect";
import Button from "./Button";
import StepsProgress from "./StepsProgress";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../../redux/jobApplicationSlice";
import { clearMessage, setMessage } from "../../redux/message";
import { gsap } from "gsap";

const initialState = {
  full_name: "",
  email: "",
  family_status: "Married",
  sex: true,
  serviceObl: "",
  birdthday: "",
  speciality: null,
};

export default function FormOne() {
  const router = useRouter();
  const formRef = useRef(null);

  const [specialties, setSpecialties] = useState([]);
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.message);
  const { local } = useSelector((state) => state.language);
  const isRTL = local === "ar";

  const getSpecialties = async () => {
    try {
      const response = await axios.get(
        `https://api.sedihisham.com/careers/jobmanagement/findall`
      );
      setSpecialties(response.data);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  useEffect(() => {
    getSpecialties();
  }, []);

  // الضمان التام لظهور كافة الحقول بنسبة 100%
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      birdthday,
      family_status,
      full_name,
      speciality,
    } = values;

    if (!full_name) {
      dispatch(setMessage(isRTL ? "الرجاء إدخال الاسم الكامل" : "Full name is empty"));
    } else if (!birdthday) {
      dispatch(setMessage(isRTL ? "الرجاء تحديد تاريخ الميلاد" : "Birthday is empty"));
    } else if (!family_status) {
      dispatch(setMessage(isRTL ? "الرجاء تحديد الحالة الاجتماعية" : "Family status is empty"));
    } else if (!speciality) {
      dispatch(setMessage(isRTL ? "الرجاء اختيار الاختصاص" : "Specialty is empty"));
    } else {
      dispatch(addFormData(values));
      router.push("/job-application/addInfo");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Steps Indicator */}
      <div className="mb-6">
        <StepsProgress stepNumber={1} />
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="space-y-5"
      >
        {/* Title */}
        <div className="animate-field">
          <FormTitle
            local={local}
            text={isRTL ? "البيانات الأساسية" : "Basic Information"}
          />
        </div>

        {/* Inputs Group: Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="animate-field">
            <InputWithIcon
              local={local}
              label={isRTL ? "الاسم الكامل" : "Full Name"}
              name="full_name"
              Icon={UserIcon}
              value={values.full_name}
              handleChange={handleChange}
              placeholder={isRTL ? "أدخل اسمك الكامل" : "Enter your full name"}
              inputType="text"
            />
          </div>

          <div className="animate-field">
            <InputWithIcon
              label={isRTL ? "البريد الإلكتروني" : "Email Address"}
              Icon={HomeIcon}
              name="email"
              local={local}
              value={values.email}
              handleChange={handleChange}
              placeholder={isRTL ? "example@domain.com" : "example@domain.com"}
              inputType="email"
            />
          </div>
        </div>

        {/* Birthday & Family Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Birthday Field */}
          <div className="animate-field flex flex-col space-y-1.5">
            <label className="text-xs sm:text-sm font-arabicBold font-bold text-slate-200 flex items-center gap-1">
              <span className="text-red-500 font-bold">*</span>
              {isRTL ? "تاريخ الميلاد" : "Date of Birth"}
            </label>
            <div className="relative flex items-center bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 focus-within:border-red-500/80 focus-within:ring-2 focus-within:ring-red-500/20 transition-all duration-200 shadow-sm">
              <CalendarIcon className="w-5 h-5 text-slate-400 me-2 flex-shrink-0" />
              <input
                className="bg-transparent text-slate-100 text-sm font-arabicMedium w-full outline-none color-scheme-dark cursor-pointer"
                type="date"
                name="birdthday"
                onChange={handleChange}
                value={values.birdthday}
              />
            </div>
          </div>

          {/* Social Status Radio Options */}
          <div className="animate-field flex flex-col space-y-1.5">
            <label className="text-xs sm:text-sm font-arabicBold font-bold text-slate-200 flex items-center gap-1">
              <span className="text-red-500 font-bold">*</span>
              {isRTL ? "الحالة الاجتماعية" : "Social Status"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/50 p-2 border border-slate-800 rounded-xl">
              <RadioButton
                text={isRTL ? "أعزب" : "Single"}
                label={isRTL ? "أعزب" : "Single"}
                local={local}
                id="status-single"
                handleChange={handleChange}
                isChecked={values.family_status === "Single"}
                name="family_status"
                value="Single"
              />
              <RadioButton
                text={isRTL ? "متزوج" : "Married"}
                label={isRTL ? "متزوج" : "Married"}
                local={local}
                id="status-married"
                handleChange={handleChange}
                isChecked={values.family_status === "Married"}
                name="family_status"
                value="Married"
              />
              <RadioButton
                text={isRTL ? "مطلق" : "Divorced"}
                label={isRTL ? "مطلق" : "Divorced"}
                local={local}
                id="status-divorced"
                handleChange={handleChange}
                isChecked={values.family_status === "Devorce"}
                name="family_status"
                value="Devorce"
              />
              <RadioButton
                text={isRTL ? "أرمل" : "Widower"}
                label={isRTL ? "أرمل" : "Widower"}
                local={local}
                id="status-widower"
                handleChange={handleChange}
                isChecked={values.family_status === "Widower"}
                name="family_status"
                value="Widower"
              />
            </div>
          </div>
        </div>

        {/* Compulsory Service & Sex */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Compulsory Service */}
          <div className="animate-field flex flex-col space-y-1.5">
            <label className="text-xs sm:text-sm font-arabicBold font-bold text-slate-200">
              {isRTL ? "الخدمة الإلزامية" : "Compulsory Service"}
            </label>
            <div className="flex gap-2 bg-slate-950/50 p-2 border border-slate-800 rounded-xl">
              <RadioButton
                text={isRTL ? "مؤجل" : "Reported"}
                label={isRTL ? "مؤجل" : "Reported"}
                local={local}
                id="service-postponed"
                handleChange={handleChange}
                isChecked={values.serviceObl === "M"}
                name="serviceObl"
                value="M"
              />
              <RadioButton
                text={isRTL ? "معفى" : "Exempt"}
                label={isRTL ? "معفى" : "Exempt"}
                local={local}
                id="service-exempt"
                handleChange={handleChange}
                isChecked={values.serviceObl === "D"}
                name="serviceObl"
                value="D"
              />
            </div>
          </div>

          {/* Sex */}
          <div className="animate-field flex flex-col space-y-1.5">
            <label className="text-xs sm:text-sm font-arabicBold font-bold text-slate-200">
              {isRTL ? "الجنس" : "Gender"}
            </label>
            <div className="flex gap-2 bg-slate-950/50 p-2 border border-slate-800 rounded-xl">
              <RadioButton
                text={isRTL ? "ذكر" : "Male"}
                label={isRTL ? "ذكر" : "Male"}
                local={local}
                id="gender-male"
                handleChange={handleChange}
                isChecked={String(values.sex) === "true"}
                name="sex"
                value={true}
              />
              <RadioButton
                text={isRTL ? "أنثى" : "Female"}
                label={isRTL ? "أنثى" : "Female"}
                local={local}
                id="gender-female"
                handleChange={handleChange}
                isChecked={String(values.sex) === "false"}
                name="sex"
                value={false}
              />
            </div>
          </div>
        </div>

        {/* Specialty Selector */}
        <div className="animate-field">
          <FormRowSelect
            local={local}
            labelText={isRTL ? "اختر الاختصاص المطلوب" : "Choose Speciality"}
            name="speciality"
            value={values.speciality}
            handleChange={handleChange}
            list={specialties}
            isTrue={true}
          />
        </div>

        {/* Validation Error Message */}
        {message && (
          <div
            className="animate-field bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm p-3.5 rounded-xl text-center font-arabicMedium shadow-sm"
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="animate-field pt-2">
          <Button
            type="submit"
            text={isRTL ? "الانتقال للخطوة التالية" : "Proceed to Next Step"}
          />
        </div>
      </form>
    </div>
  );
}