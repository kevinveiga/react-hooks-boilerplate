import React from 'react';

import { CarrinhoProvider } from '../../../store/carrinho/carrinho';

import { CarrinhoBreadcrumb } from './CarrinhoBreadcrumb';
import { CarrinhoItens } from './CarrinhoItens';
import { CarrinhoTotal } from './CarrinhoTotal';
import { Svg } from '../../Svg/Svg';

import { Cell, Grid } from '../../../style/grid';
import { Container, Wrap } from '../../../style/layout';
import { Span } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Carrinho = () => {
    return (
        <CarrinhoProvider>
            <Wrap>
                <Container
                    minHeight={{ d: `calc(100vh - ${variable.headerHeightMobile} - 85px)`, lg: `calc(100vh - ${variable.headerHeight} - 85px)` }}
                    mx="auto"
                    px={3}
                    py={{ d: 4, md: 5 }}
                >
                    <Grid alignItems="flex-start" display="grid" gridColumnGap={4} gridRowGap={3} gridTemplateColumns={{ d: '1fr', md: '4fr 260px' }}>
                        <Cell display={{ d: 'block', md: 'none' }}>
                            <CarrinhoBreadcrumb step="cart" />
                        </Cell>

                        <Cell>
                            <CarrinhoItens />
                        </Cell>

                        <Cell>
                            <Grid alignItems="flex-start" display="grid" gridRowGap={3}>
                                <Cell display={{ d: 'none', md: 'block' }}>
                                    <CarrinhoBreadcrumb step="cart" />
                                </Cell>

                                <Cell>
                                    <CarrinhoTotal />
                                </Cell>
                            </Grid>
                        </Cell>
                    </Grid>
                </Container>
            </Wrap>

            <Wrap backgroundColor="colorGrayLight2" height="85px">
                <Container mx="auto" px={3} py={{ d: 3, sm: 4 }}>
                    <Grid display="grid" gridRowGap={2} justifyItems="center">
                        <Cell>
                            <Span color="colorGray2" fontSize="14px">
                                Formas de pagamento
                            </Span>
                        </Cell>

                        <Cell>
                            <Svg fill="colorGray2" mx={{ d: 2, md: 3 }} name="svg-elo" />
                            <Svg fill="colorGray2" mx={{ d: 2, md: 3 }} name="svg-mastercard" />
                            <Svg fill="colorGray2" mx={{ d: 2, md: 3 }} name="svg-visa" />
                            <Svg fill="colorGray2" mx={{ d: 2, md: 3 }} name="svg-american-express" />
                            <Svg fill="colorGray2" mx={{ d: 2, md: 3 }} name="svg-boleto" />
                        </Cell>
                    </Grid>
                </Container>
            </Wrap>
        </CarrinhoProvider>
    );
};
