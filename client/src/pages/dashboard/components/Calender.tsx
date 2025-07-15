import React, { useState } from "react";
import HoverAnimation from "../../../ui-library/HoverAnimation";
import { defaultComponentsClassName } from "../services";
import moment from "moment";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const startDay = currentMonth.clone().startOf("month").startOf("week");
  const endDay = currentMonth.clone().endOf("month").endOf("week");

  const calendar = [];
  const date = startDay.clone();

  while (date.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => date.add(1, "day").clone())
    );
  }

  const isSameMonth = (day: moment.Moment) => day.isSame(currentMonth, "month");

  const prevMonth = () =>
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.clone().add(1, "month"));
  return (
    <HoverAnimation className={defaultComponentsClassName}>
      <div className="rounded-xl w-full max-w-md text-white">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevMonth}
            className="text-xl px-2 hover:text-primary"
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <button
            onClick={nextMonth}
            className="text-xl px-2 hover:text-primary"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm text-slate-300 mb-1">
          {days.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center text-sm gap-y-1">
          {calendar.map((week, i) => (
            <React.Fragment key={i}>
              {week.map((day, idx) => (
                <div
                  key={idx}
                  className={`py-1 rounded-md ${
                    isSameMonth(day)
                      ? "text-white hover:bg-primary/30"
                      : "text-gray-500"
                  }`}
                >
                  {day.format("D")}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </HoverAnimation>
  );
};

export default Calender;
