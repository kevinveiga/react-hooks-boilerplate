import React from 'react';

import { LoginForm } from '../../Form/LoginForm';

import { LinkTo } from '../../Link/LinkTo';
import { Splash } from '../../Splash/Splash';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container } from '../../../style/layout';
import { Title2 } from '../../../style/text';

export const Login = ({ location }) => {
    return (
        <Flex display="flex" flexWrap="wrap" minHeight="100vh">
            <Box alignItems="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={3 / 7}>
                <Splash />
            </Box>

            <Box width={{ d: '100%', lg: 3 / 7 }}>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Box mb={{ d: 4, md: '75px' }} mt={{ d: 0, lg: 4 }} textAlign="center">
                        <Svg name="svg-logo-liberta" />
                    </Box>

                    <Title2 px={{ d: 1, sm: 5 }} themeColor="dark">
                        Acesse a sala de aula
                        <br />
                        da Liberta
                    </Title2>

                    <LoginForm location={location} obj={{ colorLine: 'colorPrimary' }} />
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
