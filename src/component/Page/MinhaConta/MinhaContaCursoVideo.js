import React, { useCallback, useContext } from 'react';

import YouTube from 'react-youtube';

import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';

import { VideoWrap } from '../../../style/layout';

const MinhaContaCursoVideo = ({ apiUrl, conteudo, cursoId }) => {
    // CONTEXT
    const { setStateCursoConteudoVisualizadoUrlContext } = useContext(MinhaContaCursoContext);

    // ACTION
    // FUNCTION
    const handleVideoVisualizado = useCallback(
        (apiUrl) => () => {
            if (!conteudo.lido) {
                // Muda checked do input checkbox
                document.getElementById(`${cursoId}${conteudo.id}`).checked = true;

                setStateCursoConteudoVisualizadoUrlContext(apiUrl);
            }
        },
        [conteudo, cursoId, setStateCursoConteudoVisualizadoUrlContext]
    );

    return (
        <VideoWrap backgroundColor="colorBlack">
            <YouTube id="conteudoVideo" onEnd={handleVideoVisualizado(apiUrl)} videoId={conteudo.video_id} />
        </VideoWrap>
    );
};

export default MinhaContaCursoVideo;
