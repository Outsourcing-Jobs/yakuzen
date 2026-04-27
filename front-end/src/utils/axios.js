import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api',
    timeout: 10000,
});

// Thêm token vào header nếu có
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
    (response) => response,
    async (error) => {
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

