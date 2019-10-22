import React, { useContext, useState } from 'react';

import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import { MinhaContaCursoMenuAulaCheckboxStyled, MinhaContaCursoMenuAulaContentStyled, MinhaContaCursoMenuStyled, MinhaContaCursoMenuAulaStyled } from './MinhaContaCursoMenuStyled';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { Span, P, Title4 } from '../../../style/text';

export const MinhaContaCursoMenu = ({ ...props }) => {
    // ACTION
    const [statePart, setStatePart] = useState(null);

    // CONTEXT
    const setStateMenuAula = useContext(MinhaContaCursoContext);

    return (
        <MinhaContaCursoMenuStyled {...props}>
            <Box p={4}>
                <Button display="block" fontWeight="400" mb={4} ml="auto" mr={{ d: 'auto', md: 0 }} onClick={() => setStateMenuAula(false)} text="Esconder aulas" textDecoration="underline" themeSize="none" themeType="none" />

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
                    {[{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }].map((aula) => {
                        return (
                            <Cell key={aula.id}>
                                <MinhaContaCursoMenuAulaStyled active={statePart == aula.id} hover={true} onClick={() => setStatePart(aula.id)}>
                                    <div>
                                        <P fontSize="20px" mb={0}>
                                            Introdução
                                        </P>

                                        <P fontSize="14px" mb={0}>
                                            2 Aulas
                                        </P>
                                    </div>

                                    <Svg fill="colorSecondary" height="10px" mr={0} name="svg-arrow-down-2" />
                                </MinhaContaCursoMenuAulaStyled>

                                <MinhaContaCursoMenuAulaContentStyled active={statePart == aula.id}>
                                    <ul>
                                        {[{ id: '1' }, { id: '2' }].map((aula) => {
                                            return (
                                                <li key={aula.id}>
                                                    <MinhaContaCursoMenuAulaCheckboxStyled defaultChecked={false} id={`${aula.id}${aula.id}`} name={`${aula.id}${aula.id}`} type="checkbox" />

                                                    <Label color="colorGrayDark" forLabel={`${aula.id}${aula.id}`} fontWeight="600" mb={2}>
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
                                </MinhaContaCursoMenuAulaContentStyled>
                            </Cell>
                        );
                    })}
                </Grid>
            </Box>
        </MinhaContaCursoMenuStyled>
    );
};
