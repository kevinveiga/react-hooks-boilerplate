import styled, { css } from 'styled-components';

import { variable } from './variable';

const tabInput = (group, total) => {
    let styles = '';

    for (let i = 0, l = total; i < l; i += 1) {
        styles += `
            input[name='${group}'] {
                &:nth-child(${i}) {
                    &:checked {
                        ~ .tabs-nav {
                            .tab-nav {
                                &:nth-child(${i}) {
                                    .btn-tab {
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
                        ~ .tabs-content {
                            .tab-content {
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
    ${(props) => tabInput(props.group, props.total)};
    overflow: hidden;

    input[type='radio'] {
        opacity: 0;
        position: absolute;
    }

    .tabs-nav {
        margin-bottom: ${variable.spacingMD};
        .tab-nav {
            display: inline-block;
        }
    }

    .tabs-content {
        .tab-content {
            opacity: 0;
            position: absolute;
            transform: translate3d(0, 5%, 0);
            transition: opacity ${variable.transitionSlow}, transform ${variable.transition};
            visibility: hidden;
            z-index: -1;
        }
    }
`;
