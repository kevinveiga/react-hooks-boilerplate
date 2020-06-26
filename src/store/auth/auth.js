import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getStorage, removeStorage, setStorage } from '../../util/storage';

const AuthContext = createContext(undefined);

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
        setStorage('user', JSON.stringify(stateUser));

        return undefined;
    }, [stateUser]);

    const memoUser = useMemo(() => [setStateUser], [setStateUser]);

    return <AuthContext.Provider value={{ setStateAuthContext: memoUser[0] }}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useUser can only be used inside UserProvider');
    }

    return context;
};
