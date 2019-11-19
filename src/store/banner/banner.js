import { useCallback, useLayoutEffect, useState } from 'react';

import { useWindowWidth } from '../util/windowWidth';

import { variable } from '../../style/variable';

export const useChangeBannerScroll = (elementId, offset = 0) => {
    const [stateChangeBanner, setStateChangeBanner] = useState(false);
    const windowWidth = useWindowWidth();

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateChangeBanner(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        if (windowWidth < parseInt(variable.md, 10)) {
            return undefined;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, windowWidth]);

    return stateChangeBanner;
};

export const useFadeOutBannerScroll = (elementId, offset = 0) => {
    const [stateFadeOutBannerScroll, setStateFadeOutBannerScroll] = useState(false);
    const windowWidth = useWindowWidth();

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 1500;

        setStateFadeOutBannerScroll(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        if (windowWidth < parseInt(variable.md, 10)) {
            return undefined;
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll, windowWidth]);

    return stateFadeOutBannerScroll;
};
