import axios from "axios";
import { post } from "jquery";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import {
  addCode,
  register,
  setUserData,
  setUserToRegister,
} from "../../redux/auth";
import { clearMessage, setMessage } from "../../redux/message";
import FormRow from "./FormRow";
import 'react-phone-input-2/lib/style.css';

const initialState = {
  fullName: "",
  email: "",
  password: "",
  phone_num: "",
  first_name: "",
  last_name: "",
};

export default function SignUp() {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(JSON.stringify(values.phone_num))
  };

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [otpCode, setOtpCode] = useState(0);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (
    email,
    password,
    phone_num,
    firt_name,
    last_name
  ) => {
    setIsLoading(true);
    await axios
      .post("https://api.sedihisham.com/auth/customer/local/signup", {
        email: email,
        password: password,
        phone_num: phone_num,
        firt_name: firt_name,
        last_name: last_name,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        dispatch(setUserData(res.data));
        dispatch(setMessage("تم الاشتراك بنجاح"));

        window.location.href = "/login";
      })
      .catch((error) => {
        setIsLoading(false);
        dispatch(
          setMessage(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          )
        );
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, phone_num, last_name, first_name } = values;
    if (!email || !password || !phone_num) {
      dispatch(setMessage("Please Fill all the fields"));
      setSuccessful(false);
    } else if (!phone_num.startsWith("+")) {
      dispatch(setMessage("Your phone number must start with +"));
    } else if (phone_num < 10) {
      dispatch(setMessage("Phone number must be > 10 numbers"));
    } else {
      registerUser(email, password, phone_num, last_name, first_name);
    }
  };

  // const sendCode = async (email)=>{

  // }

  // useEffect( async ()=>{
  //   console.log(values.email)
  //   const {email} = values
  //     if(token !=="" && email){
  //        await axios.post("https://api.sedihisham.com/auth/sendemail",{"email":email})
  //         .then((res)=>{
  //           dispatch(addCode(res.data)) &&
  //           router.push("/payment/otp");
  //         }).catch((error)=>{
  //           alert("error :"+error)
  //         })
  //     }

  //   },[token])
  const { local } = useSelector((state) => state.language);

  return (
    <div className="relative   flex  flex-col justify-center   overflow-hidden">
      <div className=" m-auto   w-[90%] bg-white rounded-md   ">
        <p
          className={`text-xl flex mb-3 font-arabicBold tracking-wide ${
            local === "ar" ? "justify-end" : "justify-start"
          }  items-center text-[#007530]`}
        >
          {local === "ar" ? " تسجيل حساب جديد" : "Create an account"}
        </p>

        <form className="" onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 ">
            <div className="w-full md:w-1/2 px-3  ">
              <label
                className={`block  ${
                  local === "ar" ? "text-end" : "text-start"
                } tracking-wide
               text-gray-700 text-xs font-arabicMedium mb-2`}
              >
                {local === "ar" ? " الاسم الاخير" : "Last name"}
              </label>
              <input
                className={`appearance-none rounded-full  block w-full bg-gray-200
                text-gray-700 border   py-2.5 px-4 mb-3
                 leading-tight focus:outline-none focus:bg-white ${
                   local === "ar" ? "text-end" : "text-start"
                 }`}
                type="text"
                // placeholder={local === "ar" ? "الاسم الاخير" : "Last name"}
                value={values.last_name}
                name="last_name"
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className={`block  ${
                  local === "ar" ? "text-end" : "text-start"
                } tracking-wide
               text-gray-700 text-xs font-arabicMedium mb-2`}
              >
                {local === "ar" ? "الاسم الاول" : "First name"}
              </label>
              <input
                className="appearance-none text-end block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-full py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                // placeholder=" الاسم الاول"
                value={values.first_name}
                name="first_name"
                onChange={handleChange}
              />
            </div>
          </div>

          <FormRow
            name="phone_num"
            value={values.phone_num}
            handleChange={handleChange}
            label={local === "ar" ? "رقم الجوال" : "Phone number"}
            // placeholder="رقم الجوال"
            inputType="tel"
            minLength="9"
            maxLength="14"
            size={14}
          />
          {/* <PhoneInput
           country={'us'} 
           value={values.phone_num}
           handleChange={phone => setValues({ ...values, phone_num: {phone}})}
           
/> */}
          <FormRow
            name="email"
            value={values.email}
            handleChange={handleChange}
            // placeholder=" البريد الاكتروني"
            label={local === "ar" ? " البريد الاكتروني" : "Email"}
            inputType="email"
          />
          <FormRow
            label={local === "ar" ? "كلمة المرور" : "Password"}
            // placeholder="كلمة المرور"
            inputType="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-700">
            {message && (
              <div
                className={successful ? "text-green-600" : "text-red-500"}
                role="alert"
              >
                {message}
              </div>
            )}
          </p>

          <div className="mt-6">
            <button
              disabled={isLoading}
              type="submit"
              className=" w-[60%] mx-[20%] flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#007530]  hover:bg-green-600 "
            >
              {local === "ar" ? " انشاء حساب جديد" : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          {local === "ar" ? " لديك حساب؟" : "Already have an account?"}
          <Link href="/login">
            <p className="font-medium text-red-600 hover:underline">
              {local === "ar" ? "  تسجيل الدخول" : "Login"}
            </p>
          </Link>
        </p>
      </div>
    </div>
  );
}
