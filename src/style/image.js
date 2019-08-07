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

export const BgImage = styled.div`
    ${({ attachment }) => attachment && `background-attachment: ${attachment}`};
    background-color: ${({ color }) => color || 'transparent'};
    ${({ url }) => url && `background-image: url('${url}')`};
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: ${({ size }) => size || 'cover'};
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;

    ${({ scale }) =>
        scale &&
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

export const BgImageOverlay1 = styled(BgImageOverlay)`
    transition: transform ${variable.transitionSlow};

    &::after {
        background-color: ${({ color }) => color || variable.colorBlackTransparent1};
        transition: background-color ${variable.transition};
    }
`;

export const BgImageOverlay3 = styled(BgImageOverlay)`
    transition: filter ${variable.transitionSlow}, transform ${variable.transitionSlow};

    &::after {
        background-color: ${({ color }) => color || variable.colorBlackTransparent3};
        transition: background-color ${variable.transition};
    }

    ${({ grayscale }) =>
        grayscale &&
        css`
            filter: grayscale(100%);
        `};
`;

export const BgImageOverlay5 = styled(BgImageOverlay)`
    transition: filter ${variable.transitionSlow}, transform ${variable.transitionSlow};

    &::after {
        background-color: ${({ color }) => color || variable.colorBlackTransparent5};
        transition: background-color ${variable.transition};
    }
`;

export const BgImageOverlay6 = styled(BgImageOverlay)`
    &::after {
        background-color: ${({ color }) => color || variable.colorBlackTransparent6};
    }
`;

export const BgImageOverlay7 = styled(BgImageOverlay)`
    &::after {
        background-color: ${({ color }) => color || variable.colorBlackTransparent7};
    }
`;

export const BgImageOverlay3TopBottom = styled(BgImageOverlay3)`
    &::after {
        background-color: transparent;
        background-image: linear-gradient(180deg, ${variable.colorBlackTransparent6} 0%, ${variable.colorBlackTransparent3} 100%);
        background-repeat: repeat-x;
    }
`;
