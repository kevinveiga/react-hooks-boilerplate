import styled, { css } from 'styled-components';

import { variable } from '../../style/variable';

export const SocialAlternateStyled = styled.ul`
    display: inline-block;

    ${(props) =>
        props.direction === 'vertical'
            ? css`
                  margin-left: 13px;
                  > li {
                      display: block;
                  }
              `
            : css`
                  > li {
                      display: inline-block;
                  }
              `};
    > li {
        > a,
        > button {
            padding: 15px 0 15px 15px;

            > svg {
                fill: ${(props) => (props.themeColor === 'dark' ? variable.colorBlack : variable.colorWhite)};
                height: 40px;

                &:hover {
                    fill: ${variable.colorPrimary};
                }
            }
        }
    }
`;
