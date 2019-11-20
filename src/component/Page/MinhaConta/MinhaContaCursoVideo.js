import React from 'react';
import YouTube from 'react-youtube';

import { useCursoConteudoVideoVisualizadoApi } from '../../../service/curso';

import { VideoWrap } from '../../../style/layout';

const MinhaContaCursoVideo = ({ conteudo, apiUrl }) => {
    // API
    const [stateCursoConteudoVideoVisualizado, setStateCursoConteudoVideoVisualizadoUrl] = useCursoConteudoVideoVisualizadoApi(null, {});

    // ACTION
    const videoVisualizado = (value) => {
        setStateCursoConteudoVideoVisualizadoUrl(value);
    };

    return (
        <VideoWrap bgColor="colorBlack">
            <YouTube id="conteudoVideo" onEnd={() => videoVisualizado(apiUrl)} videoId={conteudo.video_id} />
        </VideoWrap>
    );
};

export default MinhaContaCursoVideo;
