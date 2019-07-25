import React from 'react';

import { NoticiaBoxStyled } from './NoticiaBoxStyled';

export const NoticiaBox = ({ children, color, themeColor, ...otherProps }) => {
    return (
        <NoticiaBoxStyled color={color} themeColor={themeColor} {...otherProps}>
            {children}
        </NoticiaBoxStyled>
    );
};
