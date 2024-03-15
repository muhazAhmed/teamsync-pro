export const API_URL = "http://localhost:8800/api/"; // Local Server
// export const API_URL = "http://localhost:8800/api/";    // Demo, Testing

// MESSAGES:
export const message = (name: string) => ({
  SERVER_ERROR: "Server Under Maintenance",
  REQUIRED_FIELD: `Please Enter ${name}`,
  INVALID_EMAIL: "Please Enter Valid Email Address",
  INVALID_PASSWORD: "Password Must Have At-Least 8 Characters With Minimum 1 Number And Alphabet",
  PASSWORD_NOT_MATCHING: "Passwords Not Matching",
  LOGIN_SUCCESS: "You Have Been LoggedIn",
  LOGOUT_SUCCESS: "You Have Been LoggedOut",
  GET_FAIL: "Enable To Fetch Data",
  REGISTER_SUCCESS: `${name} Registration Successful`,
  CREATE_SUCCESS: `${name} Created Successfully`,
  REQUEST_SUBMITTED: "Your Request has been Sent",
});

export const Variables = {
  HR_ROLE: "6872",
  ADMIN_ROLE: "61646D696E",
  EMPLOYEE_ROLE: "656D706C6F796565",
}