import moment from "moment";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";

const time = moment().format("HH:mm");

export const validateLogin = (data: any) => {
    const newSwipes = {
        firstSwipe: data.firstSwipe || time,
        secondSwipe: data.secondSwipe || (data.firstSwipe && !data.secondSwipe ? time : data.secondSwipe),
        thirdSwipe: data.thirdSwipe || (data.secondSwipe && !data.thirdSwipe ? time : data.thirdSwipe),
        fourthSwipe: data.fourthSwipe || (data.thirdSwipe && !data.fourthSwipe ? time : data.fourthSwipe),
    };
    return newSwipes;
};

export const determineButtonLabel = (data: any) => {
    if (!data.firstSwipe) return "Check In";
    if (data.firstSwipe && !data.secondSwipe) return "Check Out";
    if (data.firstSwipe && data.secondSwipe && !data.thirdSwipe) return "Check In";
    if (data.firstSwipe && data.secondSwipe && data.thirdSwipe && !data.fourthSwipe) return "Check Out";
    return "Check In";
};

export const MaxSwipeError = (data: any) => {
    const maxSwipes = 4;
    const swipeCount = [
        data.firstSwipe,
        data.secondSwipe,
        data.thirdSwipe,
        data.fourthSwipe,
    ].filter(Boolean).length;

    if (swipeCount >= maxSwipes) {
        toast.error(message("").SWIPE_ERROR);
        return true;
    }
    return false;
};
