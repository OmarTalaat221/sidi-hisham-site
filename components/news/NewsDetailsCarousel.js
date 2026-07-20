import React from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";

export default function NewsDetailsCarousel({ sliderImages, videoUrl, text }) {
  function GraphCMSImageLoader({ src }) {
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  return (
    <div className="w-[100%] newsDetails">
      <Carousel preventDefaultTouchmoveEvent={true} enableMouseSwipe={false} showArrows={true}>
        {sliderImages?.map((item, index) => (
          <>
          <div
            key={index}
            className="flex justify-center items-center md:mt-0 mt-5 rounded-xl h-full w-full"
          >
            <OptimizedImage  alt="صورة سيدي هشام" src={`https://api.sedihisham.com/${item.image_url}`}
              loader={GraphCMSImageLoader}
              width={1000}
              height={500}
              className="rounded-xl !min-w-[97.4%]"
              quality={100}
            />
          </div>
         </>
        ))}
         <div
          className="newsHeight"
          style={{ position: "relative", zIndex: 122222222 }}
        >
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            style={{ margin: "0px 20px" }}
            controls
            // style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
      </Carousel>
    </div>
  );
}
