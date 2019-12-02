import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
    const [stateAuthToken, setStateAuthToken] = useState(JSON.parse(window.localStorage.getItem('token')));

    const authInterceptorRequest = useCallback(() => {
        axios.interceptors.request.use(
            (response) => {
                const config = response;
                const token = stateAuthToken;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }, [stateAuthToken]);

    const authInterceptorResponse = useCallback(() => {
        axios.interceptors.response.use(null, (error) => {
            console.error('Interceptors error: ', error);

            return Promise.reject(error);
        });
    }, []);

    authInterceptorRequest();
    authInterceptorResponse();

    useEffect(() => {
        window.localStorage.setItem('token', JSON.stringify(stateAuthToken));

        if (!stateAuthToken) {
            // Delete api-cache in logout
            if ('serviceWorker' in navigator) {
                caches.keys().then((cacheNames) => {
                    for (let i = 0, l = cacheNames.length; i < l; i += 1) {
                        if (cacheNames[i] === 'api-cache' || cacheNames[i] === 'api-cache-perfil') {
                            caches.delete(cacheNames[i]);
                        }
                    }
                });
            }
        }

        authInterceptorRequest();
        authInterceptorResponse();

        return () => {
            axios.interceptors.request.eject(authInterceptorRequest);
            axios.interceptors.response.eject(authInterceptorResponse);
        };
    }, [stateAuthToken, authInterceptorRequest, authInterceptorResponse]);

    return [stateAuthToken, setStateAuthToken];
};
