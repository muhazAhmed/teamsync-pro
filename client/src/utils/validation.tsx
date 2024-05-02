export const validNameString = (name: string) => {
    if (name.length < 1 && name !== typeof String) return false;
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

export const validPhone = (phone:string) => {
    if (typeof phone !== "undefined" && !/^\d{10}$/.test(phone)) return true;
    return false;
}

export const validPassword = (password: string) => {
    if (password != "undefined" && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) return true;
    return false;
};

export const validLength = (item: any, length: number) => {
    if (item.length < length) return false;
    return true;
}