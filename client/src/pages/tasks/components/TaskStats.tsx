import { FC } from 'react'
import { TaskStatsProps } from '../props'
import Card from '../../../UI-Components/Card/Card'
import { Avatar, Progress, Tooltip } from '@nextui-org/react'
import { icon } from '../../../UI-Components/Icons/Icons'
import { CircularProgressbar } from 'react-circular-progressbar'

const TaskStats: FC<TaskStatsProps> = ({statsData, teamData}) => {
  return (
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
                  <h3>My Team ({teamData?.length})</h3>
                  <Tooltip content="More" color="primary">
                    <i
                      className={`${icon?.ellipse}-vertical text-gray-400`}
                    ></i>
                  </Tooltip>
                </div>
                {teamData?.map((item: any) => (
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
  )
}

export default TaskStats