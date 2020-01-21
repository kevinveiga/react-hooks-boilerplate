import React from 'react';

import { Main, Wrap } from '../../style/layout';

export const LayoutNoHF = ({ children }) => {
    return (
        <Main type="LayoutNoHF">
            <Wrap>{children}</Wrap>
        </Main>
    );
};
