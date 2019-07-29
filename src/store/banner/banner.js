import { useLayoutEffect, useState } from 'react';

export const useChangeBannerScroll = () => {
    const [changeBanner, setChangeBanner] = useState('false');

    const handleScroll = () => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        setChangeBanner(scrollYPos > (document.getElementById('home-noticias-container') && document.getElementById('home-noticias-container').getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y - 50) ? 'true' : 'false');
    };

    useLayoutEffect(() => {
        handleScroll();
    }, []);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeBanner]);

    return changeBanner;
};
