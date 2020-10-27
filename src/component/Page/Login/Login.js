import React from 'react';

import { Button } from '../../Button/Button';
import { LoginForm } from '../../Form/LoginForm';
import { LinkTo } from '../../Link/LinkTo';
import { Splash } from '../../Splash/Splash';

import { Box, Flex } from '../../../style/flex';
import { Container } from '../../../style/layout';
import { P, Title2 } from '../../../style/text';

export const Login = () => {
    return (
        <Flex display="flex" flexWrap="wrap" minHeight="100vh">
            <Box alignItems="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={3 / 7}>
                <Splash />
            </Box>

            <Box width={{ d: '100%', lg: 3 / 7 }}>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Title2 px={{ d: 1, sm: 5 }} themeColor="dark">
                        Acesse
                    </Title2>

                    <LoginForm obj={{ colorLine: 'colorPrimary' }} />

                    <Box px={{ d: 1, sm: 5 }}>
                        <LinkTo link="/cadastro" width="100%">
                            <Button text="Não possui conta? Cadastre-se" themeType="border" width="100%" />
                        </LinkTo>

                        <P color="colorGray2" fontSize="14px" mt={3}>
                            <LinkTo
                                obj={{ hoverColor: 'fontColor', textDecoration: 'underline' }}
                                link="/esqueci-minha-senha"
                                text="Esqueceu sua senha?"
                            />
                        </P>
                    </Box>
                </Container>
            </Box>

            <Box order={{ d: '-1', lg: '2' }} textAlign={{ d: 'center', lg: 'left' }} width={{ d: '100%', lg: 1 / 7 }}>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <LinkTo
                        ariaLabel="Home"
                        obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }}
                        link="/inicio"
                        text="Voltar para home"
                    />
                </Container>
            </Box>
        </Flex>
    );
};
