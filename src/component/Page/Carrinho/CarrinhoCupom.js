import React from 'react';

import { CarrinhoCupomForm } from '../../Form/CarrinhoCupomForm';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { P, Span } from '../../../style/text';

export const CarrinhoCupom = () => {
    return (
        <>
            <P>Cupom de desconto</P>

            <CarrinhoCupomForm />

            <Box my={4}>
                <P color="colorGray2" fontSize="14px">
                    Nenhum cupom aplicado
                </P>

                <Grid alignItems="center" display="grid" gridColumnGap={4} gridTemplateColumns="1fr auto">
                    <Cell>
                        <Span fontWeight="700">Descontomaroto50</Span>
                        <br />
                        <Span color="colorGray2">foi aplicado</Span>
                    </Cell>

                    <Cell>
                        <Svg fill="colorGray2" height="23px" name="svg-trash" obj={{ hoverColor: 'colorPrimary' }} />
                    </Cell>
                </Grid>
            </Box>
        </>
    );
};
