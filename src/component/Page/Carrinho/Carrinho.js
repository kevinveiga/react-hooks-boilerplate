import React, { useCallback, useEffect, useState } from 'react';

import { apiUrlCarrinho } from '../../../config';

import { useCarrinhoApi } from '../../../service/carrinho';

import { Button } from '../../Button/Button';
import { CarrinhoBreadcrumb } from './CarrinhoBreadcrumb';
import { CarrinhoItems } from './CarrinhoItems';
import { CarrinhoTotal } from './CarrinhoTotal';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, Wrap } from '../../../style/layout';
import { Span } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Carrinho = () => {
    // // API
    // const [stateCarrinho] = useCarrinhoApi(apiUrlCarrinho);

    // const carrinhoLength = stateCarrinho.data.length;

    // // Verificação se todos os dados de API estão carregados
    // const isDataLoaded = carrinhoLength > 0;

    // ACTION

    return (
        <>
            <Wrap>
                <Container minHeight={{ d: `calc(100vh - ${variable.headerHeightMobile} - 85px)`, lg: `calc(100vh - ${variable.headerHeight} - 85px)` }} mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                        <Box mb={5} pr={{ d: 0, md: 3 }} width={{ d: 1, md: '70%' }}>
                            <CarrinhoItems />
                        </Box>

                        <Box mb={5} pl={{ d: 0, md: 3 }} width={{ d: 1, md: '30%' }}>
                            <CarrinhoBreadcrumb />
                            <br />
                            <CarrinhoTotal />
                        </Box>
                    </Flex>
                </Container>
            </Wrap>

            <Wrap backgroundColor="colorGrayLight2" height="85px">
                <Container mx="auto" p={3}>
                    <Grid display="grid" gridRowGap={2} justifyItems="center">
                        <Cell>
                            <Span color="colorGray2" fontSize={14}>
                                Formas de pagamento
                            </Span>
                        </Cell>

                        <Cell>TESTE</Cell>
                    </Grid>
                </Container>
            </Wrap>
        </>
    );
};
