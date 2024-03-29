import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { useWindowWidth } from '../util/windowWidth';

import { scrollTo } from '../../util/scrollTo';

const HomeContext = createContext(undefined);

export const HomeProvider = ({ children, location }) => {
    const [stateDataLength, setStateDataLength] = useState({ homeDestaqueLength: 0, homeNoticiaLength: 0, homeSuperDestaqueLength: 0 });
    const windowWidth = useWindowWidth();

    const changeDataLength = useCallback(
        (obj) => {
            setStateDataLength({ ...stateDataLength, ...obj });
        },
        [stateDataLength]
    );

    const allDataLength = useCallback(() => {
        for (let i = 0, l = Object.keys(stateDataLength).length; i < l; i += 1) {
            const key = Object.keys(stateDataLength)[i];

            if (Object.prototype.hasOwnProperty.call(stateDataLength, key)) {
                if (stateDataLength[key] === 0) {
                    return false;
                }
            }
        }

        return true;
    }, [stateDataLength]);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const isAllDataLength = allDataLength();

        if (isAllDataLength) {
            // Scroll para o topo ou para a section de vídeo
            const anchorId = location.pathname === '/inicio/home-video' ? '#home-video' : null;

            scrollTo(anchorId, isAllDataLength);
        }

        return undefined;
    }, [location, stateDataLength]);
    /* eslint-enable react-hooks/exhaustive-deps */

    const memoDataLength = useMemo(() => [changeDataLength], [changeDataLength]);

    return <HomeContext.Provider value={{ changeDataLengthContext: memoDataLength[0] }}>{children}</HomeContext.Provider>;
};

export const useHome = () => {
    const context = useContext(HomeContext);

    if (context === undefined) {
        throw new Error('useHome can only be used inside HomeProvider');
    }

    return context;
};
