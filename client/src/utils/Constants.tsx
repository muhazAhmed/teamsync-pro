// MESSAGES:
export const message = (name?: string) => ({
  // =========== Root =============
  SERVER_ERROR: "Server Under Maintenance",
  UNAVAILABLE: "Temporarily Unavailable",
  TRY_AGAIN: "Please Try Again After Some Time",
  FILTER_APPLIED: `${name} Filter Applied`,
  SERVER_RESTART: "Please wait until server gets restarted",
  CONNECTED: "Connection Successful",
  DISABLED: `Temporarily Disabled ${name ? name : ""}`,

  // ============ Form ==========
  REQUIRED_FIELD: `Please Enter ${name}`,
  INVALID_EMAIL: "Please Enter Valid Email Address",
  INVALID_PHONE: "Please Enter Valid Phone Number",
  INVALID_PASSWORD:
    "Password Must Have At-Least 8 Characters With Minimum 1 Number And Alphabet",
  PASSWORD_NOT_MATCHING: "Passwords Not Matching",
  LOGIN_SUCCESS: "You Have Been LoggedIn",
  LOGOUT_SUCCESS: "You Have Been LoggedOut",
  CREATE_SUCCESS: `${name} Created Successfully`,
  UNAUTHORIZED_USER: `You'r Not Allowed to Update ${name}`,
  SUBSCRIPTION_SUCCESS: "Newsletter Subscription Has Been Enabled Successfully",

  // =========== API =============
  GET_FAIL: "Enable To Fetch Data",
  REGISTER_SUCCESS: `${name} Registration Successful`,
  REQUEST_SUBMITTED: "Your Request has been Sent",
  USER_ERROR: `Only ${name} can perform this Action`,
  SWIPE_ERROR: `Maximum Daily Swipes Reached`,
  REQUEST_DELETED: "Request Has Been Deleted Successfully",
  UPDATE_SUCCESS: "Updated Successfully",

  // =========== Tab Menu =============
  EMPTY_OPTIONS: "Please Add At-least 2 Menu Options",
});

export const Variables = {
  HR_ROLE: "6872",
  ADMIN_ROLE: "61646D696E",
  EMPLOYEE_ROLE: "656D706C6F796565",
};
