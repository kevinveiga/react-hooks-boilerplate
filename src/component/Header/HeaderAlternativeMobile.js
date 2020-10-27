import React, { useCallback } from 'react';

import { useChangeHeaderScroll } from '../../store/header/header';
import { useHeaderAlternative } from '../../store/header/headerAlternative';

import { MinhaContaMenuMobile } from '../Page/MinhaConta/MinhaContaMenuMobile';
import { Svg } from '../Svg/Svg';

import { HeaderStyled } from './HeaderStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';

export const HeaderAlternativeMobile = () => {
    // CONTEXT
    const { stateMinhaContaMenuMobileContext, setStateMinhaContaMenuMobileContext } = useHeaderAlternative();

    // ACTION
    const stateChangeHeaderScroll = useChangeHeaderScroll('header-minha-conta');

    // FUNCTION
    const handleChangeMinhaContaMenuMobile = useCallback(
        (value) => () => {
            setStateMinhaContaMenuMobileContext(value);
        },
        [setStateMinhaContaMenuMobileContext]
    );

    return (
        <HeaderStyled active={stateMinhaContaMenuMobileContext} change={stateChangeHeaderScroll} id="header-minha-conta">
            <Container mx="auto" px={{ d: 4, md: 3 }}>
                <Flex alignItems="center" display="flex" flexWrap="wrap" height="70px" justifyContent="center">
                    <Box width={2 / 10} />

                    <Box alignItems="center" display="flex" flexWrap="wrap" justifyContent="flex-end" width={2 / 10}>
                        <Box>
                            <Svg
                                active={stateMinhaContaMenuMobileContext}
                                change={stateChangeHeaderScroll}
                                fill="colorSecondary"
                                name="svg-menu"
                                onClick={handleChangeMinhaContaMenuMobile(true)}
                            />

                            <Svg active={stateMinhaContaMenuMobileContext} name="svg-menu-close" onClick={handleChangeMinhaContaMenuMobile(false)} />
                        </Box>

                        <MinhaContaMenuMobile change={stateChangeHeaderScroll} />
                    </Box>
                </Flex>
            </Container>
        </HeaderStyled>
    );
};
