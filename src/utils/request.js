import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '', // 基础路径
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加 token 或其他请求头
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default service;
// import axios from 'axios';
// import { ElMessage } from 'element-plus';
// import router from '@/router';
// import { useUserStore } from '@/store/user';

// const request = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // 基础路径
//   timeout: 5000 // 请求超时时间
// });

// // 请求拦截器
// request.interceptors.request.use(
//   config => {
//     // TODO 2. 携带token
//     const useStore = useUserStore();
//     if (useStore.token) {
//       config.headers.Authorization = useStore.token;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// // 响应拦截器
// request.interceptors.response.use(
//   response => {
//     // TODO 3. 处理业务失败
//     // TODO 4. 摘取核心响应数据
//     if (response.data.code === 0) {
//       return response;
//     }
//     // 错误提示
//     ElMessage.error(response.data.message || '服务异常');
//     return Promise.reject(response.data);
//   },
//   error => {
//     // TODO 5. 处理401错误
//     // 错误的特殊情况 =》401权限不足 或 token过期
//     if (error.response?.status === 401) {
//       router.push('/login');
//     }

//     // 错误的默认情况
//     ElMessage.error(error.response.data.message || '服务异常');
//     return Promise.reject(error);
//   }
// );

// export default request;
