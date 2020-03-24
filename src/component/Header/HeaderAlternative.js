import React, { useCallback } from 'react';

import { useApp } from '../../store/app/app';
import { HeaderAlternativeProvider } from '../../store/header/headerAlternative';
import { useWindowWidth } from '../../store/util/windowWidth';

import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Button } from '../Button/Button';
import { HeaderAlternativeMobile } from './HeaderAlternativeMobile';
import { LinkTo } from '../Link/LinkTo';
import { ModalLogout } from '../Modal/ModalLogout';

import { HeaderAlternativeStyled } from './HeaderAlternativeStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Span, Title5 } from '../../style/text';
import { variable } from '../../style/variable';

export const HeaderAlternative = ({ currentBreadcrumbLabel, ...breadcrumb }) => {
    // ACTION
    const { stateModalLogoutContext, setStateModalLogoutContext } = useApp();
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
                                    <Breadcrumb currentLabel={currentBreadcrumbLabel} obj={{ hoverColor: 'colorWhite', textDecoration: 'underline' }} {...breadcrumb} />
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

            <ModalLogout visible={stateModalLogoutContext} />
        </>
    );
};
