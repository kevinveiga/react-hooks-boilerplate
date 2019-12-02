import React, { useCallback, useContext, useState } from 'react';

import parse from 'html-react-parser';

import { apiUrlCursos } from '../../../config';

import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import {
    MinhaContaCursoMenuConteudoStyled,
    MinhaContaCursoMenuConteudoCheckboxStyled,
    MinhaContaCursoMenuConteudoContentStyled,
    MinhaContaCursoMenuStyled,
    MinhaContaCursoMenuModuloStyled,
    MinhaContaCursoMenuModuloSvgStyled
} from './MinhaContaCursoMenuStyled';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { P, Title4 } from '../../../style/text';

const MinhaContaCursoMenu = ({ objectCurso, ...otherProps }) => {
    // CONTEXT
    const { stateCursoProgressoContext, setStateCursoConteudoDataContext, setStateCursoConteudoVisualizadoUrlContext, setStateMenuConteudoContext } = useContext(MinhaContaCursoContext);

    // ACTION
    const [statePart, setStatePart] = useState(null);

    // Function
    const handleCursoConteudoVisualizadoUrl = useCallback(
        (conteudoId) => (element) => {
            setStateCursoConteudoVisualizadoUrlContext(`${apiUrlCursos}/meus-cursos/${objectCurso.id}/${conteudoId}/${element.target.checked ? 'registrar-visualizacao' : 'remover-visualizacao'}`);
        },
        [objectCurso.id, setStateCursoConteudoVisualizadoUrlContext]
    );

    const tipoConteudo = (tipo) => {
        const obj = { svg: '', title: '' };

        switch (tipo) {
            case 'audio':
                obj.svg = tipo;
                obj.title = 'Áudio';

                break;
            case 'download':
                obj.svg = tipo;
                obj.title = 'Download';

                break;
            case 'imagem':
                obj.svg = tipo;
                obj.title = 'Imagem';

                break;
            case 'post':
                obj.svg = tipo;
                obj.title = 'Artigo';

                break;
            default:
                obj.svg = tipo;
                obj.title = 'Vídeo';
        }

        return obj;
    };

    return (
        <MinhaContaCursoMenuStyled {...otherProps}>
            <Box p={4}>
                <Button
                    display="block"
                    fontWeight="400"
                    mb={4}
                    ml="auto"
                    mr={{ d: 'auto', md: 0 }}
                    onClick={() => setStateMenuConteudoContext(false)}
                    text="Esconder aulas"
                    textDecoration="underline"
                    themeSize="none"
                    themeType="none"
                />

                <Title4 fontWeight="700">{objectCurso.title}</Title4>

                <Box mb={4}>{parse(`${objectCurso.content}`)}</Box>

                <ProgressBar progressPercent={stateCursoProgressoContext}>
                    <P mb={1}>Progresso {parseInt(stateCursoProgressoContext, 10)}%</P>

                    <BarContainer>
                        <Bar />
                    </BarContainer>
                </ProgressBar>
            </Box>

            <Box>
                <Grid display="grid">
                    {objectCurso.modulos.map((modulo) => {
                        return (
                            <Cell key={modulo.id}>
                                <MinhaContaCursoMenuModuloStyled active={statePart == modulo.id} hover={true} onClick={() => setStatePart(statePart == modulo.id ? null : modulo.id)}>
                                    <Box mr={3}>
                                        <P fontSize="20px" mb={1}>
                                            {modulo.title}
                                        </P>

                                        <P fontSize="14px" mb={0}>
                                            {modulo.conteudos.length} Conteudos
                                        </P>
                                    </Box>

                                    <MinhaContaCursoMenuModuloSvgStyled>
                                        <Svg active={statePart == modulo.id} fill="colorSecondary" mr={0} name="svg-arrow-down-2" />
                                    </MinhaContaCursoMenuModuloSvgStyled>
                                </MinhaContaCursoMenuModuloStyled>

                                <MinhaContaCursoMenuConteudoContentStyled active={statePart == modulo.id}>
                                    <ul>
                                        {modulo.conteudos.map((conteudo) => {
                                            return (
                                                <MinhaContaCursoMenuConteudoStyled key={conteudo.id}>
                                                    <Flex alignItems="flex-start" display="flex" flexWrap="wrap" justifyContent="space-between" mb={4}>
                                                        <Box width="30px">
                                                            <MinhaContaCursoMenuConteudoCheckboxStyled
                                                                defaultChecked={conteudo.lido}
                                                                id={`${objectCurso.id}${conteudo.id}`}
                                                                name={`${objectCurso.id}${conteudo.id}`}
                                                                onChange={handleCursoConteudoVisualizadoUrl(conteudo.id)}
                                                                type="checkbox"
                                                            />

                                                            <Label color="colorGrayDark" forLabel={`${objectCurso.id}${conteudo.id}`} fontWeight="700" mb={2}>
                                                                <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />
                                                            </Label>
                                                        </Box>

                                                        <Box
                                                            onClick={() =>
                                                                setStateCursoConteudoDataContext({
                                                                    conteudoId: conteudo.id,
                                                                    cursoId: objectCurso.id,
                                                                    modulos: objectCurso.modulos,
                                                                    setCurrent: true,
                                                                    url: `${apiUrlCursos}/meus-cursos`
                                                                })
                                                            }
                                                            width="calc(100% - 30px)"
                                                        >
                                                            <P fontSize={14} fontWeight="700" mb={2}>
                                                                {conteudo.title}
                                                            </P>

                                                            <Flex alignItems="flex-end" display="flex" flexWrap="wrap" ml={4}>
                                                                <Box mr={2}>
                                                                    <Svg fill="colorGrayDark" height="22px" name={`svg-tipo-${tipoConteudo(conteudo.tipo).svg}`} />
                                                                </Box>

                                                                <Box fontSize={14}>{tipoConteudo(conteudo.tipo).title}</Box>
                                                            </Flex>
                                                        </Box>
                                                    </Flex>
                                                </MinhaContaCursoMenuConteudoStyled>
                                            );
                                        })}
                                    </ul>
                                </MinhaContaCursoMenuConteudoContentStyled>
                            </Cell>
                        );
                    })}
                </Grid>
            </Box>
        </MinhaContaCursoMenuStyled>
    );
};

export default MinhaContaCursoMenu;
