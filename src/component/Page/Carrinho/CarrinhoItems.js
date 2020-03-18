import React from 'react';

import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Cell, Grid } from '../../../style/grid';
import { Span } from '../../../style/text';

export const CarrinhoItems = () => {
    return (
        <Grid display="grid" gridRowGap={4}>
            <Cell>1 produto no carrinho</Cell>

            <Cell>
                1 produto no carrinho
                <br />
                1 produto no carrinho
                <br />
                1 produto no carrinho
                <br />
                1 produto no carrinho
                <br />
            </Cell>

            <Cell>
                <LinkTo obj={{ hoverColor: 'colorPrimary' }} link="/noticias">
                    <Svg name="svg-prev" pr={2} />
                    <Span>Comprar mais produtos</Span>
                </LinkTo>
            </Cell>
        </Grid>
    );
};
