import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';

import { AppProvider } from './store/app/app';
import { AuthProvider } from './store/auth/auth';

// import { ExternalJs } from './component/ExternalJs/ExternalJs';
import { Interceptor } from './component/Interceptor/Interceptor';
import { ModalCookie } from './component/Modal/ModalCookie';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    return (
        <HelmetProvider>
            <Helmet defaultTitle="Liberta" titleTemplate="%s - Liberta">
                <meta name="description" content="Liberta" />
            </Helmet>

            <BrowserRouter>
                <AppProvider>
                    <AuthProvider>
                        <Interceptor />

                        <ThemeProvider theme={theme}>
                            <Normalize />

                            <Router />

                            <ModalCookie />
                        </ThemeProvider>

                        {/* <ExternalJs /> */}
                    </AuthProvider>
                </AppProvider>
            </BrowserRouter>
        </HelmetProvider>
    );
};
