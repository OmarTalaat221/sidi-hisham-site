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
    await axios.get("https://laravel-world.com/api/countries").then((res) => {
      setCountries(res.data.data);
      // console.log("res.data :"+JSON.stringify(res.data.data))
    });
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
    <div>
      <div>
        <StepsProgress stepNumber={2} />
      </div>
      <form
        onSubmit={onSubmit}
        className="md:w-[40%] flex flex-col mx-5  md:mx-[30%]  mb-5 justify-center space-x-2 "
      >
        <FormTitle
          local={local}
          text={local === "ar" ? "معلومات اساسية" : "Basic information"}
        />
        <div className="flex mx-3">
          <div className=" flex-[50%] ">
            <SelectCountry
              local={local}
              labelText={local === "ar" ? "الجنسية" : "Nationality"}
              name="nationalty"
              isTrue={false}
              value={values.nationalty}
              handleChange={handleChange}
              list={countries.filter((country) => country.name !== "Israel")}
            />
          </div>
          <div
            className={`flex  flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              label={local === "ar" ? "مكان الولادة" : "Birth place"}
              local={local}
              name="birth_place"
              value={values.birth_place}
              handleChange={handleChange}
              inputType="text"
            />
          </div>
        </div>
        <div className="flex mt-2">
          <div
            className={`flex  flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <InputWithIcon
              label={local === "ar" ? "الهاتف الارضي" : "Phone number"}
              local={local}
              Icon={HomeIcon}
              name="phone_number"
              value={values.phone_number}
              handleChange={handleChange}
              // placeholder="+212678490389"
              inputType="tel"
            />
          </div>{" "}
          <div
            className={`flex  flex-[50%] ${
              local === "ar" ? "justify-end" : "justify-start"
            }`}
          >
            <SampleInput
              value={values.national_id}
              handleChange={handleChange}
              // placeholder="رقم البطاقة الشخصية"
              inputType="text"
              label={local === "ar" ? "رقم البطاقة الشخصية" : "Card number"}
              name="national_id"
            />
          </div>
        </div>
        <div className="mt-2">
          <InputWithIcon
            label={local === "ar" ? "العنوان" : "Address"}
            value={values.address}
            handleChange={handleChange}
            // placeholder="العنوان"
            inputType="text"
            local={local}
            name="address"
            Icon={OfficeBuildingIcon}
          />
        </div>

        <div className="mx-3 mt-2">
          <label
            className={`block mb-3 mx-3 tracking-tight ${
              local === "ar" ? "text-end" : "text-start"
            } text-[13px] font-medium text-gray-600`}
          >
            {local === "ar" ? " ملاحظات" : "Notes"}
          </label>
          <div className="mr-[14px]">
            {" "}
            <textarea
              name="notes"
              rows="3"
              id="2"
              className="block  text-end p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              // placeholder="ملاحظات"
              value={values.notes}
              onChange={handleChange}
              type="text"
            ></textarea>
            <label
              className={`block mt-2 tracking-tight ${
                local === "ar" ? "text-end" : "text-start"
              } text-[13px] font-medium text-gray-600 `}
            >
              <span
                className={
                  local === "ar" ? "text-red-500 " : "text-red-500 hidden"
                }
              >
                *
              </span>{" "}
              {local === "ar" ? "السيرة الذاتية" : "Curriculum Vitae"}
            </label>
            <div className="flex space-x-3 mt-2">
              <div className=" w-10 h-10 mt-0.5 rounded-md bg-green-500 flex justify-center items-center">
                <ArrowUpIcon width={26} height={26} color="white" />
              </div>{" "}
              <input
                type="file"
                // name="cv_url"
                onClick={(e) => (e.target.value = null)}
                onChange={uploadHandler}
                accept={"application/pdf"}
                className=" text-end rounded-lg bg-gray-50 border text-gray-600 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2  "
                // placeholder="الاسم الكامل"
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
            <div className="my-2">
              <Button type="submit" text="اكمل الطلب" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
