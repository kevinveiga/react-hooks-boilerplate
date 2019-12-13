import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext(undefined);

export const getLocalStorageUser = () => {
    return JSON.parse(window.localStorage.getItem('user'));
};

export const logout = () => {
    window.localStorage.setItem('user', null);

    // Delete api-cache in logout
    if ('serviceWorker' in navigator) {
        caches.keys().then((cacheNames) => {
            for (let i = 0, l = cacheNames.length; i < l; i += 1) {
                if (cacheNames[i] === 'api-cache' || cacheNames[i] === 'api-cache-perfil') {
                    caches.delete(cacheNames[i]);
                }
            }
        });
    }

    return null;
};

export const UserProvider = ({ children }) => {
    const [stateUser, setStateUser] = useState(getLocalStorageUser());

    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(stateUser));

        return undefined;
    }, [stateUser]);

    const user = useMemo(() => [stateUser, setStateUser], [stateUser, setStateUser]);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser can only be used inside UserProvider');
    }

    return context;
};
