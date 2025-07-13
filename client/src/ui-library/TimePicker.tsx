import { FC, useState, useRef, useEffect } from "react";
import { icon } from "./Icons";

export interface TimePickerProps {
  setSelectedTime: (time: string) => void;
  format?: "12" | "24";
  className?: string;
  id?: string;
}

const TimePicker: FC<TimePickerProps> = ({
  setSelectedTime,
  format = "24",
  className = "",
  id,
}) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [showHourList, setShowHourList] = useState(false);
  const [showMinuteList, setShowMinuteList] = useState(false);
  const [showPeriodList, setShowPeriodList] = useState(false);

  const timeString =
    format === "12" ? `${hours}:${minutes} ${period}` : `${hours}:${minutes}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setShowHourList(false);
        setShowMinuteList(false);
        setShowPeriodList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedTime(timeString);
  }, [hours, minutes, period]);

  const getOptions = (count: number) =>
    [...Array(count)].map((_, i) => (i < 10 ? `0${i}` : `${i}`));

  const renderDropdown = (
    open: boolean,
    setOpen: (val: boolean) => void,
    selected: string,
    setSelected: (val: string) => void,
    options: string[]
  ) => (
    <div className="relative w-16">
      <div
        className="bg-gray-800 text-white px-2 py-1 rounded-md cursor-pointer text-center"
        onClick={() => setOpen(!open)}
      >
        {selected}
      </div>
      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md max-h-40 overflow-y-auto shadow-md">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-2 py-1 hover:bg-gray-700 cursor-pointer text-center"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className={`relative w-fit ${className}`} id={id} ref={wrapperRef}>
      <div
        className="flex items-center justify-between min-w-40 px-4 py-2 border border-gray-600 rounded-md cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="text-sm text-white">{timeString}</span>
        <i className={`${icon.clock} text-gray-500`} />
      </div>

      {showDropdown && (
        <div className="absolute z-10 mt-2 p-3 bg-gray-900 border border-gray-700 rounded-md shadow-lg flex gap-2 text-white">
          {renderDropdown(
            showHourList,
            setShowHourList,
            hours,
            setHours,
            getOptions(format === "12" ? 12 : 24)
          )}
          <span>:</span>
          {renderDropdown(
            showMinuteList,
            setShowMinuteList,
            minutes,
            setMinutes,
            getOptions(60)
          )}
          {format === "12" &&
            renderDropdown(
              showPeriodList,
              setShowPeriodList,
              period,
              setPeriod,
              ["AM", "PM"]
            )}
        </div>
      )}
    </div>
  );
};

export default TimePicker;
