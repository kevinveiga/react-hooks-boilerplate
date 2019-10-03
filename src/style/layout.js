import styled from 'styled-components';
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
    height: auto;
    margin-top: ${variable.headerHeightMobile};
    min-height: 500px;
    width: 100%;
    z-index: 0;

    @media (min-width: ${variable.lg}) {
        margin-top: ${variable.headerHeight};
        min-height: calc(100vh - ${variable.headerHeight});
    }
`;

export const MainAlternate = styled.main`
    height: auto;
    margin-top: ${variable.headerHeightMobile};
    min-height: calc(100vh - ${variable.headerHeightMobile} - ${variable.footerAlternateHeight});
    width: 100%;
    z-index: 0;

    @media (min-width: ${variable.lg}) {
        margin-top: 0;
        min-height: calc(100vh - ${variable.headerHeight} - ${variable.footerAlternateHeight});
    }
`;

export const VideoWrap = styled.div`
    div {
        height: 0;
        padding-bottom: 50%;
        padding-top: 25px;

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
    ${layout};
    ${space};
    background-color: ${({ backgroundColor }) => (backgroundColor ? variable[backgroundColor] : variable.colorWhite)};
`;
