import React, { lazy } from 'react';

import { BreadcrumbProvider } from '../../store/breadcrumb/breadcrumb';

import { HeaderAlternative } from '../Header/HeaderAlternative';
import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';
import { MinhaContaMenu } from '../Page/MinhaConta/MinhaContaMenu';
import { SocialSidebar } from '../Social/SocialSidebar';

import { Cell, Grid } from '../../style/grid';
import { Container, Main } from '../../style/layout';

// LAZY
const FooterAlternative = lazy(() => import('../Footer/FooterAlternative'));

export const LayoutMinhaContaWithMenu = ({ children }) => {
    return (
        <>
            <Main type="LayoutMinhaConta">
                <BreadcrumbProvider>
                    <HeaderAlternative />

                    <Container mx="auto" px={{ d: 0, lg: 3 }}>
                        <Grid display="grid" gridTemplateColumns={{ d: '1fr', lg: '300px 1fr' }}>
                            <Cell display={{ d: 'none', lg: 'block' }}>
                                <MinhaContaMenu />
                            </Cell>

                            <Cell>{children}</Cell>
                        </Grid>
                    </Container>
                </BreadcrumbProvider>
            </Main>

            <ComponentLazyLoad component={FooterAlternative} />

            <SocialSidebar />
        </>
    );
};
