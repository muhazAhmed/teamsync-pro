import axios from "axios";
import { API_URL, Variables, message } from "./Constants";
import toast from "react-hot-toast";
import { useSessionStorage } from "./commonFunctions";

interface ApiResponse {
  response: any;
  status: number;
  message: string;
  data: any;
}

let role:string | "";
const clientID = useSessionStorage("client-id")
if (clientID == Variables.HR_ROLE) role = "hr";
else if (clientID == Variables.ADMIN_ROLE) role = "admin";
else if (clientID == Variables.EMPLOYEE_ROLE) role = "employee";


const serverError = (error: any) => {
  console.error(error);
  if (error?.response?.status === 404)
    return new Error(toast.error(message("").SERVER_ERROR));
  return new Error(toast.error(error?.response?.data || message("").SERVER_ERROR));
};

export const postMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {
  try {
    loading(true);
    const res: ApiResponse = await axios.post(API_URL + variable, inputs);
    if (res.status === 201 || res.status === 200) {
      const successMessage = res?.data?.message || "";
      toast.success(successMessage);
      return { res, successMessage };
    } else {
      return serverError(res); //might have to change later
    }
  } catch (error: any) {
    return serverError(error);
  } finally {
    loading(false);
  }
};


export const getMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {
  try {
    loading(true);
    const res: ApiResponse = await axios.get(API_URL + `${role}${variable}`, inputs);
    if ( res.status === 200) {
      const successMessage = res?.data?.message || undefined;
      successMessage != undefined && toast.success(successMessage);
      return { res, successMessage };
    } else {
      return serverError(res); //might have to change later
    }
  } catch (error: any) {
    return serverError(error);
  } finally {
    loading(false);
  }
}

export const patchMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void,
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {

  try {
    loading(true);
    const res: ApiResponse = await axios.patch(API_URL + `${role}${variable}`, inputs);
    if ( res.status === 200) {
      const successMessage = res?.data?.message || undefined;
      successMessage != undefined && toast.success(successMessage);
      return { res, successMessage };
    } else {
      return serverError(res); //might have to change later
    }
  } catch (error: any) {
    return serverError(error);
  } finally {
    loading(false);
  }
}