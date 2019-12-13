import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';

import { AppProvider } from './store/app/app';
import { UserProvider } from './store/auth/auth';

import { ExternalJs } from './component/ExternalJs/ExternalJs';
import { Footer } from './component/Footer/Footer';
import { Header } from './component/Header/Header';
import { Interceptor } from './component/Interceptor/Interceptor';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Normalize />

                <HelmetProvider>
                    <Helmet defaultTitle="Liberta" titleTemplate="%s - Liberta">
                        <meta name="description" content="Liberta" />
                    </Helmet>

                    <BrowserRouter>
                        <AppProvider>
                            <UserProvider>
                                <Interceptor />

                                <Header />

                                <Router />

                                <Footer />
                            </UserProvider>
                        </AppProvider>
                    </BrowserRouter>
                </HelmetProvider>
            </ThemeProvider>

            <ExternalJs />
        </>
    );
};
