import React, { useState } from 'react';

import { Label } from '../../Form/Form';
import { MinhaContaCursoMenuButtonStyled, MinhaContaCursoMenuModuloCheckboxStyled, MinhaContaCursoMenuModuloContentStyled, MinhaContaCursoMenuStyled, MinhaContaCursoMenuModuloStyled } from './MinhaContaCursoMenuStyled';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { Span, P, Title4 } from '../../../style/text';

export const MinhaContaCursoMenu = () => {
    // ACTION
    const [statePart, setStatePart] = useState(null);

    return (
        <MinhaContaCursoMenuStyled>
            <Box p={4}>
                <MinhaContaCursoMenuButtonStyled>Esconder Menu</MinhaContaCursoMenuButtonStyled>

                <Title4 fontWeight="600">Teste</Title4>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>

                <ProgressBar progressPercent={40}>
                    <P mb={1}>Progresso {40}%</P>

                    <BarContainer>
                        <Bar />
                    </BarContainer>
                </ProgressBar>
            </Box>

            <Box>
                <Grid display="grid">
                    {[{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }].map((modulo) => {
                        return (
                            <Cell key={modulo.id}>
                                <MinhaContaCursoMenuModuloStyled active={statePart == modulo.id} hover={true} onClick={() => setStatePart(modulo.id)}>
                                    <div>
                                        <P fontSize="20px" mb={0}>
                                            Introdução
                                        </P>

                                        <P fontSize="14px" mb={0}>
                                            2 Aulas
                                        </P>
                                    </div>

                                    <Svg fill="colorSecondary" height="10px" mr={0} name="svg-arrow-down-2" />
                                </MinhaContaCursoMenuModuloStyled>

                                <MinhaContaCursoMenuModuloContentStyled active={statePart == modulo.id}>
                                    <ul>
                                        {[{ id: '1' }, { id: '2' }].map((aula) => {
                                            return (
                                                <li key={aula.id}>
                                                    <MinhaContaCursoMenuModuloCheckboxStyled defaultChecked={false} id={`${modulo.id}${aula.id}`} name={`${modulo.id}${aula.id}`} type="checkbox" />

                                                    <Label color="colorGrayDark" forLabel={`${modulo.id}${aula.id}`} fontWeight="600" mb={2}>
                                                        <Svg fill="colorWhite" height="9px" name="svg-checked" stroke="colorWhite" />

                                                        <span>Analisando situações</span>
                                                    </Label>

                                                    <P fontSize={14} ml={4}>
                                                        <Svg fill="colorGrayDark" height="18px" mr={2} name="svg-video-camera" />

                                                        <Span verticalAlign="sub">Vídeo | 7min</Span>
                                                    </P>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </MinhaContaCursoMenuModuloContentStyled>
                            </Cell>
                        );
                    })}
                </Grid>
            </Box>
        </MinhaContaCursoMenuStyled>
    );
};
