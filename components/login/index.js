import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth";
import { clearMessage, setMessage } from "../../redux/message";
import FormRow from "../signup/FormRow";

const initialState = {
  email: "",
  password: "",
};

export default function Login({ toPage }) {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);

  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      // displayAlert();
      setSuccessful(false);
      dispatch(setMessage("Please fill all the fields"));
    } else {
      dispatch(login({ email, password }))
        .then((response) => {
          if (response?.payload?.user) {
            router.push("/");
            dispatch(clearMessage());
          }
          // alert(JSON.stringify(response.payload.user));
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  const { local } = useSelector((state) => state.language);

  return (
    <div className="relative  flex  flex-col justify-center   overflow-hidden">
      <div className=" p-6 m-auto w-full  md:w-[80%] bg-white rounded-md   ">
        <p
          className={`text-xl flex  font-arabicBold tracking-wide ${
            local === "ar" ? "justify-end" : "justify-start"
          } items-center text-[#007530]`}
        >
          {local === "ar" ? " تسجيل الدخول إلى حسابك" : "Login to your account"}
        </p>

        <form className="mt-10" onSubmit={onSubmit}>
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
            label={local === "ar" ? " البريد الاكتروني" : "Email"}
            inputType="text"
          />
          <FormRow
            label={local === "ar" ? "كلمة المرور" : "Password"}
            inputType="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />

          {/* <p
            className="text-xs flex justify-end font-arabicLight my-2 text-red-600 hover:underline"
          >
            هل نسيت كلمة المرور
          </p> */}

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
              type="submit"
              className=" w-[60%] mx-[20%] font-arabicMedium flex justify-center cursor-pointer items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#007530]  hover:bg-green-600 "
            >
              {local === "ar" ? "  تسجيل الدخول" : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-8 space-y-4">
          <div className="mt-8 text-xs font-light cursor-pointer text-center text-gray-700">
            {local === "ar" ? " ليس لديك حساب؟" : "You don't have account?"}
            <Link href="/signup">
              <p className="font-medium cursor-pointer text-red-600 hover:underline">
                {local === "ar" ? " اشتراك الان" : "Register Now"}
              </p>
            </Link>
          </div>
          <div className="mt-8 text-xs font-light cursor-pointer text-center text-gray-700">
            {local === "ar" ? "نسيت كلمة السر؟" : "Forgot your password?"}
            <Link href="/forgot-password">
              <p className="font-medium cursor-pointer text-red-600 hover:underline">
                {local === "ar" ? "انقر هنا" : "Click here"}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
