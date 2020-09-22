import React from 'react';

import { useIntersect } from '../../store/util/intersect';

import { BgImage, BgImageOverlay } from '../../style/image';

import imagePlaceholder from '../../asset/image/image-placeholder.svg';

export const BgImageLazyLoad = ({ url, ...props }) => {
    // ACTION
    const [stateEntry, setStateNode] = useIntersect({});

    return (
        <>
            <BgImage size="15%" url={imagePlaceholder} zindex="-2" />
            <BgImageOverlay ref={setStateNode} url={stateEntry.isIntersecting && url} {...props} />
        </>
    );
};
