import { useCallback, useLayoutEffect, useState } from 'react';

export const useChangeBannerScroll = (elementStartId, elementStopId) => {
    const [changeBanner, setChangeBanner] = useState(false);

    const handleScroll = useCallback(() => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;

        setChangeBanner(
            scrollYPos > (document.getElementById(elementStartId) && document.getElementById(elementStartId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y - 50) &&
                scrollYPos < (document.getElementById(elementStopId) && document.getElementById(elementStopId).getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y - 50)
        );
    }, [elementStartId, elementStopId]);

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
