import styled, { css } from 'styled-components';
import { layout, space } from 'styled-system';

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

    div,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    table {
        line-height: 1.5;
        margin-bottom: 50px;
        max-width: ${variable.md};
    }

    p {
        ${NoticiaContainer};
        font-size: 18px;
        line-height: 2;
        margin-bottom: 50px;
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

export const NoticiaSocial = styled.section`
    ${layout};
    ${(props) => props.fontSize === undefined && 'font-size: 14px'};
    left: auto;
    position: ${(props) => (props.change === 'true' ? 'fixed' : 'absolute')};
    top: ${(props) => (props.change === 'true' ? '150px' : 'auto')};
    z-index: 3;
    p {
        margin: 0;
    }
`;
