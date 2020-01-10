import React from 'react';

import { useIntersect } from '../../store/util/intersect';

export const IntersectionObserver = ({ children = null }) => {
    // ACTION
    const [stateEntry, setStateNode] = useIntersect({});

    return <div ref={setStateNode}>{stateEntry.isIntersecting && children}</div>;
};
