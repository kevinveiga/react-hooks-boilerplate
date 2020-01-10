import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [stateModalLogout, setstateModalLogout] = useState(false);

    const modalLogout = useMemo(() => [stateModalLogout, setstateModalLogout], [stateModalLogout, setstateModalLogout]);

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
