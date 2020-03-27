export const getVideoId = (url = '') => {
    const youtubeSource = new RegExp('youtube');
    const regex = youtubeSource.test(url) ? /(https:\/\/www.youtube.com\/watch\?).*v=([\w-]{11})/ : /(https:\/\/vimeo.com\/)([\d]{9})/;

    return url.match(regex) && url.match(regex)[2];
};
