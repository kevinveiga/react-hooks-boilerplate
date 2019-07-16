import { useEffect, useState } from 'react';

export const useChangeNoticiaSocialScroll = () => {
    const [changeNoticiaSocial, setChangeNoticiaSocial] = useState('false');

    const handleScroll = () => {
        const scrollYPos = window.pageYOffset || document.documentElement.scrollTop;
        setChangeNoticiaSocial(scrollYPos > 720 ? 'true' : 'false');
    };

    useEffect(() => {
        handleScroll();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [changeNoticiaSocial]);

    return changeNoticiaSocial;
};
