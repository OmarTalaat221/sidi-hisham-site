import axios from "axios";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLocation from "../../pages/payment/addLocation";
import { addToLocations } from "../../redux/auth";
import { clearMessage, setMessage } from "../../redux/message";

const initialState = {
  firstName: "",
  country: "",
  region: 0,
  shipRecipientNumber: "",
  shippFe: 0,
};

export default function AddLocation({ href }) {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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

  const router = useRouter();
  const dispatch = useDispatch();
  const { user, userLocations } = useSelector((state) => state.auth);
  const [successful, setSuccessful] = useState(false);

  //ShipmentsAddress address
  const [shipmentsAddress, setShipmentsAddress] = useState([]);
  const getShipmentsAddress = async (e) => {
    await axios
      .get("https://api.sedihisham.com/shippement/findall")
      .then((res) => {
        setShipmentsAddress(res.data);
        // console.log("ShipmentsAddress :" + JSON.stringify(shipmentsAddress));
      });
  };
  //find shippemnt by id
  const [shipmentsFee, setShipmentsFee] = useState("");
  const getShipmentsFee = async (e) => {
    await axios
      .get("https://api.sedihisham.com/shippement/find/" + values.region)
      .then((res) => {
        setShipmentsFee(res.data);
        // console.log("ShipmentsAddress :" + JSON.stringify(shipmentsAddress));
      });
  };

  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    getShipmentsAddress();
    getShipmentsFee();
  }, []);
  useEffect(() => {
    getShipmentsFee();
  }, [values.region]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { location_ar, additional_fees } = shipmentsFee;
    const { firstName, country, shipRecipientNumber, region } = values;
    if (!firstName || !region || !shipRecipientNumber) {
      dispatch(setMessage("Please Fill all the fields"));
    } else if (!region) {
      dispatch(setMessage("Please choose a region"));
    } else if (!shipRecipientNumber.startsWith("+")) {
      dispatch(setMessage("Your phone number must start with +"));
    } else if (shipRecipientNumber.length < 10) {
      dispatch(setMessage("Phone number must be > 10 numbers"));
    } else {
      const currentUser = { firstName, country, shipRecipientNumber, region };
      dispatch(
        addToLocations({
          firstName: firstName,
          country: country,
          region: shipmentsFee?.location_ar,
          customer_id: user?.customer_id,
          phone_number_recipent: shipRecipientNumber,
          shipmentsFee: shipmentsFee?.additional_fees,
          request_recipent_name: firstName,
        })
      );
      router.push("/payment/shiping-address");
      // alert("User :" + JSON.stringify(currentUser));
      // dispatch(addLocation(currentUser));
    }
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="flex flex-col">
      <p
        className={`mr-[10%] w-[80%]  mx-[10%] text-red-500 font-arabicMedium mb-4 ${
          local === "ar" ? "text-end" : "text-start"
        }`}
      >
        {local === "ar" ? " اضف عنوان" : "Add location"}
      </p>
      <form className="w-[80%] flex flex-col mx-[10%]" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 ">
          <div className="w-full md:w-1/2 px-3  ">
            <label
              className={`block   ${
                local === "ar" ? "text-end" : "text-start"
              } tracking-wide my-2 text-gray-700 text-xs font-bold mb-2`}
            >
              {local === "ar"
                ? " رقم مستلم الشحنة"
                : "Shipment recipient number"}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-full 
             py-2.5 px-4 leading-tight ${
               local == "ar" ? "text-end" : "text-start"
             }
             focus:outline-none focus:bg-white focus:border-gray-500`}
              type="tel"
              id="phone"
              pattern="[0-9]{0}+[0-9]{3}"
              // placeholder="+212628739303"
              name="shipRecipientNumber"
              value={values.shipRecipientNumber}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className={`block my-2   ${
                local === "ar" ? "text-end" : "text-start"
              } tracking-wide text-gray-700 text-xs font-bold mb-2`}
            >
              {local === "ar" ? " الاسم الاول" : "First name"}
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-full 
              py-2.5 px-4 leading-tight ${
                local == "ar" ? "text-end" : "text-start"
              }
              focus:outline-none focus:bg-white focus:border-gray-500`}
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 ">
          <div className="w-full md:w-1/2 px-3  ">
            <label
              className={`block my-2  ${
                local === "ar" ? "text-end" : "text-start"
              } tracking-wide text-gray-700 text-xs font-bold mb-2`}
            >
              {local === "ar" ? " المنطقة" : "Region"}
            </label>
            <select
              name="region"
              value={values.region}
              onChange={handleChange}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-full 
              py-2.5 px-4 leading-tight ${
                local == "ar" ? "text-end" : "text-start"
              }
              focus:outline-none focus:bg-white focus:border-gray-500`}
            >
              <option>Select a region</option>
              {shipmentsAddress.map((region, index) => (
                <option
                  className="flex justify-between"
                  key={index}
                  value={region.id}
                >
                  {region.location_ar} : + {region.additional_fees}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3  ">
            <label
              className={`block my-2  ${
                local === "ar" ? "text-end" : "text-start"
              } tracking-wide text-gray-700 text-xs font-bold mb-2`}
            >
              {local === "ar" ? " البلد" : "Country"}
            </label>
            <select
              name="country"
              value={values.country}
              onChange={handleChange}
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-full 
              py-2.5 px-4 leading-tight ${
                local == "ar" ? "text-end" : "text-start"
              }
              focus:outline-none focus:bg-white focus:border-gray-500`}
            >
              {countries
                .filter((country) => country.name !== "Israel")
                .map((country, index) => {
                  return (
                    <option
                      className="flex justify-between"
                      key={index}
                      value={country.name}
                    >
                      {country.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

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
        <div className="mt-6 space-y-3 flex flex-col">
          <button
            type="submit"
            className=" w-full font-arabicMedium flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#007530]  hover:bg-green-600 "
          >
            {local === "ar" ? "تثبيت العنوان" : "Submit address"}
          </button>
        </div>
      </form>{" "}
      {userLocations.length === 0 ? (
        <></>
      ) : (
        <button
          onClick={() => router.push("/payment/shiping-address")}
          className="mt-3 w-[80%] mx-[10%] font-arabicMedium flex justify-center items-center  rounded-full  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#D40017]   "
        >
          {local === "ar" ? "تخطي" : "Skip"}
        </button>
      )}
    </div>
  );
}
