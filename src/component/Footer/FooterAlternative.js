import React, { useEffect } from 'react';

import parse from 'html-react-parser';

import { apiUrlConfiguracoes } from '../../config';

import { useFooterApi } from '../../service/footer';

import { useIntersect } from '../../store/util/intersect';

import { LoaderPlaceholder } from '../Loader/LoaderPlaceholder';
import { Svg } from '../Svg/Svg';

import { FooterAlternativeStyled, FooterAlternativeAtendimentoStyled } from './FooterAlternativeStyled';

import { Box, Flex } from '../../style/flex';
import { Container } from '../../style/layout';
import { variable } from '../../style/variable';

const FooterAlternative = () => {
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
        <div id="footer-alternative" ref={setStateNode}>
            {stateEntry.isIntersecting && stateFooter.data ? (
                <FooterAlternativeStyled>
                    <Container mx="auto" p={3}>
                        <FooterAlternativeAtendimentoStyled
                            alignItems="flex-start"
                            borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            mb={variable.spacingLG}
                            mx="auto"
                            pb={3}
                            pt={5}
                        >
                            <Flex display="flex" flexWrap="wrap" width={{ d: 1, md: 'auto' }}>
                                <Box px={3} py={2} width={{ d: 1, md: 'auto' }}>
                                    <Box display={{ d: 'none', md: 'inline-block' }} pr={2} verticalAlign="top">
                                        <Svg fill="colorWhite" height="35px" name="svg-headphone" />
                                    </Box>

                                    <Box display="inline-block">{parse(`${stateFooter.data.bloco_3}`)}</Box>
                                </Box>

                                <Box borderLeft={{ d: 'none', md: '1px solid rgba(255, 255, 255, 0.2)' }} px={3} py={2} width={{ d: 1, md: 'auto' }}>
                                    {parse(`${stateFooter.data.bloco_4}`)}
                                </Box>
                            </Flex>

                            <Box borderLeft={{ d: 'none', md: '1px solid rgba(255, 255, 255, 0.2)' }} px={3} py={2} width={{ d: 1, md: 'auto' }}>
                                <h6>E-mail:</h6>
                                <h4>atendimento@libertainvestimentos.com.br</h4>
                            </Box>
                        </FooterAlternativeAtendimentoStyled>

                        <Box mb={variable.spacingLG} textAlign="center" width="100%">
                            {parse(`${stateFooter.data.texto_copyright}`)}
                        </Box>
                    </Container>
                </FooterAlternativeStyled>
            ) : (
                <LoaderPlaceholder />
            )}
        </div>
    );
};

export default FooterAlternative;
