import { useEffect, useState } from 'react';

import { variable } from '../../style/variable';

export const useModalMessage = () => {
    const [stateModalMessage, setStateModalMessage] = useState(false);

    useEffect(() => {
        if (stateModalMessage) {
            setTimeout(() => {
                setStateModalMessage(false);
            }, variable.timeout3s);
        }

        return undefined;
    }, [stateModalMessage]);

    return [stateModalMessage, setStateModalMessage];
};
