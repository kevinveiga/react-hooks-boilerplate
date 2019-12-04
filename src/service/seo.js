import axios from 'axios';
import { useEffect, useState } from 'react';

export const useSeoApi = (url) => {
    const [stateSeoUrl] = useState(url);

    const [stateSeo, setStateSeo] = useState(JSON.parse('{ "data": [] }'));

    console.log('useSeoApi');

    useEffect(() => {
        if (!stateSeoUrl) {
            return undefined;
        }

        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(stateSeoUrl);

                if (!didCancel) {
                    setStateSeo(result);
                }
            } catch (error) {
                if (!didCancel) {
                    console.error('Erro ao buscar dados de SEO');
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [stateSeoUrl]);

    return stateSeo;
};
