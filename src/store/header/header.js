import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { variable } from '../../style/variable';

const HeaderContext = createContext(undefined);

export const HeaderProvider = ({ children }) => {
    const [stateMenuMobile, setStateMenuMobile] = useState(false);

    const menuMobile = useMemo(() => [stateMenuMobile, setStateMenuMobile], [stateMenuMobile, setStateMenuMobile]);

    return <HeaderContext.Provider value={menuMobile}>{children}</HeaderContext.Provider>;
};

export const useHeader = () => {
    const context = useContext(HeaderContext);

    if (context === undefined) {
        throw new Error('useHeader can only be used inside HeaderProvider');
    }

    return context;
};

export const useChangeHeaderScroll = (elementId, offset = 0) => {
    const [stateChangeHeader, setStateChangeHeader] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        const position = document.getElementById(elementId)
            ? document.getElementById(elementId).offsetHeight + parseInt(variable.headerHeight, 10)
            : 0;

        setStateChangeHeader(scrollYPos > position + offset);
    }, [elementId, offset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return stateChangeHeader;
};
