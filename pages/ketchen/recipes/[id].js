import React from 'react';
import Breadcrumb from '../../../components/kitchen/BreadCrumb';
import RecipeCarousel from '../../../components/kitchen/RecipeCarousel';
// import data from "../../../components/kitchen/Data.json";
import Carousel from '../../../components/home/section3/Carousel';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;

  //Get Cooks by Category ID
  const [cooks, setCooks] = useState([]);

  const getCooksData = async () => {
    if (id == undefined) {
      const { id } = router.query;
    } else {
      await axios
        .get(`https://api.sedihisham.com/cooks/cooksbycategory/${id}`)
        .then((response) => {
          setCooks(response.data);
          // console.log("cookssss :" + JSON.stringify(response.data));
        })
        .catch((error) => {
          alert(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        });
    }
  };

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    await axios
      .get('https://api.sedihisham.com/products/allProducts')
      .then((response) => {
        setProducts(response.data);
        // console.log("products :" + JSON.stringify(response.data));
      });
  };

  useEffect(() => {
    getAllProducts();
    getCooksData();
  }, []);
  useEffect(() => {
    getCooksData();
    getAllProducts();
  }, [id]);

  const { local } = useSelector((state) => state.language);

  return (
    <div className="container mx-auto w-[95%] sm:w-[80%] mt-24 mb-10 flex-col text-end reciepeDetails">
      <div className="flex justify-end  mb-8 ">
        <Breadcrumb show={true} local={local}/>
      </div>
      <div className="flex flex-col justify-center  items-center">
        <RecipeCarousel data={cooks} />
      </div>
      <p
        className={`${
          local == 'ar' ? 'text-end' : 'md:ml-10 text-start'
        } tracking-tight opacity-80 text-2xl font-bold mt-5  elevation-50`}
      >
        {local === 'ar' ? 'منتجات سيدي هشام' : "Sedi Hisham's products"}
      </p>
      <Carousel preventDefaultTouchmoveEvent={true} enableMouseSwipe={false}  products={products} />
    </div>
  );
}
