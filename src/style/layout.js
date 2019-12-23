import styled, { css } from 'styled-components';
import { layout, space } from 'styled-system';

import { variable } from './variable';

export const Container = styled.section`
    ${layout};
    ${space};

    @media (min-width: ${variable.lg}) {
        max-width: 1280px;
    }
`;

export const Main = styled.main`
    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorWhite)};
    height: auto;
    width: 100%;
    z-index: 0;

    ${({ header }) =>
        header === undefined &&
        css`
            margin-top: ${variable.headerHeightMobile};
            min-height: calc(100vh - ${variable.headerHeightMobile});

            @media (min-width: ${variable.lg}) {
                margin-top: ${variable.headerHeight};
                min-height: calc(100vh - ${variable.headerHeight});
            }
        `};

    ${({ header }) =>
        header === false &&
        css`
            margin-top: 0;
            min-height: calc(100vh - ${variable.FooterAlternativeHeight});
        `};

    ${({ header }) =>
        header === 'minhaConta' &&
        css`
            margin-top: ${variable.headerHeightMobile};
            min-height: calc(100vh - ${variable.headerHeightMobile} - ${variable.FooterAlternativeHeight});

            @media (min-width: ${variable.lg}) {
                margin-top: 0;
            }
        `};
`;

export const VideoWrap = styled.div`
    background-color: ${({ bgColor }) => (bgColor ? variable[bgColor] : 'transparent')};

    div {
        height: 0;
        padding-bottom: 50%;
        padding-top: 45%;

        @media (min-width: ${variable.sm}) {
            padding-top: 15%;
        }

        @media (min-width: ${variable.lg}) {
            padding-top: 30px;
        }

        embed,
        iframe {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
`;

export const Wrap = styled.div`
    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorWhite)};
`;
