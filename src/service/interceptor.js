import { useCallback, useEffect } from 'react';

import axios from 'axios';

import { responseErrorStatus } from '../util/responseErrorStatus';

import { variable } from '../style/variable';

export const useInterceptor = (setStateLoader, setStateModalMessage) => {
    const interceptorRequest = useCallback(() => {
        axios.interceptors.request.use(
            (response) => {
                const config = response;

                setStateLoader(true);

                return config;
            },
            (error) => {
                console.error('Interceptors request error: ', error);

                setStateLoader(false);
                setStateModalMessage({ bgColor: 'colorRed', text: responseErrorStatus(error.response.status) });

                return Promise.reject(error);
            }
        );
    }, [setStateLoader, setStateModalMessage]);

    const interceptorResponse = useCallback(() => {
        axios.interceptors.response.use(
            (response) => {
                setTimeout(() => {
                    setStateLoader(false);
                }, variable.timeout1s);

                return response;
            },
            (error) => {
                console.error('Interceptors response error: ', error);

                setStateLoader(false);
                setStateModalMessage({ bgColor: 'colorRed', text: responseErrorStatus(error.response.status) });

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
