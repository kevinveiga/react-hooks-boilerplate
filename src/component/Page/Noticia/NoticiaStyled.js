import styled, { css } from 'styled-components';
import { space } from 'styled-system';

import { variable } from '../../../style/variable';

export const NoticiaContainerStyled = css`
    margin-left: auto;
    margin-right: auto;
    max-width: ${variable.md};
`;

export const NoticiaArticleStyled = styled.article`
    font-size: 18px;
    height: ${({ show }) => (show ? 'auto' : '400px')};
    margin-bottom: 25px;
    overflow-y: hidden;

    img {
        height: 70vmin;
        margin: 0 auto 50px auto;
        object-fit: cover;
        width: 100%;
    }

    b,
    code,
    del,
    em,
    i,
    kbd,
    ol,
    p,
    pre,
    s,
    samp,
    small,
    span,
    strong,
    ul,
    var {
        ${NoticiaContainerStyled};
        line-height: 2;
        margin-bottom: 25px;

        img {
            height: auto;
        }

        b,
        code,
        del,
        em,
        i,
        img,
        kbd,
        pre,
        s,
        samp,
        small,
        span,
        strong,
        var {
            margin-bottom: unset;
            margin-left: unset;
            margin-right: unset;
            max-width: unset;
        }
    }

    div,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    table {
        ${NoticiaContainerStyled};
        line-height: 1.5;
        margin-bottom: 25px;

        img {
            height: auto;
        }

        b,
        code,
        del,
        em,
        i,
        img,
        kbd,
        ol,
        p,
        pre,
        s,
        samp,
        small,
        span,
        strong,
        ul,
        var {
            margin-bottom: unset;
            margin-left: unset;
            margin-right: unset;
            max-width: unset;
        }
    }

    hr {
        ${NoticiaContainerStyled};
    }

    .video-wrap {
        ${NoticiaContainerStyled};
        height: 0;
        margin-bottom: 50px;
        padding-bottom: 56.25%;
        padding-top: 25px;

        embed,
        iframe {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
`;

export const NoticiaArticleAuthorStyled = styled.article`
    ${NoticiaContainerStyled};
    ${space};
    text-transform: capitalize;
`;

export const NoticiaAuthorStyled = styled.section`
    ${space};
    border-bottom: 1px solid ${variable.borderColor};
    border-top: 1px solid ${variable.borderColor};
    margin-left: auto;
    margin-right: auto;
    max-width: calc(${variable.md} - ${variable.spacingLG});
    padding-bottom: ${variable.spacingMD};
    padding-top: ${variable.spacingMD};
`;

export const NoticiaFormContainerStyled = styled.section`
    ${NoticiaContainerStyled};
    ${space};
    box-shadow: 0 3px 10px 0 ${variable.colorBlackTransparent1};
`;

export const NoticiaMateriasRelacionadasStyled = styled.section`
    ${NoticiaContainerStyled};
    ${space};
`;
