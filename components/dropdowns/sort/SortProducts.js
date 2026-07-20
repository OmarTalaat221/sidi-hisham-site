import { Popover, Transition } from "@headlessui/react";
import {
  HomeIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  LanguageIcon,
  CurrencyDollarIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function SortProducts() {
  const router = useRouter();
  return (
    <div className=" px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>
              {/* <HeaderButton Icon={MenuIcon} /> */}
              {/* <div className="flex space-x-2">
                <ChevronDownIcon className="w-5 h-5 mt-1" />
                <p className="font-arabicMedium"> المنتجات</p>{" "}
              </div> */}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {/* <Popover.Panel className="absolute bg-white    w-[230px] rounded-xl right-1/6 z-10 mt-3 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="  rounded-b-xl space-y-1  shadow-lg ring-1 ring-black ring-opacity-5">
              
                  <div className="flex flex-col pt-2 hover:bg-gray-200 text-[13px] cursor-pointer space-y-1 pb-2  justify-end items-center">
                    <p className="font-arabicLight">ترتيب حسب السعر</p>
                  </div>
                  <div className="flex font-arabicLight flex-col hover:bg-gray-200 cursor-pointer  text-[13px] space-y-1 pb-2  justify-end items-center">
                    <p>ترتيب حسب التصنيف</p>
                  </div>
                </div>
              </Popover.Panel> */}
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
