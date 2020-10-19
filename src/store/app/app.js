import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [stateModal, setStateModal] = useState(false);

    const memoModal = useMemo(() => [stateModal, setStateModal], [stateModal, setStateModal]);

    return (
        <AppContext.Provider
            value={{
                stateModalContext: memoModal[0],
                setStateModalContext: memoModal[1]
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
