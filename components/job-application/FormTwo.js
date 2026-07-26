import React, { useEffect, useState } from "react";
import FormTitle from "./FormTitle";
import InputWithIcon from "./InputWithIcon";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  HomeIcon,
  CalendarIcon,
  OfficeBuildingIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";
import RadioButton from "./RadioButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormRowSelect from "./FormRowSelect";
import FormRowRadio from "./FormRowRadio";
import Button from "./Button";
import SampleInput from "./SampleInput";
import StepsProgress from "./StepsProgress";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../../redux/jobApplicationSlice";
import axios from "axios";
import { clearMessage, setMessage } from "../../redux/message";
import SelectCountry from "./SelectCountry";
// import { isValidPhoneNumber } from 'react-phone-number-input'

const initialState = {
  address: "",
  nationalty: "",
  national_id: "",
  birth_place: "",
  phone_number: 0,
  notes: "",
  cv_url: "",
};

export default function FormTwo() {
  const router = useRouter();

  //List of countries
  const [countries, setCountries] = useState([]);
  const getCountries = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all?fields=name,translations");
      if (res.data && Array.isArray(res.data)) {
        const formatted = res.data
          .map((c) => ({
            name: c.translations?.ara?.common || c.name?.common || "",
            name_ar: c.translations?.ara?.common || c.name?.common || "",
            name_en: c.name?.common || "",
          }))
          .filter((c) => c.name && c.name.toLowerCase() !== "israel")
          .sort((a, b) => a.name.localeCompare(b.name, "ar"));
        if (formatted.length > 0) {
          setCountries(formatted);
        }
      }
    } catch (error) {
      console.warn("Could not fetch external countries list, using built-in fallback.");
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const [values, setValues] = useState(initialState);
  const [files, setFiles] = useState([]);

  // const [isUploading,setIsUploading] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles([file]);
  };
  const dispatch = useDispatch();

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", files[0], files[0]?.name);
    await axios
      .post(
        `https://api.sedihisham.com/categories/upload/category-image`,
        formData
      )
      .then((res) => {
        dispatch(addFormData({ ...values, cv_url: res.data })) &&
          router.push("/job-application/addCertificate");
      })
      // .then((res)=>{

      // }
      // )
      .catch((error) => {
        alert(
          error.response && error.response.data && error.response.data.message
        ) || error.message;
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      address,
      nationalty,
      national_id,
      birth_place,
      notes,
      phone_number,
    } = values;
    if (
      !address ||
      !national_id ||
      !nationalty ||
      !birth_place ||
      !address ||
      !notes ||
      !phone_number
    ) {
      dispatch(setMessage("PLease fill all fields"));
    } else if (files.length === 0) {
      dispatch(setMessage("Please upload your cv"));
      // dispatch(setMessage("Phone number is not valid"))
    } else if (phone_number.length < 10) {
      dispatch(setMessage("Phone number must be > 10 numbers"));
    } else if (!phone_number.startsWith("+")) {
      dispatch(setMessage("Your phone number must start with +"));
    } else {
      uploadFile();
    }
  };

  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      {/* Steps Indicator */}
      <div className="mb-6">
        <StepsProgress stepNumber={2} />
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <FormTitle
          local={local}
          text={local === "ar" ? "المعلومات الإضافية" : "Additional Information"}
        />

        {/* Nationality & Birth Place */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectCountry
            local={local}
            labelText={local === "ar" ? "الجنسية" : "Nationality"}
            name="nationalty"
            isTrue={false}
            value={values.nationalty}
            handleChange={handleChange}
            list={countries.filter((country) => country.name !== "Israel")}
          />

          <SampleInput
            label={local === "ar" ? "مكان الولادة" : "Birth Place"}
            local={local}
            name="birth_place"
            value={values.birth_place}
            handleChange={handleChange}
            inputType="text"
            placeholder={local === "ar" ? "مكان الولادة" : "Birth place"}
          />
        </div>

        {/* Phone & Card Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWithIcon
            label={local === "ar" ? "الهاتف الأرضي/المحمول" : "Phone Number"}
            local={local}
            Icon={HomeIcon}
            name="phone_number"
            value={values.phone_number}
            handleChange={handleChange}
            placeholder={local === "ar" ? "+212678490389" : "+212678490389"}
            inputType="tel"
          />

          <SampleInput
            value={values.national_id}
            handleChange={handleChange}
            inputType="text"
            label={local === "ar" ? "رقم البطاقة الشخصية" : "National ID / Card Number"}
            name="national_id"
            local={local}
            placeholder={local === "ar" ? "رقم البطاقة" : "Card number"}
          />
        </div>

        {/* Address */}
        <div>
          <InputWithIcon
            label={local === "ar" ? "العنوان" : "Address"}
            value={values.address}
            handleChange={handleChange}
            inputType="text"
            local={local}
            name="address"
            Icon={OfficeBuildingIcon}
            placeholder={local === "ar" ? "أدخل العنوان الكامل" : "Enter your full address"}
          />
        </div>

        {/* Notes & CV Upload */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label
              className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${
                local === "ar" ? "text-right" : "text-left"
              }`}
            >
              {local === "ar" ? "ملاحظات إضافية" : "Additional Notes"}
            </label>
            <textarea
              name="notes"
              rows="3"
              className={`w-full px-4 py-3 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500 transition-all duration-200 text-slate-100 placeholder:text-slate-500 resize-none ${
                local === "ar" ? "text-right" : "text-left"
              }`}
              placeholder={local === "ar" ? "أي ملاحظات إضافية..." : "Any additional notes..."}
              value={values.notes}
              onChange={handleChange}
            />
          </div>

          {/* CV Upload */}
          <div className="space-y-1.5">
            <label
              className={`block text-xs sm:text-sm font-arabicBold font-bold text-slate-200 ${
                local === "ar" ? "text-right" : "text-left"
              }`}
            >
              <span className="text-red-500 font-bold me-1">*</span>
              {local === "ar" ? "السيرة الذاتية (ملف PDF)" : "Curriculum Vitae (PDF File)"}
            </label>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex justify-center items-center flex-shrink-0 shadow-md">
                <ArrowUpIcon className="w-6 h-6 text-white" />
              </div>
              <input
                type="file"
                onClick={(e) => (e.target.value = null)}
                onChange={uploadHandler}
                accept={"application/pdf"}
                className="w-full px-3 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-300 focus:outline-none focus:border-red-500 cursor-pointer file:me-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-950 file:text-red-300 hover:file:bg-red-900"
              />
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <div
              className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm p-3.5 rounded-xl text-center font-arabicMedium shadow-sm"
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" text={local === "ar" ? "أكمل الطلب" : "Complete Application"} />
          </div>
        </div>
      </form>
    </div>
  );
}
