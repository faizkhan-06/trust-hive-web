import Axios, { AxiosError, AxiosRequestHeaders, RawAxiosRequestHeaders } from 'axios';
import { toast } from 'react-toastify';
import { ENDPOINT } from '../configs/api';
import { CMI_TOKEN } from '../configs/constants';
import { ApiError } from '../types';
import useCookie from './useCookie';
import userStore from '@/stores/UserStore';
// import userStore from '@/stores/UserStore';

interface HttpOptions {
  url: string;
  body: any;
  headers?: RawAxiosRequestHeaders;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  extras?: any;
  fullUrl?: string;
}
function _useHttp() {
  /**
   * Http Get
   * @param {string} url API URL
   * @param {object} options Http Options
   * @returns json
   */

  const { setCookie } = useCookie();

  const _httpGet = (url: string, body: any, headers?: RawAxiosRequestHeaders) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await _http({ url, body, headers, method: 'GET' });
        resolve(data);
      } catch (error) {
        // console.warn("[_httpGet] ", error);
        reject(error);
      }
    });
  };

  /**
   * Http Post
   * @param {string} url API URL
   * @param {object} body Data
   * @returns json
   */
  const _httpPost = (url: string, body: any, headers?: RawAxiosRequestHeaders) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await _http({ url, body, headers, method: 'POST' });
        resolve(data);
      } catch (error) {
        // console.warn('[_httpPost] ',error);
        reject(error);
      }
    });
  };

  /**
   * Http Put
   * @param {string} url API URL
   * @param {object} body Data
   * @returns json
   */
  const _httpPut = (url: string, body: any, headers?: RawAxiosRequestHeaders) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await _http({ url, body, headers, method: 'PUT' });
        resolve(data);
      } catch (error) {
        // console.warn('[_httpPost] ',error);
        reject(error);
      }
    });
  };

  /**
   * Http Put
   * @param {string} url API URL
   * @param {object} body Data
   * @returns json
   */
  const _httpPatch = (url: string, body: any, headers?: RawAxiosRequestHeaders) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await _http({ url, body, headers, method: 'PATCH' });
        resolve(data);
      } catch (error) {
        // console.warn('[_httpPost] ',error);
        reject(error);
      }
    });
  };

  /**
   * Http Delete
   * @param {string} url API URL
   * @param {object} body Data
   * @returns json
   */
  const _httpDelete = (url: string, body: any, headers?: RawAxiosRequestHeaders) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await _http({ url, body, headers, method: 'DELETE' });
        resolve(data);
      } catch (error) {
        console.warn('[_httpDelete] ', error);
        reject(error);
      }
    });
  };

  /**
   * Http Custom
   */
  const _http = (httpOptions: HttpOptions) => {
    const { url, body, headers, method, extras, fullUrl } = httpOptions;
    return new Promise(async (resolve, reject) => {
      try {
        const { getCookie } = useCookie();
        const TOKEN = getCookie(CMI_TOKEN);
        let auth = {};
        if (TOKEN) {
          auth = {
            Authorization: 'Bearer ' + TOKEN,
          };
        }
        let bodyData = {};
        if (method !== 'GET') {
          //POST,PUT,DELETE,PATCH
          bodyData = {
            data: body,
          };
        } else {
          //GET
          if (body) {
            bodyData = {
              params: body,
            };
          }
        }
        const newENDPOINT = ENDPOINT;
        let finalUrl = newENDPOINT + url;
        if (fullUrl) {
          finalUrl = fullUrl;
        }
        const { data } = await Axios({
          url: finalUrl,
          method,
          mode: "no-cors",
          ...bodyData,
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // 'X-REQUEST-TYPE': 'app',
            ...auth,
            ...headers,
          },
          ...extras,
        });
        // console.log("_http - DATA: ", data);
        if (!data.success) {
          if (data.message.includes('Token has expired at')) {
            if (window.location.pathname.includes('/cmi')) {
              userStore.logout();
              toast.error("Oops! Something went wrong, Please try again later.", {theme: "colored"});
              window.location.reload();
            }
          } else if (data.message.includes('Unauthorized access') || data.message.includes('Invalid token')) {
             if (window.location.pathname.includes('/cmi')) {
              userStore.logout();
              toast.error("Oops! Something went wrong, Please try again later.", {theme: "colored"});
              window.location.reload();
            }
          } else {
            toast.error(data.message, {theme: "colored"});
          }
        }
        resolve(data);
      } catch (error) {
        console.warn('[_http] ', error);
        const err = error as AxiosError;
        const data = err.response?.data as ApiError;
        // const silentErrors = [];
        if (data && data.message == 'Signature verification failed') {
          resolve({ success: false, data: [], message: 'Invalid Token!' });
          //} else if (silentErrors.indexOf(data.message) > -1) {
          // resolve({ success: false, data: [], message: data.message });
          // showMessage({ message: data.message, type: 'info', icon: 'info' });
        } else {
          // console.log("DATA: ", data);
          toast.error(data.message, {theme: "colored"});
          // showMessage({ message: data.message, type: 'danger', icon: 'danger' });
          reject(data);
        }
      }
    });
  };

  return {
    httpGet: _httpGet,
    httpPost: _httpPost,
    httpPut: _httpPut,
    httpDelete: _httpDelete,
    http: _http,
    httpPatch: _httpPatch,
  };
}

export default function useHttp() {
  return _useHttp();
}
