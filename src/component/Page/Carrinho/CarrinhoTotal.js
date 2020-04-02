import React from 'react';

import { Button } from '../../Button/Button';
import { CarrinhoCupom } from './CarrinhoCupom';

import { Box } from '../../../style/flex';
import { P, Span } from '../../../style/text';

export const CarrinhoTotal = () => {
    return (
        <Box backgroundColor="colorWhite" p={3}>
            <Box>
                <P mb={2}>Total:</P>

                <Span fontSize="26px" fontWeight="700">
                    R$ 599,90
                </Span>
            </Box>

            <Box my={5}>
                <Button text="Finalizar Compra" />
            </Box>

            <Box>
                <CarrinhoCupom />
            </Box>
        </Box>
    );
};
