import React, { useEffect } from 'react';

import { apiUrlPerfil } from '../../../config';

import { usePerfilApi } from '../../../service/perfil';

import { scrollTo } from '../../../util/scrollTo';

import { MinhaContaForm } from '../../Form/MinhaContaForm';
import { MinhaContaAvatarForm } from '../../Form/MinhaContaAvatarForm';

import { MinhaContaCenterStyled } from './MinhaContaStyled';

import { Box, Flex } from '../../../style/flex';

const MinhaConta = () => {
    // API
    const [statePerfil, setStatePerfilData] = usePerfilApi({ url: apiUrlPerfil });

    const perfilLength = statePerfil.data ? Object.keys(statePerfil.data).length : 0;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = perfilLength > 0;

    // ACTION
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        scrollTo(null, isDataLoaded);

        return undefined;
    }, [isDataLoaded]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return (
        <MinhaContaCenterStyled px={{ d: 3, sm: 5 }} py={{ d: 4, sm: 5, lg: '75px' }}>
            {perfilLength > 0 && (
                <Flex display="flex" flexWrap="wrap" justifyContent="center">
                    <Box minHeight="200px" width="150px">
                        <MinhaContaAvatarForm />
                    </Box>

                    <Box overflow="hidden" width={{ d: '100%', md: 8 / 10 }}>
                        <MinhaContaForm
                            data={{
                                codigo_xp: statePerfil.data.data.codigo_xp,
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
                    </Box>
                </Flex>
            )}
        </MinhaContaCenterStyled>
    );
};

export default MinhaConta;
