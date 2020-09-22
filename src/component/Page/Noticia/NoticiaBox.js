import React from 'react';

import { NoticiaBoxStyled } from './NoticiaBoxStyled';

export const NoticiaBox = ({ children, color, themeColor, ...props }) => {
    return (
        <NoticiaBoxStyled color={color} themeColor={themeColor} {...props}>
            {children}
        </NoticiaBoxStyled>
    );
};
