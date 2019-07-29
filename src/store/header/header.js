import { useLayoutEffect, useState } from 'react';

import { variable } from '../../style/variable';

export const useChangeHeaderScroll = () => {
    const [changeHeader, setChangeHeader] = useState('false');

    const handleScroll = () => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        setChangeHeader(scrollYPos > document.getElementById('header').offsetHeight + parseInt(variable.headerHeight, 10) ? 'true' : 'false');
    };

    useLayoutEffect(() => {
        handleScroll();
    }, []);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeHeader]);

    return changeHeader;
};

export const useChangeMenuMobile = () => {
    const [changeMenuMobile, setChangeMenuMobile] = useState('false');

    return [changeMenuMobile, setChangeMenuMobile];
};
