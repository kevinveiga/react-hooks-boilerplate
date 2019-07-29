import { useLayoutEffect, useState } from 'react';

export const useChangeNoticiaSocialScroll = () => {
    const [changeNoticiaSocial, setChangeNoticiaSocial] = useState('false');

    const handleScroll = () => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        setChangeNoticiaSocial(scrollYPos > (document.getElementById('noticia-article-author') && document.getElementById('noticia-article-author').getBoundingClientRect().y - document.querySelector('body').getBoundingClientRect().y - 50) ? 'true' : 'false');
    };

    useLayoutEffect(() => {
        handleScroll();
    }, []);

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeNoticiaSocial]);

    return changeNoticiaSocial;
};
