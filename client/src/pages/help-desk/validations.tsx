import { postMethodAPI } from "../../utils/apiCallMethods"
import { fetchUserId } from "../../utils/commonFunctions";
import { serverVariables } from "../../utils/serverVariables"

export const handleSubmit = async (inputs: any, setLoading: any) => {
    return await postMethodAPI(serverVariables?.NEW_SUPPORT_REQUEST + fetchUserId, inputs, setLoading)
}

export const categoriesArray = [
    { label: "Employee Information", value: "employeeInfo" },
    { label: "Attendance", value: "attendance" },
    { label: "Ticketing", value: "ticketing" },
    { label: "Other", value: "other" },
];