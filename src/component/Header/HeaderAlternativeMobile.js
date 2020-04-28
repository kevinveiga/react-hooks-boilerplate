import React, { useCallback } from 'react';

import { useChangeHeaderScroll } from '../../store/header/header';
import { useHeaderAlternative } from '../../store/header/headerAlternative';

import { LinkTo } from '../Link/LinkTo';
import { MinhaContaMenuMobile } from '../Page/MinhaConta/MinhaContaMenuMobile';
import { Svg } from '../Svg/Svg';

import { HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';

export const HeaderAlternativeMobile = () => {
    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header-minha-conta');
    const [stateMinhaContaMenuMobile, setStateMinhaContaMenuMobile] = useHeaderAlternative();

    // FUNCTION
    const handleChangeMinhaContaMenuMobile = useCallback(
        (value) => () => {
            setStateMinhaContaMenuMobile(value);
        },
        [setStateMinhaContaMenuMobile]
    );

    return (
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
                            <Svg
                                active={stateMinhaContaMenuMobile}
                                change={stateChangeHeaderScroll}
                                fill="colorSecondary"
                                name="svg-menu"
                                onClick={handleChangeMinhaContaMenuMobile(true)}
                            />

                            <Svg active={stateMinhaContaMenuMobile} name="svg-menu-close" onClick={handleChangeMinhaContaMenuMobile(false)} />
                        </Box>

                        <MinhaContaMenuMobile change={stateChangeHeaderScroll} />
                    </Box>
                </Flex>
            </Container>
        </HeaderStyled>
    );
};
