import React from 'react';

import socketIOClient from 'socket.io-client';

import { socketUrl } from '../../config';

import { useSocket } from '../../service/socket';

import { QuotationAnimation } from './QuotationAnimation';

import { Box } from '../../style/flex';

const Quotation = ({ ...props }) => {
    // SOCKET
    const socket = socketIOClient(socketUrl, { autoConnect: false, reconnectionAttempts: 10, reconnectionDelay: 2000, timeout: 15000 });

    // API
    const stateSocketData = useSocket(socket, 'quotationData');

    const socketData = JSON.parse(stateSocketData || '{}');

    const socketDataLength = socketData ? Object.keys(socketData).length : 0;

    return socketDataLength > 0 ? (
        <Box overflowX="hidden">
            <QuotationAnimation socketData={socketData} {...props} />
        </Box>
    ) : null;
};

export default Quotation;
