import React, { lazy } from 'react';

import { BreadcrumbProvider } from '../../store/breadcrumb/breadcrumb';

import { HeaderAlternative } from '../Header/HeaderAlternative';
import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';

import { Cell, Grid } from '../../style/grid';
import { Container, Main } from '../../style/layout';

// LAZY
const FooterAlternative = lazy(() => import('../Footer/FooterAlternative'));

export const LayoutMinhaConta = ({ children }) => {
    return (
        <>
            <Main type="LayoutMinhaConta">
                <BreadcrumbProvider>
                    <HeaderAlternative />

                    <Container mx="auto" px={{ d: 0, lg: 3 }}>
                        <Grid display="grid">
                            <Cell>{children}</Cell>
                        </Grid>
                    </Container>
                </BreadcrumbProvider>
            </Main>

            <ComponentLazyLoad component={FooterAlternative} />
        </>
    );
};
