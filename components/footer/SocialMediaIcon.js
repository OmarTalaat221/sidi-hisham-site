import React from "react";

export default function SocialMediaIcon({ src, href }) {
  const imgSrc = typeof src === "string" ? src : src?.src || src;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-2xs hover:shadow-md transition-all duration-300 hover:border-green-600 hover:bg-green-600 cursor-pointer shrink-0"
    >
      <img
        src={imgSrc}
        alt="Social Icon"
        className="h-5 w-5 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
      />
    </a>
  );
}
