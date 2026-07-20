
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth";
import { clearMessage, setMessage } from "../../redux/message";
import NumInput from "./NumInput";

const initialState = {
  number1: "",
  number2: "",
  number3: "",
  number4: "",
};

export default function Otp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { message } = useSelector((state) => state.message);
  const { local } = useSelector((state) => state.language);

  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const { code, userToRegister } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    const { number1, number3, number2, number4 } = values;
    const num = "" + number1 + number2 + number3 + number4;
    if (!number1 || !number2 || !number3 || !number4) {
      dispatch(setMessage("Please Fill all the fields"));
    } else if (code === parseInt(num)) {
      router.push("/");
    } else {
      dispatch(setMessage("Code do not match"));
    }
  };

  return (
    <div className="relative  flex  flex-col justify-center   overflow-hidden">
      <div className="bg-white rounded-md   ">
        <p
          className={`text-xl flex font-arabicBold tracking-wide ${
            local === "ar" ? "justify-end" : "justify-start"
          } items-center text-[#007530]`}
        >
          {local === "ar" ? " تسجيل حساب جديد" : "Create new account"}
        </p>
        <div>
          <p
            className={`mt-3 text-sm font-arabicBold ${
              local === "ar" ? "text-end" : "text-start"
            } text-[#D40017]`}
          >
            {local === "ar" ? " تأكيد البريد الالكتروني" : "Confirm email"}
          </p>
          <p
            className={`mt-3 text-xs font-arabicLight ${
              local === "ar" ? "text-end" : "text-start"
            } text-gray-700`}
          >
            {local === "ar"
              ? "  ادخل الأرقام التي ستصلك على  البريد الالكتروني"
              : "Enter the code you received in your email"}
          </p>
        </div>

        <form className="mt-10" onSubmit={onSubmit}>
          <div className="mt-6 ml-auto max-w-xs">
            <div className="bg-[#48A03A]  h-28 flex items-center justify-between px-6 rounded-xl opacity-25">
              <NumInput
                value={values.number1}
                name="number1"
                handleChange={handleChange}
              />
              <NumInput
                value={values.number2}
                name="number2"
                handleChange={handleChange}
              />
              <NumInput
                value={values.number3}
                name="number3"
                handleChange={handleChange}
              />
              <NumInput
                value={values.number4}
                name="number4"
                handleChange={handleChange}
              />
            </div>

            {/* <p className="mt-3  text-xs font-arabicLight text-center text-gray-700">
              <span className="font-medium mr-1">0:30</span> إعادة ارسال الكود
              خلال
            </p> */}
            {message && (
              <div
                className={
                  "text-red-500 font-medium flex justify-center items-center my-2"
                }
                role="alert"
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-[60%] mx-[20%] font-arabicMedium flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#007530]  hover:bg-green-600 "
            >
              {local === "ar"
                ? "تأكيد رمز التحقق"
                : "Confirm verification code "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
