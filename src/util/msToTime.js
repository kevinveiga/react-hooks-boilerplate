export const msToTime = (ms = 0) => {
    let seconds = parseInt((ms / 1000) % 60, 10);
    let minutes = parseInt((ms / (1000 * 60)) % 60, 10);
    let hours = parseInt((ms / (1000 * 60 * 60)) % 24, 10);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};
