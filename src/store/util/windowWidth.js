import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
    const [stateWidth, setStateWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setStateWidth(window.innerWidth);
        };

        handleResize();

        console.log('A: ', stateWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [stateWidth]);

    return stateWidth;
};
