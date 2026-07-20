import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import menuIconLogout from "../../../public/menu_icon_1.svg";
import menuIconAccount from "../../../public/menu_icon_2.svg";
import menuIconOrders from "../../../public/menu_icon_3.svg";
import menuIconFavorites from "../../../public/menu_icon_5.svg";
import { logout } from "../../../redux/auth";
import HeaderButton from "../../navbar/HeaderButton";
import DropDownOption from "./DropDownOption";

function getItemClass(active) {
  return `flex w-full items-center rounded-2xl px-2.5 py-2 text-start transition duration-200 ${
    active ? "bg-[#FFF1F3] text-[#A00012]" : "text-gray-700 hover:bg-gray-50"
  }`;
}

export default function UserIconDropDown() {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <HeaderButton
            as={Menu.Button}
            Icon={UserIcon}
            open={open}
            label={isAr ? "حساب المستخدم" : "User account"}
          />

          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="translate-y-2 scale-95 opacity-0"
            enterTo="translate-y-0 scale-100 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="translate-y-0 scale-100 opacity-100"
            leaveTo="translate-y-2 scale-95 opacity-0"
          >
            <Menu.Items
              dir={isAr ? "rtl" : "ltr"}
              className="absolute left-0 z-[220] mt-3 w-[min(250px,calc(100vw-24px))] origin-top-left overflow-hidden rounded-3xl border border-black/5 bg-white/95 p-2 shadow-[0_22px_65px_rgba(0,0,0,0.24)] backdrop-blur-xl focus:outline-none"
            >
              <div className="px-3 pb-2 pt-3">
                <p className="font-arabicMedium text-sm text-[#7F0008]">
                  {isAr ? "حساب المستخدم" : "User account"}
                </p>
              </div>

              <div className="my-1 h-px bg-gray-100" />

              {isLoggedIn ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/profil" className={getItemClass(active)}>
                        <DropDownOption
                          text={isAr ? "حسابي" : "My account"}
                          Icon={menuIconAccount}
                        />
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/orders" className={getItemClass(active)}>
                        <DropDownOption
                          text={isAr ? "طلباتي" : "My orders"}
                          Icon={menuIconOrders}
                        />
                      </Link>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/login" className={getItemClass(active)}>
                      <DropDownOption
                        text={isAr ? "تسجيل الدخول" : "Login"}
                        Icon={menuIconAccount}
                      />
                    </Link>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <Link href="/favori" className={getItemClass(active)}>
                    <DropDownOption
                      text={isAr ? "قائمة المفضلة" : "Favorites"}
                      Icon={menuIconFavorites}
                    />
                  </Link>
                )}
              </Menu.Item>

              {isLoggedIn && (
                <>
                  <div className="my-1 h-px bg-gray-100" />

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={`${getItemClass(active)} text-red-600`}
                      >
                        <DropDownOption
                          text={isAr ? "تسجيل الخروج" : "Log out"}
                          Icon={menuIconLogout}
                        />
                      </button>
                    )}
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
