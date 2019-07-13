import styled, { css } from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from './variable';

export const Image = styled.img.attrs((props) => ({
    alt: props.text || 'Imagem',
    'aria-label': props.text || 'Imagem',
    src: props.src
}))`
    ${layout};
    ${space};
    object-fit: cover;
`;

export const BgImage = styled.div`
    background-attachment: ${(props) => props.attachment || 'unset'};
    background-color: ${(props) => props.color || 'transparent'};
    background-image: url('${(props) => props.url}');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: ${(props) => props.size || 'cover'};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;

    ${(props) =>
        props.scale === 'true' &&
        css`
            transform: scale(1.02) translate3d(0, 0, 0);
            transform-origin: 50% 50%;
            transition: transform ${variable.transition};
        `};
`;

export const BgImageOverlay = styled(BgImage)`
    &::after {
        content: ' ';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;
    }
`;

export const BgImageOverlay3 = styled(BgImageOverlay)`
    &::after {
        background-color: ${(props) => props.color === undefined && variable.colorBlackTransparent3};
    }
`;

export const BgImageOverlay6 = styled(BgImageOverlay)`
    &::after {
        background-color: ${(props) => props.color === undefined && variable.colorBlackTransparent6};
    }
`;

export const BgImageOverlayTopBottom = styled(BgImageOverlay)`
    &::after {
        background-color: transparent;
        background-image: linear-gradient(180deg, ${variable.colorBlackTransparent6} 0%, ${variable.colorBlackTransparent3} 100%);
        background-repeat: repeat-x;
    }
`;
