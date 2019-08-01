import { useCallback, useLayoutEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useChangeBannerScroll = (elementId, offset = 0) => {
    const [changeBanner, setChangeBanner] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setChangeBanner(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        return handleScroll();
    }, [handleScroll]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeBanner, handleScroll]);

    return changeBanner;
};

export const useFadeOutBannerScroll = (elementId, offset = 0) => {
    const [changeBanner, setChangeBanner] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setChangeBanner(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        return handleScroll();
    }, [handleScroll]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeBanner, handleScroll]);

    return changeBanner;
};
