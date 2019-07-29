import { useLayoutEffect, useCallback, useState } from 'react';

export const useChangeBannerScroll = (elementId) => {
    const [changeBanner, setChangeBanner] = useState('false');

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        setChangeBanner(scrollYPos > (document.getElementById(elementId) && document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y - 50) ? 'true' : 'false');
    }, [elementId]);

    useLayoutEffect(() => {
        handleScroll();
    }, [handleScroll]);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeBanner, handleScroll]);

    return changeBanner;
};
