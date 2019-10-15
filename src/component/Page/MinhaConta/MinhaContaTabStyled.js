import styled, { css } from 'styled-components';

import { variable } from '../../../style/variable';

export const TabContentStyled = styled.li`
    opacity: 0;
    position: absolute;
    transform: translate3d(0, 5%, 0);
    transition: opacity ${variable.transitionSlow}, transform ${variable.transition};
    visibility: hidden;
    z-index: -1;
`;

export const TabsContentStyled = styled.ul`
    padding-bottom: ${variable.spacingMD};
    padding-top: ${variable.spacingMD};
`;

export const TabNavStyled = styled.li`
    display: inline-block;
    padding-right: 25px;

    @media (min-width: ${variable.sm}) {
        padding-right: 40px;
    }

    label {
        cursor: pointer;
        padding: 15px 0 15px 0;
        transition: color ${variable.transition}, text-shadow ${variable.transition};
        &::after {
            bottom: -2px;
            content: ' ';
            display: block;
            height: 3px;
            position: absolute;
            transition: background-color ${variable.transition}, width ${variable.transition};
            width: 0;
        }

        &:hover {
            color: ${variable.colorPrimary};
            text-shadow: 0 0 1px ${variable.colorPrimary};

            &::after {
                background-color: ${variable.colorPrimary};
                width: 100%;
            }
        }
    }
`;

export const TabsNavStyled = styled.ul`
    border-bottom: 1px solid ${variable.colorBlack};
`;

export const TabStyled = styled.div`
    ${({ group, total }) => tabInput(group, total)};
    overflow: hidden;

    input[type='radio'] {
        opacity: 0;
        position: absolute;
    }
`;

const tabInput = (group, total) => {
    let styles = '';

    for (let i = 1, l = total + 1; i < l; i += 1) {
        styles += `
        input[name='${group}'] {
            &:nth-child(${i}) {
                &:checked {
                    ~ ${TabsNavStyled} {
                        ${TabNavStyled} {
                            &:nth-child(${i}) {
                                label {
                                    color: ${variable.colorPrimaryHover};
                                    text-shadow: 0 0 1px ${variable.colorPrimary};

                                    &::after {
                                        background-color: ${variable.colorPrimaryHover};
                                        width: 100%;
                                    }

                                    &:hover {
                                        color: ${variable.colorPrimary};
                                        text-shadow: 0 0 1px ${variable.colorPrimary};

                                        &::after {
                                            background-color: ${variable.colorPrimary};
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ~ ${TabsContentStyled} {
                        ${TabContentStyled} {
                            &:nth-child(${i}) {
                                opacity: 1;
                                position: relative;
                                transform: translate3d(0, 0, 0);
                                visibility: visible;
                                z-index: 1;
                            }
                        }
                    }
                }
            }
        }
    `;
    }

    return css`
        ${styles}
    `;
};
