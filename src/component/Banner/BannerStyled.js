import styled, { css } from 'styled-components';
import { grid, layout, space } from 'styled-system';

import { BgImageOverlay3 } from '../../style/image';

import { variable } from '../../style/variable';

export const BannerCell = styled.div`
    ${grid};
    ${layout};
    ${space};
    overflow: hidden;
    scroll-snap-align: center;

    ${(props) =>
        props.hover === 'true' &&
        css`
            &:hover {
                ${BgImageOverlay3} {
                    filter: grayscale(0%);
                    transform: scale(1.03);

                    &::after {
                        background-color: ${(props) => props.color === undefined && variable.colorBlackTransparent3};
                    }
                }
            }
        `};
`;

export const BannerContainer = styled.div`
    ${grid};
    ${layout};
    ${space};
    scroll-snap-type: x mandatory;

    @media (max-width: ${variable.md}) {
        overflow-x: auto;
    }
`;

export const BannerPerfilInvestidorStyled = styled.div`
    a {
        width: 100%;

        img {
            width: 100%;
        }
    }
`;
