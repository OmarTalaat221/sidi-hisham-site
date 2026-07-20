import axios from "axios";
import OptimizedImage from "@/components/common/OptimizedImage";
import React, { useEffect, useState } from "react";
import JobApplicationSent from "../../components/alert/JobApplicationSent";
import FormOne from "../../components/job-application/FormOne";
import FormThree from "../../components/job-application/formThree/FormThree";
import FormTwo from "../../components/job-application/FormTwo";
import StepsProgress from "../../components/job-application/StepsProgress";
import contactImage from "../../public/images/contactImg.png";
import SEO from '@/components/SEO';
export default function Index() {
  //get the home page
  const [backImage, setBackImage] = useState("");
  const getBackImage = async () => {
    await axios
      .get("https://api.sedihisham.com/pages/getall/career")
      .then((res) => {
        // const back = res.data?.find((item)=>item.categoryImage === "Career")
        setBackImage(res.data[0]?.path_image);
        // console.log("back : "+JSON.stringify(res.data[0]?.path_image))
      });
  };

  useEffect(() => {
    getBackImage();
  }, []);

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/` + src;
    } else {
      return "/images/eim.png";
    }
  }
  return (
    <div className=" flex flex-col space-y-10">
      <SEO 
        title="سيدي هشام - شركة العقاد للصناعة والتجارة"
        description="شركة العقاد للصناعة والتجارة هي شركة رائدة في مجال صناعة الغذائيات حيث توفر علاماتنا التجارية سيدي هشام منتجات موثوقة"
        keywords="سيدي هشام, شركة العقاد, صناعة غذائيات, منتجات موثوقة"
        type="website"
        image="https://www.sedihisham.com/images/logo.png"
      />
      <div className=" relative z-10 w-full h-[60vh] rounded-xl">
        <OptimizedImage  alt="صورة سيدي هشام" 
          loader={GraphCMSImageLoader}
          src={"https://api.sedihisham.com/" + backImage}
          layout="fill"
        />
      </div>
      <FormOne />
    </div>
  );
}
