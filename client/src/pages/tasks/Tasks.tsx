import { useEffect, useState } from "react";
import "./style.css";
import { textEllipse, usePageName } from "../../utils/commonFunctions";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import Card from "../../UI-Components/Card/Card";
import { DummyTasks, userTasksStat } from "./demo";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Progress,
} from "@nextui-org/react";
import { icon } from "../../UI-Components/Icons/Icons";
import Chip from "../../UI-Components/Chip/Chip";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Tasks = () => {
  const [statsData, setStatsData] = useState<any>([]);
  useEffect(() => {
    usePageName("Tasks");

    setStatsData(userTasksStat);
  }, []);

  return (
    <div className="tasks">
      <div className="task-header">
        <h1 className="text-xl font-semibold">Projects</h1>
        <ButtonIcon
          icon="plus"
          label="New Project"
          iconPosition="right"
          className="btn-ghost"
        />
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
                <div className="task-body flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm">{item?.projectTitle}</h2>
                    <Dropdown>
                      <DropdownTrigger>
                        <i
                          className={`${icon?.ellipse} p-[2px] px-1 border-1 rounded-full text-gray-400 text-tiny`}
                        ></i>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Static Actions"
                        style={{
                          backgroundColor: "var(--card)",
                          color: "#fff",
                          borderRadius: "12px",
                        }}
                      >
                        <DropdownItem key="new">New file</DropdownItem>
                        <DropdownItem key="copy">Copy link</DropdownItem>
                        <DropdownItem key="edit">Edit file</DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                        >
                          Delete file
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="flex w-full gap-3 items-center">
                    <Tooltip content="Due Date" color="primary">
                      <i className={`${icon?.clock} text-gray-500`}></i>
                    </Tooltip>
                    <Tooltip content="Due Date" color="primary">
                      <h5 className="text-gray-400 text-sm">{item?.dueDate}</h5>
                    </Tooltip>
                    <Tooltip content="Priority" color="primary">
                      <h6 className="p-1 bg-red-600 capitalize text-[12px] rounded-2xl">
                        {item?.priority}
                      </h6>
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
                  <div className="border-[1px] rounded-full border-gray-700 mt-2"></div>
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
                  <div className="flex flex-col items-start gap-1">
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
              <div className="">
                <div className="flex w-full items-center justify-between">
                  <h3>Our Team</h3>
                  <Tooltip content="More" color="primary">
                    <i
                      className={`${icon?.ellipse}-vertical text-gray-400`}
                    ></i>
                  </Tooltip>
                </div>
                <div></div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
