import { FC, MouseEvent } from "react";
import { MessageProps } from "./props";
import { useContextAPI } from "../../utils/ContextAPI";

const Message: FC<MessageProps> = ({  }) => {
    const { closeChat } = useContextAPI();
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains("blur-bg")) {
      closeChat()
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
      ></div>
    </div>
  );
};

export default Message;
