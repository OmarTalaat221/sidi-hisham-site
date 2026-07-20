import { useState, useRef, useEffect } from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import axios from "axios";
import Item from "antd/lib/list/Item";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
import { useWidth } from "../../util/useWidth.ts";

const CertificatesGallery = ({ data }) => {
  const { isMobile } = useWidth();

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  return (
    <div className="mx-8">
      <div className="flex w-full flex-col  ">
        {data?.length === 0 ? (
          <div className="text-red-400">
            There is no images show in for this silder
          </div>
        ) : (
          <Carousel preventDefaultTouchmoveEvent={true} enableMouseSwipe={false} 
            itemsToShow={isMobile ? 1 : 2}
            pagination={false}
            className="text-red-600 "
          >
            {data
              ?.filter((img) => img.categoryImage === "Quality_certificates")
              .map((item, index) => (
                <div
                  key={item.id}
                  className="flex rounded-xl h-full justify-center items-center w-full"
                >
                  {isMobile ? (
                    <OptimizedImage key={index}
                      // loader={GraphCMSImageLoader}
                      width={250}
                      height={300}
                      src={"https://api.sedihisham.com/" + item.path_image}
                      alt=""
                    />
                  ) : (
                    <OptimizedImage key={index}
                      // loader={GraphCMSImageLoader}
                      width={300}
                      height={400}
                      src={"https://api.sedihisham.com/" + item.path_image}
                      alt=""
                    />
                  )}
                </div>
              ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default CertificatesGallery;
