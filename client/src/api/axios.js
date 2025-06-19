import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if your backend runs on a different port
  withCredentials: true, // Optional if using cookies
});

export default API;
