// components/home/section1/index.js
import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";
import { useRouter } from "next/router";
import Slogan from "../../../public/images/slogen.png";
import wheat from "../../../public/images/wheat.png";

const SectionA = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen mb-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full relative">
          <OptimizedImage alt="صورة سيدي هشام" src={wheat} />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo / Slogan */}
        <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
          <OptimizedImage
            alt="صورة سيدي هشام"
            src={Slogan}
            height={90}
            width={420}
          />
        </div>

        {/* Glass Morphism Card with Buttons */}
        <div
          className="
            backdrop-blur-md bg-white/10 
            border border-white/20 
            rounded-2xl 
            p-8 
            shadow-2xl
            max-w-lg w-full
          "
        >
          {/* Decorative Gold Line */}
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-6" />

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Button: تحميل الكاتلوج */}
            <Link
              href="https://sedihisham.com/catalog.pdf"
              className="w-full sm:w-auto"
            >
              <div
                className="
                  group relative overflow-hidden
                  text-center text-lg font-arabicMedium text-white
                  bg-primary hover:bg-primary/90
                  py-3.5 px-8 rounded-xl
                  transition-all duration-300
                  hover:shadow-lg hover:shadow-primary/30
                  hover:-translate-y-0.5
                  cursor-pointer
                "
              >
                {/* Gold accent on hover */}
                <div
                  className="
                    absolute bottom-0 left-0 w-full h-0.5 
                    bg-gold transform scale-x-0 
                    group-hover:scale-x-100 
                    transition-transform duration-300
                  "
                />
                تحميل الكاتلوج
              </div>
            </Link>

            {/* Button: اكتشف المنتجات */}
            <Link href="/categories" className="w-full sm:w-auto">
              <div
                className="
                  group relative overflow-hidden
                  text-center text-lg font-arabicMedium text-white
                  bg-gradient-to-r from-[#007530] to-[#005a24]
                  hover:from-[#005a24] hover:to-[#007530]
                  py-3.5 px-8 rounded-xl
                  transition-all duration-300
                  hover:shadow-lg hover:shadow-[#007530]/30
                  hover:-translate-y-0.5
                  cursor-pointer
                "
              >
                {/* Gold accent on hover */}
                <div
                  className="
                    absolute bottom-0 left-0 w-full h-0.5 
                    bg-gold transform scale-x-0 
                    group-hover:scale-x-100 
                    transition-transform duration-300
                  "
                />
                اكتشف المنتجات
              </div>
            </Link>
          </div>

          {/* Decorative Gold Line */}
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mt-6" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gold rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionA;
