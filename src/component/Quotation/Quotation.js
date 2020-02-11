import React, { useCallback } from 'react';

import parse from 'html-react-parser';
import socketIOClient from 'socket.io-client';

import { socketUrl } from '../../config';

import { useSocket } from '../../service/socket';

import { Svg } from '../Svg/Svg';

import { Cell, Grid } from '../../style/grid';
import { P, Span } from '../../style/text';

const Quotation = () => {
    // SOCKET
    const socket = socketIOClient(socketUrl, { autoConnect: false, reconnectionAttempts: 50, reconnectionDelay: 2000, timeout: 10000 });

    // API
    const stateSocketData = useSocket(socket, 'quotationData');

    const socketData = JSON.parse(stateSocketData || '{}');

    const socketDataLength = socketData ? Object.keys(socketData).length : 0;

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

    return socketDataLength > 0 ? (
        <Grid
            borderY={{ d: 0, md: '1px solid rgba(216, 221, 225, 0.8)' }}
            display="grid"
            gridColumnGap={{ d: 2, md: 3 }}
            mb={{ d: 3, md: 4 }}
            justifyContent="space-between"
            overflowX="hidden"
            py={{ d: 2, md: 3 }}
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
                            <Span pr={1}>{parseFloat(socketData['cdiSelic'][0].cdi).toFixed(2)}%</Span>
                        </P>
                    </Cell>

                    <Cell gridRow={1} minWidth="150px">
                        <Svg height="14px" name={quotationSvg()} pr={1} />

                        <Span fontSize={14} fontWeight={700} verticalAlign="middle">
                            SELIC
                        </Span>

                        <P fontSize={14} mb={0} whiteSpace="nowrap">
                            <Span pr={1}>{parseFloat(socketData['cdiSelic'][0].selic).toFixed(2)}%</Span>
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
                        <Span pr={1}>{parseFloat(socketData['poupanca'][0].valor).toFixed(2)}%</Span>
                    </P>
                </Cell>
            )}
        </Grid>
    ) : null;
};

export default Quotation;
