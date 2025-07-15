import { useNavigate } from "react-router-dom";
import HoverAnimation from "../../../ui-library/HoverAnimation";
import {
  fetchUserId,
  taskProgressColor,
  textEllipse,
} from "../../../utils/commonFunctions";
import clsx from "clsx";
import { useState } from "react";
import TaskViewModal from "../../tasks/components/TaskViewModal";
import CardHeader from "./CardHeader";
import { defaultComponentsClassName } from "../services";

const data = [
  {
    id: "1",
    label: "Improve page performance",
    status: "In Progress",
    value: "inProgress",
  },
  { id: "2", label: "Fix UI bugs", status: "Overdue", value: "overdue" },
  {
    id: "3",
    label: "Implement new feature",
    status: "Completed",
    value: "completed",
  },
];

const TaskCard = (setLoading: any) => {
  const [openViewTaskModal, setOpenViewTaskModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const id = fetchUserId();

  const handleViewTask = (e: any, id: string) => {
    e.stopPropagation();
    console.log(id);
    setOpenViewTaskModal(true);
  };
  return (
    <>
      {openViewTaskModal && (
        <TaskViewModal
          setModal={setOpenViewTaskModal}
          setLoading={setLoading}
        />
      )}
      <HoverAnimation
        className={defaultComponentsClassName}
        onClick={() => navigate(`/tasks/${id}`)}
      >
        <CardHeader label="Tasks" />
        <div className="w-full flex flex-col">
          {data.map((item) => (
            <div
              key={item.id}
              className="w-full flex justify-between items-center hover:bg-primary/20 p-2 rounded-md"
              onClick={(e) => handleViewTask(e, item.id)}
            >
              <p className="text-sm w-[60%]">{textEllipse(item.label, 25)}</p>
              <span
                className={clsx(
                  "text-[12px] p-1 px-2 rounded-full border-2",
                  taskProgressColor[item.value]
                )}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </HoverAnimation>
    </>
  );
};

export default TaskCard;
