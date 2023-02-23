import axios from "axios";

const contactsApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

contactsApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default contactsApi;
