import moment from "moment";
import { openModal } from "../../utils/commonFunctions";

export const handleChangeView = (mode: string, setViewMode: any) => {
  setViewMode(mode);
};

const renderEvents = (date: string, calendarEvents: any) => {
  const formattedDate = moment(date, "DD-MM-YYYY");
  return calendarEvents
    .filter((event: any) =>
      moment(event.date, "DD-MM-YYYY").isSame(formattedDate, "day")
    )
    .map((event: any, index: number) => (
      <div key={index} className={`event ${event.type}`}>
        {event.title}
      </div>
    ));
};

export const generateCalendarDays = (
  currentDate: any,
  calendarEvents: any,
  setViewModal: any
) => {
  const startOfMonth = currentDate.clone().startOf("month");
  const endOfMonth = currentDate.clone().endOf("month");
  const startOfWeek = startOfMonth.clone().startOf("week");
  const endOfWeek = endOfMonth.clone().endOf("week");

  const days = [];
  let day = startOfWeek.clone();

  while (day.isBefore(startOfMonth, "day")) {
    days.push(
      <div key={day.format("DD-MM-YYYY")} className="calendar-day empty"></div>
    );
    day = day.add(1, "day");
  }

  while (day.isBefore(endOfWeek, "day")) {
    const date = day.format("DD-MM-YYYY");
    days.push(
      <div
        key={date}
        className={`calendar-day ${
          day.isSame(startOfMonth, "month") ? "" : "empty"
        }`}
        onClick={() => handleModalActions(setViewModal)}
      >
        {day.isSame(startOfMonth, "month") ? (
          <>
            <span>{day.date()}</span>
            {renderEvents(date, calendarEvents)}
          </>
        ) : (
          <span className="empty">{day.date()}</span>
        )}
      </div>
    );
    day = day.add(1, "day");
  }

  return days;
};

export const generateListDays = (
  currentDate: any,
  calendarEvents: any,
  setViewModal: any
) => {
  const startOfMonth = currentDate.clone().startOf("month");
  const endOfMonth = currentDate.clone().endOf("month");
  const days = [];
  let day = startOfMonth.clone();

  while (day.isBefore(endOfMonth, "day")) {
    const date = day.format("DD-MM-YYYY");
    days.push(
      <div
        key={date}
        className="list-day"
        onClick={() => handleModalActions(setViewModal)}
      >
        <div className="list-day-header">
          <span>{day.format("ddd, DD-MM-YYYY")}</span>
        </div>
        <div className="list-day-events">
          {renderEvents(date, calendarEvents)}
        </div>
      </div>
    );
    day = day.add(1, "day");
  }

  return days;
};

export const handleMonthChange = (
  type: string,
  setCurrentDate: any,
  currentDate: any
) => {
  if (type === "prev") {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  } else if (type === "next") {
    setCurrentDate(currentDate.clone().add(1, "month"));
  }
};

export const handleModalActions = (modalName: any) => {
  openModal(modalName);
};
