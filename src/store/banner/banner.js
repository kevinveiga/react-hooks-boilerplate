import { useCallback, useLayoutEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useChangeBannerScroll = (elementId, offset = 0) => {
    const [stateChangeBanner, setStateChangeBanner] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateChangeBanner(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        handleScroll();

        return undefined;
    }, [handleScroll]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return stateChangeBanner;
};

export const useFadeOutBannerScroll = (elementId, offset = 0) => {
    const [stateFadeOutBannerScroll, setStateFadeOutBannerScroll] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateFadeOutBannerScroll(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        handleScroll();

        return undefined;
    }, [handleScroll]);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return stateFadeOutBannerScroll;
};
