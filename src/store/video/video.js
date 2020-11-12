import { useEffect, useState } from 'react';

import { variable } from '../../style/variable';

export const useCurrentVideo = (elementId) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(null);

    useEffect(() => {
        if (!stateCurrentVideo) {
            return undefined;
        }

        const anchor = document.querySelector(elementId)
            ? document.querySelector(elementId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + window.innerWidth <
              parseInt(variable.md, 10)
                ? 0
                : 80
            : 0;

        try {
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: anchor
            });
        } catch (error) {
            window.scrollTo(0, anchor);
        }

        return undefined;
    }, [elementId, stateCurrentVideo]);

    return [stateCurrentVideo, setStateCurrentVideo];
};
