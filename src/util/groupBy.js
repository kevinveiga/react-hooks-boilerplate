export const groupByMod = (array, num) => {
    let mod = 0;

    return array.reduce((accumulator, currentValue, index) => {
        const newObject = accumulator;

        if (index % num === 0) {
            mod += 1;
        }

        newObject[mod - 1] = newObject[mod - 1] ? [...newObject[mod - 1], currentValue] : [currentValue];

        return newObject;
    }, {});
};

export const groupByObjectKey = (array, key) => {
    return array.reduce((accumulator, currentValue) => {
        const newObject = accumulator;
        const value = currentValue[key];

        newObject[value] = newObject[value] ? [...newObject[value], currentValue] : [currentValue];

        return newObject;
    }, {});
};
