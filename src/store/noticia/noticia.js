import { useCallback, useLayoutEffect, useState } from 'react';

export const useChangeNoticiaSocialScroll = (elementId, offset = 0) => {
    const [changeNoticiaSocial, setChangeNoticiaSocial] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setChangeNoticiaSocial(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        handleScroll();
    }, [handleScroll]);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeNoticiaSocial, handleScroll]);

    return changeNoticiaSocial;
};

export const useFadeOutNoticiaSocialScroll = (elementId, offset = 0) => {
    const [changeNoticiaSocial, setChangeNoticiaSocial] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        const position = document.getElementById(elementId) ? document.getElementById(elementId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y : 0;

        setChangeNoticiaSocial(scrollYPos > position + (position > document.querySelector('body').getBoundingClientRect().y ? offset : 0));
    }, [elementId, offset]);

    useLayoutEffect(() => {
        handleScroll();
    }, [handleScroll]);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeNoticiaSocial, handleScroll]);

    return changeNoticiaSocial;
};
