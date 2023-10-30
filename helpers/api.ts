import axios from 'axios';
import Router from 'next/router'

const baseURL = "http://localhost:8000/api"

const api = axios.create({
    baseURL,
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
                const { accessToken } = response.data;

                localStorage.setItem('accessToken', accessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                Router.replace('/')
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api