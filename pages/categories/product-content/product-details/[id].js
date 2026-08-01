import OptimizedImage from "@/components/common/OptimizedImage";
import axios from "axios";
import parse from "html-react-parser";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Heart,
  Home,
  Minus,
  Play,
  Plus,
  RefreshCw,
  ShoppingCart,
  Tag,
  X,
  ZoomIn,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculateTotals,
  removeItem,
} from "../../../../redux/cartSlice";
import { addTofavorites } from "../../../../redux/favoritesSlice";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const API_BASE_URL = "https://api.sedihisham.com/";
const FALLBACK_IMAGE = "/images/eim.png";

function getAssetUrl(path) {
  if (!path || typeof path !== "string") {
    return "";
  }

  const normalizedPath = path.trim();

  if (!normalizedPath) {
    return "";
  }

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://") ||
    normalizedPath.startsWith("/images/") ||
    normalizedPath.startsWith("/videos/")
  ) {
    return normalizedPath;
  }

  return `${API_BASE_URL}${normalizedPath.replace(/^\/+/, "")}`;
}

function productImageLoader({ src }) {
  return getAssetUrl(src) || FALLBACK_IMAGE;
}

function getTranslation(translations, locale) {
  if (!Array.isArray(translations) || translations.length === 0) {
    return {};
  }

  const normalizedLocale = String(locale || "").toLowerCase();

  return (
    translations.find(
      (item) =>
        String(item?.locale || item?.local || "").toLowerCase() ===
        normalizedLocale,
    ) ||
    translations[0] ||
    {}
  );
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatPrice(value, locale) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0.00";
  }

  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

// function Rating({ value, isAr }) {
//   const numericValue = Number(value);

//   const rating = Number.isFinite(numericValue)
//     ? Math.min(Math.max(Math.round(numericValue), 0), 5)
//     : value
//       ? 5
//       : 0;

//   return (
//     <div className="flex items-center gap-2">
//       <div className="flex items-center gap-0.5" dir="ltr">
//         {Array.from({ length: 5 }).map((_, index) => (
//           <Star
//             key={index}
//             className={`h-[17px] w-[17px] ${
//               index < rating
//                 ? "fill-[#FFD62D] text-[#E0B500]"
//                 : "fill-gray-100 text-gray-300"
//             }`}
//           />
//         ))}
//       </div>

//       <span className="font-arabicLight text-xs text-gray-500">
//         {rating > 0 ? `${rating}/5` : isAr ? "لا توجد تقييمات" : "No reviews"}
//       </span>
//     </div>
//   );
// }

function QuantitySelector({
  quantity,
  isAr,
  onDecrease,
  onIncrease,
  disableIncrease,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-arabicMedium text-sm text-gray-700">
        {isAr ? "الكمية" : "Quantity"}
      </span>

      <div className="inline-flex h-11 items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label={isAr ? "تقليل الكمية" : "Decrease quantity"}
          className="flex h-full w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-[#D40017] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="flex h-full min-w-[48px] items-center justify-center border-x border-gray-200 font-arabicBold text-sm text-[#4A0006]">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={disableIncrease}
          aria-label={isAr ? "زيادة الكمية" : "Increase quantity"}
          className="flex h-full w-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-[#087A35] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ProductGallery({
  images,
  activeImage,
  setActiveImage,
  previousImage,
  nextImage,
  productName,
  isAr,
  onZoom,
}) {
  return (
    <div className="order-2 min-w-0 lg:order-1">
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
        {images.length > 1 && (
          <div className="order-2 flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:max-h-[650px] lg:w-[76px] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pe-1">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={
                  isAr
                    ? `عرض صورة المنتج رقم ${index + 1}`
                    : `Show product image ${index + 1}`
                }
                className={`relative h-[66px] w-[66px] shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 transition lg:h-[72px] lg:w-[72px] ${
                  activeImage === index
                    ? "border-[#D40017] shadow-[0_5px_15px_rgba(212,0,23,0.12)]"
                    : "border-gray-200 hover:border-[#D40017]/50"
                }`}
              >
                <OptimizedImage
                  loader={productImageLoader}
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="72px"
                  quality={70}
                  placeholder="empty"
                  showSkeleton={false}
                  wrapperClassName="h-full w-full"
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        )}

        <div className="order-1 min-w-0 flex-1 lg:order-2">
          <div className="group relative h-[420px] w-full overflow-hidden bg-white sm:h-[520px] md:h-[620px] lg:h-[650px] xl:h-[700px]">
            <OptimizedImage
              loader={productImageLoader}
              src={images[activeImage]?.src || FALLBACK_IMAGE}
              alt={images[activeImage]?.alt || productName}
              fill
              priority
              sizes="(min-width:1280px) 570px, (min-width:1024px) 48vw, 100vw"
              quality={92}
              placeholder="empty"
              wrapperClassName="h-full w-full"
              skeletonClassName="bg-gray-50"
              className="object-contain object-center p-1 transition-transform duration-500 group-hover:scale-[1.015] sm:p-2 lg:p-3"
            />

            <button
              type="button"
              onClick={onZoom}
              aria-label={isAr ? "تكبير الصورة" : "Enlarge image"}
              className="absolute start-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-sm transition hover:border-[#D40017] hover:text-[#D40017]"
            >
              <ZoomIn className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label={isAr ? "الصورة السابقة" : "Previous image"}
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-sm transition hover:border-[#D40017] hover:text-[#D40017] sm:left-3"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label={isAr ? "الصورة التالية" : "Next image"}
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-sm transition hover:border-[#D40017] hover:text-[#D40017] sm:right-3"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={
                    isAr
                      ? `الانتقال للصورة ${index + 1}`
                      : `Go to image ${index + 1}`
                  }
                  className={`h-2 rounded-full transition-all ${
                    activeImage === index
                      ? "w-7 bg-[#D40017]"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductInformation({
  productName,
  product,
  descriptionHtml,
  descriptionText,
  displayedPrice,
  currency,
  sku,
  stockAvailable,
  stock,
  outOfStock,
  coupon,
  isAr,
}) {
  const couponValue = coupon?.value;

  return (
    <section className="order-1 min-w-0 border-b border-gray-200 pb-5 lg:order-2 lg:border-b-0 lg:border-e lg:border-gray-200 lg:px-6 lg:pb-0">
      {" "}
      <Link
        href="/categories"
        className="font-arabicMedium text-sm text-[#087A35] transition hover:text-[#D40017]"
      >
        {isAr ? "منتجات سيدي هشام" : "Sedi Hisham products"}
      </Link>
      <h1 className="mt-2 font-arabicBold text-2xl leading-[1.5] text-[#222] sm:text-3xl xl:text-[30px]">
        {productName}
      </h1>
      <div className="mt-3 flex items-center gap-2">
        <span className="font-arabicLight text-sm text-gray-500">
          {isAr ? "رمز المنتج:" : "Product code:"}
        </span>

        <bdi className="font-arabicMedium text-sm text-gray-700">{sku}</bdi>
      </div>
      <div className="mt-5 hidden border-t border-gray-200 pt-5 lg:block">
        <div className="flex items-end gap-2">
          <span className="font-arabicLight text-sm text-gray-600">
            {isAr ? "السعر:" : "Price:"}
          </span>

          <span className="font-arabicBold text-3xl text-[#D40017]">
            {displayedPrice}
          </span>

          <span className="pb-1 font-arabicMedium text-sm text-[#4A0006]">
            {currency}
          </span>
        </div>

        <p className="mt-1 font-arabicLight text-xs text-gray-500">
          {isAr
            ? "السعر شامل الضرائب المطبقة إن وجدت"
            : "Price includes applicable taxes when available"}
        </p>
      </div>
      {couponValue !== undefined &&
        couponValue !== null &&
        couponValue !== "" && (
          <div className="mt-5 flex items-start gap-3 border-y border-gray-200 py-4">
            <span className="flex shrink-0 items-center gap-1 rounded-sm bg-[#E7F4E8] px-2 py-1 font-arabicBold text-xs text-[#087A35]">
              <Tag className="h-3.5 w-3.5" />
              {isAr ? "توفير" : "Saving"}
            </span>

            <p className="font-arabicLight text-sm leading-7 text-gray-700">
              {isAr
                ? `يوجد عرض أو كوبون متاح على هذا المنتج بقيمة ${couponValue}.`
                : `An offer or coupon worth ${couponValue} is available for this product.`}
            </p>
          </div>
        )}
      <div className="mt-5 hidden lg:block">
        {" "}
        <h2 className="font-arabicBold text-lg text-[#222]">
          {isAr ? "عن المنتج" : "About this product"}
        </h2>
        <div className="product-description mt-2 line-clamp-[7] font-arabicLight text-sm leading-8 text-gray-700">
          {descriptionHtml ? (
            parse(descriptionHtml)
          ) : (
            <p>
              {isAr
                ? "لا يوجد وصف متاح لهذا المنتج حاليًا."
                : "No product description is currently available."}
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 hidden border-t border-gray-200 pt-5 lg:block">
        <dl className="grid grid-cols-[130px_minmax(0,1fr)] gap-x-4 gap-y-3 text-sm">
          <dt className="font-arabicBold text-gray-800">
            {isAr ? "العلامة التجارية" : "Brand"}
          </dt>

          <dd className="font-arabicLight text-gray-700">
            {isAr ? "سيدي هشام" : "Sedi Hisham"}
          </dd>

          <dt className="font-arabicBold text-gray-800">
            {isAr ? "حالة التوفر" : "Availability"}
          </dt>

          <dd
            className={`font-arabicMedium ${
              outOfStock ? "text-[#D40017]" : "text-[#087A35]"
            }`}
          >
            {outOfStock
              ? isAr
                ? "غير متوفر حاليًا"
                : "Currently unavailable"
              : stockAvailable && Number.isFinite(stock)
                ? isAr
                  ? `متوفر — ${stock} قطعة`
                  : `Available — ${stock} items`
                : isAr
                  ? "متوفر"
                  : "Available"}
          </dd>
        </dl>
      </div>
    </section>
  );
}

function PurchaseBox({
  displayedPrice,
  currency,
  quantity,
  isAr,
  stockAvailable,
  stock,
  outOfStock,
  reachedStockLimit,
  isAdded,
  isFavorite,
  couponCode,
  points,
  pdfUrl,
  videoUrl,
  onDecrease,
  onIncrease,
  onCart,
  onFavorite,
  onVideo,
}) {
  return (
    <aside className="order-3 min-w-0 lg:sticky lg:top-24 lg:self-start">
      {" "}
      <div className="mt-1 border-y border-gray-200 py-5 lg:mt-0 lg:rounded-xl lg:border lg:p-5">
        {" "}
        <div className="flex items-end gap-2">
          <span className="font-arabicBold text-3xl text-[#222]">
            {displayedPrice}
          </span>

          <span className="pb-1 font-arabicMedium text-sm text-gray-700">
            {currency}
          </span>
        </div>
        <p className="mt-2 font-arabicLight text-xs leading-6 text-gray-500">
          {isAr
            ? "السعر النهائي يظهر وفق العملة المحددة في الموقع."
            : "The final price appears according to the selected currency."}
        </p>
        <div className="mt-5">
          <p
            className={`font-arabicBold text-lg ${
              outOfStock ? "text-[#D40017]" : "text-[#087A35]"
            }`}
          >
            {outOfStock
              ? isAr
                ? "غير متوفر حاليًا"
                : "Currently unavailable"
              : isAr
                ? "متوفر"
                : "In stock"}
          </p>

          {!outOfStock &&
            stockAvailable &&
            Number.isFinite(stock) &&
            stock <= 5 && (
              <p className="mt-1 font-arabicMedium text-sm text-[#D40017]">
                {isAr
                  ? `متبقي ${stock} فقط — اطلبه الآن`
                  : `Only ${stock} left — order now`}
              </p>
            )}
        </div>
        {!outOfStock && (
          <div className="mt-5">
            <QuantitySelector
              quantity={quantity}
              isAr={isAr}
              onDecrease={onDecrease}
              onIncrease={onIncrease}
              disableIncrease={reachedStockLimit}
            />
          </div>
        )}
        <button
          type="button"
          onClick={onCart}
          disabled={outOfStock}
          className={`mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 font-arabicMedium text-sm text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 ${
            isAdded
              ? "bg-[#D40017] hover:bg-[#B30014]"
              : "bg-[#087A35] hover:bg-[#06672C]"
          }`}
        >
          <ShoppingCart className="h-5 w-5" />

          {outOfStock
            ? isAr
              ? "المنتج غير متوفر"
              : "Unavailable"
            : isAdded
              ? isAr
                ? "إزالة من السلة"
                : "Remove from cart"
              : isAr
                ? "إضافة إلى السلة"
                : "Add to cart"}
        </button>
        <button
          type="button"
          onClick={onFavorite}
          className={`mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border font-arabicMedium text-sm transition ${
            isFavorite
              ? "border-[#D40017] bg-red-50 text-[#D40017]"
              : "border-gray-300 text-gray-700 hover:border-[#D40017] hover:text-[#D40017]"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />

          {isFavorite
            ? isAr
              ? "تمت الإضافة إلى المفضلة"
              : "Added to favorites"
            : isAr
              ? "إضافة إلى المفضلة"
              : "Add to favorites"}
        </button>
        {(couponCode || points > 0) && (
          <div className="mt-5 space-y-3 border-t border-gray-200 pt-4">
            {couponCode && (
              <div className="flex items-center justify-between gap-3">
                <span className="font-arabicLight text-xs text-gray-500">
                  {isAr ? "كود الخصم" : "Coupon code"}
                </span>

                <bdi className="rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs font-bold text-[#4A0006]">
                  {couponCode}
                </bdi>
              </div>
            )}

            {points > 0 && (
              <div className="flex items-center justify-between gap-3">
                <span className="font-arabicLight text-xs text-gray-500">
                  {isAr ? "نقاط المنتج" : "Product points"}
                </span>

                <span className="font-arabicBold text-sm text-[#7C1422]">
                  {points}
                </span>
              </div>
            )}
          </div>
        )}
        {(pdfUrl || videoUrl) && (
          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-gray-200 pt-4">
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 font-arabicMedium text-xs text-gray-700 transition hover:border-[#D40017] hover:text-[#D40017]"
              >
                <Download className="h-4 w-4" />
                {isAr ? "ملف المنتج" : "Product PDF"}
              </a>
            ) : (
              <div />
            )}

            {videoUrl ? (
              <button
                type="button"
                onClick={onVideo}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 font-arabicMedium text-xs text-gray-700 transition hover:border-[#D40017] hover:text-[#D40017]"
              >
                <Play className="h-4 w-4 fill-current" />
                {isAr ? "الفيديو" : "Video"}
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

function ProductDetailsSection({
  descriptionHtml,
  product,
  sku,
  stockAvailable,
  stock,
  points,
  currency,
  pdfUrl,
  videoUrl,
  isAr,
  onVideo,
}) {
  return (
    <section className="mt-8 border-t border-gray-200 pt-7 lg:mt-12 lg:pt-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:gap-12">
        <article>
          <h2 className="font-arabicBold text-2xl text-[#222]">
            {isAr ? "تفاصيل المنتج" : "Product details"}
          </h2>

          <div className="product-description mt-5 font-arabicLight text-sm leading-8 text-gray-700 sm:text-base sm:leading-9">
            {descriptionHtml ? (
              parse(descriptionHtml)
            ) : (
              <p>
                {isAr
                  ? "لا يوجد وصف تفصيلي متاح لهذا المنتج حاليًا."
                  : "No detailed description is currently available."}
              </p>
            )}
          </div>
        </article>

        <aside>
          <h2 className="font-arabicBold text-xl text-[#222]">
            {isAr ? "معلومات المنتج" : "Product information"}
          </h2>

          <dl className="mt-4 border-t border-gray-200 text-sm">
            <div className="grid grid-cols-[120px_minmax(0,1fr)] border-b border-gray-200">
              <dt className="bg-gray-50 px-3 py-4 font-arabicBold text-gray-700">
                {isAr ? "رمز المنتج" : "Product code"}
              </dt>

              <dd className="px-3 py-4 font-arabicLight text-gray-700">
                <bdi>{sku}</bdi>
              </dd>
            </div>

            <div className="grid grid-cols-[120px_minmax(0,1fr)] border-b border-gray-200">
              <dt className="bg-gray-50 px-3 py-4 font-arabicBold text-gray-700">
                {isAr ? "العلامة" : "Brand"}
              </dt>

              <dd className="px-3 py-4 font-arabicLight text-gray-700">
                {isAr ? "سيدي هشام" : "Sedi Hisham"}
              </dd>
            </div>

            <div className="grid grid-cols-[120px_minmax(0,1fr)] border-b border-gray-200">
              <dt className="bg-gray-50 px-3 py-4 font-arabicBold text-gray-700">
                {isAr ? "التوفر" : "Availability"}
              </dt>

              <dd className="px-3 py-4 font-arabicLight text-gray-700">
                {stockAvailable && Number.isFinite(stock)
                  ? stock
                  : isAr
                    ? "متوفر"
                    : "Available"}
              </dd>
            </div>

            {points > 0 && (
              <div className="grid grid-cols-[120px_minmax(0,1fr)] border-b border-gray-200">
                <dt className="bg-gray-50 px-3 py-4 font-arabicBold text-gray-700">
                  {isAr ? "النقاط" : "Points"}
                </dt>

                <dd className="px-3 py-4 font-arabicLight text-gray-700">
                  {points}
                </dd>
              </div>
            )}

            <div className="grid grid-cols-[120px_minmax(0,1fr)] border-b border-gray-200">
              <dt className="bg-gray-50 px-3 py-4 font-arabicBold text-gray-700">
                {isAr ? "العملة" : "Currency"}
              </dt>

              <dd className="px-3 py-4 font-arabicLight text-gray-700">
                {currency}
              </dd>
            </div>
          </dl>

          {(pdfUrl || videoUrl) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 font-arabicMedium text-sm text-gray-700 transition hover:border-[#D40017] hover:text-[#D40017]"
                >
                  <FileText className="h-4 w-4" />
                  {isAr ? "تحميل ملف المنتج" : "Download product file"}
                </a>
              )}

              {videoUrl && (
                <button
                  type="button"
                  onClick={onVideo}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 font-arabicMedium text-sm text-gray-700 transition hover:border-[#D40017] hover:text-[#D40017]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  {isAr ? "مشاهدة الفيديو" : "Watch video"}
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function LoadingPage() {
  return (
    <main className="min-h-[70vh] bg-white py-8">
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="h-5 w-52 animate-pulse rounded bg-gray-200" />

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.75fr)_300px]">
          <div className="aspect-square animate-pulse bg-gray-100" />
          <div className="h-[500px] animate-pulse bg-gray-100" />
          <div className="h-[440px] animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    </main>
  );
}

function ErrorPage({ isAr, onRetry }) {
  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="flex min-h-[65vh] items-center justify-center bg-white px-4 py-12"
    >
      <div className="w-full max-w-md text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-[#D40017]">
          <AlertCircle className="h-9 w-9" />
        </span>

        <h1 className="mt-5 font-arabicBold text-2xl text-[#222]">
          {isAr ? "تعذر تحميل بيانات المنتج" : "Could not load product data"}
        </h1>

        <p className="mt-3 font-arabicLight text-sm leading-7 text-gray-500">
          {isAr
            ? "حدثت مشكلة أثناء الاتصال بالخادم. حاول مرة أخرى."
            : "There was a problem connecting to the server. Please try again."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mx-auto mt-6 flex h-11 items-center justify-center gap-2 rounded-full bg-[#D40017] px-6 font-arabicMedium text-sm text-white transition hover:bg-[#B30014]"
        >
          <RefreshCw className="h-4 w-4" />
          {isAr ? "إعادة المحاولة" : "Try again"}
        </button>
      </div>
    </main>
  );
}

function Modal({ title, isAr, onClose, children, dark = false }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onClose}
      className="fixed inset-0 z-[10000000020] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
    >
      <div
        onMouseDown={(event) => event.stopPropagation()}
        className={`relative w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl ${
          dark ? "bg-black" : "bg-white"
        }`}
      >
        <div
          dir={isAr ? "rtl" : "ltr"}
          className={`flex items-center justify-between gap-4 px-4 py-4 sm:px-6 ${
            dark
              ? "border-b border-white/10 text-white"
              : "border-b border-gray-200 text-[#222]"
          }`}
        >
          <h2 className="min-w-0 truncate font-arabicBold text-lg">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label={isAr ? "إغلاق" : "Close"}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
              dark
                ? "bg-white/10 text-white hover:bg-[#D40017]"
                : "bg-gray-100 text-gray-600 hover:bg-[#D40017] hover:text-white"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;

  const { cart = [] } = useSelector((state) => state.cart);
  const { favorites = [] } = useSelector((state) => state.favorites);

  const {
    local = "ar",
    currency = "SYP",
    conversion = [],
  } = useSelector((state) => state.language);

  const isAr = local === "ar";
  const BreadcrumbArrow = isAr ? ChevronLeft : ChevronRight;

  const [product, setProduct] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) {
      return undefined;
    }

    let mounted = true;

    async function fetchProduct() {
      setLoading(true);
      setError(false);
      setCoupon(null);

      try {
        const response = await axios.get(`${API_BASE_URL}products/${id}`);

        const productData = response?.data || null;

        if (!mounted) {
          return;
        }

        setProduct(productData);
        setQuantity(1);
        setActiveImage(0);

        if (productData?.couponId) {
          axios
            .get(`${API_BASE_URL}coupons/${productData.couponId}`)
            .then((couponResponse) => {
              if (mounted) {
                setCoupon(couponResponse?.data || null);
              }
            })
            .catch(() => {
              if (mounted) {
                setCoupon(null);
              }
            });
        }
      } catch (fetchError) {
        if (mounted) {
          setProduct(null);
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [id, retryKey, router.isReady]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    if (!imageModalOpen && !videoModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setImageModalOpen(false);
        setVideoModalOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [imageModalOpen, videoModalOpen]);

  const translation = useMemo(
    () => getTranslation(product?.product_translations, local),
    [local, product?.product_translations],
  );

  const productName =
    stripHtml(translation?.nameProduct) ||
    (isAr ? "منتج سيدي هشام" : "Sedi Hisham product");

  const descriptionHtml = String(translation?.description || "").trim();

  const descriptionText = stripHtml(descriptionHtml);

  const images = useMemo(() => {
    const productImages = Array.isArray(product?.product_images)
      ? product.product_images
      : [];

    const normalizedImages = productImages
      .map((item, index) => {
        const src = getAssetUrl(item?.image_url);

        if (!src) {
          return null;
        }

        return {
          id: item?.id || `${src}-${index}`,
          src,
          alt: `${productName} ${index + 1}`,
        };
      })
      .filter(Boolean);

    if (normalizedImages.length > 0) {
      return normalizedImages;
    }

    return [
      {
        id: "fallback",
        src: FALLBACK_IMAGE,
        alt: productName,
      },
    ];
  }, [product?.product_images, productName]);

  const conversionRate = useMemo(() => {
    if (currency === "SYP") {
      return 1;
    }

    const value = Number(
      conversion.find((item) => item?.to_currency === currency)?.rate,
    );

    return Number.isFinite(value) && value > 0 ? value : 1;
  }, [conversion, currency]);

  const productId = product?.id;

  const basePrice = Number(product?.price) || 0;

  const displayedPrice = formatPrice(basePrice * conversionRate, local);

  const points = Number(product?.points) || 0;

  const sku = product?.sku_code || product?.sku || productId || "—";

  const stockAvailable =
    product?.stock !== undefined &&
    product?.stock !== null &&
    product?.stock !== "";

  const stock = Number(product?.stock);

  const outOfStock = stockAvailable && Number.isFinite(stock) && stock <= 0;

  const reachedStockLimit =
    stockAvailable && Number.isFinite(stock) && stock > 0 && quantity >= stock;

  const isAdded = cart.some((item) => item?.product_id === productId);

  const isFavorite = favorites.some((item) => item?.product_id === productId);

  const videoUrl = getAssetUrl(product?.video_url);

  const pdfName = product?.product_pdf
    ? String(product.product_pdf).split("/").filter(Boolean).pop()
    : "";

  const pdfUrl = pdfName
    ? `${API_BASE_URL}products/product-pdf/${encodeURIComponent(pdfName)}`
    : "";

  const couponCode = coupon?.code || coupon?.coupon_code || "";

  function previousImage() {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function nextImage() {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(current - 1, 1));
  }

  function increaseQuantity() {
    setQuantity((current) => {
      if (stockAvailable && Number.isFinite(stock) && stock > 0) {
        return Math.min(current + 1, stock);
      }

      return Math.min(current + 1, 99);
    });
  }

  function handleCart() {
    if (!productId || outOfStock) {
      return;
    }

    if (isAdded) {
      dispatch(removeItem(productId));
      return;
    }

    dispatch(
      addToCart({
        product_id: productId,
        product_name: product?.product_translations || [],
        price: basePrice,
        order_number: quantity,
        product_image: product?.product_images?.[0]?.image_url || "",
        points,
        discount: 0,
      }),
    );
  }

  function handleFavorite() {
    if (!productId) {
      return;
    }

    dispatch(
      addTofavorites({
        product_id: productId,
        product_name: productName,
        translations: product?.product_translations || [],
        product_translations: product?.product_translations || [],
        desc: descriptionText,
        price: basePrice,
        order_number: quantity,
        quantity,
        product_images: product?.product_images || [],
        product_image: product?.product_images?.[0]?.image_url || "",
        points,
        discount: 0,
      }),
    );
  }

  if (loading || !router.isReady) {
    return <LoadingPage />;
  }

  if (error || !product) {
    return (
      <ErrorPage
        isAr={isAr}
        onRetry={() => setRetryKey((current) => current + 1)}
      />
    );
  }

  return (
    <main
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-white pb-28 lg:pb-14"
      style={{
        fontFamily: "var(--font-el-messiri)",
      }}
    >
      <div className="mx-auto w-full max-w-[1380px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-9 xl:px-10">
        <nav
          aria-label={isAr ? "مسار التنقل" : "Breadcrumb"}
          className="flex min-w-0 items-center gap-2 overflow-hidden font-arabicLight text-xs text-gray-500 sm:text-sm"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-1.5 transition hover:text-[#D40017]"
          >
            <Home className="h-4 w-4" />

            <span className="hidden sm:inline">
              {isAr ? "الرئيسية" : "Home"}
            </span>
          </Link>

          <BreadcrumbArrow className="h-4 w-4 shrink-0 text-gray-300" />

          <Link
            href="/categories"
            className="shrink-0 transition hover:text-[#D40017]"
          >
            {isAr ? "المنتجات" : "Products"}
          </Link>

          <BreadcrumbArrow className="h-4 w-4 shrink-0 text-gray-300" />

          <span className="min-w-0 truncate font-arabicMedium text-gray-700">
            {productName}
          </span>
        </nav>

        <section className="mt-6 grid items-start gap-7 lg:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.8fr)_300px] lg:gap-0 xl:grid-cols-[minmax(0,1.18fr)_minmax(360px,0.82fr)_310px]">
          {" "}
          <ProductGallery
            images={images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            previousImage={previousImage}
            nextImage={nextImage}
            productName={productName}
            isAr={isAr}
            onZoom={() => setImageModalOpen(true)}
          />
          <ProductInformation
            productName={productName}
            product={product}
            descriptionHtml={descriptionHtml}
            descriptionText={descriptionText}
            displayedPrice={displayedPrice}
            currency={currency}
            sku={sku}
            stockAvailable={stockAvailable}
            stock={stock}
            outOfStock={outOfStock}
            coupon={coupon}
            isAr={isAr}
          />
          <PurchaseBox
            displayedPrice={displayedPrice}
            currency={currency}
            quantity={quantity}
            isAr={isAr}
            stockAvailable={stockAvailable}
            stock={stock}
            outOfStock={outOfStock}
            reachedStockLimit={reachedStockLimit}
            isAdded={isAdded}
            isFavorite={isFavorite}
            couponCode={couponCode}
            points={points}
            pdfUrl={pdfUrl}
            videoUrl={videoUrl}
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
            onCart={handleCart}
            onFavorite={handleFavorite}
            onVideo={() => setVideoModalOpen(true)}
          />
        </section>

        <ProductDetailsSection
          descriptionHtml={descriptionHtml}
          product={product}
          sku={sku}
          stockAvailable={stockAvailable}
          stock={stock}
          points={points}
          currency={currency}
          pdfUrl={pdfUrl}
          videoUrl={videoUrl}
          isAr={isAr}
          onVideo={() => setVideoModalOpen(true)}
        />
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-gray-200 bg-white px-3 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.1)] lg:hidden"
        style={{
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="mx-auto flex max-w-xl items-center gap-2.5">
          <div className="min-w-0 flex-1">
            <p className="font-arabicLight text-[10px] text-gray-500">
              {isAr ? "السعر" : "Price"}
            </p>

            <p className="truncate font-arabicBold text-lg text-[#222]">
              {displayedPrice}{" "}
              <span className="text-xs text-gray-600">{currency}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? isAr
                  ? "إزالة من المفضلة"
                  : "Remove from favorites"
                : isAr
                  ? "إضافة إلى المفضلة"
                  : "Add to favorites"
            }
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition ${
              isFavorite
                ? "border-[#D40017] bg-[#D40017] text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleCart}
            disabled={outOfStock}
            className={`flex h-11 min-w-[145px] items-center justify-center gap-2 rounded-full px-4 font-arabicMedium text-xs text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 ${
              isAdded ? "bg-[#D40017]" : "bg-[#087A35]"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />

            {outOfStock
              ? isAr
                ? "غير متوفر"
                : "Unavailable"
              : isAdded
                ? isAr
                  ? "إزالة من السلة"
                  : "Remove"
                : isAr
                  ? "إضافة للسلة"
                  : "Add to cart"}
          </button>
        </div>
      </div>

      {videoModalOpen && videoUrl && (
        <Modal
          title={isAr ? "فيديو المنتج" : "Product video"}
          isAr={isAr}
          onClose={() => setVideoModalOpen(false)}
          dark
        >
          <div className="aspect-video bg-black">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>
        </Modal>
      )}

      {imageModalOpen && (
        <Modal
          title={productName}
          isAr={isAr}
          onClose={() => setImageModalOpen(false)}
          dark
        >
          <div className="relative h-[76vh] bg-black">
            <OptimizedImage
              loader={productImageLoader}
              src={images[activeImage]?.src || FALLBACK_IMAGE}
              alt={images[activeImage]?.alt || productName}
              fill
              sizes="100vw"
              quality={92}
              placeholder="empty"
              showSkeleton={false}
              wrapperClassName="h-full w-full"
              className="object-contain p-4 sm:p-8"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label={isAr ? "الصورة السابقة" : "Previous image"}
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-black sm:left-5"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label={isAr ? "الصورة التالية" : "Next image"}
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-black sm:right-5"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}
          </div>
        </Modal>
      )}

      <style jsx global>{`
        .product-description p + p {
          margin-top: 0.85rem;
        }

        .product-description ul,
        .product-description ol {
          margin-block: 0.85rem;
          padding-inline-start: 1.3rem;
        }

        .product-description ul {
          list-style: disc;
        }

        .product-description ol {
          list-style: decimal;
        }

        .product-description li + li {
          margin-top: 0.35rem;
        }

        .product-description a {
          color: #d40017;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .product-description strong,
        .product-description b {
          color: #222222;
          font-family: var(--font-el-messiri);
          font-weight: 700;
        }

        @media (max-width: 1279px) {
          .product-description {
            max-width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
