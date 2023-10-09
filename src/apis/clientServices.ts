import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { UserToken } from '@@src/schemas/auth';
import { NEXT_CLIENT_API_PATH, NODE_ENV } from '@@configs';

const general = axios.create({ baseURL: NEXT_CLIENT_API_PATH });
const enhance = axios.create({ baseURL: NEXT_CLIENT_API_PATH });

const respErrorHandler = (error: AxiosError) => {
  try {
    if (axios.isCancel(error)) {
      return Promise.reject({ error });
    }
    toast(error.response?.data?.message || error.message, { type: 'error' });
    return Promise.reject({ error });
  } catch (err) {
    return Promise.reject({ error });
  }
};

const reqAuthProtect = (axiosConfig: AxiosRequestConfig) => {
  // you can implement your own single sign on logic here
  if (NODE_ENV != 'development') {
    if (localStorage.getItem('ROCP_token') && localStorage.getItem('ROCP_token') !== null) {
      const auth = JSON.parse(`${localStorage.getItem('ROCP_token')}`) as UserToken;
      axiosConfig.headers = { ...axiosConfig.headers };
      axiosConfig.headers[`Authorization`] = `Bearer ${auth}`;
    }
  }

  return new Promise((resolve) => setTimeout(() => resolve(axiosConfig), 1000));
  //return axiosConfig;
};
// write toke info in cookie, userInfo in localStorage

general.interceptors.request.use(reqAuthProtect, (error) => {
  console.error(error);
});

enhance.interceptors.request.use(reqAuthProtect, (error) => {
  console.error(error);
});

enhance.interceptors.response.use((response) => response, respErrorHandler);
const clientServices = {
  general,
  enhance,
};

export default clientServices;
