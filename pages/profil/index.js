import React, { useEffect, useState } from "react";
import FormRow from "../../components/payment/FormRow";
import Breadcrumb from "../../components/profile/BreadCrumb";
import CheckBoxItem from "../../components/profile/CheckBoxItem";
import FormRowWithIcon from "../../components/profile/FormRowWithIcon";
import FormRowPassword from "../../components/signup/FormRowPassword";
import { HomeIcon } from "@heroicons/react/outline";
import axios, { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearMessage, setMessage } from "../../redux/message";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  oldPassword: "",
  newPassword: "",
  location: "",
  locationDetails: "",
  gender: "",
};

export default function Profil() {
  const [values, setValues] = useState(initialState);
  const [showModal, setShowModal] = useState(false);

  const { message } = useSelector((state) => state.message);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [showModal]);

  const router = useRouter();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async () => {
    await axios
      .post(
        "https://api.sedihisham.com/users/update/customer/" + user?.customer_id,
        { ...values, gender: Boolean(values.gender) }
      )
      .then((res) => {
        setShowModal(true);
        // console.log(res.data);
      })
      .catch((error) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phone,
      oldPassword,
      newPassword,
      confirmNewPassword,
      location,
      locationDetails,
    } = values;
    saveChanges();
  };

  const { local } = useSelector((state) => state.language);

  //Get customr details
  const [customerData, setCustomerData] = useState("");
  const getCustomerDetails = async () => {
    await axios
      .get("https://api.sedihisham.com/users/customer/" + user?.customer_id)
      .then((response) => {
        setCustomerData(response.data);
      })
      .catch((error) => {
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

  useEffect(() => {
    getCustomerDetails();
  }, []);

  //Get customr details
  const [customerBranche, setCustomerBranche] = useState("");
  const getCustomerBranches = async () => {
    await axios
      .get("https://api.sedihisham.com/orders/address/" + user?.customer_id)
      .then((response) => {
        // console.log(response.data)
        setCustomerBranche(response.data);
      })
      .catch((error) => {
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

  useEffect(() => {
    getCustomerBranches();
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      firstName: customerData.first_name,
      lastName: customerData.last_name,
      email: customerData.email,
      phone: customerData.phone_number,
      location: customerBranche[0]?.branch,
      locationDetails: customerBranche[0]?.shipping_add,
      gender: customerBranche[0]?.gender
        ? customerBranche[0]?.gender
        : customerData?.gender == "Male",
    });
  }, [customerData, customerBranche]);

  // console.log('Data to send :'+JSON.stringify(values))

  return (
    <>
      <div className="w-full">
        <div
          className={`flex ${
            local === "ar" ? "justify-end" : "justify-start"
          } md:w-[80%] md:mx-[10%] mb-8 mt-24`}
        >
          <Breadcrumb />
        </div>
        <form
          onSubmit={onSubmit}
          className="md:w-[60%] mb-20 mx-[5%]  flex flex-col md:mx-[20%]"
        >
          <div className="flex flex-wrap  ">
            <FormRow
              local={local}
              type="text"
              placeholder={local === "ar" ? " الاسم الاخير" : "Last name"}
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
              label={local === "ar" ? " الاسم الاخير" : "Last name"}
            />
            <FormRow
              local={local}
              type="text"
              name="lastName"
              placeholder="الاسم العائلي"
              value={values.lastName}
              handleChange={handleChange}
              label={local === "ar" ? "الاسم العائلي" : "First name"}
            />
          </div>
          <div className="flex flex-wrap  ">
            <FormRow
              local={local}
              type="text"
              placeholder={local === "ar" ? "االهاتف الخلوي" : "Phone number"}
              name="phone"
              value={values.phone}
              handleChange={handleChange}
              label={local === "ar" ? "االهاتف الخلوي" : "Phone number"}
            />
            <FormRow
              local={local}
              type="email"
              name="email"
              placeholder={local === "ar" ? " البريد الاكتروني" : "Email"}
              value={values.email}
              handleChange={handleChange}
              label={local === "ar" ? " البريد الاكتروني" : "Email"}
            />
          </div>
          <div className="flex  justify-end mt-1 w-full">
            <FormRowPassword
              local={local}
              name="oldPassword"
              // placeholder={local === "ar" ? "كلمة المرور القديمة" : "Old password"}
              value={values.oldPassword}
              handleChange={handleChange}
              label={local === "ar" ? "كلمة المرور القديمة" : "Old password"}
            />{" "}
            <FormRowPassword
              local={local}
              name="newPassword"
              // placeholder="كلمة المرور الجديدة"
              value={values.newPassword}
              handleChange={handleChange}
              label={local === "ar" ? "كلمة المرور الجديدة" : "New password"}
            />
          </div>
          <div className="flex flex-wrap mt-3 ">
            {/* <FormRowPassword
             local={local}
              name="confirmNewPassword"
              placeholder="تاكيد كلمة المرور"
              value={values.confirmNewPassword}
              handleChange={handleChange}
              label={local === "ar" ? "تاكيد كلمة المرور" : "Confirm new password"}
            /> */}
          </div>
          <div>
            <label
              className={`block  mx-3 mt-3 ${
                local === "ar"
                  ? "text-end md:ml-[50%]"
                  : " md:ml-[51%]   text-start"
              } tracking-wide  text-xs font-arabicMedium mb-2`}
            >
              {local === "ar" ? "الجنس" : "Sex"}
            </label>
            <div
              className={`mt-3 flex md:w-[50%] md:ml-[50%]  items-center ${
                local === "ar" ? "justify-end" : "justify-start"
              }`}
            >
              <CheckBoxItem
                name="gender"
                local={local}
                handleChange={handleChange}
                isChecked={values.gender === false} // Check if gender is false
                label={local === "ar" ? "انثى" : "Female"}
                value={false}
              />
              <CheckBoxItem
                handleChange={handleChange}
                isChecked={values.gender === true} // Check if gender is true
                label={local === "ar" ? "ذكر" : "Male"}
                name="gender"
                value={true}
              />
            </div>
            {/* <div className="flex flex-wrap  mt-1 ">
              <FormRow
                local={local}
                type="text"
                placeholder="معلومات تفصيلية عن العنوان"
                name="locationDetails"
                value={values.locationDetails}
                handleChange={handleChange}
                label={
                  local === "ar"
                    ? "معلومات تفصيلية عن العنوان"
                    : "Detailed address information"
                }
              />
              <FormRowWithIcon
                name="location"
                local={local}
                value={values.location}
                handleChange={handleChange}
                label={local === "ar" ? "العنوان" : "Address"}
                Icon={HomeIcon}
              />
            </div> */}
          </div>
          {message && (
            <div
              className="text-red-500 flex justify-center items-center"
              role="alert"
            >
              {message}
            </div>
          )}
          <div className="mt-6">
            <button
              type="submit"
              className=" w-[60%] mx-[20%] flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#D40017]  hover:bg-[#a7081a] "
            >
              {local === "ar" ? "   حفظ التغيرات" : "Save changes"}
            </button>
          </div>
        </form>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative md:w-[35%] w-[80%] my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex justify-center items-center text-end p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl text-end font-arabicBold">
                      {local === "ar" ? " تحديث الحساب" : "Update profil"}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 w-full h-auto flex-auto">
                    <p className="my-4 text-slate-500 text-end font-arabicMedium text-lg leading-relaxed">
                      {local === "ar" ? " تم حفظ التغييرات" : "Changes saved"}
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-[#D40017] background-transparent font-bold  px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      {local === "ar" ? " اغلاق" : "Close"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
     </>
  );
}
