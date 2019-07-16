import React from 'react';

import { Author, NoticiaBoxStyled, Tag, Title } from './NoticiaBoxStyled';

export const NoticiaBox = ({ author, children, color, dateTime, tag, themeColor, title, titleSize, ...otherProps }) => {
    return (
        <NoticiaBoxStyled color={color} themeColor={themeColor} {...otherProps}>
            <Tag show={tag}>{tag}</Tag>

            <Title fontSize={titleSize}>{title}</Title>

            {children}

            <Author show={author}>{author}</Author>
        </NoticiaBoxStyled>
    );
};
