import React, { FC, useState } from "react";
import "./style.css";
import { TimePickerProps } from "./props";

const TimePicker: FC<TimePickerProps> = ({
  setSelectedTime,
  format = "24",
  className,
  id,
}) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");

  const handleTimeChange = () => {
    if (format === "12") {
      setSelectedTime(`${hours}:${minutes} ${period}`);
    } else {
      setSelectedTime(`${hours}:${minutes}`);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHours(e.target.value);
    handleTimeChange();
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinutes(e.target.value);
    handleTimeChange();
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
    handleTimeChange();
  };

  return (
    <div className={`${className ? className : ""} time-picker`} id={id}>
      <select value={hours} onChange={handleHoursChange}>
        {[...Array(format === "12" ? 12 : 24)].map((_, i) => (
          <option key={i} value={i < 10 ? `0${i}` : i}>
            {i < 10 ? `0${i}` : i}
          </option>
        ))}
      </select>
      :
      <select value={minutes} onChange={handleMinutesChange}>
        {[...Array(60)].map((_, i) => (
          <option key={i} value={i < 10 ? `0${i}` : i}>
            {i < 10 ? `0${i}` : i}
          </option>
        ))}
      </select>
      {format === "12" && (
        <select value={period} onChange={handlePeriodChange}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      )}
    </div>
  );
};

export default TimePicker;
