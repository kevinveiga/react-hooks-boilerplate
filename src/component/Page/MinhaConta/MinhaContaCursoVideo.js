import React, { useCallback } from 'react';

import Vimeo from '@u-wave/react-vimeo';
import YouTube from 'react-youtube';

import { VideoWrap } from '../../../style/layout';

const MinhaContaCursoVideo = ({ conteudo, curso, cursoConteudoNext }) => {
    // FUNCTION
    const handleVideoVisualizado = useCallback(
        () => () => {
            const fn = cursoConteudoNext(curso, conteudo);
            fn();
        },
        [conteudo, curso, cursoConteudoNext]
    );

    return (
        <VideoWrap backgroundColor="colorBlack">
            {conteudo.provedor === 'vimeo' ? (
                <Vimeo autoplay={true} id="conteudoVideo" onEnd={handleVideoVisualizado()} video={conteudo.video_id} />
            ) : (
                <YouTube id="conteudoVideo" onEnd={handleVideoVisualizado()} videoId={conteudo.video_id} />
            )}
        </VideoWrap>
    );
};

export default MinhaContaCursoVideo;
