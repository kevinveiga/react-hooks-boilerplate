import { useCallback, useEffect } from 'react';

import axios from 'axios';

import { getLocalStorageUser } from '../store/auth/auth';

import { responseErrorStatus } from '../util/responseErrorStatus';

import { variable } from '../style/variable';

export const useInterceptor = (setStateLoader, setStateModalMessage) => {
    const interceptorRequest = useCallback(() => {
        axios.interceptors.request.use(
            (response) => {
                const config = response;
                const user = getLocalStorageUser();

                if (user && user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }

                setStateLoader(true);

                return config;
            },
            (error) => {
                console.error('Interceptors request error: ', error);

                setStateLoader(false);
                setStateModalMessage({ backgroundColor: 'colorRed', text: responseErrorStatus(error.response.status) });

                return Promise.reject(error);
            }
        );
    }, [setStateLoader, setStateModalMessage]);

    const interceptorResponse = useCallback(() => {
        axios.interceptors.response.use(
            (response) => {
                setTimeout(() => {
                    setStateLoader(false);
                }, parseInt(variable.timeout1s, 10) / 2);

                return response;
            },
            (error) => {
                console.error('Interceptors response error: ', error);

                setStateLoader(false);
                setStateModalMessage({ backgroundColor: 'colorRed', text: responseErrorStatus(error.response.status) });

                return Promise.reject(error);
            }
        );
    }, [setStateLoader, setStateModalMessage]);

    useEffect(() => {
        interceptorRequest();
        interceptorResponse();

        return () => {
            axios.interceptors.request.eject(interceptorRequest);
            axios.interceptors.response.eject(interceptorResponse);
        };
    }, [interceptorRequest, interceptorResponse]);

    return null;
};
