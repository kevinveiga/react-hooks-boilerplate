import React from 'react';

import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Span } from '../../../style/text';

export const CarrinhoItems = () => {
    return (
        <Grid alignItems="center" display="grid" gridAutoRows="minmax(55px, auto)" gridRowGap={3}>
            <Cell>1 produto no carrinho</Cell>

            <Cell backgroundColor="colorWhite" px={3} py={2}>
                <Grid alignItems="center" display="grid" gridColumnGap={4} gridTemplateColumns="200px 4fr 2fr 25px">
                    <Cell py={2}>
                        <Box height="100px" overflow="hidden" width="100%">
                            <BgImageLazyLoad url="https://i.picsum.photos/id/27/300/150.jpg" />
                        </Box>
                    </Cell>

                    <Cell>
                        <Span color="colorPrimary" fontSize="14px">
                            Curso Online
                        </Span>

                        <br />

                        <Span fontWeight="700">Transforme investimentos em liberdade</Span>
                    </Cell>

                    <Cell justifySelf="flex-end">
                        <Span fontSize="22px" fontWeight="700">
                            R$ 599,90
                        </Span>
                    </Cell>

                    <Cell>
                        <Svg fill="colorGray2" height="23px" name="svg-trash" />
                    </Cell>
                </Grid>

                <Grid alignItems="center" display="grid" gridColumnGap={4} gridTemplateColumns="200px 4fr 2fr 25px">
                    <Cell py={2}>
                        <Box height="100px" overflow="hidden" width="100%">
                            <BgImageLazyLoad url="https://i.picsum.photos/id/26/300/150.jpg" />
                        </Box>
                    </Cell>

                    <Cell>
                        <Span color="colorPrimary" fontSize="14px">
                            Curso Online
                        </Span>

                        <br />

                        <Span fontWeight="700">Produto</Span>
                    </Cell>

                    <Cell justifySelf="flex-end">
                        <Span fontSize="22px" fontWeight="700">
                            R$ 899,90
                        </Span>
                    </Cell>

                    <Cell>
                        <Svg fill="colorGray2" height="23px" name="svg-trash" />
                    </Cell>
                </Grid>
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
