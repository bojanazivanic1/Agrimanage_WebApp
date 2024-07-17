import axios from "axios";
import { getToken } from "../util/storageUtils";

const api = axios.create({
  baseURL: "http://10.0.0.101:5244/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return config;
  } catch (e) {
    return Promise.reject(e);
  }
});

export default api;
