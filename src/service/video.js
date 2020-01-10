import { useEffect, useState } from 'react';

import axios from 'axios';

export const useVideoApi = (obj) => {
    const [stateVideoData, setStateVideoData] = useState(obj);

    const [stateVideo, setStateVideo] = useState(JSON.parse('{ "data": [] }'));

    useEffect(() => {
        if (!stateVideoData.isIntersecting || !stateVideoData.url) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateVideoData.url);

                if (!didCancel) {
                    setStateVideo(result);
                }
            } catch (error) {
                if (!didCancel) {
                    console.error('Erro ao buscar dados de Vídeo');
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [stateVideoData]);

    return [stateVideo, setStateVideoData];
};
