import React from 'react';

import { useCarrinho } from '../../../store/carrinho/carrinho';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Span } from '../../../style/text';

export const CarrinhoItens = () => {
    // ACTION
    const { handleRemoveCarrinhoItemContext, stateCarrinhoContext } = useCarrinho();

    const carrinhoItens = stateCarrinhoContext.data && stateCarrinhoContext.data.data.items;
    const carrinhoItensLength = carrinhoItens ? carrinhoItens.length : 0;

    return (
        <Grid alignItems="center" display="grid" gridAutoRows="minmax(55px, auto)" gridRowGap={3}>
            <Cell>
                {carrinhoItensLength < 1 ? 'Nenhum' : carrinhoItensLength} produto{carrinhoItensLength > 1 && 's'} no carrinho
            </Cell>

            <Cell backgroundColor="colorWhite" px={3} py={2}>
                {carrinhoItensLength > 0 &&
                    carrinhoItens.map((carrinhoItem) => {
                        return (
                            <Grid
                                alignItems="center"
                                display="grid"
                                gridColumnGap={4}
                                gridTemplateColumns={{ d: '110px 1fr auto', md: '200px 4fr 2fr auto' }}
                                gridTemplateRows="auto auto"
                                key={carrinhoItem.id}
                            >
                                <Cell gridRow="1 / span 2" py={2}>
                                    <Box height={{ d: '80px', md: '100px' }} overflow="hidden" width="100%">
                                        <BgImageLazyLoad url={carrinhoItem.img} />
                                    </Box>
                                </Cell>

                                <Cell gridRow={{ d: '1 / span 1', md: '1 / span 2' }}>
                                    <Span color="colorPrimary" fontSize={{ d: '12px', md: '14px' }}>
                                        Curso Online
                                    </Span>

                                    <br />

                                    <Span fontSize={{ d: '14px', md: '18px' }} fontWeight="700">
                                        {carrinhoItem.titulo}
                                    </Span>
                                </Cell>

                                <Cell gridRow={{ d: '2 / span 1', md: '1 / span 2' }} justifySelf={{ d: 'flex-start', md: 'flex-end' }}>
                                    <Span fontSize={{ d: '16px', md: '22px' }} fontWeight="700">
                                        {carrinhoItem.preco_por}
                                    </Span>
                                </Cell>

                                <Cell gridRow="1 / span 2">
                                    <Svg fill="colorGray2" height="23px" name="svg-trash" obj={{ hoverColor: 'colorPrimary' }} onClick={handleRemoveCarrinhoItemContext(carrinhoItem.id)} />
                                </Cell>
                            </Grid>
                        );
                    })}
            </Cell>

            <Cell>
                <LinkTo obj={{ hoverColor: 'colorPrimary' }} link="/noticias">
                    <Svg fill="colorGray2" height="12px" name="svg-prev" pr={2} />
                    <Span>Comprar mais produtos</Span>
                </LinkTo>
            </Cell>
        </Grid>
    );
};
