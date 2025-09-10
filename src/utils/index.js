import axios from "axios";

export const BASE_URL = "https://3b8db20397d0998910a06ad31be1d027.serveo.net/";

export const $api = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor для автоматического добавления токена к запросам
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor для обработки ошибок (401)
$api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.clear();
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);
