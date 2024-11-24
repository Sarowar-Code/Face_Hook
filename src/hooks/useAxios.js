/* eslint-disable no-useless-catch */
import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";
const useAxios = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        // add a request interceptor
        const requestInterceptors = api.interceptors.request.use(
            (config) => {
                const authToken = auth?.authToken;

                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => PromiseRejectionEvent.reject(error)
        );

        // add a response interceptor
        const responseInterceptors = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = auth?.refreshToken;

                        const response = await axios.post(
                            `${
                                import.meta.env.VITE_SERVER_BASE_URL
                            }/auth/refresh-token`,
                            { refreshToken }
                        );
                        const { token } = response.data;

                        console.log(`new token ${token}`);

                        setAuth({ ...auth, authToken: token });
                        originalRequest.headers.Authorization = `Bearer ${token}`;

                        return axios(originalRequest);
                    } catch (error) {
                        throw error;
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptors);
            api.interceptors.response.eject(responseInterceptors);
        };
    }, [auth.authToken]);

    return { api };
};

export default useAxios;
