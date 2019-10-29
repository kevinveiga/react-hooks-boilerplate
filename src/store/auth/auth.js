import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [stateAuthToken, setStateAuthToken] = useState(JSON.parse(window.localStorage.getItem('token')));

    useEffect(() => {
        window.localStorage.setItem('token', JSON.stringify(stateAuthToken));
    }, [stateAuthToken]);

    return [stateAuthToken, setStateAuthToken];
};
