import { Button, Input, Tooltip } from "@nextui-org/react";
import { Moment } from "moment";
import moment from "moment";
import "./style.css";
import { icon } from "../Icons/Icons";
import { useState } from "react";
import { closeModal } from "../../utils/commonFunctions";

interface DateRangePickerProps {
  disabledDates?: (date: Moment) => boolean;
  startDate: Moment | null;
  endDate: Moment | null;
  setStartDate: (date: Moment) => void;
  setEndDate: any;
  onApply: (startDate: Moment | null, endDate: Moment | null) => void;
  setModal?: (value: boolean) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  disabledDates,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onApply,
  setModal,
}) => {
  const [viewStartDate, setViewStartDate] = useState<Moment>(
    moment().startOf("month")
  );
  const [viewEndDate, setViewEndDate] = useState<Moment>(
    moment().startOf("month").add(1, "month")
  );

  const handleDateClick = (date: Moment) => {
    if (disabledDates && disabledDates(date)) return;

    if (!startDate && !endDate) {
      setStartDate(date);
    } else if (startDate && !endDate) {
      if (date.isAfter(startDate)) {
        setEndDate(date);
      } else {
        setStartDate(date);
      }
    } else if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handlePrevMonth = (isStart: boolean) => {
    if (isStart) {
      setViewStartDate(viewStartDate.clone().subtract(1, "month"));
    } else {
      setViewEndDate(viewEndDate.clone().subtract(1, "month"));
    }
  };

  const handleNextMonth = (isStart: boolean) => {
    if (isStart) {
      setViewStartDate(viewStartDate.clone().add(1, "month"));
    } else {
      setViewEndDate(viewEndDate.clone().add(1, "month"));
    }
  };

  const handleApply = () => {
    onApply(startDate, endDate);
    closeModal(setModal);
  };

  const handleClear = () => {
    setStartDate(moment().startOf("day"));
    setEndDate(moment().endOf("day"));
  };

  const renderCalendar = (date: Moment, isStart: boolean) => {
    const startOfMonth = date.clone().startOf("month");
    const endOfMonth = date.clone().endOf("month");
    const startDateCalendar = startOfMonth.clone().startOf("week");
    const endDateCalendar = endOfMonth.clone().endOf("week");
    const calendar = [];
    let day = startDateCalendar.clone();

    while (day.isBefore(endDateCalendar)) {
      calendar.push(day.clone());
      day.add(1, "day");
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <Tooltip content="Previous Month" color="primary" placement="right">
            <Button
              onPress={() => handlePrevMonth(isStart)}
              variant="shadow"
              className="btn-ghost"
            >
              <i className={icon?.arrowLeft} style={{ color: "#fff" }}></i>
            </Button>
          </Tooltip>
          <span>{date.format("MMMM YYYY")}</span>
          <Tooltip content="Next Month" color="primary" placement="left">
            <Button
              onPress={() => handleNextMonth(isStart)}
              variant="shadow"
              className="btn-ghost"
            >
              <i className={icon?.arrowRight} style={{ color: "#fff" }}></i>
            </Button>
          </Tooltip>
        </div>
        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
          {calendar.map((day) => (
            <div
              key={day.format("DD-MM-YYYY")}
              className={`calendar-day ${
                (startDate && day.isSame(startDate, "day")) ||
                (endDate && day.isSame(endDate, "day"))
                  ? "selected"
                  : ""
              } ${disabledDates && disabledDates(day) ? "disabled" : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="date-range-picker fadeIn">
      <Tooltip content="Close" color="danger" placement="left">
        <i
          className={icon.closeRounded}
          style={{
            position: "absolute",
            top: "-3px",
            right: "-15px",
            color: "#fff",
            backgroundColor: "red",
            borderRadius: "50%",
            fontSize: "1.5rem",
            zIndex: "10",
          }}
          onClick={() => closeModal(setModal)}
        ></i>
      </Tooltip>

      <div className="pre-defined">
        <div className="btn-select">
          <Button
            variant={setModal ? "bordered" : "solid"}
            onPress={() => {
              setStartDate(moment().startOf("day")),
                setEndDate(moment().startOf("day"));
            }}
          >
            Today
          </Button>
          <Button
            variant={setModal ? "bordered" : "solid"}
            onPress={() => {
              setStartDate(moment().subtract(1, "days")),
                setEndDate(moment().subtract(1, "days"));
            }}
          >
            Yesterday
          </Button>
          <Button
            variant={setModal ? "bordered" : "solid"}
            onPress={() => {
              const startOfWeek = moment().startOf("week");
              const endOfWeek = moment().endOf("week");
              setStartDate(startOfWeek);
              setEndDate(endOfWeek);
            }}
          >
            This Week
          </Button>
          <Button
            variant={setModal ? "bordered" : "solid"}
            onPress={() => {
              const startOfMonth = moment().startOf("month");
              const endOfMonth = moment().endOf("month");
              setStartDate(startOfMonth);
              setEndDate(endOfMonth);
            }}
          >
            This Month
          </Button>
          <Button
            variant={setModal ? "bordered" : "solid"}
            onPress={() => {
              const tomorrow = moment().add(1, "day");
              setStartDate(tomorrow);
              setEndDate(tomorrow);
            }}
          >
            Tomorrow
          </Button>
        </div>

        <div className="calendar-action-btn">
          <Button
            onPress={handleApply}
            variant="shadow"
            className="btn-primary"
            style={{ color: "#fff" }}
          >
            Apply
          </Button>
          <Button onPress={handleClear} variant="shadow" color="danger">
            Clear
          </Button>
        </div>
      </div>
      <div className="Calendar-wrapper">
        <div className="calendar-body">
          <div className="selected-date">
            <Input
              label="From"
              readOnly
              value={startDate ? startDate.format("DD/MM/YYYY") : ""}
              variant={setModal && "bordered"}
              style={{ color: "#fff" }}
            />
            <Input
              label="To"
              readOnly
              value={endDate ? endDate.format("DD/MM/YYYY") : ""}
              variant={setModal && "bordered"}
              style={{ color: "#fff" }}
            />
          </div>

          {renderCalendar(viewStartDate, true)}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
