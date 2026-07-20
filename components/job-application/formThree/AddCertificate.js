import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import SampleInput from "../SampleInput";

export default function AddCertificate({ onClick }) {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      className="flex flex-col cursor-pointer  space-x-3 pr-[15px]"
    >
      <div className="flex justify-end space-x-2">
        <p className="text-[#D40017]  text-[18px] font-arabicMedium ">
          اضافة شهادة جديدة
        </p>{" "}
        <div className="mt-1">
          {" "}
          <PlusCircleIcon color="#D40017" width={20} height={20} />
        </div>
      </div>
      {show ? (
        <div className="mt-3">
          <div className="flex">
            <div className="flex flex-[50%] justify-end">
              <SampleInput label="مدة الدراسة" name="name" />
            </div>
            <div className="flex mx-3 flex-[50%] justify-end">
              <SampleInput label="التخصص" name="name" />
            </div>
          </div>{" "}
          <div className="flex mt-2 pl-[50%] pr-3 justify-end">
            <SampleInput label="سنة التخرج" name="name" />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
