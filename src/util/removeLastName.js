export const removeLastName = (name = '') => {
    const regex = /([^\s]+)/;

    return name.match(regex) && name.match(regex)[0];
};
