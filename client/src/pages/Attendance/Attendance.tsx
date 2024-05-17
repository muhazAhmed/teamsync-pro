import { useEffect, useState, useCallback, useMemo } from "react";
import CustomInput from "../../UI-Components/Inputs/Input";
import "./attendance.css";
import { Button } from "@nextui-org/react";
import SVG from "../../assets/svg/time.svg";
import moment from "moment";
import {
  getMethodAPI,
  patchMethodAPI,
  postMethodAPI,
} from "../../utils/apiCallMethods";
import { serverVariables } from "../../utils/serverVariables";
import {
  CheckAccess,
  ResponseInstances,
  fetchUserId,
  usePageName,
} from "../../utils/commonFunctions";
import Loader from "../../UI-Components/Loader/Loader";
import toast from "react-hot-toast";
import { message } from "../../utils/Constants";
import {
  MaxSwipeError,
  determineButtonLabel,
  validateLogin,
} from "./validation";

const Attendance = () => {
  const [noteInput, setNoteInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    usePageName("Attendance");
    fetchOneData();
  }, []);

  const fetchOneData = useCallback(async () => {
    const res = await getMethodAPI(
      `${serverVariables?.FETCH_ONE_ATTENDANCE}${fetchUserId()}`,
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setData(responseData);
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (CheckAccess?.isDemoAccount)
      return toast.success(message("").LOGIN_SUCCESS);

    if (MaxSwipeError(data)) return;

    const firstSwipe = moment().format("HH:mm");

    if (data?.userId === undefined) {
      const newObj = {
        note: noteInput,
        firstSwipe: firstSwipe,
      };
      await postMethodAPI(
        `${serverVariables?.NEW_ATTENDANCE}${fetchUserId()}`,
        newObj,
        setLoading
      );
      await fetchOneData();
    } else {
      const newSwipes = validateLogin(data);
      const updatedObj = {
        note: noteInput,
        firstSwipe: newSwipes.firstSwipe,
        secondSwipe: newSwipes.secondSwipe,
        thirdSwipe: newSwipes.thirdSwipe,
        fourthSwipe: newSwipes.fourthSwipe,
      };
      await patchMethodAPI(
        `${serverVariables?.UPDATE_ATTENDANCE}${data?._id}`,
        updatedObj,
        setLoading
      );
      await fetchOneData();
    }
  }, [data, noteInput, fetchOneData]);

  const buttonLabel = useMemo(() => determineButtonLabel(data), [data]);

  return (
    <div className="attendance fadeIn">
      {loading && <Loader />}
      <img src={SVG} alt="Attendance" />
      <div className="modal">
        <div
          className="flex flex-col inputField"
          style={{
            height: "100%",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <div className="note">
            <h2>{moment().format("ddd DD-MM-YYYY")}</h2>

            <div
            className="widthFull"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.3rem",
                marginTop: "0.5rem",
              }}
            >
              <label>Note:</label>
              <CustomInput
                variant="ghost"
                placeholder="Enter your note here..."
                name="note"
                value={noteInput}
                setInputs={setNoteInput}
              />
            </div>
          </div>

          <Button className="btn-primary" onClick={handleSubmit}>
            {buttonLabel}
          </Button>
        </div>
        <div
        className="hours"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            height: "50%",
          }}
        >
          <h1>
            {moment().format("HH")}
            <span>HOURS&nbsp;&nbsp;&nbsp;</span>
          </h1>
          <h1>
            {moment().format("mm")}
            <span>MINUTES</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
