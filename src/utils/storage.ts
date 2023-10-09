export const setLocalStorage = (key: string, data: any, expiredAt: number) => {
    try {
        if (localStorage) {
            localStorage.setItem(key, JSON.stringify({ data, expiredAt }));
        }
    } catch (err) {
        console.error(err);
    }
};

export const getLocalStorage = (key: string) => {
    try {
        if (localStorage) {
            const result: { data: any; expiredAt: number } = JSON.parse(localStorage.getItem(key) || '');
            if (result.expiredAt < new Date().valueOf()) {
                return null;
            }

            return result.data;
        }
    } catch (err) {
        // console.error(err);
        return null;
    }
};

const storage = { get: getLocalStorage, set: setLocalStorage };

export default storage;
