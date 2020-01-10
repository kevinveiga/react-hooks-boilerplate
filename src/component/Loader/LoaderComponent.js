import React from 'react';

import { P } from '../../style/text';

export const LoaderComponent = ({ color, themeColor }) => {
    return (
        <P color={color} m={2} themeColor={themeColor}>
            Carregando...
        </P>
    );
};
