import { useLayoutEffect, useState } from 'react';

import { scrollTo } from '../../util/scrollTo';

export const useCurrentVideo = (obj, ancorHash, offset) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(obj);

    useLayoutEffect(() => {
        scrollTo(ancorHash, offset);

        return undefined;
    }, [stateCurrentVideo, ancorHash, offset]);

    return [stateCurrentVideo, setStateCurrentVideo];
};
