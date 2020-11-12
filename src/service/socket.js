import { useEffect, useState } from 'react';

export const useSocket = (socket, serverEvent) => {
    const [stateSocketData, setStateSocketData] = useState('{}');

    useEffect(() => {
        socket.open();

        // Event
        socket.on('connect', (connect) => {
            console.info('connect: ', connect);
        });

        socket.on('connect_error', (reason) => {
            console.info('connect_error: ', reason);
        });

        socket.on('connect_timeout', (timeout) => {
            console.info('connect_timeout: ', timeout);
        });

        socket.on('disconnect', (reason) => {
            console.info('disconnect: ', reason);

            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, you need to reconnect manually
                // socket.connect();
            } else {
                // the socket will automatically try to reconnect
                // socket.connect();
            }
        });

        socket.on('ping', () => {
            // console.info('ping');
        });

        socket.on('pong', (latency) => {
            // console.info('pong latency: ', latency);
        });

        socket.on('reconnect', (attemptNumber) => {
            console.info('reconnect: ', attemptNumber);
        });

        socket.on('reconnect_attempt', (attemptNumber) => {
            console.info('reconnect_attempt: ', attemptNumber);

            if (attemptNumber > 3) {
                socket.removeAllListeners(serverEvent);
                socket.disconnect();
            }
        });

        socket.on('reconnect_error', (error) => {
            console.info('reconnect_error: ', error);
        });

        socket.on('reconnect_failed', () => {
            console.info('reconnect_failed');
        });

        socket.on('reconnecting', (attemptNumber) => {
            console.info('reconnecting: ', attemptNumber);
        });

        // Data
        socket.on(serverEvent, (data) => {
            setStateSocketData(data);
        });

        return () => {
            socket.removeAllListeners(serverEvent);
            socket.disconnect();
        };
    }, [serverEvent, socket]);

    return stateSocketData;
};
