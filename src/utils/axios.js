import axios from "axios";

const axiosInstance = axios.create();

// axios.interceptors.request.use((request) => {
// add auth header with jwt if account is logged in and request is to the api url

// request.headers.common.Authorization = `Bearer 7|iGA0wE5O1J8wClcSAC5ZEFAr9hQeZl92qUvgmMxt`;

//   console.log("from axios request:", request);
//   return request;
// });

axios.defaults.baseURL = "http://localhost/semaapi/public/api/";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("From axios", error.response);
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
  // Promise.reject(
  //   (error.response && error.response.data) || "Something went wrong"
  // )
);

export default axiosInstance;
