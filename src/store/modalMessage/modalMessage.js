import { useEffect, useState } from 'react';

import { sleep } from '../../util/sleep';

import { variable } from '../../style/variable';

export const useModalMessage = () => {
    const [stateModalMessage, setStateModalMessage] = useState(null);

    useEffect(() => {
        if (stateModalMessage) {
            const delay = async () => {
                await sleep(parseInt(variable.timeout3s, 10));

                setStateModalMessage(null);
            };

            delay();
        }

        return undefined;
    }, [stateModalMessage]);

    return [stateModalMessage, setStateModalMessage];
};
