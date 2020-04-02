import React, { useCallback, useEffect, useState } from 'react';

import { apiUrlCarrinho } from '../../../config';

import { useCarrinhoApi } from '../../../service/carrinho';

import { CarrinhoBreadcrumb } from './CarrinhoBreadcrumb';
import { CarrinhoItems } from './CarrinhoItems';
import { CarrinhoTotal } from './CarrinhoTotal';
import { Svg } from '../../Svg/Svg';

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
                    <Grid alignItems="flex-start" display="grid" gridColumnGap={4} gridRowGap={3} gridTemplateColumns="4fr 1fr" gridTemplateRows="55px auto auto">
                        <Cell gridRow="1 / span 2">
                            <CarrinhoItems />
                        </Cell>

                        <Cell gridRow="1 / span 1">
                            <CarrinhoBreadcrumb />
                        </Cell>

                        <Cell alignSelf="flex-start" gridRow="2 / span 1">
                            <CarrinhoTotal />
                        </Cell>
                    </Grid>
                </Container>
            </Wrap>

            <Wrap backgroundColor="colorGrayLight2" height="85px">
                <Container mx="auto" p={3}>
                    <Grid display="grid" gridRowGap={2} justifyItems="center">
                        <Cell>
                            <Span color="colorGray2" fontSize="14px">
                                Formas de pagamento
                            </Span>
                        </Cell>

                        <Cell>
                            <Svg fill="colorGray2" name="svg-american-express" />
                            <Svg fill="colorGray2" name="svg-boleto" />
                            <Svg fill="colorGray2" name="svg-elo" />
                            <Svg fill="colorGray2" name="svg-mastercard" />
                            <Svg fill="colorGray2" name="svg-visa" />
                        </Cell>
                    </Grid>
                </Container>
            </Wrap>
        </>
    );
};
