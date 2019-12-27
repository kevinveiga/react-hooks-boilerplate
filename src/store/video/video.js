import { useEffect, useState } from 'react';

export const useCurrentVideo = (elementId, offset) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(null);

    useEffect(() => {
        if (!stateCurrentVideo) {
            return undefined;
        }

        const anchor = document.querySelector(elementId) ? document.querySelector(elementId).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

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
    }, [elementId, offset, stateCurrentVideo]);

    return [stateCurrentVideo, setStateCurrentVideo];
};
