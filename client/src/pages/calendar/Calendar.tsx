import { FC, useState } from "react";
import "./style.css";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import moment from "moment";

interface CalendarProps {}

const Calendar: FC<CalendarProps> = ({}) => {
  const [currentDate, setCurrentDate] = useState(moment()); // Current date

  const events = [
    { date: "03-07-2024", title: "New Year's Day", type: "holiday" },
    { date: "12-08-2024", title: "Team Meeting", type: "meeting" },
    { date: "12-08-2024", title: "Team Meeting", type: "meeting" },
  ];

  const renderEvents = (date: string) => {
    return events
      .filter((event) => moment(event.date).isSame(date, "day"))
      .map((event, index) => (
        <div key={index} className={`event ${event.type}`}>
          {event.title}
        </div>
      ));
  };

  const generateCalendarDays = () => {
    const startOfMonth = currentDate.clone().startOf("month");
    const endOfMonth = currentDate.clone().endOf("month");
    const startOfWeek = startOfMonth.clone().startOf("week");
    const endOfWeek = endOfMonth.clone().endOf("week");
    const days = [];

    let day = startOfWeek.clone();
    while (day <= endOfWeek) {
      const date = day.format("DD-MM-YYYY");
      days.push(
        <div key={date} className="calendar-day">
          <span>{day.date()}</span>
          {renderEvents(date)}
        </div>
      );
      day = day.add(1, "day");
    }

    return days;
  };

  const handleMonthChange = (type: string) => {
    if (type === "prev") {
      setCurrentDate(currentDate.clone().subtract(1, "month"));
    } else if (type === "next") {
      setCurrentDate(currentDate.clone().add(1, "month"));
    }
  };

  return (
    <div className="calendar">
      <div className="header">
        <h1>Calendar</h1>
        <div className="header-btn">
          <ButtonIcon icon="download" label="Export" color="secondary" />
          <ButtonIcon
            icon="plus"
            label="Create Agenda"
            className="btn-primary"
          />
        </div>
      </div>
      <div className="calendar-wrapper">
        <div className="calendar-title">
          <h3>{currentDate.format("MMMM - YYYY")}</h3>
          <div className="month-toggle">
            <ButtonIcon
              icon="leftRounded"
              label=""
              action={() => handleMonthChange("prev")}
            />
            <p>{currentDate.format("MMMM")}</p>
            <ButtonIcon
              icon="rightRounded"
              label=""
              action={() => handleMonthChange("next")}
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
        <div className="calendar-body">{generateCalendarDays()}</div>
      </div>
    </div>
  );
};

export default Calendar;
