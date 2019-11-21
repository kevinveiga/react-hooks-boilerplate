import React from 'react';
import YouTube from 'react-youtube';

import { useCursoConteudoVisualizadoApi } from '../../../service/curso';

import { VideoWrap } from '../../../style/layout';

const MinhaContaCursoVideo = ({ conteudo, apiUrl }) => {
    // API
    const [stateCursoConteudoVisualizado, setStateCursoConteudoVisualizadoUrl] = useCursoConteudoVisualizadoApi(null, {});

    // ACTION
    const videoVisualizado = (value) => {
        if (!conteudo.lido) {
            setStateCursoConteudoVisualizadoUrl(value);
        }
    };

    return (
        <VideoWrap bgColor="colorBlack">
            <YouTube id="conteudoVideo" onEnd={() => videoVisualizado(apiUrl)} videoId={conteudo.video_id} />
        </VideoWrap>
    );
};

export default MinhaContaCursoVideo;
