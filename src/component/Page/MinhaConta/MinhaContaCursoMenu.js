import parse from 'html-react-parser';
import React, { useContext, useState } from 'react';

import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import { MinhaContaCursoMenuAulaCheckboxStyled, MinhaContaCursoMenuAulaContentStyled, MinhaContaCursoMenuStyled, MinhaContaCursoMenuModuloStyled, MinhaContaCursoMenuModuloSvgStyled } from './MinhaContaCursoMenuStyled';
import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { P, Title4 } from '../../../style/text';

const MinhaContaCursoMenu = ({ objectCurso, ...otherProps }) => {
    // CONTEXT
    const setStateMenuAula = useContext(MinhaContaCursoContext);

    // ACTION
    const [statePart, setStatePart] = useState(null);

    const tipoAula = (tipo) => {
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
                <Button display="block" fontWeight="400" mb={4} ml="auto" mr={{ d: 'auto', md: 0 }} onClick={() => setStateMenuAula(false)} text="Esconder aulas" textDecoration="underline" themeSize="none" themeType="none" />

                <Title4 fontWeight="600">{objectCurso.title}</Title4>

                <Box mb={4}>{parse(`${objectCurso.content}`)}</Box>

                <ProgressBar progressPercent={objectCurso.progresso}>
                    <P mb={1}>Progresso {objectCurso.progresso}%</P>

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
                                            {modulo.cursos.length} Aulas
                                        </P>
                                    </Box>

                                    <MinhaContaCursoMenuModuloSvgStyled>
                                        <Svg active={statePart == modulo.id} fill="colorSecondary" height="10px" mr={0} name="svg-arrow-down-2" />
                                    </MinhaContaCursoMenuModuloSvgStyled>
                                </MinhaContaCursoMenuModuloStyled>

                                <MinhaContaCursoMenuAulaContentStyled active={statePart == modulo.id}>
                                    <ul>
                                        {modulo.cursos.map((aula) => {
                                            return (
                                                <li key={aula.id}>
                                                    <MinhaContaCursoMenuAulaCheckboxStyled defaultChecked={aula.lido} disabled={true} id={`${aula.id}${aula.id}`} name={`${aula.id}${aula.id}`} type="checkbox" />

                                                    <Label color="colorGrayDark" forLabel={`${aula.id}${aula.id}`} fontWeight="600" mb={2}>
                                                        <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                                        <span>{aula.title}</span>
                                                    </Label>

                                                    <Flex alignItems="flex-end" display="flex" flexWrap="wrap" mb={4} ml={4}>
                                                        <Box mr={2}>
                                                            <Svg fill="colorGrayDark" height="22px" name={`svg-tipo-${tipoAula(aula.tipo).svg}`} />
                                                        </Box>

                                                        <Box fontSize={14}>{tipoAula(aula.tipo).title}</Box>
                                                    </Flex>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </MinhaContaCursoMenuAulaContentStyled>
                            </Cell>
                        );
                    })}
                </Grid>
            </Box>
        </MinhaContaCursoMenuStyled>
    );
};

export default MinhaContaCursoMenu;
