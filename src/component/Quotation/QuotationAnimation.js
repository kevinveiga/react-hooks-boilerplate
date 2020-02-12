import React, { useCallback, useEffect, useRef, useState } from 'react';

import parse from 'html-react-parser';

import { useWindowWidth } from '../../store/util/windowWidth';

import { Svg } from '../Svg/Svg';

import { QuotationAnimationStyled } from './QuotationStyled';

import { Cell } from '../../style/grid';
import { P, Span } from '../../style/text';

export const QuotationAnimation = ({ socketData }) => {
    // ACTION
    const quotationRef = useRef();
    const [stateAnimationPosition, setStateAnimationPosition] = useState(0);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (quotationRef.current) {
            const containerWidth = quotationRef.current.offsetWidth;
            let totalWidth = 0;

            for (let i = 0, l = quotationRef.current.childElementCount; i < l; i += 1) {
                totalWidth += quotationRef.current.children[i].offsetWidth;
            }

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

    return (
        <QuotationAnimationStyled
            animationPosition={stateAnimationPosition}
            borderY={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }}
            display="grid"
            duration="7s"
            direction="alternate"
            gridColumnGap={{ d: 2, md: 3 }}
            iterationCount="infinite"
            justifyContent="space-between"
            mb={{ d: 3, md: 4 }}
            py={{ d: 2, md: 3 }}
            ref={quotationRef}
            timingFunction="ease-out"
        >
            {socketData['bolsa'] &&
                socketData['bolsa'].map((quotation) => {
                    return (
                        <Cell gridRow={1} key={quotation.Alias} minWidth="150px">
                            <Svg height="14px" name={quotationSvg(quotation.Alias)} pr={1} />

                            <Span fontSize={14} fontWeight={700} verticalAlign="middle">
                                {quotation.Name.toUpperCase()}
                            </Span>

                            <P fontSize={14} mb={0} whiteSpace="nowrap">
                                <Span pr={1}>{quotation.Value}</Span>

                                <Span color={quotation.Direction === 'negativo' ? 'colorAlert' : 'colorPrimary'} fontWeight={700}>
                                    {parse(`${quotation.Spread}`)}
                                </Span>
                            </P>
                        </Cell>
                    );
                })}

            {socketData['cdiSelic'] && (
                <>
                    <Cell gridRow={1} minWidth="150px">
                        <Svg height="14px" name={quotationSvg()} pr={1} />

                        <Span fontSize={14} fontWeight={700} verticalAlign="middle">
                            CDI
                        </Span>

                        <P fontSize={14} mb={0} whiteSpace="nowrap">
                            <Span pr={1}>{parseFloat(socketData['cdiSelic'][0].cdi).toFixed(2)}% a.a</Span>
                        </P>
                    </Cell>

                    <Cell gridRow={1} minWidth="150px">
                        <Svg height="14px" name={quotationSvg()} pr={1} />

                        <Span fontSize={14} fontWeight={700} verticalAlign="middle">
                            SELIC
                        </Span>

                        <P fontSize={14} mb={0} whiteSpace="nowrap">
                            <Span pr={1}>{parseFloat(socketData['cdiSelic'][0].selic).toFixed(2)}% a.a</Span>
                        </P>
                    </Cell>
                </>
            )}

            {socketData['poupanca'] && (
                <Cell gridRow={1} minWidth="150px">
                    <Svg height="14px" name={quotationSvg()} pr={1} />

                    <Span fontSize={14} fontWeight={700} verticalAlign="middle">
                        POUPANÇA
                    </Span>

                    <P fontSize={14} mb={0} whiteSpace="nowrap">
                        <Span pr={1}>{parseFloat(socketData['poupanca'][0].valor).toFixed(2)}% a.m</Span>
                    </P>
                </Cell>
            )}
        </QuotationAnimationStyled>
    );
};
