import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerInput = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="w-64">
      <label className="text-gray-700" htmlFor="datePicker">
        Select Date
      </label>
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={(date: any) => setSelectedDate(date)}
        dateFormat="MMMM d, yyyy"
        className="w-full px-4 py-2  text-white  border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  );
};

export default DatePickerInput;
