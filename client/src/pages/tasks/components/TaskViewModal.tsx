import { FC, MouseEvent, useState } from "react";
import { TaskViewModalProps } from "../props";
import { closeModal } from "../../../utils/commonFunctions";
import "./style.css";
import { icon } from "../../../UI-Components/Icons/Icons";
import TitleBarButtons from "./TitleBarButtons";
import { Avatar } from "@nextui-org/react";
import ButtonIcon from "../../../UI-Components/Buttons/ButtonIcon";

const TaskViewModal: FC<TaskViewModalProps> = ({ setModal }) => {
  const [mouseHovered, setMouseHovered] = useState<number | null>(null);
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains("blur-bg")) {
      closeModal(setModal);
    }
  };

  return (
    <div
      className="blur-bg justify-end items-center w-full h-full pt-14"
      onClick={handleOutsideClick}
    >
      <div
        className="task-view slideLeft p-2 rounded-2xl w-[25%] h-[95%] shadow-xl border-2 border-violet-400"
        style={{ backgroundColor: "var(--card)" }}
      >
        <div className="overview-header flex items-center gap-2 w-full">
          <TitleBarButtons
            onClick={() => setModal(false)}
            onMouseEnter={() => setMouseHovered(1)}
            onMouseLeave={() => setMouseHovered(null)}
            tooltipContent="Close"
            isHovered={mouseHovered === 1}
            iconType={mouseHovered === 1 ? icon?.closeRounded : icon?.circle}
            hoverColor="text-red-500"
            defaultColor="text-red-500"
            tooltipColor="danger"
          />

          <TitleBarButtons
            onClick={() => console.log("object")}
            onMouseEnter={() => setMouseHovered(2)}
            onMouseLeave={() => setMouseHovered(null)}
            tooltipContent="Maximize"
            isHovered={mouseHovered === 2}
            iconType={mouseHovered === 2 ? icon?.arrowOpen : icon?.circle}
            hoverColor="text-green-500"
            defaultColor="text-green-500"
          />
          <h1 className="text-[18px] w-full text-center">Task Overview</h1>
        </div>

        <div className="task-view-container flex flex-col justify-between mt-3 w-fill h-[95%]">
          <div className="flex flex-col gap-2 p-2 border-t-1 border-gray-600 pt-3">
            <h5 className="text-[13px] text-gray-300 font-bold">Details</h5>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">Team:</label>
              <p className="text-[14px]">Team 1</p>
            </div>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">
                Status:
              </label>
              <p className="text-[14px] bg-yellow-400 text-black rounded-md px-2">
                InProgress
              </p>
            </div>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">
                Reporter:
              </label>
              <div className="flex gap-2 items-center">
                <Avatar src="" className="w-7 h-7" />
                <p className="text-[14px]">Bobby Nolan</p>
              </div>
            </div>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">
                Assignee:
              </label>
              <div className="flex gap-2 items-center">
                <Avatar src="" className="w-7 h-7" />
                <p className="text-[15px]">Addison Kennedy</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 border-t-1 border-gray-600 pt-3">
            <h5 className="text-[13px] text-gray-300 font-bold">Dates</h5>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">
                Created:
              </label>
              <p className="text-[14px]">Mar 16, 2024 • 11:24 AM</p>
            </div>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">
                Updated:
              </label>
              <p className="text-[14px]">Mar 20, 2024 • 03:24 PM</p>
            </div>
            <div className="flex gap-10">
              <label className="w-[5vw] text-gray-400 text-[15px]">
                Deadline:
              </label>
              <p className="text-[14px]">Mar 30, 2024</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 border-t-1 border-gray-600 pt-3">
            <h5 className="text-[13px] text-gray-300 font-bold">Description</h5>
            <p className="text-[14px]">
              Design and implement the UI for the order page.
            </p>
          </div>
          <div className="slideUp flex border-t-1 border-gray-600 items-center justify-center py-[12px]">
            <ButtonIcon
              icon="arrowOpen"
              label="Open"
              className="btn-primary w-[12vw]"
              iconPosition="right"
              borderRadius="full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewModal;
