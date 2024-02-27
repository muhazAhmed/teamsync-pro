import toast from "react-hot-toast";
import { message } from "./Constants";

// Session Storage
export const newSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const deleteSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export const useSessionStorage = (key: string) => {
  const items = sessionStorage.getItem(key);
  return items ? JSON.parse(items) : null;
};

// Local Storage
export const newLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const useLocalStorage = (key: string) => {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : null;
};

export const logout = (navigate: any) => {
  deleteLocalStorage("userInfo");
  deleteSessionStorage("userTokenID")
  toast.success(message("").LOGOUT_SUCCESS)
  return navigate("/user/form");
};

export const clearInputs = (setInputs: any) => {
  setInputs((prevInputs: any) => {
    const inputs: { [key: string]: any } = {};
    for (const key in prevInputs) {
      inputs[key] = "";
    }
    return inputs;
  });
};