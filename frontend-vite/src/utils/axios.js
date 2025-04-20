// utils/axios.js
import axios from "axios";
console.log("import.meta.env.VITE_API_BASE_URL --> ",import.meta.env.VITE_API_BASE_URL)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // if using cookies/sessions
});

export default axiosInstance;
