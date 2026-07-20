import React from "react";

export default function Contact({ title, email }) {
  return (
    <div className="flex justify-center py-1 ">
      <p className="text-sm text-gray-700 opacity-80 font-arabicMedium">
        {email}
      </p>{" "}
      <p className="text-sm text-gray-700 opacity-80 font-arabicLight">
        {title}
      </p>
    </div>
  );
}
