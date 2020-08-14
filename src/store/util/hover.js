import { useEffect, useRef, useState } from 'react';

export const useHover = () => {
    // ACTION
    const [stateHover, setStateHover] = useState(false);

    // REF
    const ref = useRef(null);

    // FUNCTION
    const handleMouseEnter = () => {
        setStateHover(true);
    };

    const handleMouseLeave = () => {
        setStateHover(false);
    };

    // USEEFFECT
    useEffect(() => {
        const node = ref.current;

        if (node) {
            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            node.removeEventListener('mouseenter', handleMouseEnter);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref]);

    return [ref, stateHover];
};
