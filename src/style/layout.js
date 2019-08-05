import styled from 'styled-components';
import { space } from 'styled-system';

import { variable } from './variable';

export const Background = styled.section`
    ${(props) => props.backgroundColor && `background-color: ${variable[props.backgroundColor]}`};
`;

export const Container = styled.section`
    ${space};

    @media (min-width: ${variable.lg}) {
        max-width: 1280px;
    }
`;

export const Main = styled.main`
    height: auto;
    margin-top: ${variable.headerHeightMobile};
    min-height: 200px;
    width: 100%;
    z-index: 0;

    @media (min-width: ${variable.lg}) {
        margin-top: ${variable.headerHeight};
        min-height: calc(100vh - ${variable.headerHeight});
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
