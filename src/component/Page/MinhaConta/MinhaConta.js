import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet-async';

import { apiUrlPerfil } from '../../../config';

import { useSeoApi } from '../../../service/seo';
import { usePerfilApi } from '../../../service/perfil';

import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

import { MinhaContaForm } from '../../Form/MinhaContaForm';
import { HeaderAlternate } from '../../Header/HeaderAlternate';
import { MinhaContaMenu } from './MinhaContaMenu';

import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { variable } from '../../../style/variable';

const MinhaConta = () => {
    // API
    // const stateSeo = useSeoApi(`${apiUrlPerfil}/seo`, {});
    const [statePerfil, setStatePerfilData] = usePerfilApi({ url: apiUrlPerfil }, {});

    const perfilLength = statePerfil.data ? Object.keys(statePerfil.data).length : 0;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = perfilLength > 0;

    // ACTION
    const windowWidth = useWindowWidth();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <>
            {/* <Helmet>
                <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} />
            </Helmet> */}

            <HeaderAlternate />

            <Main header="minhaConta">
                <Container mx="auto" px={{ d: 2, lg: 3 }}>
                    <Flex display="flex" flexWrap="wrap">
                        <MinhaContaMenu />

                        <MinhaContaCenterStyled px={{ d: 2, sm: 5, xl: '100px' }} py={{ d: 4, sm: 5, xl: '75px' }} width={{ d: '100%', lg: 8 / 10 }}>
                            {perfilLength > 0 && (
                                <MinhaContaForm
                                    data={{
                                        data_nascimento: statePerfil.data.data.data_nascimento,
                                        email: statePerfil.data.data.email,
                                        endereco_cep: statePerfil.data.data.endereco.cep,
                                        endereco_cidade: statePerfil.data.data.endereco.cidade,
                                        endereco_complemento: statePerfil.data.data.endereco.complemento,
                                        endereco_logradouro: statePerfil.data.data.endereco.logradouro,
                                        endereco_numero: statePerfil.data.data.endereco.numero,
                                        endereco_uf: statePerfil.data.data.endereco.uf,
                                        nome: statePerfil.data.data.nome,
                                        receber_curadoria_conteudos_noticias: statePerfil.data.data.receber_curadoria_conteudos_noticias,
                                        receber_avisos_descontos_de_cursos: statePerfil.data.data.receber_avisos_descontos_de_cursos,
                                        password: statePerfil.data.data.password,
                                        sexo: statePerfil.data.data.sexo,
                                        telefone: statePerfil.data.data.telefone
                                    }}
                                    formId="minhaContaFormId"
                                    obj={{ colorLine: 'colorGray4' }}
                                    setStatePerfilData={setStatePerfilData}
                                />
                            )}
                        </MinhaContaCenterStyled>
                    </Flex>
                </Container>
            </Main>
        </>
    );
};

export default MinhaConta;
