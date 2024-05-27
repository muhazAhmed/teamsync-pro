import { useEffect, useState } from "react";
import CustomInput from "../../../UI-Components/Inputs/Input";
import "./attendance.css";
import SVG from "../../../assets/svg/time.svg";
import moment from "moment";
import { usePageName } from "../../../utils/commonFunctions";
import Loader from "../../../UI-Components/Loader/Loader";
import CheckInButton from "./Button";

const Attendance = () => {
  const [noteInput, setNoteInput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    usePageName("Attendance");
  }, []);

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
              <h3>Work Hours: 09:00</h3>
            </div>
          </div>

          <CheckInButton
            setLoading={setLoading}
            noteInput={noteInput}
            setNoteInput={setNoteInput}
          />
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
