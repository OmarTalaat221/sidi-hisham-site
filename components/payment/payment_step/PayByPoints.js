import React, { useEffect, useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import axios from "axios";

export default function PayByPoints() {
  //Get user points
  const { user } = useSelector((state) => state.auth);
  const { local } = useSelector((state) => state.language);
  const [userPoints, setPoints] = useState(0);
  const getCustomerData = async () => {
    await axios
      .get("https://api.sedihisham.com/users/customer/" + user?.customer_id)
      .then((res) => {
        setPoints(res?.data.points);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className=" mx-[26%] flex justify-end space-x-6 my-3 ">
      <div className="flex space-x-2 items-center">
        {local === "en" ? (
          <div className="flex justify-center items-center">
            <p className="text-sm tracking-tight mb-4 opacity-80 font-medium">
              You have in your account
            </p>
          </div>
        ) : (
          ""
        )}
        {local === "ar" ? <HomeIcon width={40} height={40} /> : ""}
        <div className="flex flex-col ">
          <p className="text-[24px] font-bold">{userPoints}</p>
          <p className="text-sm text-green-600 font-arabicMedium">
            {local === "ar" ? " اجمالي النقط" : "Total points"}
          </p>
        </div>
      </div>
      {local === "ar" ? (
        <div className="flex justify-center items-center">
          <p className="text-sm tracking-tight opacity-80 font-arabicMedium">
            {" "}
            لديك في حسابك
          </p>
        </div>
      ) : (
        ""
      )}
      {local === "en" ? <HomeIcon width={40} height={40} /> : ""}
    </div>
  );
}
