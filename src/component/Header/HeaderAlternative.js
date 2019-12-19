import React, { useCallback } from 'react';

import { useApp } from '../../store/app/app';
import { useChangeHeaderScroll } from '../../store/header/header';
import { useHeaderAlternative } from '../../store/header/headerAlternative';
import { useWindowWidth } from '../../store/util/windowWidth';

import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Button } from '../Button/Button';
import { LinkTo } from '../Link/LinkTo';
import { MinhaContaMenuMobile } from '../Page/MinhaConta/MinhaContaMenuMobile';
import { ModalLogout } from '../Modal/ModalLogout';
import { Svg } from '../Svg/Svg';

import { HeaderAlternativeStyled } from './HeaderAlternativeStyled';
import { HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Title5 } from '../../style/text';
import { variable } from '../../style/variable';

export const HeaderAlternative = ({ currentBreadcrumbLabel, ...breadcrumb }) => {
    // ACTION
    const { stateModalLogoutContext, setStateModalLogoutContext } = useApp();
    const stateChangeHeaderScroll = useChangeHeaderScroll('header-minha-conta');
    const [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile] = useHeaderAlternative();
    const windowWidth = useWindowWidth();

    // Function
    const handleChangeMinhaContaMenuMobile = useCallback(
        (value) => () => {
            setStateMinhaContaMenuMobile(value);
        },
        [setStateMinhaContaMenuMobile]
    );

    const handleChangeModalLogout = useCallback(
        (value) => () => {
            setStateModalLogoutContext(value);
        },
        [setStateModalLogoutContext]
    );

    return (
        <>
            {windowWidth < parseInt(variable.lg, 10) ? (
                <HeaderStyled active={stateMinhaContaMenuMobile} change={stateChangeHeaderScroll} id="header-minha-conta">
                    <Container mx="auto" px={{ d: 4, md: 3 }}>
                        <Flex alignItems="center" display="flex" flexWrap="wrap" height="70px" justifyContent="center">
                            <Box width={2 / 10} />

                            <Box display="flex" flexWrap="wrap" justifyContent="center" width={6 / 10}>
                                <LinkTo ariaLabel="Home" link="/inicio">
                                    <Svg name="svg-logo-liberta" />
                                </LinkTo>
                            </Box>

                            <Box alignItems="center" display="flex" flexWrap="wrap" justifyContent="flex-end" width={2 / 10}>
                                <Box>
                                    <Svg active={stateMinhaContaMenuMobile} change={stateChangeHeaderScroll} fill="colorSecondary" name="svg-menu" onClick={handleChangeMinhaContaMenuMobile(true)} />

                                    <Svg active={stateMinhaContaMenuMobile} name="svg-close" onClick={handleChangeMinhaContaMenuMobile(false)} />
                                </Box>

                                <MinhaContaMenuMobile change={stateChangeHeaderScroll} />
                            </Box>
                        </Flex>
                    </Container>
                </HeaderStyled>
            ) : (
                <HeaderAlternativeStyled>
                    <Container mx="auto" px={{ d: 4, md: 3 }}>
                        <Flex alignItems="center" display="flex" flexWrap="wrap" height="70px" justifyContent="space-between">
                            <Box>
                                <Title5 color="colorPrimary" fontWeight="700">
                                    <Breadcrumb currentLabel={currentBreadcrumbLabel} obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />
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
