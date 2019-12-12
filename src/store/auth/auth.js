import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

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
                console.error('Interceptors request error: ', error);

                return Promise.reject(error);
            }
        );
    }, [stateUser]);

    authInterceptorRequest();

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

        return () => {
            axios.interceptors.request.eject(authInterceptorRequest);
        };
    }, [authInterceptorRequest, stateUser]);

    return [stateUser, setStateUser];
};
