import React, { FC, useEffect, useState } from "react";
import "./style.css";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import moment from "moment";
import { FetchRole, usePageName } from "../../utils/commonFunctions";
import ButtonGroup from "../../UI-Components/Buttons/ButtonGroup";
import { calendarEvents } from "../form/Demo";
import {
  downloadCalendar,
  generateCalendarDays,
  generateListDays,
  handleChangeView,
  handleModalActions,
  handleMonthChange,
} from "./index";
const NewAgenda = React.lazy(() => import("./SubComponents/NewAgenda"));
const ViewModal = React.lazy(() => import("./SubComponents/ViewModal"));
import useDownloadFile from "../../utils/custom-hooks/useDownloadFile";

interface CalendarProps {}

const Calendar: FC<CalendarProps> = ({}) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [viewMode, setViewMode] = useState<string>("grid");
  const [agendaModal, setAgendaModal] = useState<boolean>(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const downloadFile = useDownloadFile();

  useEffect(() => {
    usePageName("Calendar");
  }, []);

  return (
    <div className="calendar">
      {agendaModal && <NewAgenda setModal={setAgendaModal} />}
      {viewModal && <ViewModal />}
      <div className="header">
        <ButtonGroup
          items={[
            {
              label: "",
              icon: "grid",
              selected: viewMode === "grid",
              action: () => handleChangeView("grid", setViewMode),
              tooltip: {
                content: "Grid View",
                color: "primary",
              },
            },
            {
              label: "",
              icon: "list",
              selected: viewMode === "list",
              action: () => handleChangeView("list", setViewMode),
              tooltip: {
                content: "List View",
                color: "primary",
              },
            },
          ]}
        />
        <div className="header-btn">
          <ButtonIcon
            icon="download"
            label="Export"
            color="secondary"
            action={() =>
              downloadCalendar(downloadFile, calendarEvents, currentDate)
            }
          />
          <ButtonIcon
            icon="plus"
            label="Create Agenda"
            className="btn-primary"
            action={() => handleModalActions(setAgendaModal)}
          />
          {FetchRole() === "hr" && (
            <ButtonIcon
              icon="vacation"
              label="Add Holiday"
              className="btn-ghost"
            />
          )}
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="calendar-wrapper">
          <div className="calendar-title">
            <h3>{currentDate.format("MMMM - YYYY")}</h3>
            <div className="month-toggle">
              <ButtonIcon
                icon="leftRounded"
                label=""
                action={() =>
                  handleMonthChange("prev", setCurrentDate, currentDate)
                }
              />
              <p>{currentDate.format("MMMM")}</p>
              <ButtonIcon
                icon="rightRounded"
                label=""
                action={() =>
                  handleMonthChange("next", setCurrentDate, currentDate)
                }
              />
            </div>
          </div>
          <div className="week-names">
            <h5>Su</h5>
            <h5>Mo</h5>
            <h5>Tu</h5>
            <h5>We</h5>
            <h5>Th</h5>
            <h5>Fr</h5>
            <h5>Sa</h5>
          </div>
          <div className="calendar-body">
            {generateCalendarDays(currentDate, calendarEvents, setViewModal)}
          </div>
        </div>
      ) : (
        <div className="list-view">
          {generateListDays(currentDate, calendarEvents, setViewModal)}
        </div>
      )}
    </div>
  );
};

export default Calendar;
