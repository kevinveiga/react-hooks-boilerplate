import React, { lazy } from 'react';

import { HeaderProvider } from '../../store/header/header';

import { Header } from '../Header/Header';
import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';

import { Main } from '../../style/layout';

// LAZY
const Footer = lazy(() => import('../Footer/Footer'));

export const LayoutDefault = ({ children }) => {
    return (
        <>
            <HeaderProvider>
                <Header />
            </HeaderProvider>

            <Main type="LayoutDefault">{children}</Main>

            <ComponentLazyLoad component={Footer} />
        </>
    );
};
