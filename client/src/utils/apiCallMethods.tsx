import axios from "axios";
import { API_URL, message } from "./Constants";
import toast from "react-hot-toast";
import { FetchRole, useSessionStorage } from "./commonFunctions";

interface ApiResponse {
  response: any;
  status: number;
  message: string;
  data: any;
}


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
    const res: ApiResponse = await axios.get(API_URL + variable, { params: inputs });
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
    const role = FetchRole(useSessionStorage("client-id"))
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