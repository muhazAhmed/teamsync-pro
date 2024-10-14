import { FC } from "react";
import { UserProfileProps } from "../props";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import { Avatar, Tooltip } from "@nextui-org/react";
import { icon } from "../../../UI-Components/Icons/Icons";
import { useContextAPI } from "../../../utils/ContextAPI";

const UserProfile: FC<UserProfileProps> = ({ setModal }) => {
  const { openChat } = useContextAPI();

  return (
    <Modal
      setModal={setModal}
      header={false}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-2 items-center justify-center w-full">
        <Avatar
          src="https://i.pinimg.com/originals/f2/b7/1e/f2b71eb6fdf8d5cb093d73831018dd37.jpg"
          className="w-16 h-16 mb-3"
        />
        <h1 className="text-[20px] font-semibold">Farine Ahmed</h1>
        <p className="text-[12px] text-gray-400">Sr. Fullstack Developer</p>
        <div className="flex flex-col w-full gap-1 mt-3">
          <div className="flex items-center w-full justify-between">
            <div className="flex flex-col items-center gap-1">
              <h4 className="text-[13px] font-thin">Ongoing</h4>
              <p>10</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h4 className="text-[13px] font-thin">Pending</h4>
              <p>13</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <h4 className="text-[13px] font-thin">Completed</h4>
              <p>30</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-evenly w-full mt-3 bg-gray-600 p-2 py-4 rounded-xl">
          <Tooltip content="Message" color="primary">
            <i
              className={`${icon?.chat} text-[20px] font-bold text-green-300`}
              onClick={() => {
                openChat(), setModal(false);
              }}
            ></i>
          </Tooltip>
          <Tooltip content="Mail" color="primary">
            <i
              className={`${icon?.message} text-[20px] font-bold text-cyan-300`}
            ></i>
          </Tooltip>
          <Tooltip content="Contact" color="primary">
            <i
              className={`${icon?.phone} text-[20px] font-bold text-blue-500`}
            ></i>
          </Tooltip>
        </div>
      </div>
    </Modal>
  );
};

export default UserProfile;
