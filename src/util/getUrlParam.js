export const getUrlParam = (name, url = window.location.search) => {
    const newName = name.replace(/[[\]]/g, '\\$&');

    const regex = new RegExp(`[?&]${newName}=([^&#]*)`, 'i');
    const results = regex.exec(url);

    if (!results) {
        return null;
    }

    if (!results[1]) {
        return '';
    }

    return decodeURIComponent(results[1].replace(/\+/g, ' '));
};
