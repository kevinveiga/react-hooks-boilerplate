import React, { createContext, useContext, useMemo, useState } from 'react';

const PagarmeContext = createContext(undefined);

export const PagarmeProvider = ({ children }) => {
    const [stateLoaderPagarme, setStateLoaderPagarme] = useState(false);

    const memoPagarme = useMemo(() => [stateLoaderPagarme, setStateLoaderPagarme], [stateLoaderPagarme, setStateLoaderPagarme]);

    return (
        <PagarmeContext.Provider
            value={{
                stateLoaderPagarmeContext: memoPagarme[0],
                setStateLoaderPagarmeContext: memoPagarme[1]
            }}
        >
            {children}
        </PagarmeContext.Provider>
    );
};

export const usePagarme = () => {
    const context = useContext(PagarmeContext);

    if (context === undefined) {
        throw new Error('usePagarme can only be used inside PagarmeProvider');
    }

    return context;
};
