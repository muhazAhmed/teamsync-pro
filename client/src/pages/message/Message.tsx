import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { MessageProps } from "./props";
import { useContextAPI } from "../../utils/ContextAPI";
import TitleBarButtons from "../tasks/components/TitleBarButtons";
import { icon } from "../../UI-Components/Icons/Icons";
import { Avatar } from "@nextui-org/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8800");

const Message: FC<MessageProps> = ({}) => {
  const { closeChat } = useContextAPI();
  const [mouseHovered, setMouseHovered] = useState<number | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("chat message", newMessage);
      setNewMessage("");
    }
    return setNewMessage("");
  };

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains("blur-bg")) {
      closeChat();
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
        <div className="flex w-full items-center justify-between px-1">
          <TitleBarButtons
            onClick={closeChat}
            onMouseEnter={() => setMouseHovered(1)}
            onMouseLeave={() => setMouseHovered(null)}
            tooltipContent="Close"
            isHovered={mouseHovered === 1}
            iconType={mouseHovered === 1 ? icon?.closeRounded : icon?.circle}
            hoverColor="text-red-500"
            defaultColor="text-red-500"
            tooltipColor="danger"
          />
          <i className={`${icon?.ellipse}-vertical text-gray-400`}></i>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 pt-5">
          <Avatar src="" className="w-[60px] h-[60px]" />
          <h1 className="text-[22px]">Farine Ahmed</h1>
        </div>
        <div className="message-container flex flex-col w-full h-full gap-1">
          <div
            className="messages w-full p-3 h-[68%] flex flex-col-reverse overflow-auto rounded-lg"
            style={{ scrollbarWidth: "none" }}
          >
            <div ref={messagesEndRef} />
            {messages
              .slice()
              .reverse()
              .map((msg, index) => (
                <div
                  key={index}
                  className="message p-2 mb-2 bg-blue-500 text-white rounded-md max-w-[75%] self-end"
                >
                  {msg}
                </div>
              ))}
          </div>
          <div className="w-full bg-gray-700 p-2 h-[7%] rounded-full flex items-center gap-2 justify-between pr-3">
            <i className={`${icon?.emoji} text-yellow-500 text-[20px]`}></i>
            <input
              className="bg-transparent border-0 w-64 outline-none"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage || ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <i className={icon?.attach}></i>
            <i
              className={`${icon?.send} text-[20px] text-[var(--primary)]`}
              onClick={sendMessage}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
