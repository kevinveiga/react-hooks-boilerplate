import React, { useCallback, useState } from 'react';

import { Button } from '../Button/Button';
import { Svg } from '../Svg/Svg';

import { ModalCookieStyled } from './ModalCookieStyled';

import { Box, Flex } from '../../style/flex';

export const ModalCookie = () => {
    // ACTION
    const [cookieConfirm, setCookieConfirm] = useState(JSON.parse(window.localStorage.getItem('cookieConfirm') || false));

    // FUNCTION
    const handleCookieConfirm = useCallback(
        () => () => {
            window.localStorage.setItem('cookieConfirm', 'true');

            setCookieConfirm(true);
        },
        []
    );

    return (
        <ModalCookieStyled visible={!cookieConfirm}>
            <Flex alignItems="center" display="flex">
                <Box pl={{ d: 2, md: 5 }}>
                    Este site usa cookies para melhorar sua experiência de navegação e entregar o melhor serviço possível.
                    <br />
                    Ao continuar navegando pelo site você consente seu uso.
                </Box>

                <Box pl={{ d: 4, md: 5 }}>
                    <Button onClick={handleCookieConfirm()} themeSize="none" themeType="none">
                        <Svg name="svg-close" />
                    </Button>
                </Box>
            </Flex>
        </ModalCookieStyled>
    );
};
