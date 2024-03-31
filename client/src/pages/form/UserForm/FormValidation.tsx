import toast from "react-hot-toast";
import {
  validEmail,
  validNameString,
  validPassword,
  validPhone,
} from "../../../utils/validation";
import { message } from "../../../utils/Constants";

export const validations = (inputs: any, setValidated: any) => {
  if (!validNameString(inputs.firstName)) {
    setValidated(false);
    return toast.error(message("First Name").REQUIRED_FIELD);
  }
  if (!validNameString(inputs.email)) {
    setValidated(false);
    return toast.error(message("Email").REQUIRED_FIELD);
  }
  if (!validNameString(inputs.phone)) {
    setValidated(false);
    return toast.error(message("Phone Number").REQUIRED_FIELD);
  }
  if (validEmail(inputs.email)) {
    setValidated(false);
    return toast.error(message("").INVALID_EMAIL);
  }
  if (validPhone(inputs.phone)) {
    setValidated(false);
    return toast.error(message("").INVALID_PHONE);
  }
  if (!validNameString(inputs.role)) {
    setValidated(false);
    return toast.error("Please Choose From Register As");
  }
  if (!validNameString(inputs.password)) {
    setValidated(false);
    return toast.error(message("Password").REQUIRED_FIELD);
  }
  if (!validNameString(inputs.confirmPassword)) {
    setValidated(false);
    return toast.error(message("Confirm Password").REQUIRED_FIELD);
  }
  if (validPassword(inputs.password)) {
    setValidated(false);
    return toast.error(message("").INVALID_PASSWORD);
  }
  if (inputs?.password != inputs.confirmPassword) {
    setValidated(false);
    return toast.error(message("").PASSWORD_NOT_MATCHING);
  }
  setValidated(true);
  return null;
};

export const loginValidation = (inputs: any, setValidated: any) => {
  if (!validNameString(inputs.role)) {
    setValidated(false);
    return toast.error("Please Choose From Login As");
  }
  if (!validNameString(inputs.companyEmail)) {
    setValidated(false);
    return toast.error(message("Company Email").REQUIRED_FIELD);
  }
  if (!validNameString(inputs.password)) {
    setValidated(false);
    return toast.error(message("Password").REQUIRED_FIELD);
  }
  setValidated(true);
  return null;
}