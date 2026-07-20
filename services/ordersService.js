import axios from "axios";
import authHeader from "./auth_Header";
import AuthService from "./auth_service";
const API_URL = "http://localhost:124/";

const getAllProducts = () => {
  return axios.get(process.env.API + "products");
};
const getAllCategories = () => {
  return axios.get(API_URL + "categories/findall");
};
const getProductById = (productId) => {
  return axios.get(`http://localhost:128/getMyProduit/${productId}`);
};
const getProductsByCategory = (categoryId) => {
  return axios.get(`http://localhost:128/getMyProduit/${categoryId}`);
};

const ProductService = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};

export default ProductService;
