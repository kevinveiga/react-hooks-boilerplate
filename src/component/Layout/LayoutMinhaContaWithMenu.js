import React, { lazy, useEffect, useState } from 'react';

import { BreadcrumbProvider } from '../../store/breadcrumb/breadcrumb';
import { MinhaContaMenuContext } from '../../store/minhaConta/minhaContaMenuContext';

import { getStorage, setStorage } from '../../util/storage';

import { HeaderAlternative } from '../Header/HeaderAlternative';
import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';
import { MinhaContaMenu } from '../Page/MinhaConta/MinhaContaMenu';
import { SocialSidebar } from '../Social/SocialSidebar';

import { Box, Flex } from '../../style/flex';
import { Container, Main } from '../../style/layout';

// LAZY
const FooterAlternative = lazy(() => import('../Footer/FooterAlternative'));

export const LayoutMinhaContaWithMenu = ({ children }) => {
    // ACTION
    const [stateHideMenu, setStateHideMenu] = useState(getStorage('minhacontamenuhide') ? JSON.parse(getStorage('minhacontamenuhide')) : false);

    useEffect(() => {
        setStorage('minhacontamenuhide', JSON.stringify(stateHideMenu));

        return undefined;
    }, [stateHideMenu]);

    return (
        <>
            <Main type="LayoutMinhaConta">
                <BreadcrumbProvider>
                    <HeaderAlternative />

                    <Container mx="auto" px={{ d: 0, lg: 3 }}>
                        <MinhaContaMenuContext.Provider value={{ stateHideMenuContext: stateHideMenu, setStateHideMenuContext: setStateHideMenu }}>
                            <Flex display="flex">
                                <Box display={{ d: 'none', lg: 'block' }} width={stateHideMenu ? '60px' : 'auto'}>
                                    <MinhaContaMenu />
                                </Box>

                                <Box flex="1">{children}</Box>
                            </Flex>
                        </MinhaContaMenuContext.Provider>
                    </Container>
                </BreadcrumbProvider>
            </Main>

            <ComponentLazyLoad component={FooterAlternative} />

            <SocialSidebar />
        </>
    );
};
