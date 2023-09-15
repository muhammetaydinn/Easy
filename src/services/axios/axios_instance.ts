import axios from "axios";
import { getDataJSON } from "../storage/asyncStorage";
import { baseUrl } from "../../constants/constants";

const axiosInstance = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
  timeout: 5000, // Adjust the timeout as needed
});

axiosInstance.interceptors.request.use(async config => {
    const user = await getDataJSON("user");
    const token = user.jwt;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
