import React, { useEffect, useState } from "react";
import {
  AiOutlineCloudDownload,
  AiOutlineGlobal,
  AiOutlineLink,
  AiOutlineRise,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RiPlanetLine } from "react-icons/ri";
import { TiTree } from "react-icons/ti";
import OptimizedImage from "../common/OptimizedImage";

export default function KentchenMainPage({ setKey, setSteps }) {
  const dispatch = useDispatch();
  const { settings } = useSelector((state) => ({ ...state }));
  const { local } = settings;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconItems = [
    {
      icon: <AiOutlineRise className="text-4xl text-blue-500" />,
      title: local === "ar" ? "اقتصاد الطاقة" : "Energy Economics",
      description: local === "ar" 
        ? "تقليل استهلاك الطاقة في المطابخ التجارية"
        : "Reducing energy consumption in commercial kitchens"
    },
    {
      icon: <RiPlanetLine className="text-4xl text-green-500" />,
      title: local === "ar" ? "صديق للبيئة" : "Eco-Friendly",
      description: local === "ar"
        ? "حلول مستدامة للمطابخ الحديثة"
        : "Sustainable solutions for modern kitchens"
    },
    {
      icon: <TiTree className="text-4xl text-orange-500" />,
      title: local === "ar" ? "تكنولوجيا خضراء" : "Green Technology",
      description: local === "ar"
        ? "تقنيات متقدمة للحفاظ على البيئة"
        : "Advanced technologies for environmental preservation"
    },
    {
      icon: <AiOutlineGlobal className="text-4xl text-purple-500" />,
      title: local === "ar" ? "معايير عالمية" : "Global Standards",
      description: local === "ar"
        ? "منتجات تلبي المعايير الدولية"
        : "Products meeting international standards"
    }
  ];

  return (
    <div className="kentchen-container min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {local === "ar" ? "مطابخ كنتشن" : "Kentchen Kitchens"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {local === "ar"
              ? "نقدم حلول متطورة للمطابخ التجارية مع التركيز على الكفاءة والاستدامة"
              : "We provide advanced solutions for commercial kitchens with focus on efficiency and sustainability"}
          </p>
        </div>

        {/* Icons Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {iconItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="lg:w-1/2">
            <OptimizedImage
              src="/images/kitchen-hero.jpg"
              alt={local === "ar" ? "مطبخ حديث" : "Modern Kitchen"}
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {local === "ar" ? "خطوات التحضير" : "Preparation Steps"}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  1
                </div>
                <p className="text-gray-700">
                  {local === "ar" 
                    ? "تحضير المواد الخام بعناية فائقة"
                    : "Carefully prepare raw materials with utmost attention"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  2
                </div>
                <p className="text-gray-700">
                  {local === "ar"
                    ? "طهي المكونات باستخدام تقنيات متقدمة"
                    : "Cook ingredients using advanced cooking techniques"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  3
                </div>
                <p className="text-gray-700">
                  {local === "ar"
                    ? "تقديم الطعام بأجمل طريقة ممكنة"
                    : "Present food in the most beautiful way possible"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {local === "ar" ? "مميزاتنا" : "Our Features"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <AiOutlineCloudDownload className="text-5xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {local === "ar" ? "تحميل سريع" : "Fast Download"}
              </h3>
              <p className="text-gray-600">
                {local === "ar"
                  ? "تحميل البيانات والملفات بسرعة عالية"
                  : "Download data and files at high speed"}
              </p>
            </div>
            <div className="text-center">
              <AiOutlineLink className="text-5xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {local === "ar" ? "ربط آمن" : "Secure Connection"}
              </h3>
              <p className="text-gray-600">
                {local === "ar"
                  ? "اتصال آمن ومشفر لحماية البيانات"
                  : "Secure and encrypted connection for data protection"}
              </p>
            </div>
            <div className="text-center">
              <AiOutlineGlobal className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {local === "ar" ? "تغطية عالمية" : "Global Coverage"}
              </h3>
              <p className="text-gray-600">
                {local === "ar"
                  ? "خدمة متاحة في جميع أنحاء العالم"
                  : "Service available worldwide"}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => setKey && setKey("2")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {local === "ar" ? "ابدأ الآن" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
}
