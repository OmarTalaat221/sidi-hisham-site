import axios from "axios";
const API_URL = "http://localhost:124/";

const getAllProducts = () => {
  return axios.get("https://api.sedihisham.com/products/findall");
};
const getAllCategories = () => {
  return axios.get("https://api.sedihisham.com/categories/findall");
};
const getProductById = (productId) => {
  return axios.get(`http://localhost:128/getMyProduit/${productId}`);
};
const getProductsByCategory = (categoryId) => {
  return axios.get(`http://localhost:128/getMyProduit/${categoryId}`);
};

const ProductService = {
  getAllProducts,
  getAllCategories,
  getProductById,
  getProductsByCategory,
};

export default ProductService;
