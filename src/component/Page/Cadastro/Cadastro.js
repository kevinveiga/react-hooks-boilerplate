import React, { useState } from 'react';

import { CadastroContext } from '../../../store/cadastro/cadastroContext';

import { CadastroForm } from '../../Form/CadastroForm';
import { ConhecerMaisForm } from '../../Form/ConhecerMaisForm';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { P, Title5 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Cadastro = ({ location }) => {
    // ACTION
    const [stateConhecerMais, setStateConhecerMaisContext] = useState(false);

    return (
        <CadastroContext.Provider value={setStateConhecerMaisContext}>
            <Main backgroundColor="colorGrayLight5" header={false}>
                <Flex display="flex" flexWrap="wrap" minHeight={`calc(100vh - ${variable.FooterAlternativeHeight})`}>
                    <Box alignItems="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={3 / 7}>
                        <Box p={4} width="100%">
                            <P align="right" fontSize="24px" mb={4} textAlign="right" themeColor="light">
                                Aqui vai uma super frase de
                                <br />
                                propósito para encantar o
                                <br />
                                cliente maroto.
                            </P>

                            <Title5 fontSize="16px" color="colorPrimary" textAlign="right" themeColor="dark">
                                Autor
                            </Title5>
                        </Box>
                    </Box>

                    <Box width={{ d: '100%', lg: 3 / 7 }}>
                        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                            <Box mb={{ d: 4, md: '75px' }} mt={{ d: 0, lg: 4 }} textAlign="center">
                                <Svg name="svg-logo-liberta" />
                            </Box>

                            {!stateConhecerMais ? (
                                <CadastroForm location={location} obj={{ colorLine: 'colorPrimary' }} />
                            ) : (
                                <ConhecerMaisForm location={location} obj={{ colorLine: 'colorPrimary' }} />
                            )}
                        </Container>
                    </Box>

                    <Box order={{ d: '-1', lg: '2' }} textAlign={{ d: 'center', lg: 'left' }} width={{ d: '100%', lg: 1 / 7 }}>
                        <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                            <LinkTo ariaLabel="Home" obj={{ hoverColor: 'colorPrimary', textDecoration: 'underline' }} link="/inicio" text="Voltar para home" />
                        </Container>
                    </Box>
                </Flex>
            </Main>
        </CadastroContext.Provider>
    );
};
