import axios from "axios";
import { clear } from "../helper/localStorage";

const axiosConfig = {
  baseURL: "https://tripwise-prakashkaturi-1ee05ae86887.herokuapp.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {

    return response;
  },
  async (error) => {
    const refreshTokenApi = "/accounts/refresh-token/";
    const originalRequest = error?.config;
    const errorMessage = error?.response?.data?.code;
    const errorStatusCode = error?.response?.status;
    const tokenInvalid = "token_not_valid";
    const invalidCred = "invalid_credentials";
    const accountNotFound = "user_not_found";

    // Prevent infinite loops
    if (errorStatusCode === 401 && originalRequest.url === refreshTokenApi) {
      clear();
      window.location.href = "/";
      return Promise.reject(error);
    }

    //Invalid credentials or user not exist
    if (
      (errorMessage === invalidCred || errorMessage === accountNotFound) &&
      errorStatusCode === 401
    ) {
      clear();
      window.location.href = "/";
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
