import { removeStorage, setStorage } from './storage';

export const redirectByRouterLocation = (location = {}) => {
    try {
        if (!location || !location.state) {
            removeStorage('redirectUrl', 'sessionStorage');
        } else {
            const url = location.state && location.state.referer && location.state.referer.pathname;

            setStorage('redirectUrl', url, 'sessionStorage');
        }
    } catch (error) {
        console.error(error);
    }
};
