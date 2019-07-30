import { useCallback, useLayoutEffect, useState } from 'react';

export const useChangeNoticiaSocialScroll = (elementStartId) => {
    const [changeNoticiaSocial, setChangeNoticiaSocial] = useState('false');

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        setChangeNoticiaSocial(scrollYPos > (document.getElementById(elementStartId) && document.getElementById(elementStartId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y - 50) ? 'true' : 'false');
    }, [elementStartId]);

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
