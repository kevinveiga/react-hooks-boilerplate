import React, { lazy } from 'react';

import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';

import { Main } from '../../style/layout';

// LAZY
const FooterAlternative = lazy(() => import('../Footer/FooterAlternative'));

export const LayoutMinhaConta = ({ children }) => {
    return (
        <>
            <Main type="LayoutMinhaConta">{children}</Main>

            <ComponentLazyLoad component={FooterAlternative} />
        </>
    );
};
