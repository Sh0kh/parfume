import axios from "axios";

export const BASE_URL = "https://b0804caf69a1ba3ca43f7437edfe12bd.serveo.net";

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
