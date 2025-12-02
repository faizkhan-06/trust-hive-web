import { isJson } from '@/utils/common';
import Cookies from 'js-cookie';

function _useCookie(db: string = '') {
  const _getCookie = (name: string) => {
    try {
      const val = Cookies.get(db + name); // => 'value'
      if (val && isJson(val)) {
        return JSON.parse(val);
      } else {
        return val;
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const _setCookie = (key: string, val: string, options?: Cookies.CookieAttributes | undefined) => {
    try {
      if (typeof val === 'object') {
        return Cookies.set(db + key, JSON.stringify(val), options);
      } else {
        return Cookies.set(db + key, val, options);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const _removeCookie = (key: string) => {
    try {
      return Cookies.remove(db + key);
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    getCookie: _getCookie,
    setCookie: _setCookie,
    removeCookie: _removeCookie,
  };
}

export default function useCookie(db: string = '') {
  return _useCookie(db);
}
