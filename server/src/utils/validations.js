export const REQUIRE_FIELD = (name) => {
    if ( name === undefined ) return `${name} is Required`; 
}

export const PASSWORD_INCORRECT = () => {
    return "Email Or Password Incorrect"
}

export const EMAIL_EXISTS = () => {
    return "Email Already Exists"
}

export const SUBSCRIPTION_ERROR = "You Have Already Subscribed To New Letter"

export const RESPONSE_MESSAGE = (name) => ({
    USER_REGISTER: `${name} Registration Success`,
    USER_LOGIN: `${name} Login Success`,
    USER_UPDATE_REQ: "Update Request has Been Submitted to HR",
    USER_UPDATE: "Updated Successfully",
    NO_USER_FOUND: "No User Found",
    NO_REQUEST_FOUND: "0 Update Requests",
    NEW_REQUESTS: `${name} Requests Found`,
    ATTENDANCE_ADDED: "Attendance Added Successfully",
    ATTENDANCE_NOT_FOUND: "No Attendance Found With This UserID",
    MAX_SWIPE: "Maximum daily swipes reached",
    SERVER_ERROR: "Server Error",
    SUBSCRIPTION_SUCCESS: "Newsletter Subscription Has Been Enabled Successfully",
    REQUEST_ADDED: "Request Added Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
})