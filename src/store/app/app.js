import React, { createContext, useContext, useMemo, useState } from 'react';

import { useModalMessage } from '../modalMessage/modalMessage';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [stateModalMessage, setStateModalMessage] = useModalMessage();
    const [stateModalLogout, setstateModalLogout] = useState(false);
    const [stateFooterAlternative, setStateFooterAlternative] = useState(null);
    const [stateHeaderAlternative, setStateHeaderAlternative] = useState(null);

    const modalLogout = useMemo(() => [stateModalLogout, setstateModalLogout], [stateModalLogout, setstateModalLogout]);
    const modalMessage = useMemo(() => [stateModalMessage, setStateModalMessage], [stateModalMessage, setStateModalMessage]);
    const footerAlternative = useMemo(() => [stateFooterAlternative, setStateFooterAlternative], [stateFooterAlternative, setStateFooterAlternative]);
    const headerAlternative = useMemo(() => [stateHeaderAlternative, setStateHeaderAlternative], [stateHeaderAlternative, setStateHeaderAlternative]);

    return (
        <AppContext.Provider
            value={{
                stateModalLogoutContext: modalLogout[0],
                stateModalMessageContext: modalMessage[0],
                stateFooterAlternativeContext: footerAlternative[0],
                stateHeaderAlternativeContext: headerAlternative[0],
                setStateModalLogoutContext: modalLogout[1],
                setStateModalMessageContext: modalMessage[1],
                setStateFooterAlternativeContext: footerAlternative[1],
                setStateHeaderAlternativeContext: headerAlternative[1]
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useApp can only be used inside AppProvider');
    }

    return context;
};
