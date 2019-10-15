import React from 'react';

import { MinhaContaCursoMenuCellStyled, MinhaContaCursoMenuStyled, MinhaContaCursoMenuButtonStyled } from './MinhaContaCursoMenuStyled';
import { Svg } from '../../Svg/Svg';

import { Box } from '../../../style/flex';
import { Grid } from '../../../style/grid';
import { Bar, BarContainer, ProgressBar } from '../../../style/progressBar';
import { P, Title4 } from '../../../style/text';

export const MinhaContaCursoMenu = () => {
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
                    <MinhaContaCursoMenuCellStyled hover={true}>
                        <div>
                            <P fontSize="20px" mb={0}>
                                Introdução
                            </P>

                            <P fontSize="14px" mb={0}>
                                2 Aulas
                            </P>
                        </div>

                        <Svg fill="colorSecondary" height="10px" m={2} name="svg-arrow-down-2" />
                    </MinhaContaCursoMenuCellStyled>

                    <MinhaContaCursoMenuCellStyled hover={true}>
                        <div>
                            <P fontSize="20px" mb={0}>
                                Módulo 1
                            </P>

                            <P fontSize="14px" mb={0}>
                                3 Aulas
                            </P>
                        </div>

                        <Svg fill="colorSecondary" height="10px" m={2} name="svg-arrow-down-2" />
                    </MinhaContaCursoMenuCellStyled>

                    <MinhaContaCursoMenuCellStyled hover={true}>
                        <div>
                            <P fontSize="20px" mb={0}>
                                Módulo 2
                            </P>

                            <P fontSize="14px" mb={0}>
                                4 Aulas
                            </P>
                        </div>

                        <Svg fill="colorSecondary" height="10px" m={2} name="svg-arrow-down-2" />
                    </MinhaContaCursoMenuCellStyled>

                    <MinhaContaCursoMenuCellStyled hover={true}>
                        <div>
                            <P fontSize="20px" mb={0}>
                                Módulo 3
                            </P>

                            <P fontSize="14px" mb={0}>
                                2 Aulas
                            </P>
                        </div>

                        <Svg fill="colorSecondary" height="10px" m={2} name="svg-arrow-down-2" />
                    </MinhaContaCursoMenuCellStyled>
                </Grid>
            </Box>
        </MinhaContaCursoMenuStyled>
    );
};
