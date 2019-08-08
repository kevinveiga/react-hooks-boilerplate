import { useCallback, useLayoutEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

export const useChangeNoticiaSocialScroll = (elementId, offset = 0) => {
    const [stateChangeNoticiaSocial, setStateChangeNoticiaSocial] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateChangeNoticiaSocial(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
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
    }, [stateChangeNoticiaSocial, handleScroll]);

    return stateChangeNoticiaSocial;
};

export const useFadeOutNoticiaSocialScroll = (elementId, offset = 0) => {
    const [stateChangeNoticiaSocial, setStateChangeNoticiaSocial] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateChangeNoticiaSocial(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
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
    }, [stateChangeNoticiaSocial, handleScroll]);

    return stateChangeNoticiaSocial;
};
