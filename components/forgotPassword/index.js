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

export default function ForgotPassword({ toPage }) {
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

  // Modal state
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [code, setCode] = useState("");

  // New password modal state
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("onSubmit called");
    const { email } = values;
  
    console.log("fetching...");
    await fetch("https://ad.sedihisham.com/send-reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: email }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.messageId) {
          setMessage(result.messageId);
          setSuccessful(true);
          setShowCodeModal(true); // Show modal on success
        } else {
          setMessage(result.messageId);
          setSuccessful(false);
        }
      })
      .catch((error) => console.error(error));
  };

  // Handle code submission (now with backend verification)
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ad.sedihisham.com/validate-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          email: values.email,
        }),
      });
      const result = await response.json();
      if (result.isValid) {
        setShowCodeModal(false);
        setShowNewPasswordModal(true); // Show new password modal
        setMessage(""); // Clear previous messages
      } else {
        setMessage(result.message || (local === "ar" ? "رمز غير صحيح" : "Invalid code"));
      }
    } catch (error) {
      setMessage(local === "ar" ? "حدث خطأ ما" : "Something went wrong");
    }
  };

  // Handle new password submission
  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage(local === "ar" ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
      return;
    }
    try {
      const response = await fetch("https://ad.sedihisham.com/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          code,
          newPassword,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setShowNewPasswordModal(false);
        setMessage(local === "ar" ? "تم تغيير كلمة المرور بنجاح!" : "Password changed successfully!");
        // Reset all forms
        router.push("/login");
        setValues(initialState);
        setCode("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccessful(false);
      } else {
        setMessage(result.message || (local === "ar" ? "حدث خطأ" : "Something went wrong"));
      }
    } catch (error) {
      setMessage(local === "ar" ? "حدث خطأ ما" : "Something went wrong");
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
          {local === "ar" ? "هل نسيت كلمة السر؟" : "Forgot password?"}
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
              {local === "ar" ? "إستعادة كلمة المرور" : "Recover password"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light cursor-pointer text-center text-gray-700">
          {local === "ar"
            ? "تذكرت كلمة المرور الخاصة بك؟"
            : "Remembered your password?"}
          <Link href="/login">
            <p className="font-medium cursor-pointer text-red-600 hover:underline">
              {local === "ar" ? "عُد" : "Go back"}
            </p>
          </Link>
        </p>
      </div>

      {/* Modal for code input */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center text-[#007530]">
              {local === "ar" ? "أدخل رمز التحقق" : "Enter Verification Code"}
            </h2>
            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#007530]"
                placeholder={local === "ar" ? "رمز التحقق" : "Verification code"}
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => setShowCodeModal(false)}
                >
                  {local === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#007530] text-white hover:bg-green-600"
                >
                  {local === "ar" ? "تأكيد" : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for new password input */}
      {showNewPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center text-[#007530]">
              {local === "ar" ? "تعيين كلمة مرور جديدة" : "Set New Password"}
            </h2>
            <form onSubmit={handleNewPasswordSubmit}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#007530]"
                placeholder={local === "ar" ? "كلمة المرور الجديدة" : "New password"}
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#007530]"
                placeholder={local === "ar" ? "تأكيد كلمة المرور" : "Confirm password"}
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => setShowNewPasswordModal(false)}
                >
                  {local === "ar" ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#007530] text-white hover:bg-green-600"
                >
                  {local === "ar" ? "تأكيد" : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
