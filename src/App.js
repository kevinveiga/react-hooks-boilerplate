import React, { lazy, Suspense, useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { apiUrlConfiguracoes } from './config';

import { useSocialApi } from './service/social';

import { useAuth } from './store/auth/auth';
import { Context } from './store/context';
import { useModalMessage } from './store/modalMessage/modalMessage';

import { Router } from './router';

import { Loader } from './component/Loader/Loader';
import { LoaderComponent } from './component/Loader/LoaderComponent';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

// LAZY
const Footer = lazy(() => import('./component/Footer/Footer'));
const Header = lazy(() => import('./component/Header/Header'));
const ExternalJs = lazy(() => import('./component/ExternalJs/ExternalJs'));
const ModalMessage = lazy(() => import('./component/Modal/ModalMessage'));

export const App = () => {
    // API
    const stateSocial = useSocialApi(`${apiUrlConfiguracoes}/social`, {});

    // ACTION
    const [stateAuthToken, setStateAuthToken] = useAuth();
    const [stateHideFooter, setStateHideFooter] = useState(false);
    const [stateHideHeader, setStateHideHeader] = useState(false);
    const [stateLoader, setStateLoader] = useState(false);
    const [stateModalMessage, setStateModalMessage] = useModalMessage(false);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Normalize />

                <Context.Provider
                    value={{
                        stateAuthTokenContext: stateAuthToken,
                        setStateAuthTokenContext: setStateAuthToken,
                        stateSocialContext: stateSocial.data,
                        setStateHideFooterContext: setStateHideFooter,
                        setStateHideHeaderContext: setStateHideHeader,
                        setStateLoaderContext: setStateLoader,
                        setStateModalMessageContext: setStateModalMessage
                    }}
                >
                    <HelmetProvider>
                        <Helmet defaultTitle="Liberta" titleTemplate="%s - Liberta">
                            <meta name="description" content="Liberta" />
                        </Helmet>

                        <BrowserRouter>
                            <Loader active={stateLoader} />

                            <Suspense fallback={LoaderComponent()}>
                                <Header hide={stateHideHeader} />
                            </Suspense>

                            <Router />

                            <Suspense fallback={LoaderComponent()}>
                                <Footer hide={stateHideFooter} />
                            </Suspense>

                            <Suspense fallback={LoaderComponent()}>
                                <ModalMessage text={stateModalMessage} />
                            </Suspense>
                        </BrowserRouter>
                    </HelmetProvider>
                </Context.Provider>
            </ThemeProvider>

            <Suspense fallback={LoaderComponent()}>
                <ExternalJs />
            </Suspense>
        </>
    );
};
