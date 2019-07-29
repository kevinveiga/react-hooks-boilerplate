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

export const useMeasure = (liveMeasure = false) => {
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

            if (liveMeasure) {
                window.addEventListener('resize', dimensions);
                window.addEventListener('scroll', dimensions);

                return () => {
                    window.removeEventListener('resize', dimensions);
                    window.removeEventListener('scroll', dimensions);
                };
            }
        }

        return undefined;
    }, [liveMeasure, node, ref]);

    return [ref, measure, node];
};
