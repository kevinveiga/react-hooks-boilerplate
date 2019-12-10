import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
    const [stateUser, setStateUser] = useState(JSON.parse(window.localStorage.getItem('user')) || JSON.parse('{ "nome": null, "token": null }'));

    const authInterceptorRequest = useCallback(() => {
        axios.interceptors.request.use(
            (response) => {
                const config = response;
                const { token } = stateUser;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }, [stateUser]);

    const authInterceptorResponse = useCallback(() => {
        axios.interceptors.response.use(null, (error) => {
            console.error('Interceptors error: ', error);

            return Promise.reject(error);
        });
    }, []);

    authInterceptorRequest();
    authInterceptorResponse();

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(stateUser));

        if (!stateUser.token) {
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
    }, [authInterceptorRequest, authInterceptorResponse, stateUser]);

    return [stateUser, setStateUser];
};
