import OptimizedImage from "@/components/common/OptimizedImage";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  PackageSearch,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import HeaderButton from "../../navbar/HeaderButton";

function getProductTranslation(product, local) {
  const translations = Array.isArray(product?.product_translations)
    ? product.product_translations
    : [];

  return (
    translations.find(
      (translation) =>
        String(
          translation?.locale || translation?.local || "",
        ).toLowerCase() === local?.toLowerCase(),
    ) ||
    translations[0] ||
    {}
  );
}

function getProductImage(product) {
  const image = product?.product_images?.[0]?.image_url || "";

  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  return `https://api.sedihisham.com/${image.replace(/^\/+/, "")}`;
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function SearchIconDropDown() {
  const { local } = useSelector((state) => state.language);

  const isAr = local === "ar";

  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const getProducts = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await axios.get(
          "https://api.sedihisham.com/products/allProducts",
        );

        if (!mounted) return;

        setProducts(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to load products:", error);

        if (mounted) {
          setProducts([]);
          setHasError(true);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    const timeout = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 350);

    return () => {
      clearTimeout(timeout);
    };
  }, [open]);

  const normalizedSearch = search.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedSearch) return [];

    return products
      .filter((product) =>
        product?.product_translations?.some((translation) => {
          const name = String(translation?.nameProduct || "").toLowerCase();

          const description = stripHtml(translation?.description).toLowerCase();

          return (
            name.includes(normalizedSearch) ||
            description.includes(normalizedSearch)
          );
        }),
      )
      .slice(0, 12);
  }, [normalizedSearch, products]);

  return (
    <>
      <HeaderButton
        Icon={Search}
        open={open}
        onClick={() => setOpen(true)}
        label={isAr ? "فتح البحث" : "Open search"}
      />

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          dir={isAr ? "rtl" : "ltr"}
          className="relative z-[9999]"
          initialFocus={searchInputRef}
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
            <div className="fixed inset-0 z-[9999] bg-[#140003]/75 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 z-[10000] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 sm:p-5">
              <Transition.Child
                as={Fragment}
                enter="transform transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                enterFrom="-translate-y-16 scale-[0.96] opacity-0"
                enterTo="translate-y-0 scale-100 opacity-100"
                leave="transform transition duration-250 ease-in"
                leaveFrom="translate-y-0 scale-100 opacity-100"
                leaveTo="-translate-y-10 scale-[0.97] opacity-0"
              >
                <Dialog.Panel className="relative w-full max-w-[880px] overflow-hidden rounded-[30px] border border-white/20 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
                  <div className="bg-gradient-to-r from-[#5F0711] via-[#A2071A] to-[#5F0711] px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 text-start">
                        <Dialog.Title className="font-arabicMedium text-lg text-white sm:text-xl">
                          {isAr ? "البحث عن المنتجات" : "Search products"}
                        </Dialog.Title>

                        <p className="mt-1 font-arabicLight text-xs text-white/65 sm:text-sm">
                          {isAr
                            ? "ابحث باسم المنتج أو جزء من الوصف"
                            : "Search by product name or description"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label={isAr ? "إغلاق البحث" : "Close search"}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-300 hover:rotate-90 hover:border-[#FFD62D]/60 hover:bg-white/20 hover:text-[#FFD62D]"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-start gap-3 rounded-2xl border border-white/25 bg-white px-4 shadow-[0_14px_35px_rgba(0,0,0,0.18)] transition focus-within:border-[#FFD62D] focus-within:ring-4 focus-within:ring-[#FFD62D]/15">
                      <Search className="h-5 w-5 shrink-0 text-[#A2071A]" />

                      <input
                        ref={searchInputRef}
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={
                          isAr ? "ابحث عن منتج..." : "Search for a product..."
                        }
                        className="h-14 w-full bg-transparent text-start font-arabicLight text-base text-gray-900 outline-none placeholder:text-gray-400"
                      />

                      {search && (
                        <button
                          type="button"
                          onClick={() => setSearch("")}
                          aria-label={isAr ? "مسح البحث" : "Clear search"}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-[#FFF0F2] hover:text-[#D40017]"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="max-h-[55vh] min-h-[280px] overflow-y-auto bg-[#FAFAFA] p-3 sm:p-5">
                    {isLoading ? (
                      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                        <LoaderCircle className="h-9 w-9 animate-spin text-[#D40017]" />

                        <p className="mt-4 font-arabicLight text-sm text-gray-500">
                          {isAr
                            ? "جاري تحميل المنتجات..."
                            : "Loading products..."}
                        </p>
                      </div>
                    ) : hasError ? (
                      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                        <PackageSearch className="h-12 w-12 text-red-300" />

                        <p className="mt-4 font-arabicMedium text-sm text-red-500">
                          {isAr
                            ? "تعذر تحميل المنتجات"
                            : "Unable to load products"}
                        </p>
                      </div>
                    ) : !normalizedSearch ? (
                      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D40017]/10 text-[#D40017]">
                          <PackageSearch className="h-9 w-9" />
                        </span>

                        <p className="mt-5 font-arabicMedium text-base text-gray-800">
                          {isAr
                            ? "ابدأ بكتابة اسم المنتج"
                            : "Start typing a product name"}
                        </p>

                        <p className="mt-2 max-w-[360px] font-arabicLight text-sm leading-6 text-gray-400">
                          {isAr
                            ? "ستظهر المنتجات المطابقة هنا"
                            : "Matching products will appear here"}
                        </p>
                      </div>
                    ) : results.length === 0 ? (
                      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                        <PackageSearch className="h-14 w-14 text-gray-300" />

                        <p className="mt-4 font-arabicMedium text-base text-gray-700">
                          {isAr
                            ? "لا توجد نتائج مطابقة"
                            : "No matching products"}
                        </p>

                        <p className="mt-2 font-arabicLight text-sm text-gray-400">
                          {isAr
                            ? "جرّب كتابة كلمة مختلفة"
                            : "Try a different search term"}
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {results.map((product, index) => {
                          const translation = getProductTranslation(
                            product,
                            local,
                          );

                          const productName = translation?.nameProduct || "";

                          const description = stripHtml(
                            translation?.description,
                          );

                          const productImage = getProductImage(product);

                          const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

                          return (
                            <Link
                              key={product?.id || index}
                              href={`/categories/product-content/product-details/${product.id}`}
                              onClick={() => setOpen(false)}
                              className="group flex min-w-0 items-center justify-start gap-3 rounded-2xl border border-gray-100 bg-white p-3 text-start shadow-sm transition duration-300 hover:border-[#D40017]/25 hover:bg-[#FFF8F9] hover:shadow-md"
                            >
                              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-50">
                                {productImage ? (
                                  <OptimizedImage
                                    alt={productName}
                                    src={productImage}
                                    fill
                                    objectFit="contain"
                                    sizes="80px"
                                  />
                                ) : (
                                  <span className="flex h-full w-full items-center justify-center text-gray-300">
                                    <PackageSearch className="h-7 w-7" />
                                  </span>
                                )}
                              </span>

                              <span className="min-w-0 flex-1 text-start">
                                <span className="line-clamp-2 block font-arabicMedium text-sm leading-6 text-gray-900 transition group-hover:text-[#D40017]">
                                  {productName}
                                </span>

                                {description && (
                                  <span className="mt-1 line-clamp-2 block font-arabicLight text-xs leading-5 text-gray-500">
                                    {description}
                                  </span>
                                )}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
