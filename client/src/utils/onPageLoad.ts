import axios from "axios";
import { API_URL, message } from "./Constants";
import { serverVariables } from "./serverVariables";
import toast from "react-hot-toast";
import { newSessionStorage, useSessionStorage } from "./commonFunctions";

export const loadServer = async () => {
    try {
        if (!useSessionStorage("1acv")) {
            const apiCall = axios.get(API_URL + serverVariables?.RELOAD_SERVER);
            const timer = new Promise((resolve) => {
                setTimeout(() => {
                    resolve("timeout");
                }, 7000);
            });

            const response = await Promise.race([apiCall, timer]);
            if (response === "timeout") {
                return toast.error(message("")?.SERVER_RESTART);
            } else {
                newSessionStorage("1acv", true) // to avoid calling same api if already called
                return toast.success(message("")?.CONNECTED);
            }
        } else {
            return
        }
    }
    catch (error) {
        console.error("Server Is Not Connected");
        toast.error(message()?.SERVER_ERROR);
    }
}