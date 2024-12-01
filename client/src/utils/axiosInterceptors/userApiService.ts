import axios from "axios";
import store from "../../redux/store";
import { logout } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";

const userApi = axios.create({
  baseURL: `${SERVER_URL}`,
});

userApi.interceptors.request.use(
  (config) => {
    const { token } = store.getState().user;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

userApi.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {

    if (error.response && error.response.status === 401) {
      store.dispatch(logout());

      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    return Promise.reject(error.response);  
    }
);


export default userApi
