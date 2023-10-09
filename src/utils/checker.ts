function getCookie(name: string) {
    if (typeof window !== 'undefined') {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift();
        }
    }
}

const hasAuthorized = () => {
    if (typeof window !== 'undefined') {
        return Boolean(getCookie('access_token'));
    }
    return false;
};

const hasUserInfo = () => {
    if (window) {
        return Boolean(window.localStorage.getItem('email'));
    }
    return false;
};

const isValidDependency = (values: any, fieldNames: string[]) => {
    const checkList: any[] = new Array(fieldNames.length).fill(-1);
    for (const keyName in values) {
        if (values[keyName] || values[keyName] === 0) {
            if (fieldNames.indexOf(keyName) >= 0) {
                checkList[fieldNames.indexOf(keyName)] = 1;
            }
        }
    }

    return checkList.every((value) => value === 1);
};

const checker = { hasAuthorized, hasUserInfo, isValidDependency };

export default checker;
