import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    response => {
        if (response.data && response.data.data) return response.data;
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // If error is 401 Unauthorized and we haven't retried yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    // Try to refresh token
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`, { refreshToken });

                    if (res.data && res.data.token) {
                        // Save new token
                        localStorage.setItem('token', res.data.token);

                        // Update header for original request and retry
                        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                        return instance(originalRequest);
                    }
                } catch (refreshError) {
                    // Refresh token failed (expired or invalid)
                    console.error('Refresh token failed:', refreshError);
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login'; // Redirect to login page
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token available, kick user out
                localStorage.removeItem('token');
                window.location.href = '/login'; // Redirect to login page
            }
        }

        if (error.response && error.response.data) return Promise.reject(error.response.data);
        return Promise.reject(error);
    },
);

export default instance;

