import toast from "react-hot-toast";
import { postMethodAPI } from "../../utils/apiCallMethods"
import { CheckAccess, fetchUserId } from "../../utils/commonFunctions";
import { serverVariables } from "../../utils/serverVariables"

export const handleSubmit = async (inputs: any, setLoading: any) => {
    if (CheckAccess()?.isDemoAccount) {
        return toast.success("Request Submitted Successfully");
    } else {
        return await postMethodAPI(serverVariables?.NEW_SUPPORT_REQUEST + fetchUserId(), inputs, setLoading)
    }
    
}

export const categoriesArray = [
    { label: "Employee Information", value: "employeeInfo" },
    { label: "Attendance", value: "attendance" },
    { label: "Ticketing", value: "ticketing" },
    { label: "Other", value: "other" },
];