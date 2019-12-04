import React, { lazy, Suspense, useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { useAuth } from './store/auth/auth';
import { Context } from './store/context';
import { useModalMessage } from './store/modalMessage/modalMessage';

import { Router } from './router';

import { Loader } from './component/Loader/Loader';
import { LoaderComponent } from './component/Loader/LoaderComponent';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

// LAZY
const ExternalJs = lazy(() => import('./component/ExternalJs/ExternalJs'));
const Footer = lazy(() => import('./component/Footer/Footer'));
const Header = lazy(() => import('./component/Header/Header'));
const ModalMessage = lazy(() => import('./component/Modal/ModalMessage'));

export const App = () => {
    // ACTION
    const [stateAuthToken, setStateAuthToken] = useAuth();
    const [stateLoader, setStateLoader] = useState(false);
    const [stateModalMessage, setStateModalMessage] = useModalMessage(false);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Normalize />

                <HelmetProvider>
                    <Helmet defaultTitle="Liberta" titleTemplate="%s - Liberta">
                        <meta name="description" content="Liberta" />
                    </Helmet>

                    <BrowserRouter>
                        <Context.Provider
                            value={{
                                stateAuthTokenContext: stateAuthToken,
                                setStateAuthTokenContext: setStateAuthToken,
                                setStateLoaderContext: setStateLoader,
                                setStateModalMessageContext: setStateModalMessage
                            }}
                        >
                            <Loader active={stateLoader} />

                            <Suspense fallback={LoaderComponent()}>
                                <Header />
                            </Suspense>

                            <Router />

                            <Suspense fallback={LoaderComponent()}>
                                <Footer />
                            </Suspense>

                            <Suspense fallback={LoaderComponent()}>
                                <ModalMessage text={stateModalMessage} />
                            </Suspense>
                        </Context.Provider>
                    </BrowserRouter>
                </HelmetProvider>
            </ThemeProvider>

            <Suspense fallback={LoaderComponent()}>
                <ExternalJs />
            </Suspense>
        </>
    );
};
