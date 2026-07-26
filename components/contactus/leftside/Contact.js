import React from "react";
import { MailIcon } from "@heroicons/react/outline";

export default function Contact({ title, email }) {
  return (
    <a
      href={`mailto:${email}`}
      className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/80 hover:bg-red-50/70 border border-gray-100 hover:border-red-200 transition-all duration-200 group my-1.5"
    >
      <div className="flex items-center gap-2 min-w-0">
        <MailIcon className="w-4 h-4 text-gray-400 group-hover:text-[#7c1422] transition-colors shrink-0" />
        <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-[#7c1422] transition-colors truncate">
          {email}
        </span>
      </div>
      {title && (
        <span className="text-xs text-gray-400 font-arabicMedium shrink-0">
          {title}
        </span>
      )}
    </a>
  );
}
