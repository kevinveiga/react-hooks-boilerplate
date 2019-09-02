import { useEffect, useRef, useState } from 'react';

export const useIntersect = ({ root = null, rootMargin = '0px', threshold = 0 }) => {
    const [stateEntry, setStateEntry] = useState({});
    const [stateNode, setStateNode] = useState(null);

    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new window.IntersectionObserver(
            ([entry]) => {
                setStateEntry(entry);
            },
            { root, rootMargin, threshold }
        );

        const { current: currentObserver } = observer;

        if (stateNode) {
            currentObserver.observe(stateNode);
        }

        return () => {
            currentObserver.disconnect();
        };
    }, [stateNode, root, rootMargin, threshold]);

    return [stateEntry, setStateNode];
};
