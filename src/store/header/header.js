import { useCallback, useLayoutEffect, useState } from 'react';

import { variable } from '../../style/variable';

export const useChangeHeaderScroll = (elementId, offset = 0) => {
    const [stateChangeHeader, setStateChangeHeader] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        const position = document.getElementById(elementId) ? document.getElementById(elementId).offsetHeight + parseInt(variable.headerHeight, 10) : 0;

        setStateChangeHeader(scrollYPos > position + offset);
    }, [elementId, offset]);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return stateChangeHeader;
};

export const useChangeMenuMobile = () => {
    const [stateChangeMenuMobile, setStateChangeMenuMobile] = useState(false);

    return [stateChangeMenuMobile, setStateChangeMenuMobile];
};

export const useChangeMinhaContaMenuMobile = () => {
    const [stateChangeMinhaContaMenuMobile, setStateChangeMinhaContaMenuMobile] = useState(false);

    return [stateChangeMinhaContaMenuMobile, setStateChangeMinhaContaMenuMobile];
};
