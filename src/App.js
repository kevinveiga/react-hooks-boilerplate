import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';

import { useAuth } from './store/auth/auth';
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
    const [stateUser, setStateUser] = useAuth();

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
                                stateFooterAlternativeContext: stateFooterAlternative,
                                stateHeaderAlternativeContext: stateHeaderAlternative,
                                stateUserContext: stateUser,
                                setStateFooterAlternativeContext: setStateFooterAlternative,
                                setStateHeaderAlternativeContext: setStateHeaderAlternative,
                                setStateUserContext: setStateUser
                            }}
                        >
                            <Interceptor />

                            <Header alternative={stateHeaderAlternative} />

                            <Router />

                            <Footer alternative={stateFooterAlternative} />
                        </Context.Provider>
                    </BrowserRouter>
                </HelmetProvider>
            </ThemeProvider>

            <ExternalJs />
        </>
    );
};
