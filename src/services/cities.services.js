import axiosInstance from "../config/axios.config";

export const getCitiesApi = () => {
  return axiosInstance.get(`cities`);
};

export const getSearchApi = (tab, payload) => {
  console.log(tab, payload, "tab, payload");
  return axiosInstance.get(`search/${tab}`, { params: payload });
};
