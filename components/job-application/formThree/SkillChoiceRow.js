import React from "react";
import RadioButton from "../RadioButton";

export default function SkillChoiceRow() {
  return (
    <div className="flex space-x-6 justify-center ">
      <div className="flex space-x-4 ">
        <RadioButton text="الشهادات" />
        <RadioButton text="الشهادات" />
        <RadioButton text="الشهادات" />
        <RadioButton text="الشهادات" />{" "}
      </div>
      <p className="-mt-1.5 font-medium">: Windows </p>
    </div>
  );
}
