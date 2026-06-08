import axios from 'axios';
import { notification } from 'antd';

let isServerAwake = false; // Đánh dấu server đã hoạt động
let wakeupNotificationShown = false;
let wakeupTimer = null;

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api',
    timeout: 60000,
});

// Thêm token vào header nếu có
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Tự động phát hiện nếu server đang ngủ (chỉ đếm ngược khi server chưa được đánh thức)
        if (!isServerAwake && !wakeupTimer) {
            wakeupTimer = setTimeout(() => {
                notification.info({
                    key: 'server-wakeup',
                    message: 'Đang kết nối tới máy chủ',
                    description: 'Hệ thống đang khởi động lại máy chủ (Render free tier). Quá trình này có thể mất 30 - 50 giây, vui lòng chờ trong giây lát...',
                    duration: 0, // Không tự động tắt
                    placement: 'topRight',
                });
                wakeupNotificationShown = true;
            }, 2000);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

// Phản hồi từ server
instance.interceptors.response.use(
    (response) => {
        isServerAwake = true;
        
        if (wakeupTimer) {
            clearTimeout(wakeupTimer);
            wakeupTimer = null;
        }

        if (wakeupNotificationShown) {
            notification.destroy('server-wakeup');
            notification.success({
                message: 'Kết nối thành công',
                description: 'Máy chủ đã sẵn sàng hoạt động!',
                duration: 4.5,
                placement: 'topRight',
            });
            wakeupNotificationShown = false;
        }

        return response;
    },
    async (error) => {
        // Nếu có phản hồi từ server (lỗi 4xx, 5xx) nghĩa là server đã thức giấc
        if (error.response) {
            isServerAwake = true;
        }

        if (wakeupTimer) {
            clearTimeout(wakeupTimer);
            wakeupTimer = null;
        }

        if (wakeupNotificationShown) {
            notification.destroy('server-wakeup');
            notification.error({
                message: 'Kết nối thất bại',
                description: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
                duration: 5,
                placement: 'topRight',
            });
            wakeupNotificationShown = false;
        }

        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa được thử lại
        if (error.response?.status === 401 && !originalRequest._retry) {
            
            if (isRefreshing) {
                // Đang có một request khác đi refresh token, cho cái này vào hàng đợi
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(instance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const res = await axios.post(`${instance.defaults.baseURL}/auth/refresh-token`, { 
                        refreshToken 
                    });
                    
                    const { token } = res.data;
                    localStorage.setItem('token', token);
                    
                    isRefreshing = false;
                    onTokenRefreshed(token);

                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);


export default instance;

