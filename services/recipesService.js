import axios from "axios";
import authHeader from "./auth_Header";
import AuthService from "./auth_service";

const getAllRecipes = () => {
  return axios.get(API_URL + "categories/findall");
};
const getRecipesByByCategory = (categoryId) => {
  return axios.get(`http://localhost:128/getMyProduit/${categoryId}`);
};
const getRecipeById = (recipeId) => {
  return axios.get(`http://localhost:128/getMyProduit/${recipeId}`);
};

const RecipesService = {
  getAllRecipes,
  getRecipesByByCategory,
  getRecipeById,
};

export default RecipesService;
