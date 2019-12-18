import styled, { css } from 'styled-components';
import { display, space, textAlign, width } from 'styled-system';

import { variable } from './variable';

const tabInput = (group, total) => {
    let styles = '';

    for (let i = 1, l = total + 1; i < l; i += 1) {
        styles += `
            input[name='${group}'] {
                &:nth-child(${i}) {
                    &:checked {
                        ~ ${TabsNav} {
                            ${TabNav} {
                                &:nth-child(${i}) {
                                    ${TabLabel}{
                                        background-color: ${variable.colorSecondary};
                                        box-shadow: inset 0 0 0 3px ${variable.colorSecondary};
                                        color: ${variable.colorWhite};

                                        &:active,
                                        &:focus,
                                        &:hover {
                                            background-color: ${variable.colorSecondaryHover};
                                            box-shadow: inset 0 0 0 3px ${variable.colorSecondaryHover};
                                        }
                                    }
                                }
                            }
                        }
                        ~ ${TabsContent} {
                            ${TabContent} {
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

export const Tab = styled.div`
    ${({ group, total }) => tabInput(group, total)};
    ${textAlign};
    ${width};
    overflow: hidden;

    > input[type='radio'] {
        opacity: 0;
        position: absolute;
    }
`;

export const TabsContent = styled.ul`
    ${display};
    ${space};
    min-height: 50px;
`;

export const TabContent = styled.li`
    opacity: 0;
    position: absolute;
    transform: translate3d(0, 5%, 0);
    transition: opacity ${variable.transitionSlow}, transform ${variable.transition};
    visibility: hidden;
    z-index: -1;
`;

export const TabLabel = styled.label`
    background-color: transparent;
    border: 3px solid ${variable.colorBlack3};
    border-radius: 25px;
    color: ${variable.colorBlack3};
    cursor: pointer;
    font-weight: 700;
    height: 45px;
    line-height: 40px;
    margin-right: ${variable.spacingSM};
    min-width: 100px;
    padding-left: 2vw;
    padding-right: 2vw;
    text-align: center;
    text-transform: uppercase;
    transition: background-color ${variable.transition}, border ${variable.transition}, color ${variable.transition};
    vertical-align: middle;
    white-space: nowrap;
    width: auto;
`;

export const TabsNav = styled.ul`
    ${display};
    ${textAlign};
    margin-bottom: 30px;
`;

export const TabNav = styled.li`
    display: inline-block;

    label {
        font-size: 14px;
    }
`;

export const TabSelect = styled.div`
    ${space};
    display: table;
    margin-bottom: 30px;

    svg {
        pointer-events: none;
        position: absolute;
        right: ${variable.spacingSM};
        top: 50%;
        transform: translate3d(0, -50%, 0);
        transition: fill ${variable.transition}, stroke ${variable.transition};
        z-index: 2;
    }

    select {
        background-color: transparent;
        border: 3px solid ${variable.colorBlack3};
        border-radius: 25px;
        color: ${variable.colorBlack3};
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
        height: 45px;
        line-height: 40px;
        min-width: 100px;
        max-width: 100%;
        padding: 0 45px 0 ${variable.spacingSM};
        text-align: center;
        text-align-last: center;
        text-transform: uppercase;
        transition: background-color ${variable.transition}, border ${variable.transition}, color ${variable.transition};
        vertical-align: middle;
        white-space: nowrap;
        width: auto;

        &:active,
        &:focus,
        &:hover {
            background-color: ${variable.colorSecondary};
            color: ${variable.colorWhite};

            + svg {
                fill: ${variable.colorWhite};
            }
        }

        option {
            background-color: ${variable.colorWhite};
            color: ${variable.colorSecondary};
        }
    }
`;
