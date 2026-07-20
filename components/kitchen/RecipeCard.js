import Image from 'next/image.js';
import React from 'react';
import Title from './Title';
import { PlayIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import OptimizedImage from '../common/OptimizedImage';

export default function RecipeCard({ id, title, description, image, local }) {
  function GraphCMSImageLoader({ src }) {
    // If src start with uploads/images..
    if (src.startsWith('uploads')) {
      return `https://api.sedihisham.com/${src}`;
    } else {
      return '/images/eim.png';
    }
  }

  return (
    <Link href={`/ketchen/recipes/recipe-details/${id}`}>
      <div className="flex flex-col my-6 w-[56vw] sm:w-[280px] mx-[1px] h-[400px] hover:scale-105 hover:shadow-xl duration-300 shadow-md rounded-xl overflow-hidden bg-white">
        <div className=" rounded-t-xl flex-[40%]">
          <OptimizedImage loader={GraphCMSImageLoader}
            width={310}
            height={140}
            alt=""
            src={image}
            className="!object-cover !w-[100%]"
          />
        </div>
        <div className="my-3 rounded-b-xl h-full flex-[60%] mx-5">
          <div className="flex flex-col mb-8  space-y-3">
            <Title local={local} text={title} size="[18px]" />
            <p
              className={`text-gray-800 h-[103px] text-overflow-ellipsis overflow-hidden text-sm relative break-words whitespace-normal opacity-80 truncate ${
                local === 'ar' ? 'text-end font-arabicLight' : 'text-start'
              } `}
            >
              {parse(description||"")}
            </p>{" "}
          </div>

          <div className="bg-[#D40017] cursor-pointer  space-x-2 w-full flex py-2 justify-center rounded-xl   text-white">
            <p className="font-arabicMedium">
              {local === 'ar' ? 'مشاهدة' : 'View'}{" "}
            </p>
            <div className="mt-[2px]">
              <PlayIcon width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
