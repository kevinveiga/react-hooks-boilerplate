import React, { createContext, useContext, useMemo, useState } from 'react';

const HeaderAlternativeContext = createContext(undefined);

export const HeaderAlternativeProvider = ({ children }) => {
    const [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile] = useState(false);

    const memoMinhaContaMenuMobile = useMemo(() => [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile], [
        stateMinhaContaMenuMobile,
        setStateMinhaContaMenuMobile
    ]);

    return (
        <HeaderAlternativeContext.Provider
            value={{
                stateMinhaContaMenuMobileContext: memoMinhaContaMenuMobile[0],
                setStateMinhaContaMenuMobileContext: memoMinhaContaMenuMobile[1]
            }}
        >
            {children}
        </HeaderAlternativeContext.Provider>
    );
};

export const useHeaderAlternative = () => {
    const context = useContext(HeaderAlternativeContext);

    if (context === undefined) {
        throw new Error('useHeaderAlternative can only be used inside HeaderAlternativeProvider');
    }

    return context;
};
