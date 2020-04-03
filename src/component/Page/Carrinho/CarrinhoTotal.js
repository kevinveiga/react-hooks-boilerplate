import React from 'react';

import { Button } from '../../Button/Button';
import { CarrinhoCupom } from './CarrinhoCupom';

import { Box } from '../../../style/flex';
import { P } from '../../../style/text';

export const CarrinhoTotal = () => {
    return (
        <Box backgroundColor="colorWhite" p={3}>
            <Box>
                <P color="colorGray2" mb={2}>
                    Total:
                </P>

                <P fontSize="26px" fontWeight="700" mb={2}>
                    R$ 599,90
                </P>

                <P color="colorGray2">
                    <s>R$ 599,90</s>
                </P>

                <Button my={{ d: 4, md: 5 }} text="Finalizar Compra" width={{ d: 'auto', md: '100%' }} />
            </Box>

            <Box>
                <CarrinhoCupom />
            </Box>
        </Box>
    );
};
