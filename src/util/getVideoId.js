export const getVideoId = (url = '') => {
    const regex = /(https:\/\/www.youtube.com\/watch\?v=)([\w-]{11})/;

    return url.match(regex) && url.match(regex)[2];
};
