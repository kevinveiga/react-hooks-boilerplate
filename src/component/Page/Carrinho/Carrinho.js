import React, { useCallback, useEffect, useState } from 'react';

import { apiUrlCarrinho } from '../../../config';

import { useCarrinhoApi } from '../../../service/carrinho';

import { Button } from '../../Button/Button';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Container, Wrap } from '../../../style/layout';
import { Title3 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Carrinho = () => {
    // // API
    // const [stateCarrinho] = useCarrinhoApi(apiUrlCarrinho);

    // const carrinhoLength = stateCarrinho.data.length;

    // // Verificação se todos os dados de API estão carregados
    // const isDataLoaded = carrinhoLength > 0;

    // ACTION

    return (
        <Wrap>
            <Container minHeight={`calc(100vh - ${variable.headerHeightMobile} - ${variable.FooterAlternativeHeight})`} mx="auto" px={3} py={{ d: 4, md: 5 }}>
                <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                    <Box borderRight={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }} mb={5} pr={{ d: 0, md: 3 }} width={{ d: 1, md: '60%' }}>
                        Item
                    </Box>

                    <Box mb={5} pl={{ d: 0, sm: 3 }} width={{ d: 1, sm: 'calc(100% - 321px)', md: '40%' }}>
                        Total:
                    </Box>
                </Flex>
            </Container>
        </Wrap>
    );
};
