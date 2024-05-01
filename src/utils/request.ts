import axios, {
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
  } from "axios";
  
  const service: AxiosInstance = axios.create({
    baseURL: "http://localhost:10800",
    timeout: 5000,
  });
  
  service.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {
      return config;
    },
    (error: AxiosError) => {
      console.log(error);
      return Promise.reject();
    }
  );
  
  service.interceptors.response.use(
    (response: AxiosResponse | any) => {
      if (response.status === 200) {
        return response;
      } else {
        Promise.reject();
      }
    },
    (error: AxiosError) => {
      console.log(error);
      return Promise.reject();
    }
  );
  
  export default service;
  