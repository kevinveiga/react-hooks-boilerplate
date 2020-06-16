import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getStorage, removeStorage } from '../../util/storage';

const UserContext = createContext(undefined);

export const getLocalStorageUser = () => {
    return getStorage('user');
};

export const logout = () => {
    removeStorage('user');
    removeStorage('carrinho', 'sessionStorage');

    // Delete api-cache in logout
    if ('serviceWorker' in navigator) {
        caches.keys().then((cacheNames) => {
            for (let i = 0, l = cacheNames.length; i < l; i += 1) {
                if (cacheNames[i] === 'api-cache-carrinho' || cacheNames[i] === 'api-cache-meus-cursos' || cacheNames[i] === 'api-cache-perfil') {
                    caches.delete(cacheNames[i]);
                }
            }
        });
    }

    return null;
};

export const UserProvider = ({ children }) => {
    const [stateUser, setStateUser] = useState(getStorage('user'));

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(stateUser));

        return undefined;
    }, [stateUser]);

    const memoUser = useMemo(() => [setStateUser], [setStateUser]);

    return <UserContext.Provider value={{ setStateUserContext: memoUser[0] }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser can only be used inside UserProvider');
    }

    return context;
};
