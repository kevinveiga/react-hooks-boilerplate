import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useWindowWidth } from '../util/windowWidth';

import { scrollTo } from '../../util/scrollTo';

import { variable } from '../../style/variable';

const HomeContext = createContext(undefined);

export const HomeProvider = ({ children, location }) => {
    const [stateDataLength, setStateDataLength] = useState({ homeDestaqueLength: 0, homeNoticiaLength: 0, homeSuperDestaqueLength: 0 });
    const windowWidth = useWindowWidth();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        let isAllDataLoad = true;

        for (let i = 0, l = Object.keys(stateDataLength).length; i < l; i += 1) {
            const key = Object.keys(stateDataLength)[i];

            if (Object.prototype.hasOwnProperty.call(stateDataLength, key)) {
                if (stateDataLength[key] === 0) {
                    isAllDataLoad = false;

                    break;
                }
            }
        }

        // Scroll para o topo ou para a section de vídeo
        const ancorId = location.pathname === '/inicio/home-video-container' ? '#home-video-container' : null;

        scrollTo(ancorId, isAllDataLoad, windowWidth < parseInt(variable.md, 10) ? 0 : 80);

        console.log('aqui: ', isAllDataLoad);

        return undefined;
    }, [location, stateDataLength]);
    /* eslint-enable react-hooks/exhaustive-deps */

    const dataLength = useMemo(() => [stateDataLength, setStateDataLength], [stateDataLength, setStateDataLength]);

    return <HomeContext.Provider value={dataLength}>{children}</HomeContext.Provider>;
};

export const useHome = () => {
    const context = useContext(HomeContext);

    if (context === undefined) {
        throw new Error('useHome can only be used inside HomeProvider');
    }

    return context;
};
