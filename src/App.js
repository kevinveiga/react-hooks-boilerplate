import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { apiUrlConfiguracoes } from './config';

import { useSocialApi } from './service/social';

import { Context } from './store/context';

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
    const [stateHideFooter, setStateHideFooter] = useState(false);
    const [stateHideHeader, setStateHideHeader] = useState(false);
    const [stateLoader, setStateLoader] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Context.Provider
                value={{
                    setStateHideFooterGlobal: setStateHideFooter,
                    setStateHideHeaderGlobal: setStateHideHeader,
                    setStateLoaderGlobal: setStateLoader,
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
