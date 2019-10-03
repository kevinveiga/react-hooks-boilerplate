import styled, { css } from 'styled-components';
import { layout, position, space } from 'styled-system';

import { animationFadeInTab, animationFadeOutTab } from '../../../style/animation';
import { variable } from '../../../style/variable';

export const NoticiaContainer = css`
    margin-left: auto;
    margin-right: auto;
    max-width: ${variable.md};
`;

export const NoticiaArticle = styled.article`
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
    p,
    pre,
    s,
    samp,
    small,
    span,
    strong,
    var {
        ${NoticiaContainer};
        font-size: 18px;
        line-height: 2;
        margin-bottom: 50px;

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
        ${NoticiaContainer};
        line-height: 1.5;
        margin-bottom: 50px;

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
        p,
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

    hr {
        ${NoticiaContainer};
    }

    .video-wrap {
        ${NoticiaContainer};
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

export const NoticiaArticleAuthor = styled.article`
    ${NoticiaContainer};
    ${space};
    text-transform: capitalize;
`;

export const NoticiaAuthor = styled.section`
    ${space};
    border-bottom: 1px solid ${variable.borderColor};
    border-top: 1px solid ${variable.borderColor};
    margin-left: auto;
    margin-right: auto;
    max-width: calc(${variable.md} - ${variable.spacingLG});
    padding-bottom: ${variable.spacingMD};
    padding-top: ${variable.spacingMD};

    .escrito-por {
        color: ${variable.colorGray};
        font-size: 14px;
        margin-bottom: 8px;
    }

    .image-container {
        border-radius: 50%;
        height: 150px;
        overflow: hidden;
        text-align: center;
        width: 150px;
    }
`;

export const NoticiaInfo = styled.div``;

export const NoticiaFormContainer = styled.section`
    ${NoticiaContainer};
    ${space};
    box-shadow: 0 3px 10px 0 ${variable.colorGrayLight};
`;

export const NoticiaMateriasRelacionadas = styled.section`
    ${NoticiaContainer};
    ${space};
`;

export const NoticiasBannerRight = styled.div`
    ${layout};
    ${position};
    ${space};
    z-index: -1;

    ${({ visible }) =>
        visible
            ? css`
                  animation: ${animationFadeInTab()} ${variable.duration} ${variable.timing} 0s 1 normal forwards running;
              `
            : css`
                  animation: ${animationFadeOutTab()} ${variable.duration} ${variable.timing} 0s 1 normal forwards running;
              `};
`;
