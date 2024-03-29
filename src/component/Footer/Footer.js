import React, { useEffect } from 'react';

import parse from 'html-react-parser';

import { apiUrlConfiguracoes } from '../../config';

import { useFooterApi } from '../../service/footer';

import { useIntersect } from '../../store/util/intersect';

import { FooterMenu } from './FooterMenu';
import { NewsletterForm } from '../Form/NewsletterForm';
import { LoaderPlaceholder } from '../Loader/LoaderPlaceholder';
import { SocialAlternate } from '../Social/SocialAlternate';

import { FooterAtendimentoStyled, FooterStyled } from './FooterStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { Title5 } from '../../style/text';
import { variable } from '../../style/variable';

const Footer = () => {
    // API
    const [stateFooter, setStateFooterData] = useFooterApi({ isIntersecting: false });

    // ACTION
    const [stateEntry, setStateNode] = useIntersect({});

    useEffect(() => {
        if (stateEntry.isIntersecting) {
            setStateFooterData({ isIntersecting: true, url: `${apiUrlConfiguracoes}/rodape` });
        }

        return undefined;
    }, [stateEntry, setStateFooterData]);

    return (
        <div id="footer" ref={setStateNode}>
            {stateEntry.isIntersecting && stateFooter.data ? (
                <FooterStyled>
                    <Container mx="auto" px={3}>
                        <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                            <Box width={{ d: 1, md: 5 / 12, lg: 4 / 12 }}>
                                <FooterMenu />
                            </Box>

                            <Box width={{ d: 1, md: 7 / 12, lg: 8 / 12 }}>
                                <Flex display="flex" flexWrap="wrap" justifyContent="space-between">
                                    <Box pr={1} width={{ d: 1, sm: 6 / 12 }}>
                                        <Title5 color="colorPrimary" fontSize="14px" fontWeight="700" mb={2} textTransform="uppercase">
                                            Receba por e-mail nossa newsletter
                                        </Title5>

                                        <Title5 fontSize="14px" fontWeight="700" themeColor="light">
                                            As informações mais valiosas para manter você informado.
                                        </Title5>
                                    </Box>

                                    <Box
                                        display="flex"
                                        flexWrap="wrap"
                                        justifyContent={{ d: 'flex-start', sm: 'flex-end' }}
                                        width={{ d: 1, sm: 6 / 12 }}
                                    >
                                        <NewsletterForm obj={{ color: 'colorWhite', colorPlaceholder: 'colorGray4' }} />

                                        <SocialAlternate />
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>

                        <FooterAtendimentoStyled
                            alignItems="flex-start"
                            borderY="1px solid rgba(255, 255, 255, 0.2)"
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            my={{ d: variable.spacingSM, sm: variable.spacingLG }}
                            py={{ d: 5, sm: 4 }}
                        >
                            <Box pr={{ d: 0, md: 3 }} py={2} width={{ d: 1, sm: 1 / 2 }}>
                                {parse(`${stateFooter.data.bloco_1}`)}
                            </Box>

                            <Box pl={{ d: 0, md: 3 }} py={2} width={{ d: 1, sm: 1 / 2 }}>
                                {parse(`${stateFooter.data.bloco_2}`)}
                            </Box>
                        </FooterAtendimentoStyled>
                    </Container>
                </FooterStyled>
            ) : (
                <LoaderPlaceholder />
            )}
        </div>
    );
};

export default Footer;
