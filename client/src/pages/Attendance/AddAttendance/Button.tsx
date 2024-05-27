import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckAccess,
  ResponseInstances,
  fetchUserId,
} from "../../../utils/commonFunctions";
import { Button } from "@nextui-org/react";
import {
  getMethodAPI,
  patchMethodAPI,
  postMethodAPI,
} from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";
import moment from "moment";
import {
  MaxSwipeError,
  determineButtonLabel,
  validateLogin,
} from "./validation";

interface ButtonProp {
  setLoading: (value: boolean) => void;
  noteInput?: string;
  setNoteInput?: any;
}

const CheckInButton: FC<ButtonProp> = ({
  setLoading,
  noteInput,
  setNoteInput = "",
}) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (!CheckAccess.isDemoAccount) {
      fetchOneData();
    } else {
      setData("");
    }
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
    setNoteInput("");
  }, [data, noteInput, fetchOneData]);

  const buttonLabel = useMemo(() => determineButtonLabel(data), [data]);
  return (
    <>
      <Button className="btn-primary" onClick={handleSubmit}>
        {buttonLabel}
      </Button>
    </>
  );
};

export default CheckInButton;
