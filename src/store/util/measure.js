import { useLayoutEffect, useCallback, useState } from 'react';

const getDimensionObject = (node) => {
    const rect = node.getBoundingClientRect();

    return {
        bottom: rect.bottom,
        height: rect.height,
        left: 'y' in rect ? rect.y : rect.left,
        right: rect.right,
        top: 'x' in rect ? rect.x : rect.top,
        width: rect.width,
        x: 'x' in rect ? rect.x : rect.left,
        y: 'y' in rect ? rect.y : rect.top
    };
};

export const useMeasure = (liveResize = false, liveScroll = false) => {
    const [measure, setMeasure] = useState({});
    const [node, setNode] = useState(null);

    const ref = useCallback((node) => {
        setNode(node);
    }, []);

    useLayoutEffect(() => {
        if (node) {
            const dimensions = () => {
                window.requestAnimationFrame(() => {
                    setMeasure(getDimensionObject(node));
                });
            };

            dimensions();

            if (liveResize) {
                window.addEventListener('resize', dimensions);
            }

            if (liveScroll) {
                window.addEventListener('scroll', dimensions);
            }

            return () => {
                if (liveResize) {
                    window.removeEventListener('resize', dimensions);
                }

                if (liveScroll) {
                    window.removeEventListener('scroll', dimensions);
                }
            };
        }

        return undefined;
    }, [liveResize, liveScroll, node, ref]);

    return [ref, measure, node];
};
