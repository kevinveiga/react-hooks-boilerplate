import React from 'react';

import { useChangeNoticiaSocialScroll, useFadeOutNoticiaSocialScroll } from '../../../store/noticia/noticia';

import { NoticiaSocialStyled } from './NoticiaSocialStyled';
import { Share } from '../../Social/Share';

export const NoticiaSocial = ({ elementChange, elementFadeOut, title, url, ...otherProps }) => {
    // ACTION
    const stateChangeNoticiaSocialScroll = useChangeNoticiaSocialScroll(elementChange.elementId, elementChange.offset);
    const stateFadeOutNoticiaSocialScroll = useFadeOutNoticiaSocialScroll(elementFadeOut.elementId, elementFadeOut.offset);

    return (
        <NoticiaSocialStyled change={stateChangeNoticiaSocialScroll} fadeOut={stateFadeOutNoticiaSocialScroll} {...otherProps}>
            <div>
                <b>Compartilhar:</b>
            </div>

            <Share direction="vertical" title={title} themeColor="dark" url={url} />
        </NoticiaSocialStyled>
    );
};
