import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { apiUrlCursos } from '../../../config';

import { useCursoApi, useCursoCategoriaApi, useCursoCategoriasApi } from '../../../service/curso';
// import { useSeoApi } from '../../../service/seo';

import { Context } from '../../../store/context';
import { useWindowWidth } from '../../../store/util/windowWidth';

import { scrollTo } from '../../../util/scrollTo';

// import { Button } from '../../Button/Button';
import { BgImageLazyLoad } from '../../LazyLoad/BgImageLazyLoad';
import { LinkTo } from '../../Link/LinkTo';

import { Svg } from '../../Svg/Svg';

import { Box, Flex } from '../../../style/flex';
import { Container, Main } from '../../../style/layout';
import { ListBox, ListBoxHover, ListLevel, ListTag, ListTime, ListTitle } from '../../../style/list';
import { Tab, TabContent, TabsContent, TabLabel, TabNav, TabsNav, TabSelect } from '../../../style/tab';
import { Title3, Title4 } from '../../../style/text';
import { variable } from '../../../style/variable';

export const Aprenda = () => {
    // API
    const [stateCursos] = useCursoApi(apiUrlCursos, {});
    const [stateCursosCategoria, setStateCursosCategoriaData] = useCursoCategoriaApi(null, {});
    const stateCursosCategorias = useCursoCategoriasApi(`${apiUrlCursos}/categorias`, {});
    // const stateSeo = useSeoApi(`${apiUrlCursos}/seo`, {});

    const cursosLength = stateCursos.data && stateCursos.data.data ? Object.keys(stateCursos.data.data).length : 0;
    const cursosCategoriasLength = stateCursosCategorias.data && stateCursosCategorias.data.data && stateCursosCategorias.data.data.length;

    // Verificação se todos os dados de API estão carregados
    const isDataLoaded = cursosLength > 0 && cursosCategoriasLength > 0;

    // CONTEXT
    const { setStateLoaderGlobal } = useContext(Context);

    // ACTION
    const [stateCursosCategoriaSelected, setStateCursosCategoriaSelected] = useState('mais-vistos');
    const windowWidth = useWindowWidth();

    const handleCursoCategoriaChange = (e) => {
        let apiValue = `${apiUrlCursos}/categorias/${e.target.value}`;

        if (e.target.value === 'mais-vistos') {
            apiValue = apiUrlCursos;
        }

        // Paginação desativada
        // setStateCursosCategoriaData({ page: 1, url: apiValue });
        setStateCursosCategoriaData({ url: apiValue });
        setStateCursosCategoriaSelected(e.target.value);
    };

    // Scroll para o topo
    if (!stateCursosCategoria.data) {
        scrollTo(null, isDataLoaded, windowWidth < parseInt(variable.md, 10) ? 0 : 80);
    }

    useEffect(() => {
        if (stateCursos.isLoading || stateCursosCategoria.isLoading) {
            setStateLoaderGlobal(true);
        } else {
            setTimeout(() => {
                setStateLoaderGlobal(false);
            }, variable.timeout1s);
        }
    }, [setStateLoaderGlobal, stateCursos.isLoading, stateCursosCategoria.isLoading]);

    return (
        <>
            <Helmet>{/* <title>{stateSeo.data && stateSeo.data.title}</title>
                <meta name="description" content={stateSeo.data && stateSeo.data.description} /> */}</Helmet>

            <Main>
                <Container mx="auto" px={3} py={{ d: 4, md: 5 }}>
                    <Title3 align="center" fontWeight="600" themeColor="dark">
                        Conheça os cursos da Liberta
                    </Title3>

                    <Title4 align="center" color="colorGray2" mb={5} themeColor="dark">
                        Ele é considerado uma das alternativas preferidas de quem está começando.
                    </Title4>

                    <Tab group="tab-group-course" total={4}>
                        {cursosCategoriasLength > 0 &&
                            stateCursosCategorias.data.data.map((categoria) => {
                                return (
                                    <input
                                        checked={stateCursosCategoriaSelected === categoria.slug}
                                        id={`tab-id-course-${categoria.slug}`}
                                        key={categoria.slug}
                                        name="tab-group-course"
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleCursoCategoriaChange(e);
                                        }}
                                        type="radio"
                                        value={categoria.slug}
                                    />
                                );
                            })}

                        {windowWidth < parseInt(variable.md, 10) && (
                            <TabSelect ml="auto" mr="auto">
                                <select
                                    onChange={(e) => {
                                        e.preventDefault();
                                        handleCursoCategoriaChange(e);
                                    }}
                                >
                                    {cursosCategoriasLength > 0 &&
                                        stateCursosCategorias.data.data.map((categoria) => {
                                            return (
                                                <option key={categoria.slug} value={categoria.slug}>
                                                    {categoria.title}
                                                </option>
                                            );
                                        })}
                                </select>

                                <Svg name="svg-arrow-down" />
                            </TabSelect>
                        )}

                        <TabsNav display={{ d: 'none', md: 'block' }} textAlign="center">
                            {cursosCategoriasLength > 0 &&
                                stateCursosCategorias.data.data.map((categoria) => {
                                    return (
                                        <TabNav key={categoria.slug}>
                                            <TabLabel htmlFor={`tab-id-course-${categoria.slug}`}>{categoria.title}</TabLabel>
                                        </TabNav>
                                    );
                                })}
                        </TabsNav>

                        <TabsContent>
                            {cursosLength > 0 &&
                                stateCursos.data &&
                                Object.keys(stateCursos.data.data).map((key) => {
                                    const categoria = stateCursos.data.data[key];

                                    return (
                                        <TabContent key={key}>
                                            <Flex display="flex" flexWrap="wrap">
                                                {categoria &&
                                                    categoria.data.map((curso) => {
                                                        return (
                                                            <Box key={curso.id} mb={5} width={{ d: 1, md: 1 / 3 }}>
                                                                <LinkTo ariaLabel={curso.title} height="100%" to={`/curso/${curso.id}`} width="100%">
                                                                    <ListBox alignContent="space-between" color={categoria.featured_color} display="flex" flexWrap="wrap" height="100%" hover="true" mx={2} themeColor="dark" verticalAlign="middle">
                                                                        <ListBoxHover zindex="3">
                                                                            <Flex alignContent="center" display="flex" flexWrap="wrap" height="100%" justifyContent="center">
                                                                                <Box textAlign="center">
                                                                                    <Svg fill="colorWhite" height="50px" mb={2} name="svg-plus" />

                                                                                    <p>Saber mais</p>
                                                                                </Box>
                                                                            </Flex>
                                                                        </ListBoxHover>

                                                                        <Box width="100%">
                                                                            <Box height="200px" overflow="hidden" width="100%">
                                                                                <BgImageLazyLoad key={curso.id} url={curso.thumbnail && curso.thumbnail.attachment.url} />

                                                                                <ListTag>Gratuito</ListTag>
                                                                            </Box>

                                                                            <Box px={3} py={2} width="100%">
                                                                                <p>Curso {curso.modalidade}</p>

                                                                                <ListTitle>{curso.title}</ListTitle>
                                                                            </Box>
                                                                        </Box>

                                                                        <Box pb={3} px={3} width="100%">
                                                                            <Svg fill="colorSecondary" height="15px" name="svg-time" />

                                                                            <ListTime ml={1} mr={3}>
                                                                                {curso.carga_horaria}
                                                                            </ListTime>

                                                                            <Svg fill="colorSecondary" height="16px" name="svg-level" />

                                                                            <ListLevel ml={1}>{curso.nivel}</ListLevel>
                                                                        </Box>
                                                                    </ListBox>
                                                                </LinkTo>
                                                            </Box>
                                                        );
                                                    })}

                                                {/* {stateCursosCategoria.data && stateCursosCategoria.data.current_page < stateCursosCategoria.data.last_page && (
                                                    <Box display="flex" justifyContent="center" py={3}>
                                                        <Button text="Ver mais" themeType="border" onClick={() => setStateCursosCategoriaData({ page: parseInt(stateCursosCategoria.data.current_page, 10) + 1, url: `${apiUrlCursos}/categoria/${categoria.slug}` })} />
                                                    </Box>
                                                )} */}
                                            </Flex>
                                        </TabContent>
                                    );
                                })}
                        </TabsContent>
                    </Tab>
                </Container>
            </Main>
        </>
    );
};
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';

import { apiUrlCadastro, defaultErrorMsg } from '../../config';

import { customMaskRegex } from '../../util/customMaskRegex';
import { customValidate } from '../../util/customValidate';
import { formatFormDataSet } from '../../util/formatFormData';
import { responseError } from '../../util/responseError';

import { Button } from '../Button/Button';
import { InputMaskValidation, InputValidation, Label, Select } from './Form';
import { OptionUF } from './OptionUF';

import { FormStyled, InvalidInputMessageStyled, InvalidResponseMessageContainerStyled, InvalidResponseMessageStyled } from './FormStyled';
import { ConhecerMaisPartContentStyled, ConhecerMaisPartNumberStyled, ConhecerMaisPartTitleStyled, ConhecerMaisRadioStyled } from './ConhecerMaisFormStyled';

import { Box, Flex } from '../../style/flex';
import { Cell, Grid } from '../../style/grid';
import { Span, Title3 } from '../../style/text';

const ConhecerMaisForm = ({ ...props }) => {
    // ACTION
    const [statePart, setStatePart] = useState(1);

    useEffect(() => {
        register({ name: 'data_nascimento' }, { ...customValidate.date });
        register({ name: 'endereco_cidade' });
        register({ name: 'endereco_estado' });
        register({ name: 'sexo' });
    }, [register]);

    // FORM
    const { errors, formState, handleSubmit, register, setError, setValue, triggerValidation } = useForm({
        defaultValues: { data_nascimento: '' },
        mode: 'onChange'
    });

    const submitForm = (formData) => {
        const fetchData = async () => {
            try {
                const result = await axios.post(apiUrlCadastro, formatFormDataSet(formData), { headers: { 'Content-Type': 'application/json' } });

                if (result.data && result.data.success == true) {
                    // TODO: fazer redirect para página inicial do usuário
                } else {
                    setError('invalid', 'notMatch', defaultErrorMsg);
                    console.error('result: ', result);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('invalid', 'notMatch', responseError(error.response.data.errors));
                } else {
                    console.error('error: ', error);
                }
            }
        };

        fetchData();
    };

    return (
        <>
            <Title3 align="center" fontWeight="600" mb={4} themeColor="dark">
                Queremos conhecer um pouco
                <br />
                mais sobre você
            </Title3>

            <Flex display="flex" flexWrap="wrap">
                <Box overflow="hidden" width="100%">
                    <FormStyled id="conhecerMaisFormId" onSubmit={handleSubmit(submitForm)}>
                        <Grid display="grid" gridRowGap={4} px={{ d: 1, sm: 5 }} py={{ d: 2, sm: 4 }} maxWidth="500px">
                            <Cell>
                                <InvalidResponseMessageContainerStyled>{errors.invalid && <InvalidResponseMessageStyled>{errors.invalid.message}</InvalidResponseMessageStyled>}</InvalidResponseMessageContainerStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={() => setStatePart(1)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 1}>1</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 1 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Qual o seu sexo?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 1} ml={4}>
                                    <ConhecerMaisRadioStyled
                                        defaultChecked={false}
                                        defaultValue={true}
                                        id="sexo_masculino"
                                        name="sexo"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            setValue(input.name, input.checked);
                                        }}
                                        type="radio"
                                    />

                                    <Label color="colorGrayDark" fontSize={14} forLabel="sexo_masculino" fontWeight="600" px={{ d: 3, md: 4 }} py={2}>
                                        Masculino
                                    </Label>

                                    <ConhecerMaisRadioStyled
                                        defaultChecked={false}
                                        defaultValue={true}
                                        id="sexo_feminino"
                                        name="sexo"
                                        onChange={async (e) => {
                                            const input = e.target;
                                            setValue(input.name, input.checked);
                                        }}
                                        type="radio"
                                    />

                                    <Label color="colorGrayDark" fontSize={14} forLabel="sexo_feminino" fontWeight="600" ml={4} px={{ d: 3, md: 4 }} py={2}>
                                        Feminino
                                    </Label>
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={() => setStatePart(2)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 2}>2</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 2 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Quando que você nasceu?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 2} ml={4}>
                                    <Label text="Data de Nascimento" />

                                    <div>
                                        <InputMaskValidation
                                            error={errors.data_nascimento}
                                            mask={customMaskRegex.date}
                                            name="data_nascimento"
                                            onChange={async (e) => {
                                                const input = e.target;
                                                await triggerValidation({ name: input.name, value: input.value });
                                            }}
                                            placeholder="dd/mm/aaaa"
                                            touched={formState.touched}
                                            {...props}
                                        />
                                    </div>

                                    {errors.data_nascimento && <InvalidInputMessageStyled>{errors.data_nascimento.message}</InvalidInputMessageStyled>}
                                </ConhecerMaisPartContentStyled>
                            </Cell>

                            <Cell>
                                <ConhecerMaisPartTitleStyled onClick={() => setStatePart(3)}>
                                    <ConhecerMaisPartNumberStyled active={statePart === 3}>3</ConhecerMaisPartNumberStyled>

                                    <Span color={statePart === 3 ? 'colorGrayDark' : 'colorGrayLight'} fontSize={18}>
                                        Onde você mora?
                                    </Span>
                                </ConhecerMaisPartTitleStyled>

                                <ConhecerMaisPartContentStyled active={statePart === 3} ml={4}>
                                    <Box display="inline-block">
                                        <Label text="Cidade" />

                                        <div>
                                            <InputValidation
                                                error={errors.endereco_cidade}
                                                maxLength="50"
                                                name="endereco_cidade"
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    await triggerValidation({ name: input.name, value: input.value });
                                                }}
                                                placeholder="Cidade"
                                                touched={formState.touched}
                                                {...props}
                                            />
                                        </div>

                                        {errors.endereco_cidade && <InvalidInputMessageStyled>{errors.endereco_cidade.message}</InvalidInputMessageStyled>}
                                    </Box>

                                    <Box display="inline-block" ml={{ d: 0, md: 4 }} mt={{ d: 4, md: 0 }}>
                                        <Label text="Estado" />

                                        <div>
                                            <Select
                                                name="endereco_estado"
                                                obj={{ color: formState.touched.indexOf('endereco_estado') > -1 ? 'colorGrayDark' : 'colorGray', colorLine: 'colorPrimary', fontWeight: formState.touched.indexOf('endereco_estado') > -1 ? '600' : '400' }}
                                                onChange={async (e) => {
                                                    const input = e.target;
                                                    setValue(input.name, input.value);
                                                }}
                                            >
                                                <OptionUF />
                                            </Select>
                                        </div>
                                    </Box>
                                </ConhecerMaisPartContentStyled>
                            </Cell>
                        </Grid>

                        <Box my={4} width="100%">
                            {statePart < 3 && (
                                <Button
                                    fontSize={{ d: 16, sm: 18 }}
                                    m="auto"
                                    onClick={() => {
                                        const nextPart = statePart;
                                        setStatePart(nextPart + 1);
                                    }}
                                    text="Pular Etapa"
                                    textTransform="none"
                                    themeSize="small"
                                    themeType="border"
                                    width="160px"
                                />
                            )}

                            {statePart === 3 && <Button fontSize={{ d: 16, sm: 18 }} m="auto" text="Concluir" textTransform="none" themeSize="small" typeButton="submit" width="160px" />}
                        </Box>
                    </FormStyled>
                </Box>
            </Flex>
        </>
    );
};

export default ConhecerMaisForm;
