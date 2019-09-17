import React, { useContext, useState } from 'react';
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
    const [stateLoader, setStateLoader] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <Context.Provider
                value={{
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
                        <Header />
                        <Router />
                        <Footer />
                    </BrowserRouter>
                </HelmetProvider>
            </Context.Provider>
        </ThemeProvider>
    );
};
