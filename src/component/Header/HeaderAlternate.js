import React from 'react';

import { useChangeHeaderScroll, useChangeMinhaContaMenuMobile, useChangeModal } from '../../store/header/header';
import { HeaderAlternateContext } from '../../store/header/headerAlternateContext';
import { useWindowWidth } from '../../store/util/windowWidth';

import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Button } from '../Button/Button';
import { LinkTo } from '../Link/LinkTo';
import { MinhaContaMenuMobile } from '../Page/MinhaConta/MinhaContaMenuMobile';
import { LogoutModal } from '../Modal/LogoutModal';
import { Svg } from '../Svg/Svg';

import { HeaderAlternateStyled } from './HeaderAlternateStyled';
import { HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Title5 } from '../../style/text';
import { variable } from '../../style/variable';

export const HeaderAlternate = ({ currentBreadcrumbLabel, ...breadcrumb }) => {
    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header-minha-conta');
    const [stateChangeMinhaContaMenuMobile, setStateChangeMinhaContaMenuMobile] = useChangeMinhaContaMenuMobile();
    const [stateChangeModal, setStateChangeModal] = useChangeModal();
    const windowWidth = useWindowWidth();

    return (
        <HeaderAlternateContext.Provider
            value={{
                stateChangeMinhaContaMenuMobileGlobal: stateChangeMinhaContaMenuMobile,
                setStateChangeMinhaContaMenuMobileGlobal: setStateChangeMinhaContaMenuMobile,
                setStateChangeModalGlobal: setStateChangeModal
            }}
        >
            {windowWidth < parseInt(variable.md, 10) ? (
                <HeaderStyled active={stateChangeMinhaContaMenuMobile} change={stateChangeHeaderScroll} id="header-minha-conta">
                    <Container mx="auto" px={{ d: 4, md: 3 }}>
                        <Flex alignContent="center" display="flex" flexWrap="wrap" height="70px" justifyContent="center">
                            <Box width={2 / 10} />

                            <Box display="flex" flexWrap="wrap" justifyContent="center" width={6 / 10}>
                                <LinkTo ariaLabel="Home" link="/inicio">
                                    <Svg className="svg-logo-liberta" name="svg-logo-liberta" />
                                </LinkTo>
                            </Box>

                            <Box alignContent="center" display="flex" flexWrap="wrap" justifyContent="flex-end" width={2 / 10}>
                                <Box>
                                    <Svg active={stateChangeMinhaContaMenuMobile} change={stateChangeHeaderScroll} fill="colorSecondary" name="svg-menu" onClick={() => setStateChangeMinhaContaMenuMobile(true)} />

                                    <Svg active={stateChangeMinhaContaMenuMobile} name="svg-close" onClick={() => setStateChangeMinhaContaMenuMobile(false)} />
                                </Box>

                                <MinhaContaMenuMobile change={stateChangeHeaderScroll} />
                            </Box>
                        </Flex>
                    </Container>
                </HeaderStyled>
            ) : (
                <HeaderAlternateStyled>
                    <Container mx="auto" px={{ d: 4, md: 3 }}>
                        <Flex alignContent="center" display="flex" flexWrap="wrap" height="70px" justifyContent="space-between">
                            <Box>
                                <Title5 color="colorPrimary" fontWeight="600">
                                    <Breadcrumb currentLabel={currentBreadcrumbLabel} obj={{ hoverColor: 'colorWhite' }} {...breadcrumb} />
                                </Title5>
                            </Box>

                            <Box>
                                <Button color="colorGray2" fontSize={18} fontWeight="600" onClick={() => setStateChangeModal(true)} themeSize="none" themeType="none">
                                    Logout
                                </Button>
                            </Box>
                        </Flex>
                    </Container>
                </HeaderAlternateStyled>
            )}

            <LogoutModal show={stateChangeModal} />
        </HeaderAlternateContext.Provider>
    );
};
