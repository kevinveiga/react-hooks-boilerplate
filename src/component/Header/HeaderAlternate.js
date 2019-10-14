import React from 'react';
import { isMobile } from 'react-device-detect';

import { useChangeHeaderScroll, useChangeMenuMinhaContaMobile } from '../../store/header/header';
import { HeaderAlternateContext } from '../../store/header/headerAlternateContext';

import { LinkTo } from '../Link/LinkTo';
import { MinhaContaMenuMobile } from '../Page/MinhaConta/MinhaContaMenuMobile';
import { Svg } from '../Svg/Svg';

import { HeaderAlternateStyled } from './HeaderAlternateStyled';
import { HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Title5 } from '../../style/text';

export const HeaderAlternate = ({ ...props }) => {
    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header-minha-conta');
    const [stateChangeMenuMinhaContaMobile, setStateChangeMenuMinhaContaMobile] = useChangeMenuMinhaContaMobile();

    return isMobile ? (
        <HeaderAlternateContext.Provider value={[stateChangeMenuMinhaContaMobile, setStateChangeMenuMinhaContaMobile]}>
            <HeaderStyled active={stateChangeMenuMinhaContaMobile} change={stateChangeHeaderScroll} id="header-minha-conta">
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
                                <Svg active={stateChangeMenuMinhaContaMobile} change={stateChangeHeaderScroll} fill="colorSecondary" name="svg-menu" onClick={() => setStateChangeMenuMinhaContaMobile(true)} />

                                <Svg active={stateChangeMenuMinhaContaMobile} name="svg-close" onClick={() => setStateChangeMenuMinhaContaMobile(false)} />
                            </Box>

                            <MinhaContaMenuMobile change={stateChangeHeaderScroll} />
                        </Box>
                    </Flex>
                </Container>
            </HeaderStyled>
        </HeaderAlternateContext.Provider>
    ) : (
        <HeaderAlternateStyled>
            <Container mx="auto" px={{ d: 4, md: 3 }}>
                <Flex alignContent="center" display="flex" flexWrap="wrap" height="70px" justifyContent="space-between">
                    <Box>
                        <Title5 color="colorPrimary" fontWeight="600">
                            <LinkTo ariaLabel="Minha Conta - Home" color="colorPrimary" obj={{ hoverColor: 'colorWhite' }} link="/minha-conta/inicio">
                                Minha Conta
                            </LinkTo>
                        </Title5>
                    </Box>

                    <Box>
                        <LinkTo color="colorGray2" fontWeight="600" link="/falta-link" obj={{ hoverColor: 'colorWhite' }} text="Logout" />
                    </Box>
                </Flex>
            </Container>
        </HeaderAlternateStyled>
    );
};
