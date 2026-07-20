import axios from "axios";

const API_URL = "https://api.sedihisham.com/auth/customer/local/";

const register = (email, phone_num, password) => {
  return axios.post(API_URL + "signup", {
    email,
    phone_num,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem(["auth"]["order"]);
  localStorage.removeItem("order");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
