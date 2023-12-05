import axios from 'axios';
import Router from 'next/router'

// export const baseURL = "https://contact-manager-api-poaf.onrender.com/api"
// export const baseURL = "http://localhost:8000/api"
 export const baseURL ="https://contact-manager-api.cyclic.app/api"
// export const baseURL ="https://contact-manager-api-chisomije92.vercel.app/api"


axios.defaults.withCredentials = true
const api = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 50000,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

// request interceptor

api.interceptors.request.use(
    async (config) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//  response interceptor
api.interceptors.response.use(
    (response) => response
    ,

    async (error) => {
        const originalRequest = error.config;
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.get(`${baseURL}/auth/refresh-token`,
                    { withCredentials: true }
                );
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                // Router.replace('/login')
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api