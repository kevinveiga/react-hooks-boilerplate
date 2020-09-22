import styled from 'styled-components';
import { position } from 'styled-system';

import { variable } from '../../style/variable';

export const SocialSidebarStyled = styled.ul`
    ${position};

    background-color: ${variable.colorBlackTransparent5};
    border-radius: 25px;
    position: fixed;
    z-index: 3;
`;

export const SocialSidebarItemStyled = styled.li`
    display: inline-block;
    padding: 10px;
    text-align: center;

    @media (min-width: ${variable.sm}) {
        display: block;
    }
`;
