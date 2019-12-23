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
import { Title5 } from '../../style/text';
import { variable } from '../../style/variable';

export const HeaderAlternative = ({ currentBreadcrumbLabel, ...breadcrumb }) => {
    // ACTION
    const { stateModalLogoutContext, setStateModalLogoutContext } = useApp();
    const windowWidth = useWindowWidth();

    // Function
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
                                    <Breadcrumb currentLabel={currentBreadcrumbLabel} obj={{ hoverColor: 'colorWhite', underline: true }} {...breadcrumb} />
                                </Title5>
                            </Box>

                            <Box>
                                <Button
                                    color="colorGray2"
                                    fontSize={18}
                                    fontWeight="700"
                                    hoverColor="colorWhite"
                                    onClick={handleChangeModalLogout(true)}
                                    text="Logout"
                                    themeSize="none"
                                    themeType="none"
                                />

                                <LinkTo ariaLabel="Voltar para Home" link="/inicio" ml={3}>
                                    <Button text="Voltar para Home" themeSize="small" />
                                </LinkTo>
                            </Box>
                        </Flex>
                    </Container>
                </HeaderAlternativeStyled>
            )}

            <ModalLogout visible={stateModalLogoutContext} />
        </>
    );
};
