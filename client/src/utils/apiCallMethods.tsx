import axios from "axios";
import { message } from "./Constants";
import toast from "react-hot-toast";
import { fetchUserToken } from "./commonFunctions";
const API_URL = import.meta.env.VITE_API_URL;

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
  return new Error(
    toast.error(error?.response?.data || message("").SERVER_ERROR)
  );
};

export const postMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {
  try {
    loading(true);
    const token = fetchUserToken();
    const headers = token ? { "x-api-key": token } : {};
    const res: ApiResponse = await axios.post(API_URL + variable, inputs, {
      headers,
    });
    if (res.status === 201 || res.status === 200) {
      const successMessage = res?.data?.message || "";
      toast.success(successMessage, {
        duration: 4000,
      });
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
    const token = fetchUserToken();
    const headers = token ? { "x-api-key": token } : {};
    const res: ApiResponse = await axios.get(API_URL + variable, {
      params: inputs,
      headers,
    });
    if (res.status === 200) {
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
};

export const patchMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {
  try {
    loading(true);
    const token = fetchUserToken();
    const headers = token ? { "x-api-key": token } : {};
    const res: ApiResponse = await axios.patch(API_URL + variable, inputs, {
      headers,
    });
    if (res.status === 200) {
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
};

export const deleteMethodAPI = async (
  variable: string,
  inputs: any,
  loading: (isLoading: boolean) => void
): Promise<{ res: ApiResponse; successMessage: string } | Error> => {
  try {
    loading(true);
    const token = fetchUserToken();
    const headers = token ? { "x-api-key": token } : {};
    const res: ApiResponse = await axios.delete(API_URL + variable, {
      params: inputs,
      headers,
    });
    if (res.status === 200) {
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
};
