import React, { useCallback } from 'react';

import parse from 'html-react-parser';
import socketIOClient from 'socket.io-client';

import { socketUrl } from '../../config';

import { useSocket } from '../../service/socket';

import { Svg } from '../Svg/Svg';

import { Box, Flex } from '../../style/flex';
import { P, Span } from '../../style/text';

const Quotation = () => {
    // SOCKET
    const socket = socketIOClient(socketUrl, { autoConnect: false, reconnectionAttempts: 50, reconnectionDelay: 2000, timeout: 10000 });

    // API
    const stateSocketData = useSocket(socket, 'quotationData');

    const socketDataArray = JSON.parse(stateSocketData || '[]');

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

    return socketDataArray.length > 0 ? (
        <Flex display="flex" flexWrap="nowrap" justifyContent="space-between" overflowX="hidden">
            {socketDataArray.map((quotation) => {
                return (
                    <Box key={quotation.Alias} minWidth="150px" p={3} width="100%">
                        <Svg height="14px" name={quotationSvg(quotation.Alias)} pr={1} />

                        <Span fontSize={14} fontWeight={700} verticalAlign="middle">
                            {quotation.Name.toUpperCase()}
                        </Span>

                        <P fontSize={14} whiteSpace="nowrap">
                            <Span pr={1}>{quotation.Value}</Span>

                            <Span color={quotation.Direction === 'negativo' ? 'colorAlert' : 'colorPrimary'} fontWeight={700}>
                                {parse(`${quotation.Spread}`)}
                            </Span>
                        </P>
                    </Box>
                );
            })}
        </Flex>
    ) : null;
};

export default Quotation;
