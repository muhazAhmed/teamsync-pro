import toast from "react-hot-toast";
import { Variables, message } from "./Constants";
import moment, { Moment } from "moment";
import { icon } from "../UI-Components/Icons/Icons";

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

export const logout = (navigate: any, modalState?: any) => {
  deleteSessionStorage("userInfo");
  deleteSessionStorage("client-id");
  deleteSessionStorage("userTokenID");
  deleteSessionStorage("isDemoAccount");
  deleteSessionStorage("pageName");
  deleteSessionStorage("auth");
  toast.success(message("").LOGOUT_SUCCESS);
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

export const openModal = (setModal: any) => {
  return setModal(true);
};
export const closeModal = (setModal: any) => {
  return setModal(false);
};
export const goBack = () => {
  return history.back();
};

export const usePageName = (name: string) => {
  newSessionStorage("pageName", name);
  window.dispatchEvent(new Event("pageNameUpdated"));
};

export const ResponseInstances = (
  res: any,
  statusCode: number,
  setData: any
) => {
  if (res instanceof Error) {
    return console.error(res.message);
  } else if (setData != "" && res?.res?.status === statusCode) {
    return setData(res?.res?.data);
  } else {
    return;
  }
};

export const PaginationResponseInstances = (
  res: any,
  statusCode: number,
  setData: any
) => {
  if (res instanceof Error) {
    return console.error(res.message);
  } else if (setData != "" && res?.res?.status === statusCode) {
    return setData(res?.res?.data);
  } else {
    return;
  }
};

export const AssignRole = (role: string) => {
  if (role === "HR") return (role = Variables.HR_ROLE);
  if (role === "Admin") return (role = Variables.ADMIN_ROLE);
  if (role === "Employee") return (role = Variables.EMPLOYEE_ROLE);
};

export const FetchRole = (role?: any) => {
  if (!role) role = useSessionStorage("client-id");
  if (role === Variables.HR_ROLE) return (role = "hr");
  if (role === Variables.ADMIN_ROLE) return (role = "admin");
  if (role === Variables.EMPLOYEE_ROLE) return (role = "employee");
};

export const filterEmptyObj = (item: Item): Item => {
  return Object.keys(item)
    .filter((key) => item[key] !== "")
    .reduce((obj, key) => {
      obj[key] = item[key];
      return obj;
    }, {} as Item);
};

export const CheckAccess = () => ({
  isHr: useSessionStorage("client-id") === Variables.HR_ROLE,
  isLoggedIn: useSessionStorage("userInfo"),
  isDemoAccount: useSessionStorage("isDemoAccount") === true,
});

export const fetchUserId = () => useSessionStorage("userInfo")?._id;

export const fetchUserToken = () => useSessionStorage("userTokenID");

export const formatDate = (date: any) => {
  return date ? date.format("DD-MM-YYYY") : null;
};

export const disableSundays = (date?: Moment) => {
  return date?.day() === 0;
};

export const disableFutureDays = (date: any) => {
  return date?.isAfter(moment(), "day");
};

export const disablePastDays = (date?: any) => {
  return date?.isBefore(moment().startOf("day"), "day");
};

export const directWithNewTab = (url: string) => {
  return window.open(url, "_blank");
};

export const FetchUserIdAndRole = () => {
  return `${fetchUserId()}/${FetchRole()}`;
};

export const unavailableClick = () => {
  return toast.error(message()?.UNAVAILABLE);
};

export const disabledClick = (name?: string) => {
  return toast.error(message(name ? name : "")?.DISABLED);
};

export const useToast = (
  name: string,
  type: "success" | "error",
  duration?: number
) => {
  toast[type](name, {
    duration: duration ? duration : 3000,
  });
};

export const textEllipse = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const checkBGColors = (value: string, name?: string) => {
  if (name) {
    if (name === "status") {
      if (value === "inProgress") return "yellow";
      if (value === "completed") return "#00ba00";
      if (value === "rejected") return "#FF033E";
      if (value === "overdue") return "orange";
      if (value === "todo" || value === "Pending") return "gray";
    } else if (name === "priority") {
      if (value === "high") return "#FF033E";
      if (value === "medium") return "yellow";
      if (value === "low") return "#00ba00";
    }
  }
};

export const CheckPriorityColor = (value: string) => {
  const validateColor = () => {
    if (value === "high") {
      return { icon: "threeBars", color: "white", bgColor: "red" };
    }
    if (value === "medium") {
      return { icon: "twoBars", color: "black", bgColor: "yellow" };
    }
    if (value === "low") {
      return { icon: "bar", color: "white", bgColor: "#00ba00" };
    }
    return {};
  };
  const colorData = validateColor();

  return (
    <h6 className="flex items-center gap-2 rounded-medium px-3 text-[13px] capitalize" 
      style={{ color: colorData.color, backgroundColor: colorData.bgColor }}>
        {colorData.icon && <i className={icon?.[colorData.icon] || ""}></i>}
        {value}
    </h6>
  );
};