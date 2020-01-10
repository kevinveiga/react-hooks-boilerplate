import { useEffect, useState } from 'react';

import axios from 'axios';

export const useFooterApi = (obj) => {
    const [stateFooterData, setStateFooterData] = useState(obj);

    const [stateFooter, setStateFooter] = useState(JSON.parse('{ "data": [] }'));

    useEffect(() => {
        if (!stateFooterData.isIntersecting || !stateFooterData.url) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateFooterData.url);

                if (!didCancel) {
                    setStateFooter(result);
                }
            } catch (error) {
                if (!didCancel) {
                    console.error('Erro ao buscar dados do Footer');
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [stateFooterData]);

    return [stateFooter, setStateFooterData];
};
