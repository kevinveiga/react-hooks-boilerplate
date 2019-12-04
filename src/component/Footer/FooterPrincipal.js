import React from 'react';

import parse from 'html-react-parser';

import { apiUrlConfiguracoes } from '../../config';

import { useFooterApi } from '../../service/footer';

import { FooterMenu } from './FooterMenu';
import { NewsletterForm } from '../Form/NewsletterForm';
import { SocialAlternate } from '../Social/SocialAlternate';
import { Svg } from '../Svg/Svg';

import { FooterAtendimentoStyled, FooterInfoStyled, FooterStyled } from './FooterStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Title5 } from '../../style/text';
import { variable } from '../../style/variable';

export const FooterPrincipal = () => {
    // API
    const stateFooter = useFooterApi(`${apiUrlConfiguracoes}/rodape`, {});

    return stateFooter.data ? (
        <FooterStyled id="footer">
            <Container mx="auto" px={3}>
                <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                    <Box width={{ d: 1, md: 5 / 12, lg: 4 / 12 }}>
                        <Svg fill="colorWhite" height="35px" name="svg-logo-liberta" />

                        <FooterMenu />
                    </Box>

                    <Box width={{ d: 1, md: 7 / 12, lg: 8 / 12 }}>
                        <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                            <Box pr={1} width={{ d: 1, sm: 6 / 12 }}>
                                <Title5 color="colorPrimary" fontSize={14} fontWeight="700" mb={2} textTransform="uppercase">
                                    Receba por e-mail nossa newsletter
                                </Title5>

                                <Title5 fontSize={14} fontWeight="700" themeColor="light">
                                    As informações mais valiosas para manter você informado.
                                </Title5>
                            </Box>

                            <Box display="flex" flexWrap="wrap" justifyContent={{ d: 'flex-start', sm: 'flex-end' }} width={{ d: 1, sm: 6 / 12 }}>
                                <NewsletterForm obj={{ color: 'colorWhite', colorPlaceholder: 'colorGray4' }} />

                                <SocialAlternate />
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <FooterAtendimentoStyled
                    alignItems="center"
                    borderY="1px solid rgba(255, 255, 255, 0.2)"
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    my={{ d: variable.spacingSM, sm: variable.spacingLG }}
                    py={{ d: 5, sm: 4 }}
                >
                    <Box pr={{ d: 0, sm: 2 }} width={{ d: 1, sm: 1 / 3 }}>
                        {/* <Svg display={{ d: 'none', md: 'inline-block' }} fill="colorWhite" height="30px" mr={2} name="svg-headphone" verticalAlign="top" /> */}

                        {parse(`${stateFooter.data.bloco_1}`)}
                    </Box>

                    <Box borderLeft="1px solid rgba(255, 255, 255, 0.2)" px={{ d: 0, sm: 3 }} width={{ d: 1, sm: 1 / 3 }}>
                        {parse(`${stateFooter.data.bloco_2}`)}
                    </Box>

                    <Box borderLeft="1px solid rgba(255, 255, 255, 0.2)" pl={{ d: 0, sm: 3 }} width={{ d: 1, sm: 1 / 3 }}>
                        {parse(`${stateFooter.data.bloco_3}`)}
                    </Box>
                </FooterAtendimentoStyled>

                <FooterInfoStyled display="flex" flexWrap="wrap" justifyContent={{ d: 'flex-start', sm: 'center' }} mb={2}>
                    {parse(`${stateFooter.data.texto_copyright}`)}
                </FooterInfoStyled>
            </Container>
        </FooterStyled>
    ) : null;
};
