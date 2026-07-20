import React, { useCallback, useState } from "react";
import AboutProduct from "../../../../components/product/AboutProduct";
import ProductHeader from "../../../../components/product/ProductHeader";
import AvailableChoice from "../../../../components/product/AvailableChoice";
import Price from "../../../../components/product/Price";
import AddToCart from "../../../../components/product/AddToCard";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { HeartIcon as Heart } from "@heroicons/react/solid";
import Breadcrumb from "../../../../components/product/BreadCrumb";
import ReactImageGalleryTest from "../../../../components/product/MyGallery";
import { useRouter } from "next/router";
import axios from "axios";
import parse from "html-react-parser";
import {
  addToCart,
  calculateTotals,
  clearCurrentQuantity,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import OptimizedImage from "@/components/common/OptimizedImage";
import { addTofavorites } from "../../../../redux/favoritesSlice";
// import errImg from "../../../p"

const initialState = {
  size: "",
};

const API_URL = "https://api.sedihisham.com/";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const [cartItem, setCartItem] = useState(null);

  const [values, setValues] = useState(initialState);
  const [images, setImages] = useState([]);
  // const [dataready, setDataready] = useState(false)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Get Product By ID
  const [coupon, setCoupon] = useState({});
  const [pdf, setPdf] = useState([]);
  const [productInfo, setProductInfo] = useState("");

  const [percentage, setPercentage] = useState(0);
  const [dataReady, setDataReady] = useState(false);
  const [count, setCount] = useState(0);

  const getData = useCallback(async () => {
    if (!id && dataReady) {
      return; // do nothing if id is undefined
    }

    //Get Pdf and Sku nd add it it the images Backend
    let imagesfrombackend = [];

    try {
      const response = await axios
        .get(`https://api.sedihisham.com/products/${id}`)
        .then(async (response) => {
          if (response.data) {
            // setProductInfo(response.data)
            let productInfo = response.data;
            productInfo.product_images?.forEach((image, index) => {
              const object = {
                original: API_URL + image.image_url,
                thumbnail: API_URL + image.image_url,
              };
              imagesfrombackend.push(object);
            });
            //get PDF
            if (productInfo?.product_pdf) {
              const pd = productInfo.product_pdf.split("/");
              setPdf(pd);
            }

            //Get product coupon
            if (productInfo?.couponId) {
              const couponResponse = await axios.get(
                `https://api.sedihisham.com/coupons/${productInfo.couponId}`
              );
              setCoupon(couponResponse.data);
            }

            // const offersResponse = await axios.get(
            //   'https://api.sedihisham.com/offers/alloffers',
            // )
            // offersResponse.data?.map((item, index) =>
            //   item.Categories?.map((subItem, idx) =>
            //     subItem.id === productInfo?.category_id
            //       ? setPercentage(item.percentage)
            //       : setPercentage(0),
            //   ),
            // )
            setProductInfo(productInfo);
          }
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setDataReady(true);
      setImages(imagesfrombackend);
    }
  }, [id]);
  // const getData = useCallback(
  //   async (e) => {
  //     //Get Pdf and Sku nd add it it the images Backend
  //     let imagesfrombackend = []
  //     if (id === undefined) {
  //       // const { id } = router.query
  //     } else {
  //       await axios
  //         .get('https://api.sedihisham.com/products/' + id)
  //         .then((response) => {
  //           if (response.data) setProductInfo(response.data)
  //           // console.log("productInfo " + JSON.stringify(productInfo));
  //           productInfo.product_images?.forEach((image, index) => {
  //             var object = {
  //               original: image.image_url.startsWith('uploads/products/images/')
  //                 ? API_URL + image.image_url
  //                 : '/images/eim.png',
  //               thumbnail: image.image_url.startsWith(
  //                 'uploads/products/images/',
  //               )
  //                 ? API_URL + image.image_url
  //                 : '/images/eim.png',
  //             }
  //             imagesfrombackend.push(object)
  //             setDataready(true)
  //           })
  //           imagesfrombackend.push({
  //             original: `https://api.sedihisham.com/${productInfo?.sku}`,
  //             thumbnail: `https://api.sedihisham.com/${productInfo?.sku}`,
  //           })
  //           setImages((imgs) => imagesfrombackend)

  //           //get PDF
  //         })
  //       // console.log("images from backend :" + JSON.stringify(imagesfrombackend));
  //       // console.log(imagesfrombackend);
  //       //Get pdf
  //       if (productInfo?.product_pdf) {
  //         const pd = (productInfo?.product_pdf)?.split('/')
  //         setPdf(pd)
  //       }

  //       //Get product coupon
  //       if (productInfo?.couponId) {
  //         axios
  //           .get('https://api.sedihisham.com/coupons/' + productInfo?.couponId)
  //           .then((response) => {
  //             setCoupon(response.data)
  //             // console.log("Coupon " + JSON.stringify(coupon));
  //           })
  //       }

  //       axios
  //         .get('https://api.sedihisham.com/offers/alloffers')
  //         .then((response) => {
  //           response.data?.map((item, index) =>
  //             item.Categories?.map((subItem, idx) =>
  //               subItem.id === productInfo?.category_id
  //                 ? setPercentage(item.percentage)
  //                 : setPercentage(0),
  //             ),
  //           )
  //         })
  //     }
  //   },
  //   [id, productInfo],
  // )
  //Get Product By ID
  const [productFeature, setProductFeature] = useState([]);

  // const getProductFeatures = async (e) => {
  //   if (id == undefined) {
  //     const { id } = router.query;
  //   } else {
  //     await axios
  //       .get(
  //         "https://api.sedihisham.com/products/feature/" +
  //           id
  //       )
  //       .then((response) => {
  //         setProductFeature(response.data);
  //         // console.log("Product Features " + JSON.stringify(productFeature));
  //       });
  //   }
  // };

  //Get coupon by Id

  // const getCoupon = async (e) => {
  //   if (productInfo.couponId === undefined) {
  //     getData();
  //   } else {
  //     await axios
  //       .get(
  //         "https://api.sedihisham.com/coupons/" +
  //           productInfo?.couponId
  //       )
  //       .then((response) => {
  //         setCoupon(response.data);
  //         // console.log("Coupon " + JSON.stringify(coupon));
  //       });
  //   }
  // };

  // Get PDF by ID
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   // getData();
  //   // getProductFeatures();
  //   getCoupon();
  // }, [id]);

  useEffect(() => {
    getData();
    // getCoupon();
  }, [getData]);
  // useEffect(() => {
  //   getCoupon();
  // }, [coupon]);

  const { currentQuantity } = useSelector((state) => state.cart);
  let [quantity, setQuantity] = useState(1);

  //Check if the product has a couponId
  const addItemToCart = () => {
    setCartItem({
      product_id: productInfo.id,
      product_name: productInfo.product_translations,
      price:
        productInfo.price > 0
          ? percentage !== 0
            ? productInfo.price - (percentage * productInfo.price) / 100
            : productInfo.price
          : 0,
      order_number: quantity,
      product_image: productInfo.product_images[0]?.image_url,
      // feature_names: [""],
      points: productInfo.points,
      discount:
        productInfo.price > 0
          ? percentage !== 0
            ? (percentage * productInfo.price) / 100
            : 0
          : 0,
    });
  };
  function GraphCMSImageLoader({ src }) {
    return `https://api.sedihisham.com/${src}`;
  }

  useEffect(() => {
    if (cartItem) dispatch(addToCart(cartItem));
  }, [cartItem]);

  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);

  const { local, currency, conversion } = useSelector(
    (state) => state.language
  );
  const { favorites } = useSelector((state) => state.favorites);
  const isFavorized =
    favorites?.length !== 0
      ? favorites?.find((item) => item.product_id === productInfo.id)
      : false;

  //is product exists in cart
  const [addedToCart, setAddedToCart] = useState(false);
  const isAdded =
    cart?.length !== 0
      ? cart?.find((item) => item.product_id === productInfo.id)
      : false;
  useEffect(() => {
    dispatch(calculateTotals());
    isAdded ? setAddedToCart(true) : setAddedToCart(false);
  }, [cart, productInfo, dispatch]);

  //  },
  //  console.log("PDF :"+pdf[pdf.length-1])

  // add to to favorites
  const [favorized, setFavorized] = useState(false);
  const handleClick = (e) => {
    dispatch(
      addTofavorites({
        product_id: productInfo?.id,
        translations: productInfo?.product_translations,

        product_name: productInfo?.product_translations ? (
          parse(
            String(
              productInfo?.product_translations?.find(
                (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
              )?.nameProduct || productInfo?.product_translations?.[0]?.nameProduct || ""
            )
          )
        ) : (
          <></>
        ),
        price: productInfo.price,
        translations: productInfo?.product_translations,
        desc: productInfo.product_translations ? (
          parse(
            String(
              productInfo.product_translations?.find(
                (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
              )?.description || productInfo.product_translations?.[0]?.description || ""
            )
          )
        ) : (
          <></>
        ),
        order_number: quantity,
        product_images: productInfo.product_images,
      })
    );
    setFavorized(!favorized);
  };

  //Change price
  const [rate, setRate] = useState(1);
  // const [prodPrice,setProdPrice]=usState(product.price)
  useEffect(() => {
    if (currency !== "SYP") {
      setRate(
        conversion.find((conversion) => conversion.to_currency === currency)
          ?.rate
      );
    } else {
      setRate(1);
    }
    // console.log("rate :"+JSON.stringify(conversion.find((conversion)=>conversion.to_currency === currency)))
  }, [currency, conversion]);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-24">
      <div
        className={
          local === "ar"
            ? "flex justify-end mb-4"
            : "flex justify-start mb-4"
        }
      >
        <Breadcrumb />
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:flex-[45%] flex-1 items-center  w-full  ">
          <ReactImageGalleryTest images={images} />
          <div className="flex mt-8 justify-center items-center space-x-4">
            {productInfo.product_pdf === null ? (
              <div className="w-1/4"></div>
            ) : (
              <button
                onClick={() =>
                  router.push(
                    "https://api.sedihisham.com/products/product-pdf/" +
                      pdf[pdf.length - 1]
                  )
                }
                type="button"
                className="focus:outline-none w-1/4 text-white bg-green-700 hover:bg-green-800 font-arabicMedium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {local === "en" ? "Download PDF" : "PDF تحميل ملف"}
              </button>
            )}
            <button
              className="bg-[#D40017] text-white w-1/4 font-arabicMedium rounded-lg text-sm px-5 py-2.5 dark:bg-RED-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              type="button"
              onClick={() => setShowModal(true)}
            >
              {local === "en" ? "View the Video" : " مشاهدة الفيديو"}
            </button>
          </div>
        </div>
        <div className="flex md:flex-[55%] mt-4 flex-col space-y-6">
          <ProductHeader
            review={productInfo.product_review}
            name={
              productInfo.product_translations ? (
                parse(
                  String(
                    productInfo.product_translations?.find(
                      (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                    )?.nameProduct || productInfo.product_translations?.[0]?.nameProduct || ""
                  )
                )
              ) : (
                <></>
              )
            }
            stock={productInfo.stock}
            id={productInfo?.sku_code}
          />
          <AboutProduct
            text={
              productInfo.product_translations ? (
                parse(
                  String(
                    productInfo.product_translations?.find(
                      (item) => (item.locale || item.local || "").toLowerCase() === local?.toLowerCase()
                    )?.description || productInfo.product_translations?.[0]?.description || ""
                  )
                )
              ) : (
                <></>
              )
            }
          />
          <div className="flex space-x-2">
            <div className="flex-1 border-red-200"></div>
          </div>
          {percentage !== 0 ? (
            <div className="flex flex-row justify-between items-center py-7">
              <Price
                currency={currency}
                price={(
                  Math.round(productInfo.price * rate * 100) / 100
                )?.toFixed(2)}
                classname=" line-through"
              />
              <Price
                currency={currency}
                price={(
                  Math.round(
                    (productInfo.price * rate -
                      (percentage * productInfo.price * rate) / 100) *
                      100
                  ) / 100
                )?.toFixed(2)}
                classname="text-red-500 font-bold"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center py-7">
              <Price
                currency={currency}
                price={(
                  Math.round(productInfo.price * rate * 100) / 100
                )?.toFixed(2)}
              />
            </div>
          )}
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-[#007530] px-3 py-1 justify-center items-center text-white flex rounded-full">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
                className="text-[23px] cursor-pointer font-bold"
              >
                -
              </button>
              <p className="text-[1.2rem] mx-3 font-medium">{quantity}</p>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-[23px] font-bold cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="flex-1 max-w-md">
              <button
                onClick={() => {
                  isAdded
                    ? dispatch(removeItem(productInfo.id))
                    : addItemToCart();
                }}
                className={`bg-${
                  isAdded ? "[#D40017]" : "[#007530]"
                } w-full text-[1.2rem] justify-center items-center font-arabicMedium text-white flex rounded-full py-2`}
              >
                {isAdded
                  ? local === "en"
                    ? " Remove "
                    : "إزالة من السلة"
                  : local === "ar"
                  ? " إضافة الى السلة"
                  : "Add to cart"}
                <div className="ml-3">
                  <ShoppingCartIcon
                    color="white"
                    height="1.8rem"
                    width="1.8rem"
                  />
                </div>
              </button>
            </div>
            <div className="flex space-x-1">
              <div
                onClick={handleClick}
                className="rounded-full bg-white w-[3.2rem] border-red-500 border-[1px] px-2.5 flex justify-center items-center"
              >
                {isFavorized ? (
                  <Heart height="2rem" width="2rem" color="#D40017" />
                ) : (
                  <HeartIcon height="2rem" width="2rem" color="#D40017" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-end p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl flex flex-end justify-end items-end font-arabicMedium">
                      مشاهدة الفيديو
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {productInfo.video_url === "" ? (
                      <h2>this product has no video</h2>
                    ) : (
                      <ReactPlayer url={productInfo.video_url} />
                    )}
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-arabicMedium uppercase px-6 py-2 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      اغلاق
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
}
