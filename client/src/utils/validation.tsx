export const validNameString = (name: string) => {
    if (name.length < 1) return false;
    return true;
};

export const minStringLength = (name: string) => {
    if (name.length < 4) return false;
    return true;
};

export const validEmail = (email: string) => {
    if (typeof email !== "undefined" && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    return false;
};

export const validPassword = (password: string) => {
    if (password != "undefined" && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) return true;
    return false;
};
