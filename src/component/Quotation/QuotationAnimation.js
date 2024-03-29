import React, { useCallback, useEffect, useRef, useState } from 'react';

import parse from 'html-react-parser';

import { useWindowWidth } from '../../store/util/windowWidth';

import { Svg } from '../Svg/Svg';

import { QuotationAnimationStyled } from './QuotationStyled';

import { Cell } from '../../style/grid';
import { P, Span } from '../../style/text';

export const QuotationAnimation = ({ socketData, ...props }) => {
    // PROPS
    const { color } = props;

    // ACTION
    const quotationRef = useRef();
    const [stateAnimationPosition, setStateAnimationPosition] = useState(0);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (quotationRef.current) {
            const containerWidth = quotationRef.current.offsetWidth;
            const { childElementCount } = quotationRef.current;
            let totalWidth = 0;

            for (let i = 0; i < childElementCount; i += 1) {
                totalWidth += quotationRef.current.children[i].offsetWidth;
            }

            // Faz o cálculo do tamanho de todas as células + espaço entre as células x a quantidade de células exceto a última,
            // tudo isso para fazer o scroll horizontal corretamente
            totalWidth += 16 * (childElementCount - 1);

            setStateAnimationPosition(containerWidth < totalWidth ? containerWidth - totalWidth : 0);
        }

        return undefined;
    }, [socketData, windowWidth]);

    // FUNCTION
    const quotationSvg = useCallback((value) => {
        switch (value) {
            case 'bitcoin':
                return 'svg-bitcoin';
            case 'dolar':
                return 'svg-flag-usa';
            default:
                return 'svg-flag-brazil';
        }
    }, []);

    // DATA
    const { bolsa, cdi, poupanca, selic } = socketData;

    return (
        <QuotationAnimationStyled
            animationPosition={stateAnimationPosition}
            display="grid"
            duration="7s"
            direction="alternate"
            gridColumnGap={{ d: 3, lg: 5 }}
            iterationCount="infinite"
            justifyContent="space-between"
            ref={quotationRef}
            timingFunction="ease-out"
        >
            {bolsa &&
                bolsa.map((quotation) => {
                    return (
                        <Cell gridRow={1} key={quotation.Alias} whiteSpace="nowrap">
                            <Svg height="14px" name={quotationSvg(quotation.Alias)} pr={1} />

                            <Span color={color} fontSize="14px" fontWeight={700} verticalAlign="middle">
                                {quotation.Name.toUpperCase()}
                            </Span>

                            <P fontSize="14px">
                                <Span color={color} pr={1}>
                                    {quotation.Value}
                                </Span>

                                <Span color={quotation.Direction === 'negativo' ? 'colorAlert' : 'colorPrimary'} fontWeight={700}>
                                    {parse(`${quotation.Spread}`)}
                                </Span>
                            </P>
                        </Cell>
                    );
                })}

            {cdi && (
                <Cell gridRow={1} whiteSpace="nowrap">
                    <Svg height="14px" name={quotationSvg()} pr={1} />

                    <Span color={color} fontSize="14px" fontWeight={700} verticalAlign="middle">
                        CDI
                    </Span>

                    <P fontSize="14px">
                        <Span color={color} pr={1}>
                            {cdi.value}% a.a
                        </Span>

                        <Span color={cdi.operator === '-' ? 'colorAlert' : 'colorPrimary'} fontWeight={700}>
                            {cdi.variation}%
                        </Span>
                    </P>
                </Cell>
            )}

            {selic && (
                <Cell gridRow={1} whiteSpace="nowrap">
                    <Svg height="14px" name={quotationSvg()} pr={1} />

                    <Span color={color} fontSize="14px" fontWeight={700} verticalAlign="middle">
                        SELIC
                    </Span>

                    <P fontSize="14px">
                        <Span color={color} pr={1}>
                            {selic.value}% a.a
                        </Span>

                        <Span color={selic.operator === '-' ? 'colorAlert' : 'colorPrimary'} fontWeight={700}>
                            {selic.variation}%
                        </Span>
                    </P>
                </Cell>
            )}

            {poupanca && (
                <Cell gridRow={1} whiteSpace="nowrap">
                    <Svg height="14px" name={quotationSvg()} pr={1} />

                    <Span color={color} fontSize="14px" fontWeight={700} verticalAlign="middle">
                        POUPANÇA
                    </Span>

                    <P fontSize="14px">
                        <Span color={color} pr={1}>
                            {poupanca.value}% a.a
                        </Span>

                        <Span color={poupanca.operator === '-' ? 'colorAlert' : 'colorPrimary'} fontWeight={700}>
                            {poupanca.variation}%
                        </Span>
                    </P>
                </Cell>
            )}
        </QuotationAnimationStyled>
    );
};
