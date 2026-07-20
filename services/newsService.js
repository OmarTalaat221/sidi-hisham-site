import axios from "axios";
const API_URL = "http://localhost:124/";

const getAllNews = async () => {
  return await axios.get("https://api.sedihisham.com/news/findall");
};
const getNewById = (productId) => {
  return axios.get(`http://localhost:128/getMyProduit/${productId}`);
};

const NewsService = {
  getAllNews,
  getNewById,
};

export default NewsService;
