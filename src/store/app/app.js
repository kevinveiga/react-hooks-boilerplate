import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [stateChangeModalLogout, setStateChangeModalLogout] = useState(false);
    const [stateFooterAlternative, setStateFooterAlternative] = useState(null);
    const [stateHeaderAlternative, setStateHeaderAlternative] = useState(null);

    const modalLogout = useMemo(() => [stateChangeModalLogout, setStateChangeModalLogout], [stateChangeModalLogout, setStateChangeModalLogout]);
    const footer = useMemo(() => [stateFooterAlternative, setStateFooterAlternative], [stateFooterAlternative, setStateFooterAlternative]);
    const header = useMemo(() => [stateHeaderAlternative, setStateHeaderAlternative], [stateHeaderAlternative, setStateHeaderAlternative]);

    return (
        <AppContext.Provider
            value={{
                stateChangeModalLogoutContext: modalLogout[0],
                stateFooterAlternativeContext: footer[0],
                stateHeaderAlternativeContext: header[0],
                setStateChangeModalLogoutContext: modalLogout[1],
                setStateFooterAlternativeContext: footer[1],
                setStateHeaderAlternativeContext: header[1]
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
