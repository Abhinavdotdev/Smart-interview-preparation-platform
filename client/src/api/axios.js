import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if your backend runs on a different port
  withCredentials: true, // Optional if using cookies
});

export default API;
