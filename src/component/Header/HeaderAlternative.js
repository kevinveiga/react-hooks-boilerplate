import React, { lazy } from 'react';

import { HeaderAlternativeProvider } from '../../store/header/headerAlternative';
import { useWindowWidth } from '../../store/util/windowWidth';

import { HeaderAlternativeMobile } from './HeaderAlternativeMobile';
import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';
import { LoaderComponent } from '../Loader/LoaderComponent';

import { HeaderAlternativeStyled } from './HeaderAlternativeStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { variable } from '../../style/variable';

const Quotation = lazy(() => import('../Quotation/Quotation'));

export const HeaderAlternative = () => {
    // ACTION
    const windowWidth = useWindowWidth();

    return windowWidth < parseInt(variable.lg, 10) ? (
        <HeaderAlternativeProvider>
            <HeaderAlternativeMobile />

            <ComponentLazyLoad
                borderY={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }}
                component={Quotation}
                placeholder={<LoaderComponent />}
                p={2}
            />
        </HeaderAlternativeProvider>
    ) : (
        <HeaderAlternativeStyled>
            <Container mx="auto" px={{ d: 4, md: 3 }}>
                <Flex alignItems="center" display="flex" flexWrap="wrap" height="70px" justifyContent="space-between">
                    <Box>
                        <ComponentLazyLoad color="colorGray2" component={Quotation} placeholder={<LoaderComponent />} py={2} />
                    </Box>
                </Flex>
            </Container>
        </HeaderAlternativeStyled>
    );
};
