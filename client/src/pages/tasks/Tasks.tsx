import React, { useEffect, useState } from "react";
import "./style.css";
import {
  checkBGColors,
  CheckPriorityColor,
  openModal,
  textEllipse,
  usePageName,
} from "../../utils/commonFunctions";
import Card from "../../UI-Components/Card/Card";
import { DummyTasks, myTeamUsers, userTasksStat } from "./demo";
import { Tooltip, Progress, Button } from "@nextui-org/react";
import { icon } from "../../UI-Components/Icons/Icons";
import Chip from "../../UI-Components/Chip/Chip";
import "react-circular-progressbar/dist/styles.css";
import TaskStats from "./components/TaskStats";
import { statusDropDown } from "./components/StatusDropDown";
import Loader from "../../UI-Components/Loader/Loader";
import Buttons from "../../ui-library/buttons/Button";
const TaskViewModal = React.lazy(() => import("./components/TaskViewModal"));

const Tasks = () => {
  const [statsData, setStatsData] = useState<any>([]);
  const [teamData, setTeamData] = useState<any>([]);
  const [openViewTaskModal, setOpenViewTaskModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    usePageName("Tasks (Under Development)");
    setStatsData(userTasksStat);
    setTeamData(myTeamUsers);
  }, []);

  return (
    <div className="tasks">
      {loading && <Loader />}
      {openViewTaskModal && (
        <TaskViewModal
          setModal={setOpenViewTaskModal}
          setLoading={setLoading}
        />
      )}
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
          <Buttons
            icon="plus"
            label="New Project"
            iconPosition="right"
            className="btn-ghost rounded-full"
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
                  onClick={() => openModal(setOpenViewTaskModal)}
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
        <TaskStats statsData={statsData} teamData={teamData} />
      </div>
    </div>
  );
};

export default Tasks;
