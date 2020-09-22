import React, { lazy, useCallback } from 'react';

import { useApp } from '../../store/app/app';
import { useBreadcrumb } from '../../store/breadcrumb/breadcrumb';
import { HeaderAlternativeProvider } from '../../store/header/headerAlternative';
import { useWindowWidth } from '../../store/util/windowWidth';

import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Button } from '../Button/Button';
import { HeaderAlternativeMobile } from './HeaderAlternativeMobile';
import { ComponentLazyLoad } from '../LazyLoad/ComponentLazyLoad';
import { LinkTo } from '../Link/LinkTo';
import { LoaderComponent } from '../Loader/LoaderComponent';
import { ModalLogout } from '../Modal/ModalLogout';

import { HeaderAlternativeStyled } from './HeaderAlternativeStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Span, Title5 } from '../../style/text';
import { variable } from '../../style/variable';

const QuotationAlternate = lazy(() => import('../Quotation/QuotationAlternate'));

export const HeaderAlternative = () => {
    // CONTEXT
    const { stateModalLogoutContext, setStateModalLogoutContext } = useApp();
    const { stateBreadcrumbContext } = useBreadcrumb();

    // ACTION
    const windowWidth = useWindowWidth();

    // FUNCTION
    const handleChangeModalLogout = useCallback(
        (value) => () => {
            setStateModalLogoutContext(value);
        },
        [setStateModalLogoutContext]
    );

    return (
        <>
            {windowWidth < parseInt(variable.lg, 10) ? (
                <HeaderAlternativeProvider>
                    <HeaderAlternativeMobile />
                </HeaderAlternativeProvider>
            ) : (
                <HeaderAlternativeStyled>
                    <Container mx="auto" px={{ d: 4, md: 3 }}>
                        <Flex alignItems="center" display="flex" flexWrap="wrap" height="70px" justifyContent="space-between">
                            <Box>
                                <Title5 color="colorPrimary" fontWeight="700">
                                    <Breadcrumb
                                        breadcrumb={stateBreadcrumbContext.breadcrumb}
                                        currentLabel={stateBreadcrumbContext.currentLabel}
                                        obj={{ hoverColor: 'colorWhite', textDecoration: 'underline' }}
                                    />
                                </Title5>
                            </Box>

                            <Box>
                                <Button
                                    color="colorGray2"
                                    fontSize="16px"
                                    fontWeight="400"
                                    hoverColor="colorWhite"
                                    onClick={handleChangeModalLogout(true)}
                                    text="Logout"
                                    textDecoration="underline"
                                    themeSize="none"
                                    themeType="none"
                                    verticalAlign="top"
                                />

                                <Span color="colorGray2" mx={2}>
                                    |
                                </Span>

                                <LinkTo
                                    ariaLabel="Voltar para Home"
                                    color="colorGray2"
                                    link="/inicio"
                                    obj={{ hoverColor: 'colorWhite', textDecoration: 'underline', verticalAlign: 'middle' }}
                                    text="Voltar para Home"
                                />
                            </Box>
                        </Flex>
                    </Container>
                </HeaderAlternativeStyled>
            )}

            <ComponentLazyLoad component={QuotationAlternate} placeholder={<LoaderComponent />} />

            <ModalLogout visible={stateModalLogoutContext} />
        </>
    );
};
