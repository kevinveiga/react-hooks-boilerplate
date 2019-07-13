import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { apiUrlConfiguracoes } from './config';

import { useSocialApi } from './service/social';

import { Context } from './store/context';

import { Router } from './router';

import { Footer } from './component/Footer/Footer';
import { Header } from './component/Header/Header';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    const [stateSocial] = useSocialApi(`${apiUrlConfiguracoes}/social`, {});

    return (
        <ThemeProvider theme={theme}>
            <Context.Provider
                value={{
                    stateSocialGlobal: stateSocial.data
                }}
            >
                <Normalize />

                <HelmetProvider>
                    <Helmet defaultTitle="App" titleTemplate="%s - App">
                        <meta name="description" content="App" />
                    </Helmet>

                    <BrowserRouter>
                        <Header />
                        <Router />
                        <Footer />
                    </BrowserRouter>
                </HelmetProvider>
            </Context.Provider>
        </ThemeProvider>
    );
};
