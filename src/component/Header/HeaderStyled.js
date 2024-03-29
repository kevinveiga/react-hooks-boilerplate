import styled, { css } from 'styled-components';

import { ButtonStyled } from '../Button/ButtonStyled';
import { LinkToStyled } from '../Link/LinkToStyled';

import { variable } from '../../style/variable';

export const HeaderMinhaContaMenuBackgroundStyled = styled.div`
    background-color: transparent;
    display: none;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1;

    ${({ active }) =>
        active &&
        css`
            display: block;
            z-index: 10;
        `};
`;

export const HeaderMinhaContaMenuStyled = styled.nav`
    background-color: ${({ change }) => (change ? variable.colorBlack3 : variable.colorWhite)};
    box-shadow: 0 2px 6px 0 ${variable.colorBlackTransparent3};
    height: auto;
    margin-top: 10px;
    overflow: hidden;
    position: absolute;
    text-align: left;
    transform: scaleY(0);
    transform-origin: 0 0 0;
    transition: background-color ${variable.transition}, transform ${variable.transition};
    width: 100%;
    z-index: 11;

    ul {
        li {
            > a,
            > button {
                font-size: 14px;
                font-weight: 700;
                padding: 15px;
            }
        }
    }

    ${({ active }) =>
        active &&
        css`
            overflow: visible;
            transform: scaleY(1);
        `};
`;

export const HeaderMinhaContaNomeStyled = styled.button`
    cursor: pointer;
    font-weight: 700;
    max-width: 200px;
    table-layout: fixed;
    text-overflow: ellipsis;
    transition: color ${variable.transition};
    white-space: nowrap;
    z-index: 11;

    @media (min-width: ${variable.lg}) {
        &:active,
        &:hover {
            color: ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};

            svg {
                fill: ${({ hoverColor }) => (hoverColor ? variable[hoverColor] : variable.colorPrimaryHover)};
            }
        }
    }
`;

export const HeaderBtnMenuStyled = styled.button.attrs({ type: 'button' })`
    display: ${({ active }) => (active ? 'none' : 'block')};
    margin: auto;
    vertical-align: middle;

    ul {
        li {
            background-color: ${({ change }) => (change ? variable.colorWhite : variable.colorSecondary)};
            border-radius: 20px;
            display: block;
            height: 3px;
            margin: 5px 0 5px auto;
            opacity: 1;
            transition: background-color ${variable.transition};
            width: 30px;
        }
    }

    &:hover {
        ul {
            li {
                background-color: ${variable.colorPrimary};
            }
        }
    }
`;

export const HeaderPesquisaStyled = styled.div`
    background-color: ${({ change }) => (change ? variable.colorBlack3 : variable.colorWhite)};
    display: inline-block;
    left: 0;
    overflow-x: hidden;
    position: absolute;
    transition: background-color ${variable.transition}, left ${variable.transition}, width ${variable.transition};
    width: 0;

    ${({ active }) =>
        active &&
        css`
            left: -150px;
            width: 150px;
        `};
`;

export const HeaderStyled = styled.header`
    height: auto;
    left: 0;
    position: fixed;
    top: 0;
    transition: background-color ${variable.transition}, box-shadow ${variable.transition}, min-height ${variable.transition},
        padding ${variable.transition};
    width: 100%;
    z-index: 5;

    ${({ active, change }) =>
        active || change
            ? css`
                  background-color: ${variable.colorBlack3};
                  box-shadow: none;
                  color: ${variable.colorWhite};

                  ${ButtonStyled} {
                      &:not(:hover) {
                          color: ${variable.colorWhite};
                      }
                  }

                  ${LinkToStyled} {
                      &:not(:hover),
                      &:not('.active') {
                          color: ${variable.colorWhite};
                      }

                      ${ButtonStyled} {
                          &:not(:hover) {
                              color: ${variable.colorSecondary};
                          }
                      }
                  }
              `
            : css`
                  background-color: ${variable.colorWhite};
                  box-shadow: 0 1px 0 1px ${variable.colorBlackTransparent1};
              `};
`;
