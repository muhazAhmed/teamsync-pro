import toast from "react-hot-toast";
import { Variables, message } from "./Constants";

interface Item {
  [key: string]: any;
}

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

export const logout = (navigate: any, modalState:any ) => {
  deleteSessionStorage("userInfo");
  deleteSessionStorage("client-id")
  deleteSessionStorage("userTokenID")
  toast.success(message("").LOGOUT_SUCCESS)
  modalState ? closeModal(modalState) : "";
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

export const openModal = (setModal:any) => { return setModal(true) };
export const closeModal = (setModal:any) => { return setModal(false) };
export const goBack = () => { return history.back() };

export const usePageName = (name:string) => {
  newSessionStorage("pageName", name);
  window.dispatchEvent(new Event("pageNameUpdated"));
}

export const ResponseInstances = (res:any, statusCode: number, setData:any) => {
  if (res instanceof Error) {
    return console.error(res.message);
  } else if (setData != "" && res?.res?.status === statusCode) {
    return setData(res?.res?.data)
  } else {
    return 
  }
}

export const AssignRole = (role:string) => {
  if (role === "HR") return role = Variables.HR_ROLE;
  if (role === "Admin") return role = Variables.ADMIN_ROLE;
  if (role === "Employee") return role = Variables.EMPLOYEE_ROLE;
}

export const FetchRole = (role:any) => {
  if (role === Variables.HR_ROLE) return role = "hr";
  if (role === Variables.ADMIN_ROLE) return role = "admin";
  if (role === Variables.EMPLOYEE_ROLE) return role = "employee";
}

export const filterEmptyObj = (item: Item): Item => {
  return Object.keys(item)
    .filter((key) => item[key] !== "")
    .reduce((obj, key) => {
      obj[key] = item[key];
      return obj;
    }, {} as Item);
};