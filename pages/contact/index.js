import axios from "axios";
import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SampleInput from "../../components/contact-form/SampleInput";
import logo from "../../public/images/logo.png";
import { clearMessage, setMessage } from "../../redux/message";

const initialState = {
  sender_name: "",
  sender_phone: "",
  sender_email: "",
  subject: "",
  message: "",
};

export default function Index() {
  const [values, setValues] = useState(initialState);

  const { message } = useSelector((state) => state.message);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [values]);

  const sendMessage = async () => {
    await axios
      .post("https://api.sedihisham.com/messaging/send", values)
      .then((res) => {
        dispatch(setMessage("Message sent"));
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
      dispatch(setMessage("Please fill all fields"));
    } else {
      sendMessage();
    }
  };

  const { local } = useSelector((state) => state.language);
  return (
    <div className="mb-48 md:mb-1  h-screen bg-gradient-to-r from-red-700 via-red-300 to-red-700 py-24 w-screen">
      <form
        onSubmit={onSubmit}
        className="bg-white opacity-100 flew flex-col rounded-xl md:w-[60%] py-8  md:mx-[20%] shadow-md"
      >
        <div className="flex py-1 justify-center">
          <OptimizedImage src={logo} alt="Logo" width={300} height={132} />
        </div>{" "}
        <p
          className={`px-20 py-5 font-arabicMedium md:text-[16px] text-[16]px] opacity-80 tracking-tight ${
            local === "ar" ? "text-end" : "text-start"
          }`}
        >
          {local === "ar"
            ? " خبرتنا الواسعة ، فريق العمل الموهوب ، الرؤية والخيال تضيف إلى خدمة فريدة وجميلة"
            : "Our vast experience, talented team, vision and imagination add up to our service Unique and beautiful"}
        </p>{" "}
        <div className="flex md:flex-row flex-col justify-between px-20 my-2">
          <SampleInput
            local={local}
            // placeholder="الاسم الكامل"
            type="text"
            name="sender_name"
            value={values.sender_name}
            handleChange={handleChange}
            label={local === "ar" ? "الاسم الكامل" : "Full name"}
          />
          <SampleInput
            type="text"
            local={local}
            // placeholder="االهاتف الخلوي"
            name="sender_phone"
            value={values.sender_phone}
            handleChange={handleChange}
            label={local === "ar" ? "الهاتف الخلوي" : "Phone number"}
          />
          <SampleInput
            type="sender_email"
            name="sender_email"
            local={local}
            // placeholder="البريد اللاكتروني"
            value={values.sender_email}
            handleChange={handleChange}
            label={local === "ar" ? "البريد اللاكتروني" : "Email"}
          />
        </div>
        <div className="flex flex-col justify-between px-20 my-2">
          <SampleInput
            type="text"
            local={local}
            // placeholder="الموضوع"
            name="subject"
            value={values.subject}
            handleChange={handleChange}
            label={local === "ar" ? "الموضوع" : "Subject"}
          />

          <label
            className={
              local === "ar"
                ? "block text-end  mx-[2%] my-2 tracking-tight  text-[13px] font-medium text-gray-600"
                : "block  mx-[2%] my-2 tracking-tight text-start  text-[13px] font-medium text-gray-600"
            }
          >
            {local === "ar" ? "الرسالة" : "Message"}
          </label>
          <textarea
            rows="4"
            className={`w-[96%]  flex flex-col justify-center ${
              local === "ar" ? "text-end" : "text-start"
            } mx-[2%]  px-3 my-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 `}
            type="text"
            placeholder={
              local === "ar" ? "اكتب الرسالة هنا" : "Your message here"
            }
            name="message"
            value={values.message}
            onChange={handleChange}
            label="الرسالة"
          ></textarea>
        </div>
        {message && (
          <div
            className="text-red-500 my-4 flex justify-center items-center"
            role="alert"
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          className="rounded-md  w-[40%] mx-[30%]
          bg-gradient-to-r from-[#970011] via-red-500 to-[#970011]
       hover:font-bold cursor-pointer text-sm  h-6 py-6 tracking-wide hover:opacity-100 opacity-80 text-white flex justify-center items-center  px-6 "
        >
          {local === "ar" ? "    ارسال الرسالة" : "Send message"}
        </button>
      </form>
      <div></div>
    </div>
  );
}
