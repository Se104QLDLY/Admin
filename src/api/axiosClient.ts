import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

// Safeguard để tránh multiple redirects
let isRedirecting = false;

// Optional: Thêm interceptor để xử lý lỗi chung
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về response nếu không có lỗi
    return response;
  },
  (error: AxiosError) => {
    // Xử lý lỗi 401 (Unauthorized)
    if (error.response?.status === 401 && !isRedirecting) {
      // Chỉ redirect nếu đang ở protected routes
      const currentPath = window.location.pathname;
      const publicPaths = ['/', '/about', '/home', '/landing', '/login', '/register', '/forgot-password'];
      const isPublicRoute = publicPaths.includes(currentPath);
      
      if (!isPublicRoute) {
        // Đặt flag để tránh multiple redirects
        isRedirecting = true;
        
        // Redirect về trang login thay vì admin app để tránh vòng lặp
        console.log('Admin app: 401 Unauthorized on protected route, redirecting to login page');
        const loginPageUrl = import.meta.env.VITE_LOGIN_PAGE_URL || 'http://localhost:5179';
        window.location.href = `${loginPageUrl}/login`;
        return Promise.reject(error);
      } else {
        // Ở public route, chỉ log lỗi và reject promise, không redirect
        console.log('Admin app: 401 Unauthorized on public route, not redirecting');
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;