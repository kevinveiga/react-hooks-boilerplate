import { useCallback, useLayoutEffect, useState } from 'react';

export const useChangeBannerScroll = (elementId, offset = 50) => {
    const [changeBanner, setChangeBanner] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setChangeBanner(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

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

export const useFadeOutBannerScroll = (elementId, offset = 50) => {
    const [changeBanner, setChangeBanner] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setChangeBanner(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

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
