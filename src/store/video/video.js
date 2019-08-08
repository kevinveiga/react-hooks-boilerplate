import { useState } from 'react';

export const useCurrentVideo = (obj) => {
    const [stateCurrentVideo, setStateCurrentVideo] = useState(obj);

    return [stateCurrentVideo, setStateCurrentVideo];
};
