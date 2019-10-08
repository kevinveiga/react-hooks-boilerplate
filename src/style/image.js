import styled, { css } from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from './variable';

export const Image = styled.img.attrs(({ text, url }) => ({
    alt: text || 'Imagem',
    'aria-label': text || 'Imagem',
    src: url
}))`
    ${layout};
    ${space};
    object-fit: ${({ objectFit }) => objectFit || 'cover'};
`;

export const ImageCircleContainer = styled.div`
    border-radius: 50%;
    height: 150px;
    overflow: hidden;
    text-align: center;
    width: 150px;

    img {
        height: 100%;
    }
`;

export const BgImage = styled.div`
    ${({ attachment }) => attachment && `background-attachment: ${attachment}`};
    background-color: ${({ bgColor }) => variable[bgColor] || 'transparent'};
    ${({ url }) => url && `background-image: url('${url}')`};
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: ${({ size }) => size || 'cover'};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: ${({ zindex }) => zindex || '-1'};

    ${({ scale }) =>
        scale &&
        css`
            transform: scale(1.02) translate3d(0, 0, 0);
            transform-origin: 50% 50%;
            transition: transform ${variable.transition};
        `};
`;

export const BgImageOverlay = styled(BgImage)`
    ${({ grayscale }) => grayscale && `filter: grayscale(100%)`};
    transition: filter ${variable.transitionSlow}, transform ${variable.transitionSlow};

    &::after {
        background-color: ${({ overlayColor }) => (overlayColor ? variable[overlayColor] : variable.colorBlackTransparent1)};
        content: ' ';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transition: background-color ${variable.transition};
        width: 100%;
        z-index: 2;
    }
`;

export const BgImageOverlayTopBottom = styled(BgImageOverlay)`
    &::after {
        background-color: transparent;
        background-image: linear-gradient(180deg, ${({ overlayColorTop }) => (overlayColorTop ? variable[overlayColorTop] : variable.colorBlackTransparent5)} 0%, ${({ overlayColorBottom }) => (overlayColorBottom ? variable[overlayColorBottom] : variable.colorBlackTransparent1)} 100%);
        background-repeat: repeat-x;
    }
`;
