import React, { createContext, useContext, useMemo, useState } from 'react';

const HeaderAlternativeContext = createContext(undefined);

export const HeaderAlternativeProvider = ({ children }) => {
    const [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile] = useState(false);

    const minhaContaMenuMobile = useMemo(() => [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile], [
        stateMinhaContaMenuMobile,
        setStateMinhaContaMenuMobile
    ]);

    return <HeaderAlternativeContext.Provider value={minhaContaMenuMobile}>{children}</HeaderAlternativeContext.Provider>;
};

export const useHeaderAlternative = () => {
    const context = useContext(HeaderAlternativeContext);

    if (context === undefined) {
        throw new Error('useHeaderAlternative can only be used inside HeaderAlternativeProvider');
    }

    return context;
};
