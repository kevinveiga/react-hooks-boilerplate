import { useEffect, useCallback, useState } from 'react';

import { useWindowWidth } from './windowWidth';

import { variable } from '../../style/variable';

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
    const [stateMeasure, setStateMeasure] = useState({});
    const [stateNode, setStateNode] = useState(null);
    const windowWidth = useWindowWidth();

    const ref = useCallback((stateNode) => {
        setStateNode(stateNode);
    }, []);

    useEffect(() => {
        if (!stateNode) {
            return undefined;
        }

        if (windowWidth < parseInt(variable.md, 10)) {
            return undefined;
        }

        const dimensions = () => {
            window.requestAnimationFrame(() => {
                setStateMeasure(getDimensionObject(stateNode));
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
    }, [liveResize, liveScroll, stateNode, ref, windowWidth]);

    return [ref, stateMeasure];
};
