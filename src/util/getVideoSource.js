export const getVideoSource = (url = '') => {
    const regex = new RegExp('youtube');

    return regex.test(url) ? 'youtube' : 'vimeo';
};
