// React import
import React from 'react';

// Library import
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Application import
import { Router } from './router';

// Store import
import { AppProvider } from './store/app/app';
import { AuthProvider } from './store/auth/auth';

// Component import
// import { ExternalJs } from './component/ExternalJs/ExternalJs';
import { Interceptor } from './component/Interceptor/Interceptor';
import { Modal } from './component/Modal/Modal';
import { ModalCookie } from './component/Modal/ModalCookie';

// Style import
import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    return (
        <HelmetProvider>
            <Helmet defaultTitle="Site" titleTemplate="%s - Site">
                <meta name="description" content="Site" />
            </Helmet>

            <BrowserRouter>
                <AppProvider>
                    <AuthProvider>
                        <Interceptor />

                        <ThemeProvider theme={theme}>
                            <Normalize />

                            <Router />

                            <Modal />

                            <ModalCookie />
                        </ThemeProvider>

                        {/* <ExternalJs /> */}
                    </AuthProvider>
                </AppProvider>
            </BrowserRouter>
        </HelmetProvider>
    );
};
