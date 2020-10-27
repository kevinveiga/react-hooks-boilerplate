import React, { useMemo, useState } from 'react';

import { CadastroContext } from '../../../store/cadastro/cadastroContext';

import { CadastroForm } from '../../Form/CadastroForm';
import { ConhecerMaisForm } from '../../Form/ConhecerMaisForm';
import { LinkTo } from '../../Link/LinkTo';
import { Splash } from '../../Splash/Splash';

import { Box, Flex } from '../../../style/flex';
import { Container } from '../../../style/layout';

export const Cadastro = () => {
    // ACTION
    const [stateConhecerMais, setStateConhecerMais] = useState(false);

    const memoConhecerMais = useMemo(() => [stateConhecerMais, setStateConhecerMais], [stateConhecerMais, setStateConhecerMais]);

    return (
        <CadastroContext.Provider value={{ setStateConhecerMaisContext: memoConhecerMais[1] }}>
            <Flex display="flex" flexWrap="wrap" minHeight="100vh">
                <Box alignItems="center" display={{ d: 'none', lg: 'flex' }} flexWrap="wrap" width={3 / 7}>
                    <Splash />
                </Box>

                <Box width={{ d: '100%', lg: 3 / 7 }}>
                    <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                        {!memoConhecerMais[0] ? (
                            <CadastroForm formId="cadastroFormId" obj={{ colorLine: 'colorPrimary' }} />
                        ) : (
                            <ConhecerMaisForm formId="conhecerMaisFormId" obj={{ colorLine: 'colorPrimary' }} />
                        )}
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
        </CadastroContext.Provider>
    );
};
