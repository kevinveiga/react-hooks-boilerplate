import { useLayoutEffect, useState } from 'react';

import { scrollTo } from '../../util/scrollTo';

export const useCurrentVideo = (ancorHash, offset) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(null);

    useLayoutEffect(() => {
        scrollTo(ancorHash, true, offset);

        return undefined;
    }, [stateCurrentVideo, ancorHash, offset]);

    return [stateCurrentVideo, setStateCurrentVideo];
};
