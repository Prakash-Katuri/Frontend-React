import axios from "axios";
import { clear } from "../helper/localStorage";

const axiosConfig = {
  baseURL: "https://tripwise-prakashkaturi-1ee05ae86887.herokuapp.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
  // const token = getTokenIfNotExpired();
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // This block gets called on successful responses.
    // You can add any logic you need here.

    // Make sure to return the response, so that the requesting code gets it
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
    // if (errorStatusCode === 403) {
    //   window.location.href = "/#/forbidden";
    // }
    // if (errorStatusCode === 404) {
    //   window.location.href = "/#/pagenotfound";
    // }
    // if (errorStatusCode === 500) {
    //   window.location.href = "/#/internalservererror";
    // }

    //triggers when user session is expired
    // if (error.response.data.code === tokenInvalid && errorStatusCode === 401) {
    //   const refreshToken = getItem(REFRESH_TOKEN);
    //   if (refreshToken) {
    //     const regex = new RegExp(
    //       "^[A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.?[A-Za-z0-9-_.+/=]*$"
    //     );

    //     if (regex.test(refreshToken)) {
    //       const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

    //       // exp date in token is expressed in seconds, while now() returns milliseconds:
    //       const now = Math.ceil(Date.now() / 1000);

    //       //triggers if refresh token is not expired
    //       if (tokenParts.exp > now) {
    //         return axiosInstance
    //           .post(refreshTokenApi, { refresh: refreshToken })
    //           .then((response) => {
    //             setItem(ACCESS_TOKEN, response.data.access);
    //             return axiosInstance(originalRequest);
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //       } else {
    //         clear();
    //         window.location.href = "/";
    //         message.error(
    //           "Your session has been expired, please login again",
    //           8
    //         );
    //       }
    //     } else {
    //       clear();
    //       window.location.href = "/";
    //     }
    //   } else {
    //     clear();
    //     window.location.href = "/";
    //     message.error("Your session has been expired, please login again", 8);
    //   }
    // }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
