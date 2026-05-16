import axios from "axios";

const API = axios.create({
  baseURL: "https://refinder-backend.onrender.com", // backend URL
  withCredentials: true
});

export default API;
