import OptimizedImage from "@/components/common/OptimizedImage";
import React from "react";
import grots from "../../../public/images/grots.png";
import pathHome from "../../../public/images/pathHome.png";
import ketchenPath from "../../../public/images/ketchenPath.png";
import NumberOne from "./NumberOne";
import GoldOne from "../../../public/images/Number-1-Gold.I02.png";
import GoldTwo from "../../../public/images/2-Gold.I02.png";
import GoldThree from "../../../public/images/3-Gold.I02.png";
import NumberTwo from "./NumberTwo";
import oil from "../../../public/images/oil.png";
import kebeh from "../../../public/images/kebeh.png";
import NumberThree from "./NumbertThree";

const Kitchen = () => {
  return (
    <div className="h-screen mx-10 mb-[330px]  ">
      <div className="h-screen mx-10 mb-[400px]">
        {" "}
        <div className="w-full relative mt-36  z-30">
          <OptimizedImage  alt="صورة سيدي هشام" src={pathHome} />
        </div>
        <div className="flex mx-[10%] relative -mt-48">
          <div className="w-100 h-100 flex-[0.5] ">
            <OptimizedImage  alt="صورة سيدي هشام" src={grots} />
          </div>
          <div className="flex flex-col flex-[0.5] mt-10">
            <p className="font-arabicBold text-3xl ">مطبخ سيدي هشام</p>
            <p className="my-4 font-arabicLight ">
              نقدم لكم طرق و وصفات اشهى الوجبات <br /> مع جميع الاحتياجات
              والمقادير
            </p>
            <p className="font-arabicMedium text-xl ">
              وصفة الكبة المقلية من برغل سيدي هشام
            </p>{" "}
            <button className="bg-red-600 font-arabicLight text-center my-10 rounded-full w-40 py-2 text-white">
              عرض المزيد
            </button>
          </div>
        </div>
        <div className="w-[70%] h-3/6  ml-[10%]  mt-96 flex justify-end items-end ">
          {" "}
          <OptimizedImage  alt="صورة سيدي هشام" src={ketchenPath} />
        </div>
        <div className="absolute ml-[50%] -mt-[560px]">
          <NumberOne
            image={GoldOne}
            title=" مطبخ سيدي هشام"
            desc="   كيلو من البرغل سيدي هشام الناعم 2 كوب من الماء- نصف كيلو من اللحم -
          بصلة كبيرة - ملعقة كبيرة من دبس الرمان. ملح وفلفل أسود-2 ملعقة كبيرة
          من البردقوش ملعقة كبيرة من السبع بهارات. 2 ملعقة صغيرة من الكمون
          البودرة - ربع ملعقة صغيرة من جوزة الطيب - زيت للقلي"
          />
        </div>
        <div className="absolute  -mt-[340px]">
          <NumberTwo
            image={GoldTwo}
            imageB={oil}
            title=" 
          زيت قلي سيدي هشام"
            desc="  يتم تشكيلها إلى كرات، ثم حشوها بخليط اللحم المفروم حتى
          تنتهي الكمية نضع مقلاة على النار ونحمر بها الكبة حتى
          يتغير لونها إلى الذهبي"
          />
        </div>
        <div className="absolute ml-[40%] -mt-[130px]">
          <NumberThree
            image={GoldThree}
            imageB={kebeh}
            title="
          طبق شهي من الكبة المقلية"
            desc="  
          ترص في طبق التقديم وترفع على المائدة بالهناء والشفاء"
          />
        </div>
        <div className="flex justify-center mt-16 items-center">
          <button className="bg-red-600 text-center font-arabicMedium rounded-full w-40 py-2 text-white">
            عرض المزيد
          </button>
        </div>{" "}
      </div>
    </div>
  );
};
export default Kitchen;
