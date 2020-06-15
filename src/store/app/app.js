import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [stateModalLogout, setStateModalLogout] = useState(false);

    const modalLogout = useMemo(() => [stateModalLogout, setStateModalLogout], [stateModalLogout, setStateModalLogout]);

    return (
        <AppContext.Provider
            value={{
                stateModalLogoutContext: modalLogout[0],
                setStateModalLogoutContext: modalLogout[1]
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
