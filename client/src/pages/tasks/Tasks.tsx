import { useEffect, useState } from "react";
import "./style.css";
import {
  checkBGColors,
  CheckPriorityColor,
  textEllipse,
  usePageName,
} from "../../utils/commonFunctions";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import Card from "../../UI-Components/Card/Card";
import { DummyTasks, myTeamUsers, userTasksStat } from "./demo";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Progress,
  Button,
  Avatar,
} from "@nextui-org/react";
import { icon } from "../../UI-Components/Icons/Icons";
import Chip from "../../UI-Components/Chip/Chip";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Tasks = () => {
  const [statsData, setStatsData] = useState<any>([]);
  useEffect(() => {
    usePageName("Tasks (Under Development)");
    setStatsData(userTasksStat);
  }, []);

  return (
    <div className="tasks">
      <div className="task-header">
        <h1 className="text-xl font-semibold main-header">Projects</h1>
        <div className="flex relative items-center bg-gray-800 w-72 rounded-full">
          <i className={`${icon?.search} absolute left-3`}></i>
          <input
            placeholder="Search title here..."
            className="w-[200px] p-2 bg-transparent outline-none pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <ButtonIcon
            icon="plus"
            label="New Project"
            iconPosition="right"
            className="btn-ghost"
            borderRadius="full"
          />
          {statusDropDown(
            <Button
              color="secondary"
              className="rounded-full px-6"
              endContent={<i className={icon?.filter}></i>}
            >
              Filter
            </Button>
          )}
        </div>
      </div>
      <div className="task-container w-full h-full mt-3 flex">
        <div className="all-tasks h-full p-3" style={{ width: "75%" }}>
          {DummyTasks?.map((item: any, index: number) => (
            <Card
              key={index}
              boxShadow={false}
              className="h-full cursor-pointer"
              hoverEffect
              content={
                <div
                  className="task-body flex flex-col gap-4"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm">
                      {textEllipse(item?.projectTitle, 15)}
                    </h2>
                    {statusDropDown(
                      <h2
                        className="capitalize p-1 px-3 text-center rounded-lg text-[12px] flex items-center gap-1"
                        style={{
                          border: `2px solid ${checkBGColors(
                            item?.status,
                            "status"
                          )}`,
                        }}
                      >
                        {item?.status}
                        <i className={`${icon?.caretDown}`}></i>
                      </h2>
                    )}
                  </div>
                  <div className="flex w-full gap-3 items-center">
                    <Tooltip content="Due Date" color="primary">
                      <i className={`${icon?.clock} text-gray-500`}></i>
                    </Tooltip>
                    <Tooltip content="Due Date" color="primary">
                      <h5 className="text-gray-400 text-sm">{item?.dueDate}</h5>
                    </Tooltip>
                    <Tooltip content="Priority" color="primary">
                      {CheckPriorityColor(item?.priority)}
                    </Tooltip>
                  </div>
                  <div className="h-10">
                    <p className="text-[13px]">
                      {textEllipse(item?.description, 60)}
                    </p>
                  </div>
                  <div className="w-full flex items-center gap-3">
                    {item?.tags.map((item: string, index: number) => (
                      <Chip
                        label={item}
                        key={index}
                        borderRadius="half"
                        variant="ghost"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Project Progress</p>
                      <p className="text-sm text-gray-400">{item?.progress}%</p>
                    </div>
                    <Progress
                      aria-label="Progress"
                      size="sm"
                      value={item?.progress}
                      color="primary"
                      className="w-full"
                    />
                  </div>
                  <div className="border-[1px] rounded-full border-gray-700 mt-1"></div>
                  <div className="flex w-full items-center justify-between">
                    <Tooltip content="Contributors" color="primary">
                      <div className="flex items-center gap-2">
                        <i className={`${icon?.users}`}></i>
                        <span>{item?.contributors.length}</span>
                      </div>
                    </Tooltip>
                    <div className="flex items-center gap-7">
                      <Tooltip content="Sub Tasks" color="primary">
                        <div className="flex items-center gap-2">
                          <i className={`${icon?.fileLine} text-[12px]`}></i>
                          <span className=" text-md">
                            {item?.subTasksCount}
                          </span>
                        </div>
                      </Tooltip>
                      <Tooltip content="Comments" color="primary">
                        <div className="flex items-center gap-[5px]">
                          <i className={`${icon?.chat} text-[12px]`}></i>
                          <span className=" text-md">
                            {item?.subTasksCount}
                          </span>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </div>
        <div
          className="stats w-full flex items-center flex-col gap-3 h-full"
          style={{ width: "25%" }}
        >
          <Card
            boxShadow={false}
            id="stats-card"
            content={
              <div className="stat-progress flex flex-col gap-6">
                <div className="flex w-full items-center justify-between">
                  <h3>Task Progress</h3>
                  <Tooltip content="More" color="primary">
                    <i
                      className={`${icon?.ellipse}-vertical text-gray-400`}
                    ></i>
                  </Tooltip>
                </div>
                <div className="w-full flex items-center justify-evenly">
                  <div className="circular-bar w-24">
                    <CircularProgressbar
                      value={statsData?.progressValue}
                      maxValue={100}
                      text={`${statsData?.progressValue}%`}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1 fadeIn">
                    <h4 className="text-md">Running Task</h4>
                    <h2 className="text-3xl font-bold">
                      {statsData?.runningTask}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Completed</p>
                      <p className="text-sm text-gray-400">
                        {statsData?.completedWork?.split("/")[0]} of{" "}
                        {statsData?.completedWork?.split("/")[1]}
                      </p>
                    </div>
                    <Progress
                      aria-label="Progress"
                      size="sm"
                      value={statsData?.completedWork?.split("/")[0]}
                      maxValue={statsData?.completedWork?.split("/")[1]}
                      color="primary"
                      className="w-full"
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">In-Progress</p>
                      <p className="text-sm text-gray-400">
                        {statsData?.inProgressWork?.split("/")[0]} of{" "}
                        {statsData?.inProgressWork?.split("/")[1]}
                      </p>
                    </div>
                    <Progress
                      aria-label="Progress"
                      size="sm"
                      value={statsData?.inProgressWork?.split("/")[0]}
                      maxValue={statsData?.inProgressWork?.split("/")[1]}
                      color="primary"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            }
          />
          <Card
            boxShadow={false}
            id="user-stats"
            content={
              <div className="flex flex-col gap-4 max-h-64 overflow-auto relative">
                <div
                  className="flex w-full items-center justify-between sticky top-0"
                  style={{ backgroundColor: "var(--card)", zIndex: 49 }}
                >
                  <h3>My Team ({myTeamUsers?.length})</h3>
                  <Tooltip content="More" color="primary">
                    <i
                      className={`${icon?.ellipse}-vertical text-gray-400`}
                    ></i>
                  </Tooltip>
                </div>
                {myTeamUsers?.map((item: any) => (
                  <div
                    className="flex items-center gap-4 cursor-pointer rounded-full p-2 hover:bg-slate-700 slideUp"
                    key={item?._id}
                  >
                    <Avatar src={item?.image} />
                    <div className="flex flex-col">
                      <p className="text-[15px] text-gray-300 font-bold">
                        {item?.firstName} {item?.lastName}
                      </p>
                      <span className="text-[14px] text-gray-400">
                        {item?.designation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;

export const statusDropDown = (buttonContent: any) => {
  return (
    <Dropdown>
      <DropdownTrigger style={{ marginRight: "0.5rem" }}>
        {buttonContent}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        style={{
          backgroundColor: "var(--card)",
          color: "#fff",
          borderRadius: "12px",
        }}
      >
        <DropdownItem key="todo" className="text-gray-300">
          TODO
        </DropdownItem>
        <DropdownItem key="inProgress" className="text-yellow-400">
          InProgress
        </DropdownItem>
        <DropdownItem key="completed" className="text-green-400">
          Completed
        </DropdownItem>
        <DropdownItem key="overdue" className="text-blue-400">
          Overdue
        </DropdownItem>
        <DropdownItem key="rejected" className="text-red-500">
          Rejected
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
