import React from 'react';

import { CarrinhoBreadcrumb } from './CarrinhoBreadcrumb';
import { CarrinhoCadastroForm } from '../../Form/CarrinhoCadastroForm';
import { LoginForm } from '../../Form/LoginForm';
import { LinkTo } from '../../Link/LinkTo';

import { Cell, Grid } from '../../../style/grid';
import { Container, Wrap } from '../../../style/layout';
import { Line } from '../../../style/line';
import { P, Title3 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const CarrinhoCadastro = () => {
    return (
        <Wrap>
            <Container
                minHeight={{ d: `calc(100vh - ${variable.headerHeightMobile} - 85px)`, lg: `calc(100vh - ${variable.headerHeight} - 85px)` }}
                mx="auto"
                px={3}
                py={{ d: 4, md: 5 }}
            >
                <Grid
                    display="grid"
                    gridColumnGap={4}
                    gridRowGap={3}
                    gridTemplateColumns={{ d: '1fr', md: '5fr 1fr 5fr' }}
                    justifyContent="space-around"
                >
                    <Cell gridColumn={{ d: 1, md: 3 }} gridRow={1} justifySelf={{ d: 'auto', md: 'flex-end' }}>
                        <CarrinhoBreadcrumb step="user" />
                    </Cell>

                    <Cell gridRow={2} pt={{ d: 1, sm: 3 }}>
                        <Title3 fontWeight="700" mb={0} px={{ d: 1, sm: 5 }} themeColor="dark">
                            Faça seu cadastro
                        </Title3>

                        <CarrinhoCadastroForm formId="carrinhoCadastroFormId" />
                    </Cell>

                    <Cell alignSelf="center" display={{ d: 'none', md: 'block' }} height="50%" gridRow={2} justifySelf="center">
                        <Line height="100%" width="1px" />
                    </Cell>

                    <Cell gridRow={{ d: 3, md: 2 }} pt={{ d: 1, sm: 3 }}>
                        <Title3 fontWeight="700" mb={0} px={{ d: 1, sm: 5 }} themeColor="dark">
                            Faça seu login
                        </Title3>

                        <LoginForm />

                        <P color="colorGray2" fontSize="14px" px={{ d: 1, sm: 5 }} textAlign="right" themeColor="dark">
                            <LinkTo
                                obj={{ hoverColor: 'colorGray2', textDecoration: 'underline' }}
                                link="/esqueci-minha-senha"
                                text="Esqueceu sua senha?"
                            />
                        </P>
                    </Cell>
                </Grid>
            </Container>
        </Wrap>
    );
};
