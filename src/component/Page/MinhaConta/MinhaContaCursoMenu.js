import parse from 'html-react-parser';
import React, { useContext, useState } from 'react';

import { MinhaContaCursoContext } from '../../../store/minhaContaCurso/minhaContaCursoContext';

import { Button } from '../../Button/Button';
import { Label } from '../../Form/Form';
import { MinhaContaCursoMenuAulaCheckboxStyled, MinhaContaCursoMenuAulaContentStyled, MinhaContaCursoMenuStyled, MinhaContaCursoMenuAulaStyled } from './MinhaContaCursoMenuStyled';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Cell, Grid } from '../../../style/grid';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { P, Span, Title4 } from '../../../style/text';

const MinhaContaCursoMenu = ({ objectCurso, ...otherProps }) => {
    console.log('objectCurso: ', objectCurso);

    // CONTEXT
    const setStateMenuAula = useContext(MinhaContaCursoContext);

    // ACTION
    const [statePart, setStatePart] = useState(null);

    return (
        <MinhaContaCursoMenuStyled {...otherProps}>
            <Box p={4}>
                <Button display="block" fontWeight="400" mb={4} ml="auto" mr={{ d: 'auto', md: 0 }} onClick={() => setStateMenuAula(false)} text="Esconder aulas" textDecoration="underline" themeSize="none" themeType="none" />

                <Title4 fontWeight="600">{objectCurso.title}</Title4>

                <p>{objectCurso.content}</p>

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
                                <MinhaContaCursoMenuAulaStyled active={statePart == modulo.id} hover={true} onClick={() => setStatePart(statePart == modulo.id ? null : modulo.id)}>
                                    <div>
                                        <P fontSize="20px" mb={0}>
                                            {modulo.title}
                                        </P>

                                        <P fontSize="14px" mb={0}>
                                            2 Aulas
                                        </P>
                                    </div>

                                    <Svg fill="colorSecondary" height="10px" mr={0} name="svg-arrow-down-2" />
                                </MinhaContaCursoMenuAulaStyled>

                                <MinhaContaCursoMenuAulaContentStyled active={statePart == modulo.id}>
                                    <ul>
                                        {[{ id: '1' }, { id: '2' }].map((aulaContent) => {
                                            return (
                                                <li key={aulaContent.id}>
                                                    <MinhaContaCursoMenuAulaCheckboxStyled defaultChecked={true} disabled={true} id={`${aulaContent.id}${aulaContent.id}`} name={`${aulaContent.id}${aulaContent.id}`} type="checkbox" />

                                                    <Label color="colorGrayDark" forLabel={`${aulaContent.id}${aulaContent.id}`} fontWeight="600" mb={2}>
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

export default MinhaContaCursoMenu;
