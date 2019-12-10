import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Router } from './router';

import { useAuth } from './store/auth/auth';
import { Context } from './store/context';
import { useModalMessage } from './store/modalMessage/modalMessage';

import { ExternalJs } from './component/ExternalJs/ExternalJs';
import { Footer } from './component/Footer/Footer';
import { Header } from './component/Header/Header';
import { Loader } from './component/Loader/Loader';
import { ModalMessage } from './component/Modal/ModalMessage';

import { Normalize } from './style/normalize';
import { theme } from './style/theme';

export const App = () => {
    // ACTION
    const [stateUser, setStateUser] = useAuth();
    const [stateFooterAlternative, setStateFooterAlternative] = useState(false);
    const [stateHeaderAlternative, setStateHeaderAlternative] = useState(false);
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
                                stateFooterAlternativeContext: stateFooterAlternative,
                                stateHeaderAlternativeContext: stateHeaderAlternative,
                                stateUserContext: stateUser,
                                setstateUserContext: setStateUser,
                                setStateFooterAlternativeContext: setStateFooterAlternative,
                                setStateHeaderAlternativeContext: setStateHeaderAlternative,
                                setStateLoaderContext: setStateLoader,
                                setStateModalMessageContext: setStateModalMessage
                            }}
                        >
                            <Loader active={stateLoader} />

                            <Header alternative={stateHeaderAlternative} />

                            <Router />

                            <Footer alternative={stateFooterAlternative} />

                            <ModalMessage text={stateModalMessage} />
                        </Context.Provider>
                    </BrowserRouter>
                </HelmetProvider>
            </ThemeProvider>

            <ExternalJs />
        </>
    );
};
