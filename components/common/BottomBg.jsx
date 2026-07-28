import React from "react";

function BottomBg({
  className = "",
  img = "/images/shape_white_transparent.png",
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-[-1px] z-[50] h-[28px] w-full select-none sm:h-[34px] md:h-[40px] lg:h-[46px] ${className}`}
      style={{
        backgroundImage: `url("${img}")`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center bottom",
        backgroundSize: "auto 100%",
      }}
    />
  );
}

export default React.memo(BottomBg);
