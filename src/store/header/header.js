import { useCallback, useLayoutEffect, useState } from 'react';

import { variable } from '../../style/variable';

export const useChangeHeaderScroll = (elementId, offset = 0) => {
    const [changeHeader, setChangeHeader] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).offsetHeight + parseInt(variable.headerHeight, 10) : 0;

        setChangeHeader(scrollYPos > position + offset);
    }, [elementId, offset]);

    useLayoutEffect(() => {
        handleScroll();
    }, [handleScroll]);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeHeader, handleScroll]);

    return changeHeader;
};

export const useChangeMenuMobile = () => {
    const [changeMenuMobile, setChangeMenuMobile] = useState(false);

    return [changeMenuMobile, setChangeMenuMobile];
};
