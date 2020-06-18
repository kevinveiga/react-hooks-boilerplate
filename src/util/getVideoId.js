export const getVideoId = (url = '') => {
    const regex = new RegExp('youtube');
    const results = regex.test(url) ? /.+v=([\w-]{11})/ : /.+([\d]{9})/;

    return url.match(results) && url.match(results)[1];
};
