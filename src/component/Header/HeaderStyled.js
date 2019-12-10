import styled, { css } from 'styled-components';

import { ButtonStyled } from '../Button/ButtonStyled';
import { LinkToStyled } from '../Link/LinkToStyled';

import { variable } from '../../style/variable';

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
    top: -15px;
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
    transition: background-color ${variable.transition}, box-shadow ${variable.transition}, min-height ${variable.transition}, padding ${variable.transition};
    width: 100%;
    z-index: 5;

    ${({ active, change }) =>
        active || change
            ? css`
                  background-color: ${variable.colorBlack3};
                  box-shadow: none;

                  ${ButtonStyled} {
                      &:not(:hover) {
                          color: ${variable.colorWhite};
                      }
                  }

                  ${LinkToStyled} {
                      &:not(:hover) {
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
