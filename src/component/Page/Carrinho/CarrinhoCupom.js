import React from 'react';

import { CarrinhoCupomForm } from '../../Form/CarrinhoCupomForm';

import { Box } from '../../../style/flex';
import { P } from '../../../style/text';

export const CarrinhoCupom = () => {
    return (
        <>
            <P>Cupom de desconto</P>

            <CarrinhoCupomForm />

            <Box my={4}>
                <P color="colorGray2" fontSize="14px">
                    Nenhum cupom aplicado
                </P>
            </Box>
        </>
    );
};
