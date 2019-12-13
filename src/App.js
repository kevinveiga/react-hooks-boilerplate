import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';

import { UserProvider } from './store/auth/auth';
import { Context } from './store/context';

import { ExternalJs } from './component/ExternalJs/ExternalJs';
import { Footer } from './component/Footer/Footer';
import { Header } from './component/Header/Header';
import { Interceptor } from './component/Interceptor/Interceptor';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    // ACTION
    const [stateFooterAlternative, setStateFooterAlternative] = useState(false);
    const [stateHeaderAlternative, setStateHeaderAlternative] = useState(false);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Normalize />

                <HelmetProvider>
                    <Helmet defaultTitle="Liberta" titleTemplate="%s - Liberta">
                        <meta name="description" content="Liberta" />
                    </Helmet>

                    <BrowserRouter>
                        <UserProvider>
                            <Context.Provider
                                value={{
                                    setStateFooterAlternativeContext: setStateFooterAlternative,
                                    setStateHeaderAlternativeContext: setStateHeaderAlternative
                                }}
                            >
                                <Interceptor />

                                <Header alternative={stateHeaderAlternative} />

                                <Router />

                                <Footer alternative={stateFooterAlternative} />
                            </Context.Provider>
                        </UserProvider>
                    </BrowserRouter>
                </HelmetProvider>
            </ThemeProvider>

            <ExternalJs />
        </>
    );
};
