import OptimizedImage from "@/components/common/OptimizedImage";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeft,
  ArrowRight,
  PackageOpen,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import HeaderButton from "../../navbar/HeaderButton";

function getProductName(item, local) {
  const translations = Array.isArray(item?.product_name)
    ? item.product_name
    : [];

  return (
    translations.find(
      (translation) =>
        String(
          translation?.locale || translation?.local || "",
        ).toLowerCase() === local?.toLowerCase(),
    )?.nameProduct ||
    translations[0]?.nameProduct ||
    item?.nameProduct ||
    item?.name ||
    ""
  );
}

function getProductImage(item) {
  const image = item?.product_image || "";

  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  return `https://api.sedihisham.com/${image.replace(/^\/+/, "")}`;
}

function getItemQuantity(item) {
  const quantity = Number(item?.quantity || item?.qty || item?.count || 1);

  return Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
}

export default function CartDropDown() {
  const { cart } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { local } = useSelector((state) => state.language);

  const [open, setOpen] = useState(false);

  const isAr = local === "ar";
  const cartItems = Array.isArray(cart) ? cart : [];
  const cartCount = cartItems.length;

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <>
      <HeaderButton
        Icon={ShoppingCart}
        sup={cartCount}
        open={open}
        onClick={() => setOpen(true)}
        label={isAr ? "فتح سلة التسوق" : "Open shopping cart"}
      />

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          dir={isAr ? "rtl" : "ltr"}
          className="relative z-[10000000000]"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-[10000000000] bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[10000000001] overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition duration-300 ease-[cubic-bezier(0.4,0,1,1)]"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-[-30px_0_100px_rgba(0,0,0,0.35)]">
                <div className="bg-gradient-to-r from-[#5F0711] via-[#A2071A] to-[#5F0711] px-5 pb-6 pt-5 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center justify-start gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                        <ShoppingBag className="h-6 w-6 text-[#FFD62D]" />
                      </span>

                      <div className="min-w-0 text-start">
                        <Dialog.Title className="font-arabicMedium text-xl">
                          {isAr ? "سلة التسوق" : "Shopping cart"}
                        </Dialog.Title>

                        <p className="mt-1 font-arabicLight text-sm text-white/65">
                          {isAr
                            ? `${cartCount} منتج في السلة`
                            : `${cartCount} items in your cart`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label={isAr ? "إغلاق السلة" : "Close cart"}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:rotate-90 hover:border-[#FFD62D]/60 hover:bg-white/20 hover:text-[#FFD62D]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#FAFAFA] p-4">
                  {cartCount === 0 ? (
                    <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                      <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D40017]/10 text-[#D40017]">
                        <PackageOpen className="h-11 w-11" />
                      </span>

                      <p className="mt-6 font-arabicMedium text-lg text-gray-800">
                        {isAr ? "سلة التسوق فارغة" : "Your cart is empty"}
                      </p>

                      <p className="mt-2 max-w-[280px] font-arabicLight text-sm leading-6 text-gray-400">
                        {isAr
                          ? "أضف المنتجات التي تفضلها وستظهر هنا"
                          : "Products you add will appear here"}
                      </p>

                      <Link
                        href="/categories"
                        onClick={() => setOpen(false)}
                        className="mt-7 flex h-12 items-center justify-center gap-2 rounded-full bg-[#D40017] px-7 font-arabicMedium text-sm text-white transition hover:bg-[#B30014]"
                      >
                        {isAr ? "استكشف المنتجات" : "Explore products"}

                        <ArrowIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col items-stretch justify-start gap-3">
                      {cartItems.map((item, index) => {
                        const productName = getProductName(item, local);

                        const productImage = getProductImage(item);

                        const quantity = getItemQuantity(item);

                        return (
                          <Link
                            key={item?.product_id || item?.id || index}
                            href={`/categories/product-content/product-details/${item.product_id}`}
                            onClick={() => setOpen(false)}
                            className="group flex items-center justify-start gap-3 rounded-3xl border border-gray-100 bg-white p-3 text-start shadow-sm transition duration-300 hover:border-[#D40017]/25 hover:bg-[#FFF8F9] hover:shadow-md"
                          >
                            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                              {productImage ? (
                                <OptimizedImage
                                  alt={productName}
                                  src={productImage}
                                  fill
                                  objectFit="contain"
                                  sizes="96px"
                                />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center text-gray-300">
                                  <PackageOpen className="h-8 w-8" />
                                </span>
                              )}
                            </span>

                            <span className="min-w-0 flex-1 text-start">
                              <span className="line-clamp-2 block font-arabicMedium text-sm leading-6 text-gray-900 transition group-hover:text-[#D40017]">
                                {productName}
                              </span>

                              <span className="mt-2 inline-flex items-center justify-start rounded-full bg-[#D40017]/10 px-3 py-1 font-arabicLight text-xs text-[#A00012]">
                                {isAr
                                  ? `الكمية: ${quantity}`
                                  : `Quantity: ${quantity}`}
                              </span>
                            </span>

                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition group-hover:bg-[#D40017] group-hover:text-white">
                              <ArrowIcon className="h-4 w-4" />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {cartCount > 0 && (
                  <div className="border-t border-gray-100 bg-white p-4 shadow-[0_-16px_40px_rgba(0,0,0,0.06)]">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#087A35] px-4 py-3.5 text-center font-arabicMedium text-sm text-white transition hover:bg-[#06672C]"
                      >
                        <ShoppingCart className="h-5 w-5" />

                        {isAr ? "عرض السلة" : "View cart"}
                      </Link>

                      <Link
                        href={
                          isLoggedIn ? "/payment/shiping-address" : "/payment"
                        }
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-full bg-[#D40017] px-4 py-3.5 text-center font-arabicMedium text-sm text-white transition hover:bg-[#B30014]"
                      >
                        {isAr ? "الدفع الآن" : "Checkout"}

                        <ArrowIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
