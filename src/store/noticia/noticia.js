import { useCallback, useLayoutEffect, useState } from 'react';

import { useWindowWidth } from '../util/windowWidth';

import { variable } from '../../style/variable';

export const useChangeNoticiaSocialScroll = (elementId, offset = 0) => {
    const [stateChangeNoticiaSocial, setStateChangeNoticiaSocial] = useState(false);
    const windowWidth = useWindowWidth();

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateChangeNoticiaSocial(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
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

    return stateChangeNoticiaSocial;
};

export const useFadeOutNoticiaSocialScroll = (elementId, offset = 0) => {
    const [stateChangeNoticiaSocial, setStateChangeNoticiaSocial] = useState(false);
    const windowWidth = useWindowWidth();

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setStateChangeNoticiaSocial(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
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

    return stateChangeNoticiaSocial;
};
