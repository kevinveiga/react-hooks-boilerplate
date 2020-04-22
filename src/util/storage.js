export const clearStorage = (storageType = 'localStorage') => {
    try {
        window[storageType].clear();
    } catch (error) {
        console.error(error);
    }
};

export const getStorage = (storageName, storageType = 'localStorage') => {
    try {
        const storage = window[storageType].getItem(storageName);

        if (storage === null) {
            return undefined;
        }

        return JSON.parse(storage);
    } catch (error) {
        return undefined;
    }
};

export const removeStorage = (storageName, storageType = 'localStorage') => {
    try {
        window[storageType].removeItem(storageName);
    } catch (error) {
        console.error(error);
    }
};

export const setStorage = (storageName, storageValue, storageType = 'localStorage') => {
    try {
        const storage = JSON.stringify(storageValue);

        window[storageType].setItem(storageName, storage);
    } catch (error) {
        console.error(error);
    }
};
