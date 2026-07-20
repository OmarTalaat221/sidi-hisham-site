import React, { useEffect, useState } from "react";
import FormTitle from "./FormTitle";
import InputWithIcon from "./InputWithIcon";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { HomeIcon, CalendarIcon, UserIcon } from "@heroicons/react/outline";
import RadioButton from "./RadioButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormRowSelect from "./FormRowSelect";
import FormRowRadio from "./FormRowRadio";
import Button from "./Button";
import StepsProgress from "./StepsProgress";
import { useRouter } from "next/router";
import { format } from "date-fns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFormData } from "../../redux/jobApplicationSlice";
import { clearMessage, setMessage } from "../../redux/message";

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

  // get Specialties
  const [specialties, setSpecialties] = useState([]);
  const getSpecialties = async () => {
    await axios
      .get(`https://api.sedihisham.com/careers/jobmanagement/findall`)
      .then((response) => {
        setSpecialties(response.data);
        // console.log(JSON.stringify(specialties));
      });
  };

  useEffect(() => {
    getSpecialties();
  }, []);
  // useEffect(() => {
  //   getSpecialties();
  // }, [specialties]);
  const [successful, setSuccessful] = useState(false);

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      sex,
      birdthday,
      family_status,
      full_name,
      speciality,
      serviceObl,
      email,
    } = values;
    if (!full_name) {
      dispatch(setMessage("Full name is empty"));
    } else if (!birdthday) {
      dispatch(setMessage("Birthday is empty"));
    } else if (!birdthday || !family_status) {
      dispatch(setMessage("Birthday or Family status is empty"));
    } else if (!speciality) {
      dispatch(setMessage("Specialty is empty"));
    } else {
      dispatch(addFormData(values));
      router.push("/job-application/addInfo");
    }
  };

  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="">
      <div className="">
        <StepsProgress stepNumber={1} />
      </div>
      <form
        onSubmit={onSubmit}
        className="md:w-[40%] flex mt-10 flex-col mx-5  md:mx-[30%]  mb-5 justify-center space-x-2 "
      >
        <FormTitle
          local={local}
          text={local === "ar" ? "معلومات اساسية" : "Basic information"}
        />
        <div className="space-y-4">
          <InputWithIcon
            local={local}
            label={local === "ar" ? "الاسم الكامل" : "Full name"}
            name="full_name"
            Icon={UserIcon}
            value={values.full_name}
            handleChange={handleChange}
            placeholder="الاسم الكامل"
            inputType="text"
          />
          <InputWithIcon
            label={local === "ar" ? "البريد الاكتروني " : "Email"}
            Icon={HomeIcon}
            name="email"
            local={local}
            value={values.email}
            handleChange={handleChange}
            placeholder=" البريد الاكتروني"
            inputType="email"
          />
          <div className="flex flex-col lg:flex-row mx-2 gap-4">
            <div className="flex-[50%] flex flex-col ">
              <label
                className={
                  local === "ar"
                    ? "mb-2 tracking-tight flex  text-[13px] font-medium text-gray-600 justify-end"
                    : "mb-2 tracking-tight flex  text-[13px] font-medium text-gray-600 justify-start"
                }
              >
                <span
                  className={
                    local === "ar" ? "text-red-500 " : "text-red-500 hidden"
                  }
                >
                  *
                </span>
                {local === "ar" ? " تاريخ الميلاد" : "Birthday"}
              </label>
              <div className="rounded-md mt-2 border-gray-300  border-[1px] flex items-center space-x-2">
                {/* <span className="inline-flex items-center px-3 py-2 text-sm text-gray-900  rounded-l-md border-r-[1px]  border-gray-300 ">
                  <CalendarIcon width={20} height={20} />
                </span> */}
                <input
                  className="px-3 py-2 text-center"
                  type="date"
                  name="birdthday"
                  // value={values.birdthday}
                  selected={values.birdthday}
                  onChange={handleChange}
                  value={values.birdthday}
                />
              </div>
            </div>
            <div className="flex-[50%] flex flex-col">
              <label
                className={`block mb-2 tracking-tight  text-[13px] font-medium text-gray-600 ${
                  local === "ar" ? "text-end" : "text-start"
                }`}
              >
                <span
                  className={
                    local === "ar" ? "text-red-500 " : "text-red-500 hidden"
                  }
                >
                  *
                </span>{" "}
                {local === "ar" ? "الحالة الاجتماعية" : "Social status"}
              </label>
              <div className="space-x-3 mt-1 flex flex-wrap">
                <div className="flex gap-3 lg:gap-0 lg:flex-col">
                  <RadioButton
                    text="ارمل "
                    local={local}
                    label={local === "ar" ? "ارمل" : "Widower"}
                    id="1"
                    handleChange={handleChange}
                    isChecked={values.family_status === "Widower"}
                    name="family_status"
                    value="Widower"
                  />

                  <RadioButton
                    text="اعزب"
                    label={local === "ar" ? "اعزب" : "Single"}
                    local={local}
                    id="2"
                    handleChange={handleChange}
                    isChecked={values.family_status === "Single"}
                    name="family_status"
                    value="Single"
                  />
                </div>
                <div className="flex gap-3 lg:gap-0 lg:flex-col">
                  <RadioButton
                    text="متزوج"
                    label={local === "ar" ? "متزوج" : "Married"}
                    id="3"
                    handleChange={handleChange}
                    isChecked={values.family_status === "Married"}
                    name="family_status"
                    value="Married"
                  />
                  <RadioButton
                    text="مطلق"
                    label={local === "ar" ? "مطلق" : "Divorced"}
                    handleChange={handleChange}
                    isChecked={values.family_status === "Devorce"}
                    name="family_status"
                    value="Devorce"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mx-2">
            <div className="flex-[50%] ">
              <label
                className={`block mb-3 tracking-tight ${
                  local === "ar" ? "text-end" : "text-start"
                } text-[13px] font-medium text-gray-600`}
              >
                <span
                  className={
                    local === "ar" ? "text-red-500 " : "text-red-500 hidden"
                  }
                >
                  *
                </span>
                {local === "ar" ? "الخدمة الإلزامية" : "Compulsory service"}
              </label>
              <div
                className={
                  local === "ar"
                    ? "flex justify-end space-x-3 mt-1"
                    : "flex justify-start space-x-3 mt-1"
                }
              >
                <RadioButton
                  text="متزوج"
                  label={local === "ar" ? "مؤجل" : "Reported"}
                  id="3"
                  handleChange={handleChange}
                  isChecked={values.serviceObl === "M"}
                  name="serviceObl"
                  value="M"
                />
                <RadioButton
                  text="مطلق"
                  label={local === "ar" ? "معفى" : "exempt"}
                  id="4"
                  handleChange={handleChange}
                  isChecked={values.serviceObl === "D"}
                  name="serviceObl"
                  value="D"
                />
              </div>
            </div>
            <div className="flex-[50%]">
              <label
                className={`block mb-3 tracking-tight ${
                  local === "ar" ? "text-end" : "text-start"
                } text-[13px] font-medium text-gray-600`}
              >
                {local === "ar" ? "الجنس" : "Sex"}
              </label>
              <div
                className={
                  local === "ar"
                    ? "flex justify-end space-x-3 mt-1"
                    : "flex justify-start space-x-3 mt-1"
                }
              >
                <RadioButton
                  text="انثى"
                  label={local === "ar" ? "انثى" : "Female"}
                  id="2"
                  handleChange={handleChange}
                  // isChecked={values.sex === false}
                  name="sex"
                  value={false}
                />
                <RadioButton
                  text="ذكر"
                  label={local === "ar" ? "ذكر" : "Male"}
                  id="1"
                  handleChange={handleChange}
                  // isChecked={values.sex === true}
                  name="sex"
                  value={true}
                />
              </div>
            </div>
          </div>
          <div className="px-2">
            <FormRowSelect
              local={local}
              labelText={
                local === "ar" ? "اختر الاختصاص" : "Choose the specialty"
              }
              name="speciality"
              value={values.speciality}
              handleChange={handleChange}
              list={specialties}
              isTrue={true}
            />
          </div>

          {message && (
            <div
              className="text-red-600 my-2 flex justify-center items-center"
              role="alert"
            >
              {message}
            </div>
          )}
          <div className="px-2">
            <Button
              type="submit"
              // onClick={() => router.push("/job-application/addInfo")}
              text={local === "ar" ? "اكمل الطلب" : "Next"}
            />
          </div>
        </div>{" "}
      </form>
    </div>
  );
}
