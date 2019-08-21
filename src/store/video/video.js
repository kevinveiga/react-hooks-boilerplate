import { useLayoutEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { scrollTo } from '../../util/scrollTo';

export const useCurrentVideo = (obj, ancorHash, offset) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(obj);

    useLayoutEffect(() => {
        if (isMobile) {
            return undefined;
        }

        scrollTo(ancorHash, offset);

        return undefined;
    }, [stateCurrentVideo, ancorHash, offset]);

    return [stateCurrentVideo, setStateCurrentVideo];
};
