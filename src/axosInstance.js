import axios from "axios";
import Cookies from "js.cookie";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default axiosInstance;
