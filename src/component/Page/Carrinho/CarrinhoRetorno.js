import React from 'react';

import { paymentType } from '../../../util/paymentType';

import { Button } from '../../Button/Button';
import { LinkTo } from '../../Link/LinkTo';
import { LinkToExternal } from '../../Link/LinkToExternal';
import { Svg } from '../../Svg/Svg';

import { Cell, Grid } from '../../../style/grid';
import { Container, Wrap } from '../../../style/layout';
import { P } from '../../../style/text';
import { variable } from '../../../style/variable';

export const CarrinhoRetorno = ({ match }) => {
    return (
        <Wrap>
            <Container
                minHeight={{ d: `calc(100vh - ${variable.headerHeightMobile})`, lg: `calc(100vh - ${variable.headerHeight})` }}
                mx="auto"
                px={3}
                py={{ d: 4, md: 5 }}
            >
                <Grid display="grid" gridRowGap={5} justifyContent="center" my={5}>
                    {match.params.paymentType === paymentType.boleto && (
                        <>
                            <Cell textAlign="center">
                                <Svg fill="colorGrayTransparent9" height="80px" mx={{ d: 2, md: 3 }} name="svg-boleto" />
                            </Cell>

                            <Cell textAlign="center">
                                <P fontSize="24px" fontWeight="700">
                                    Seu boleto está disponível aqui
                                </P>

                                <LinkToExternal link={match.params.billetUrl} target="_blank">
                                    <Button mx="auto" my={{ d: 3, md: 4 }} text="Baixar Boleto" />
                                </LinkToExternal>

                                <P fontWeight="700" mt={2}>
                                    O curso vai ser liberado em até 3 dias após o pagamento
                                </P>
                            </Cell>
                        </>
                    )}

                    {match.params.paymentType === paymentType.cartaoCredito && (
                        <>
                            <Cell textAlign="center">
                                <Svg fill="colorGrayTransparent9" height="120px" mx={{ d: 2, md: 3 }} name="svg-bag" />
                            </Cell>

                            <Cell textAlign="center">
                                <P fontSize="24px" fontWeight="700">
                                    Sua compra foi realizada
                                </P>

                                <P fontWeight="700" mt={2}>
                                    seu curso já estão disponível
                                </P>

                                <LinkTo link="/minha-conta/cursos">
                                    <Button mx="auto" my={{ d: 3, md: 4 }} text="Ir Para Meus Cursos" />
                                </LinkTo>
                            </Cell>
                        </>
                    )}
                </Grid>
            </Container>
        </Wrap>
    );
};
