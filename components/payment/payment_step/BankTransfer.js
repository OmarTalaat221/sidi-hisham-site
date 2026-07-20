import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfoRow from "./InfoRow";

export default function BankTransfer() {
  const [bankTransferData, setBankInfoData] = useState();
  const getBankTransferInfos = async () => {
    await axios
      .get("https://api.sedihisham.com/settings/findbank")
      .then((response) => {
        setBankInfoData(response.data);
      });
  };

  useEffect(() => {
    getBankTransferInfos();
  }, []);

  const { local } = useSelector((state) => state.language);
  return (
    <div className="flex flex-col my-3">
      <div className="flex flex-col justify-center mt-3 items-center">
        <p className="text-green-600 font-arabicBold text-[18px]">
          {local === "ar"
            ? " تعليمات التحويل البنكي"
            : "Bank transfer instructions"}
        </p>
        <p className="text-sm opacity-80 font-arabicMedium text-red-600">
          {local === "ar"
            ? "الرجاء تحويل المبلغ الى حسابنا البنكي"
            : "Please transfer the amount to our bank account"}
        </p>
      </div>
      <div className="mt-3 flex justify-center flex-col items-center">
        <InfoRow
          title={local === "ar" ? "اسم البنك" : "Bank name"}
          value={bankTransferData?.name}
        />
        <InfoRow
          title={local === "ar" ? "رقم الحساب" : "Account number"}
          value={bankTransferData?.account_number}
        />
        <InfoRow
          title={local === "ar" ? "رقم البيان" : "Statement number"}
          value={bankTransferData?.statement_number}
        />
        <InfoRow
          title={local === "en" ? "Message" : "الرسالة"}
          value={bankTransferData?.message}
        />
      </div>
    </div>
  );
}
