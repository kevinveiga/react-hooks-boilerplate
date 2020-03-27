export const getVideoSource = (url = '') => {
    const youtubeSource = new RegExp('youtube');

    return youtubeSource.test(url) ? 'youtube' : 'vimeo';
};
