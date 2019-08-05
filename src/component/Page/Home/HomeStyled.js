import styled from 'styled-components';
import { border, space } from 'styled-system';

import { scrollbar } from '../../../style/function';
import { Grid } from '../../../style/grid';
import { variable } from '../../../style/variable';

export const VideoBox = styled.div`
    ${space};
    background-color: ${(props) => (props.themeColor === 'dark' ? variable.colorGrayDark : variable.colorWhite)};

    p {
        color: ${variable.colorGray2};
    }
`;

export const VideoContainer = styled.section`
    background-image: linear-gradient(115deg, ${variable.colorGrayDark} 0%, ${variable.colorBlack3} 100%);
`;

export const VideoGrid = styled(Grid)`
    background-color: ${variable.colorWhite};
`;

export const VideoUl = styled.ul`
    ${scrollbar(variable.colorPrimary, variable.colorWhite)};
    max-height: 540px;
    overflow-y: auto;
`;

export const VideoLi = styled.li`
    ${border};
    ${space};
    cursor: pointer;
    transition: background-color ${variable.transition}, box-shadow ${variable.transition};

    ${(props) =>
        props.active &&
        css`
            background-color: ${variable.colorGrayHover};
        `};

    ${(props) =>
        props.hover &&
        css`
            &:hover {
                background-color: ${variable.colorGrayHover};
                box-shadow: inset 0 -1px 0 1px ${variable.colorGrayLight};
            }
        `};

    p {
        color: ${variable.colorGray2};
        font-size: 14px;
        margin-bottom: 0;
    }
`;
