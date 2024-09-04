import { FC, MouseEvent, useState } from "react";
import { ChatbotProps } from "./props";
import { closeModal } from "../../utils/commonFunctions";
import "./style.css";
import { icon } from "../../UI-Components/Icons/Icons";
import { Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";

const Chatbot: FC<ChatbotProps> = ({ setModal, chatBotImage }) => {
  const [mouseHovered, setMouseHovered] = useState<boolean>(false);
  const [chatHasOpened, setChatHasOpened] = useState<boolean>(false);
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains("blur-bg")) {
      closeModal(setModal);
    }
  };

  return (
    <div
      className="blur-bg justify-end items-end pb-5"
      onClick={handleOutsideClick}
      style={{zIndex: "999"}}
    >
      <div className="chatbot slideLeft w-[25%] h-[90%] rounded-xl shadow-lg shadow-sky-600 relative">
        <Tooltip content="Close" color="danger">
          <i
            className={`${mouseHovered ? icon?.closeRounded : icon?.circle} ${
              mouseHovered ? "text-red-500" : "text-gray-500"
            } absolute left-2 top-2 text-sm`}
            onMouseEnter={() => setMouseHovered(true)}
            onMouseLeave={() => setMouseHovered(false)}
            onClick={() => setModal(false)}
          ></i>
        </Tooltip>

        {/* ========== When bot opens ================= */}
        {!chatHasOpened ? (
          <div className="open-theme h-full w-full flex items-center justify-center flex-col gap-2">
            <div className="img-container bg-slate-700 p-7 rounded-full mb-4">
              <motion.img
                src={chatBotImage}
                className="w-[6vw]"
                alt="Bot Image"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>
            <motion.h1
              className="text-[25px] text-gray-300 font-bold"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
            >
              TaskLynx
            </motion.h1>
            <motion.p
              className="text-[15px] text-gray-300 text-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.6 }}
            >
              Hi, I'm Lynx. I'm your personal assistant
              <br />
              I'm here to guide you on your journey.
            </motion.p>
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.8 }}
            >
              <ButtonIcon
                icon="play"
                label="Start now"
                className="btn-primary rounded-full mt-5"
                iconPosition="right"
                iconStyles={{ fontSize: "20px" }}
                action={() => setChatHasOpened(true)}
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center h-full flex-col gap-4">
            <i className={`${icon?.warning2} text-[70px] text-yellow-400`}></i>
            <h1 className="text-[25px]">Under Development</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
