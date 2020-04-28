import React, { useCallback, useContext } from 'react';

// import Vimeo from '@u-wave/react-vimeo';
import YouTube from 'react-youtube';

import { apiUrlCursos } from '../../../config';

import * as ACTION from '../../../store/action/action';
import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';

import { VideoWrap } from '../../../style/layout';

const MinhaContaCursoVideo = ({ conteudoId, conteudoProvedor, conteudoVideoId, cursoId }) => {
    // CONTEXT
    const { setStateCursoConteudoVisualizadoDataContext } = useContext(MinhaContaCursoContext);

    // FUNCTION
    const handleVideoVisualizado = useCallback(
        () => () => {
            const element = document.getElementById(`${cursoId}${conteudoId}`);

            if (!element.checked) {
                // Muda checked do input checkbox
                element.checked = true;

                setStateCursoConteudoVisualizadoDataContext({
                    action: ACTION.add(),
                    cursoId: cursoId,
                    url: `${apiUrlCursos}/meus-cursos/${cursoId}/${conteudoId}`
                });
            }
        },
        [conteudoId, cursoId, setStateCursoConteudoVisualizadoDataContext]
    );

    return (
        <VideoWrap backgroundColor="colorBlack">
            {/* {conteudoProvedor === 'vimeo' ? (
                <Vimeo id="conteudoVideo" onEnd={handleVideoVisualizado()} video={conteudoVideoId} />
            ) : ( */}
            <YouTube id="conteudoVideo" onEnd={handleVideoVisualizado()} videoId={conteudoVideoId} />
            {/* )} */}
        </VideoWrap>
    );
};

export default MinhaContaCursoVideo;
