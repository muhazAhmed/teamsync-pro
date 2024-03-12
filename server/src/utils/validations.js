export const REQUIRE_FELID = (name) => {
    if ( name === undefined ) return `${name} is Required`; 
}

export const PASSWORD_INCORRECT = () => {
    return "Email Or Password Incorrect"
}

export const EMAIL_EXISTS = () => {
    return "Email Already Exists"
}

export const RESPONSE_MESSAGE = (name) => ({
    USER_REGISTER: `${name} Registration Success`,
    USER_LOGIN: `${name} Login Success`,
})