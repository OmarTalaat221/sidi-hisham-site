import {
  AcademicCapIcon,
  CalendarIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../../redux/jobApplicationSlice";
import { clearMessage, setMessage } from "../../redux/message";
import Button from "./Button";
import FormRowSelect from "./FormRowSelect";
import FormTitle from "./FormTitle";
import InputWithIcon from "./InputWithIcon";
import RadioButton from "./RadioButton";
import StepsProgress from "./StepsProgress";

const initialState = {
  full_name: "",
  email: "",
  family_status: "Married",
  sex: true,
  serviceObl: "",
  birdthday: "",
  speciality: "",
};

function FormHeaderPattern() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 130"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
    >
      <defs>
        <pattern
          id="job-form-pattern"
          width="105"
          height="105"
          patternUnits="userSpaceOnUse"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.4"
          >
            <rect x="15" y="20" width="32" height="40" rx="4" />

            <path d="M23 30H39" />
            <path d="M23 38H39" />
            <path d="M23 46H34" />

            <path d="M72 65V23" />

            <path d="M72 34C62 33 57 27 57 20C66 21 71 26 72 34Z" />
            <path d="M72 45C61 43 56 37 56 29C66 31 71 37 72 45Z" />
            <path d="M72 56C62 54 57 48 57 40C66 42 71 48 72 56Z" />

            <path d="M72 34C82 33 87 27 87 20C78 21 73 26 72 34Z" />
            <path d="M72 45C83 43 88 37 88 29C78 31 73 37 72 45Z" />
            <path d="M72 56C82 54 87 48 87 40C78 42 73 48 72 56Z" />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#job-form-pattern)" />
    </svg>
  );
}

function ApplicationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <path
        d="M7 3.5H14.5L19 8V20.5H7V3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M14 3.5V8.5H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M10 12H16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M10 15.5H16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M10 19H13.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FormOne() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { local } = useSelector((state) => state.language);

  const { message } = useSelector((state) => state.message);

  const isAr = local === "ar";

  const [specialties, setSpecialties] = useState([]);

  const [loadingSpecialties, setLoadingSpecialties] = useState(true);

  const [values, setValues] = useState(initialState);

  useEffect(() => {
    let cancelled = false;

    async function getSpecialties() {
      setLoadingSpecialties(true);

      try {
        const response = await axios.get(
          "https://api.sedihisham.com/careers/jobmanagement/findall",
        );

        if (!cancelled) {
          setSpecialties(Array.isArray(response.data) ? response.data : []);
        }
      } catch {
        if (!cancelled) {
          setSpecialties([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingSpecialties(false);
        }
      }
    }

    getSpecialties();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: name === "sex" ? value === "true" : value,
    }));

    if (message) {
      dispatch(clearMessage());
    }
  };

  const showError = (arabicMessage, englishMessage) => {
    dispatch(setMessage(isAr ? arabicMessage : englishMessage));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const { full_name, birdthday, family_status, speciality } = values;

    if (!full_name.trim()) {
      showError("يرجى كتابة الاسم الكامل.", "Please enter your full name.");
      return;
    }

    if (!birdthday) {
      showError("يرجى تحديد تاريخ الميلاد.", "Please select your birthday.");
      return;
    }

    if (!family_status) {
      showError(
        "يرجى تحديد الحالة الاجتماعية.",
        "Please select your social status.",
      );
      return;
    }

    if (!speciality) {
      showError("يرجى اختيار الاختصاص.", "Please choose a specialty.");
      return;
    }

    dispatch(addFormData(values));

    router.push("/job-application/addInfo");
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.09)]">
      <header className="relative isolate overflow-hidden bg-[#7C1422] px-5 py-6 text-white sm:px-8 sm:py-7">
        {/* <FormHeaderPattern /> */}

        <div
          aria-hidden="true"
          className="absolute right-[-55px] top-[-80px] -z-10 h-56 w-56 rounded-full border-[46px] border-white/[0.05]"
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-primary p-3 text-white">
              <ApplicationIcon />
            </span> */}

            <div className="text-start">
              <p className="text-[11px] font-bold tracking-[0.14em] text-white/55">
                {isAr ? "نموذج التقديم" : "APPLICATION FORM"}
              </p>

              <h1 className="mt-1 text-[22px] font-bold leading-[1.4] text-white sm:text-[26px]">
                {isAr ? "طلب التقديم على وظيفة" : "Job Application"}
              </h1>

              <p className="mt-1 text-[12px] font-medium text-white/65">
                {isAr
                  ? "أدخل بياناتك للانتقال إلى الخطوة التالية."
                  : "Enter your details to continue to the next step."}
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold text-white">
            {isAr ? "الخطوة 1 من 3" : "Step 1 of 3"}
          </span>
        </div>
      </header>

      <div className="border-b border-slate-100 bg-[#FBF9F7] px-5 py-6 sm:px-8 lg:px-10">
        <StepsProgress stepNumber={1} local={local} />
      </div>

      <form
        onSubmit={onSubmit}
        noValidate
        className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11"
      >
        <FormTitle
          local={local}
          text={isAr ? "المعلومات الأساسية" : "Basic information"}
          subtitle={
            isAr
              ? "الحقول التي تحمل علامة النجمة مطلوبة."
              : "Fields marked with an asterisk are required."
          }
        />

        <div className="mt-8 grid gap-x-5 gap-y-6 sm:grid-cols-2">
          <InputWithIcon
            label={isAr ? "الاسم الكامل" : "Full name"}
            name="full_name"
            Icon={UserIcon}
            value={values.full_name}
            handleChange={handleChange}
            placeholder={isAr ? "اكتب الاسم الكامل" : "Enter your full name"}
            inputType="text"
            autoComplete="name"
            required
            isAr={isAr}
          />

          <InputWithIcon
            label={isAr ? "البريد الإلكتروني" : "Email address"}
            name="email"
            Icon={MailIcon}
            value={values.email}
            handleChange={handleChange}
            placeholder="example@email.com"
            inputType="email"
            autoComplete="email"
            required={false}
            isAr={isAr}
          />

          <InputWithIcon
            label={isAr ? "تاريخ الميلاد" : "Birthday"}
            name="birdthday"
            Icon={CalendarIcon}
            value={values.birdthday}
            handleChange={handleChange}
            inputType="date"
            required
            isAr={isAr}
          />

          <FormRowSelect
            labelText={isAr ? "الاختصاص" : "Specialty"}
            name="speciality"
            value={values.speciality}
            handleChange={handleChange}
            list={specialties}
            isTrue
            local={local}
            required
            disabled={loadingSpecialties}
            Icon={AcademicCapIcon}
            placeholder={
              loadingSpecialties
                ? isAr
                  ? "جاري تحميل الاختصاصات..."
                  : "Loading specialties..."
                : isAr
                  ? "اختر الاختصاص"
                  : "Choose a specialty"
            }
          />
        </div>

        <div className="my-9 flex items-center gap-4">
          <span className="h-px flex-1 bg-slate-100" />

          <span className="whitespace-nowrap text-[11px] font-bold text-slate-300">
            {isAr ? "بيانات إضافية" : "ADDITIONAL DETAILS"}
          </span>

          <span className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <fieldset className="rounded-2xl border border-slate-200 bg-[#FCFCFC] p-5">
            <legend className="px-2 text-[14px] font-bold text-[#7C1422]">
              {isAr ? "الحالة الاجتماعية" : "Social status"}
            </legend>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <RadioButton
                id="family-single"
                label={isAr ? "أعزب" : "Single"}
                name="family_status"
                value="Single"
                isChecked={values.family_status === "Single"}
                handleChange={handleChange}
              />

              <RadioButton
                id="family-married"
                label={isAr ? "متزوج" : "Married"}
                name="family_status"
                value="Married"
                isChecked={values.family_status === "Married"}
                handleChange={handleChange}
              />

              <RadioButton
                id="family-widower"
                label={isAr ? "أرمل" : "Widower"}
                name="family_status"
                value="Widower"
                isChecked={values.family_status === "Widower"}
                handleChange={handleChange}
              />

              <RadioButton
                id="family-divorced"
                label={isAr ? "مطلق" : "Divorced"}
                name="family_status"
                value="Devorce"
                isChecked={values.family_status === "Devorce"}
                handleChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-slate-200 bg-[#FCFCFC] p-5">
            <legend className="px-2 text-[14px] font-bold text-[#7C1422]">
              {isAr ? "الجنس" : "Gender"}
            </legend>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <RadioButton
                id="gender-male"
                label={isAr ? "ذكر" : "Male"}
                name="sex"
                value="true"
                isChecked={values.sex === true}
                handleChange={handleChange}
              />

              <RadioButton
                id="gender-female"
                label={isAr ? "أنثى" : "Female"}
                name="sex"
                value="false"
                isChecked={values.sex === false}
                handleChange={handleChange}
              />
            </div>

            {values.sex === true && (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="mb-3 text-start text-[13px] font-bold text-[#7C1422]">
                  {isAr ? "الخدمة الإلزامية" : "Compulsory service"}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <RadioButton
                    id="service-deferred"
                    label={isAr ? "مؤجل" : "Deferred"}
                    name="serviceObl"
                    value="M"
                    isChecked={values.serviceObl === "M"}
                    handleChange={handleChange}
                  />

                  <RadioButton
                    id="service-exempt"
                    label={isAr ? "معفى" : "Exempt"}
                    name="serviceObl"
                    value="D"
                    isChecked={values.serviceObl === "D"}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            )}
          </fieldset>
        </div>

        {message && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-start text-[13px] font-semibold leading-6 text-red-700"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 h-5 w-5 shrink-0"
            >
              <path
                d="M12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M12 8V13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <path
                d="M12 16H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <span>{message}</span>
          </div>
        )}

        <div className="mt-9 flex flex-col-reverse items-center gap-4 border-t border-slate-100 pt-7 sm:flex-row sm:justify-between">
          <p className="text-center text-[11px] font-medium leading-5 text-slate-400 sm:text-start">
            {isAr
              ? "يمكنك مراجعة البيانات قبل إرسال الطلب في الخطوة الأخيرة."
              : "You can review your information before submitting the application."}
          </p>

          <div className="w-full sm:w-[230px]">
            <Button
              type="submit"
              text={isAr ? "متابعة الطلب" : "Continue application"}
              isAr={isAr}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
