export const getImageLg = (objectDestaques) => {
    let url = null;

    for (let i = 0, l = Object.keys(objectDestaques).length; i < l; i += 1) {
        url = objectDestaques[Object.keys(objectDestaques)[i]];
        break;
    }

    return url;
};

export const getImageMd = (objectDestaques) => {
    let url = null;

    for (let i = Math.round(Object.keys(objectDestaques).length / 2); i > -1; i -= 1) {
        url = objectDestaques[Object.keys(objectDestaques)[i]];
        break;
    }

    return url;
};

export const getImageSm = (objectDestaques) => {
    let url = null;

    for (let i = Object.keys(objectDestaques).length - 1; i > -1; i -= 1) {
        url = objectDestaques[Object.keys(objectDestaques)[i]];
        break;
    }

    return url;
};
