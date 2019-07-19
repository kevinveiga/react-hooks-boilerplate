import styled from 'styled-components';

import { variable } from '../../style/variable';

export const SocialStyled = styled.ul`
    display: inline-block;
    > li {
        display: inline-block;

        > a,
        > button {
            padding: 10px 0 10px 18px;

            > svg {
                fill: ${(props) => (props.change === 'true' ? variable.colorWhite : props.color ? variable[props.color] : variable.colorSecondary)};
            }
        }
    }
`;
