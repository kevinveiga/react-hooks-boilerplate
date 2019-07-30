import { useCallback, useLayoutEffect, useState } from 'react';

import { variable } from '../../style/variable';

export const useChangeHeaderScroll = (elementStartId) => {
    const [changeHeader, setChangeHeader] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        setChangeHeader(scrollYPos > (document.getElementById(elementStartId) && document.getElementById(elementStartId).offsetHeight + parseInt(variable.headerHeight, 10)));
    }, [elementStartId]);

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
