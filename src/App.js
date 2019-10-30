import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { apiUrlConfiguracoes } from './config';

import { useSocialApi } from './service/social';

import { Context } from './store/context';
import { useAuth } from './store/auth/auth';

import { Router } from './router';

import { Footer } from './component/Footer/Footer';
import { Header } from './component/Header/Header';
import { Loader } from './component/Loader/Loader';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    // API
    const stateSocial = useSocialApi(`${apiUrlConfiguracoes}/social`, {});

    // ACTION
    const [stateAuthToken, setStateAuthToken] = useAuth();
    const [stateHideFooter, setStateHideFooter] = useState(false);
    const [stateHideHeader, setStateHideHeader] = useState(false);
    const [stateLoader, setStateLoader] = useState(false);

    useEffect(() => {
        const authInterceptorRequest = axios.interceptors.request.use(
            (config) => {
                const token = stateAuthToken;

                if (token) {
                    apiUrlConfiguracoes.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const authInterceptorResponse = axios.interceptors.response.use(null, (error) => {
            if (error.status === 401) {
                setStateAuthToken(null);
            }

            return Promise.reject(error);
        });

        return () => {
            axios.interceptors.request.eject(authInterceptorRequest);
            axios.interceptors.response.eject(authInterceptorResponse);
        };
    }, [stateAuthToken, setStateAuthToken]);

    return (
        <ThemeProvider theme={theme}>
            <Context.Provider
                value={{
                    setStateHideFooterGlobal: setStateHideFooter,
                    setStateHideHeaderGlobal: setStateHideHeader,
                    setStateLoaderGlobal: setStateLoader,
                    stateAuthTokenGlobal: stateAuthToken,
                    setStateAuthTokenGlobal: setStateAuthToken,
                    stateSocialGlobal: stateSocial.data
                }}
            >
                <Normalize />

                <HelmetProvider>
                    <Helmet defaultTitle="App" titleTemplate="%s - App">
                        <meta name="description" content="App" />
                    </Helmet>

                    <BrowserRouter>
                        <Loader active={stateLoader} />
                        <Header hide={stateHideHeader} />
                        <Router />
                        <Footer hide={stateHideFooter} />
                    </BrowserRouter>
                </HelmetProvider>
            </Context.Provider>
        </ThemeProvider>
    );
};
