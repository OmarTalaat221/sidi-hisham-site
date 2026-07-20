import { useState, useRef, useEffect } from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useWidth } from "../../util/useWidth.ts";
import { useSelector } from "react-redux";

const RecipeGallery = ({ data }) => {
  const { isMobile } = useWidth();
  const { local } = useSelector((state) => state.language);
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith("uploads/")) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return "/images/eim.png";
    }
  }

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  // Direction-aware navigation functions
  const moveForward = () => {
    if (local === 'ar') {
      movePrev(); // In RTL, moving "forward" means going to previous items
    } else {
      moveNext(); // In LTR, moving "forward" means going to next items
    }
  };

  const moveBackward = () => {
    if (local === 'ar') {
      moveNext(); // In RTL, moving "backward" means going to next items
    } else {
      movePrev(); // In LTR, moving "backward" means going to previous items
    }
  };

  // Direction-aware disabled state functions
  const isForwardDisabled = () => {
    if (local === 'ar') {
      return isDisabled("prev"); // In RTL, forward button is disabled when at first item
    } else {
      return isDisabled("next"); // In LTR, forward button is disabled when at last item
    }
  };

  const isBackwardDisabled = () => {
    if (local === 'ar') {
      return isDisabled("next"); // In RTL, backward button is disabled when at last item
    } else {
      return isDisabled("prev"); // In LTR, backward button is disabled when at first item
    }
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      const scrollAmount = carousel.current.offsetWidth * currentIndex;
      
      if (local === 'ar') {
        // For RTL, we need to scroll to the right (negative direction)
        carousel.current.scrollLeft = -scrollAmount;
      } else {
        // For LTR, we scroll to the left (positive direction)
        carousel.current.scrollLeft = scrollAmount;
      }
    }
  }, [currentIndex, data, local]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [data, local]);

  return (
    <div className="relative w-full">
      {data?.length === 0 ? (
        <div className="flex justify-center text-red-400 py-8">لا يوجد صور</div>
      ) : (
                 <div className="relative overflow-hidden rounded-xl min-h-[320px]">
           <div
             ref={carousel}
             className={`carousel-container w-full relative flex overflow-hidden gap-4 scroll-smooth snap-x snap-mandatory touch-pan-x z-0 px-4 ${
               local === 'ar' ? 'flex-row-reverse' : 'flex-row'
             }`}
           >
                         {data?.map((item, index) => (
               <div
                 key={item.id}
                 className="carousel-item text-center relative w-fit z-4 pt-4 mx-1 snap-start flex items-center justify-center"
               >
                 <div className="flex rounded-xl justify-center items-center w-full h-full">
                   {isMobile ? (
                     <OptimizedImage loader={GraphCMSImageLoader}
                       width={250}
                       height={300}
                       src={"https://api.sedihisham.com/" + item.image_url}
                       alt=""
                       className="rounded-lg object-cover w-full h-auto max-h-[300px]"
                     />
                   ) : (
                     <OptimizedImage loader={GraphCMSImageLoader}
                       width={300}
                       height={300}
                       src={"https://api.sedihisham.com/" + item.image_url}
                       alt=""
                       className="rounded-lg object-cover w-full h-auto max-h-[300px]"
                     />
                   )}
                 </div>
               </div>
             ))}
          </div>
          
          {/* Navigation Buttons - Positioned inside the container */}
          <button
            onClick={moveForward}
            className={`absolute top-1/2 transform -translate-y-1/2 hover:bg-red-800 hover:text-white text-[#D40017] shadow-xl w-10 h-10 bg-white rounded-full z-30 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              local === 'ar' ? 'right-2' : 'left-2'
            }`}
            disabled={isForwardDisabled()}
          >
            <div className="flex justify-center items-center w-full h-full">
              {local === 'ar' ? (
                <ChevronRightIcon className="w-5 h-5" />
              ) : (
                <ChevronLeftIcon className="w-5 h-5" />
              )}
            </div>
            <span className="sr-only">{local === 'ar' ? 'Next' : 'Prev'}</span>
          </button>
          
          <button
            onClick={moveBackward}
            className={`absolute top-1/2 transform -translate-y-1/2 hover:bg-red-800 hover:text-white text-[#D40017] shadow-xl w-10 h-10 bg-white rounded-full z-30 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              local === 'ar' ? 'left-2' : 'right-2'
            }`}
            disabled={isBackwardDisabled()}
          >
            <div className="flex justify-center items-center w-full h-full">
              {local === 'ar' ? (
                <ChevronLeftIcon className="w-5 h-5" />
              ) : (
                <ChevronRightIcon className="w-5 h-5" />
              )}
            </div>
            <span className="sr-only">{local === 'ar' ? 'Prev' : 'Next'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeGallery;
