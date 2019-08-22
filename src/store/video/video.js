import { useEffect, useState } from 'react';

export const useCurrentVideo = (ancorHash, offset) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(null);

    const ancor = document.querySelector(ancorHash) ? document.querySelector(ancorHash).getBoundingClientRect().y - document.body.getBoundingClientRect().y + offset : 0;

    useEffect(() => {
        if (stateCurrentVideo) {
            try {
                window.scroll({
                    behavior: 'smooth',
                    left: 0,
                    top: ancor
                });
            } catch (error) {
                window.scrollTo(0, ancor);
            }
        }

        return undefined;
    }, [ancor, stateCurrentVideo]);

    return [stateCurrentVideo, setStateCurrentVideo];
};
