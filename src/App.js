import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { apiUrlConfiguracoes } from './config';

import { useSocialApi } from './service/social';

import { useAuth } from './store/auth/auth';
import { Context } from './store/context';
import { useModalMessage } from './store/modalMessage/modalMessage';

import { Router } from './router';

import { Footer } from './component/Footer/Footer';
import { Header } from './component/Header/Header';
import { Loader } from './component/Loader/Loader';
import { ModalMessage } from './component/Modal/ModalMessage';

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
    const [stateModalMessage, setStateModalMessage] = useModalMessage(false);

    return (
        <ThemeProvider theme={theme}>
            <Context.Provider
                value={{
                    stateAuthTokenGlobal: stateAuthToken,
                    setStateAuthTokenGlobal: setStateAuthToken,
                    stateSocialGlobal: stateSocial.data,
                    setStateHideFooterGlobal: setStateHideFooter,
                    setStateHideHeaderGlobal: setStateHideHeader,
                    setStateLoaderGlobal: setStateLoader,
                    setStateModalMessageGlobal: setStateModalMessage
                }}
            >
                <Normalize />

                <HelmetProvider>
                    <Helmet defaultTitle="Liberta" titleTemplate="%s - Liberta">
                        <meta name="description" content="Liberta" />
                    </Helmet>

                    <BrowserRouter>
                        <Loader active={stateLoader} />
                        <Header hide={stateHideHeader} />
                        <Router />
                        <Footer hide={stateHideFooter} />
                        <ModalMessage text={stateModalMessage} />
                    </BrowserRouter>
                </HelmetProvider>
            </Context.Provider>
        </ThemeProvider>
    );
};
