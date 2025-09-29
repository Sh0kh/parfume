import axios from "axios";

export const BASE_URL = "https://back-shox-parfumeriy.uz/";

export const $api = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor для автоматического добавления токена
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
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (refreshToken) {
                    const res = await axios.get(
                        `${BASE_URL}api/v1/admin/refresh?refreshToken=${refreshToken}`
                    );

                    const newToken = res.data?.accessToken;
                    if (newToken) {
                        localStorage.setItem("token", newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return $api(originalRequest); // повторяем запрос
                    }
                }
            } catch (refreshError) {
                console.error("Ошибка при обновлении токена:", refreshError);
                localStorage.clear();
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);
