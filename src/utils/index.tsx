import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';

class AxiosService {
  private static instance: AxiosInstance;

  private constructor() {}

  public static getInstance(url: string): AxiosInstance {
    if (!AxiosService.instance) {
      AxiosService.instance = axios.create({
        baseURL: url, // 基础URL
        timeout: 60000, // 请求超时设置
        withCredentials: false, // 跨域请求是否需要携带 cookie
      });
    }
    return AxiosService.instance;
  }
}

export const createAxiosInstance = (url: string) => {
  const axiosInstance = AxiosService.getInstance(url);
  // 创建请求拦截
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers = { Authorization: 'Basic' + ' ' + token } as AxiosRequestHeaders;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );
  // 创建响应拦截
  axiosInstance.interceptors.response.use(
    (res) => {
      const data = res.data;

      if (res.data.status === 1) {
        alert(res.data.msg);
      }

      if (res.data.status === 0) {
        alert(res.data.msg);
      }

      return data;
    },
    (error) => {
      if (error?.response?.data?.statusCode === 401) {
        alert('登录失效，请重新登陆！');
        return;
      }

      alert('出错了，请联系管理员');
      // return Promise.reject('出错了，请联系管理员');
    },
  );

  return axiosInstance;
};

export const service = createAxiosInstance('https://ndzy-s.vercel.app');

export const loop = (arr: any[]): any[] => {
  return [...arr]
    .sort((a, b) => a.order - b.order)
    .map((item) => {
      const newItem = { ...item, key: item.id, label: item.title, value: item.id };

      if (Array.isArray(item.children) && item.children.length > 0) {
        newItem.children = loop(item.children);
      } else {
        delete newItem.children;
      }

      return newItem;
    });
};

export const findNodeById: any = (tree: any[], id: string) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      return tree[i];
    } else if (tree[i].children) {
      // 如果有子节点，那么对子节点进行递归查找
      let result = findNodeById(tree[i].children, id);
      if (result) {
        return result;
      }
    }
  }

  return null; // 如果没找到，返回null
};
