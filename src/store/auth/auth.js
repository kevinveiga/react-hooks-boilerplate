import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getStorage, removeStorage, setStorage } from '../../util/storage';

const AuthContext = createContext(undefined);

export const getLocalStorageUser = () => {
    return getStorage('auth');
};

export const logout = () => {
    removeStorage('auth');
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

export const AuthProvider = ({ children }) => {
    const [stateAuth, setStateAuth] = useState(getStorage('auth'));

    useEffect(() => {
        setStorage('auth', JSON.stringify(stateAuth));

        return undefined;
    }, [stateAuth]);

    const memoAuth = useMemo(() => [setStateAuth], [setStateAuth]);

    return <AuthContext.Provider value={{ setStateAuthContext: memoAuth[0] }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth can only be used inside AuthProvider');
    }

    return context;
};
