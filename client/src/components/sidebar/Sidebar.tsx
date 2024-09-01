import { useEffect, useState } from "react";
import "./sidebar.css";
import userLogo from "../../assets/images/man.png";
import logo from "../../assets/images/TS-logo1.png";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { openModal, useSessionStorage } from "../../utils/commonFunctions";
import { icon } from "../../UI-Components/Icons/Icons";
import LogoutPopUpModal from "./SubComponents/LogoutPopUpModal";
import Notifications from "../../pages/Notifications/Notifications";
import chatbotImg from "../../assets/images/chatbot.png";
import Chatbot from "../../Chatbot/Chatbot";
import Loader from "../../UI-Components/Loader/Loader";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(0);
  const [pageName, setPageName] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [openChatbot, setOpenChatbot] = useState<boolean>(false);
  const navigate = useNavigate();
  const openSidebar = () => setIsSidebarOpen(1);
  const closeSidebar = () => setIsSidebarOpen(0);
  const userInfo = useSessionStorage("userInfo");

  useEffect(() => {
    if (
      location.href.split("/")[3] === "home" ||
      location.href.split("/")[4] === "form" ||
      location.href.split("/")[4] === "about" ||
      location.href.split("/")[4] === "contact"
    ) {
      setIsHomePage(true);
    } else return setIsHomePage(false);
  });

  useEffect(() => {
    const handlePageNameUpdate = () => {
      const updatedPageName = useSessionStorage("pageName");
      setPageName(updatedPageName);
    };
    handlePageNameUpdate();
    window.addEventListener("pageNameUpdated", handlePageNameUpdate);
    return () => {
      window.removeEventListener("pageNameUpdated", handlePageNameUpdate);
    };
  }, []);

  const menuItems = [
    { icon: icon.house, label: "Home", path: `/dashboard/${userInfo?._id}` },
    {
      icon: "fa-solid fa-bullhorn",
      label: "Feeds",
      path: `/feeds/${userInfo?._id}`,
    },
    { icon: icon.user, label: "People", path: "/people" },
    {
      icon: icon.checkSquare,
      label: "Attendance",
      subItems: [
        { label: "Add New", path: `/attendance/new/${userInfo?._id}` },
        { label: "Manage", path: `/attendance/manage/${userInfo?._id}` },
        { label: "Time Off", path: `/time-off/${userInfo?._id}` },
        { label: "Calender", path: `/calendar/${userInfo?._id}` },
      ],
    },
    {
      icon: icon.checkList,
      label: "Tasks",
      subItems: [
        { label: "Task Manager", path: `/tasks/${userInfo?._id}` },
        { label: "Review", path: `/tasks/review/${userInfo?._id}` },
      ],
    },
    {
      icon: "fa-solid fa-hand-holding-dollar",
      label: "Salary",
      subItems: [
        { label: "Pay Slip", path: "/pay-slip" },
        { label: "Salary Revision", path: "/salary-revision" },
        { label: "Loan", path: "/loan-management" },
      ],
    },
    {
      icon: icon.book,
      label: "Documentation",
      path: "/documentation",
    },
    {
      icon: icon.help,
      label: "Help Desk",
      path: `/help-desk/${userInfo?._id}`,
    },
  ];

  const handleDropdownClick = (index: number | null) => {
    setOpenNotification(false);
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNavigation = (path: string) => {
    setOpenNotification(false);
    navigate(path);
  };

  return (
    <>
      {loading && <Loader />}
      {logoutModal && <LogoutPopUpModal modalState={setLogoutModal} />}
      {openNotification && (
        <Notifications setOpenNotification={setOpenNotification} />
      )}
      {openChatbot && (
        <Chatbot
          setModal={setOpenChatbot}
          setLoading={setLoading}
          chatBotImage={chatbotImg}
        />
      )}
      {!isHomePage && (
        <div
          className="toolbar"
          style={
            !isSidebarOpen
              ? { width: "85%", right: "0px", paddingRight: "1rem" }
              : { width: "100%", paddingRight: "1rem" }
          }
        >
          <h1
            style={
              !isSidebarOpen ? { marginLeft: "1rem" } : { marginLeft: "2.5rem" }
            }
          >
            / {pageName}
          </h1>
          <div
            className="flex items-center gap-6"
            // style={{ marginRight: "1rem" }}
          >
            <Tooltip content="Chatbot" color="primary">
              <img
                src={chatbotImg}
                className="w-[28px] cursor-pointer"
                onClick={() => openModal(setOpenChatbot)}
              />
            </Tooltip>
            <Badge
              content="99+"
              shape="circle"
              color="danger"
              id="notification-count"
            >
              <Tooltip content="Notifications" color="primary">
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                  onClick={() => setOpenNotification(!openNotification)}
                >
                  <i className={icon.notification}></i>
                </Button>
              </Tooltip>
            </Badge>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar src={userLogo} size="md" className="cursor-pointer" />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                style={{
                  backgroundColor: "var(--card)",
                  color: "#fff",
                  borderRadius: "12px",
                  margin: "0",
                }}
              >
                <DropdownItem
                  textValue="Profile"
                  key="profile"
                  className="h-14 gap-2"
                  onClick={() =>
                    handleNavigation(`/user-info/${userInfo?._id}`)
                  }
                >
                  <h1 className="text-lg font-medium">
                    <i className={icon.user}></i>&nbsp; Profile
                  </h1>
                </DropdownItem>
                <DropdownItem
                  textValue="Settings"
                  key="settings"
                  onClick={() => handleNavigation(`/settings/${userInfo?._id}`)}
                >
                  <h1 className="text-lg font-medium">
                    <i className={icon.settings}></i>&nbsp; Settings
                  </h1>
                </DropdownItem>
                <DropdownItem
                  textValue="Logout"
                  key="logout"
                  color="danger"
                  onClick={() => openModal(setLogoutModal)}
                >
                  <h1 className="text-lg font-medium">
                    <i className={icon.logout}></i>&nbsp; Logout
                  </h1>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      )}
      {!isHomePage && (
        <div
          className="sidebar slideRight"
          style={isSidebarOpen === 1 ? { width: "0" } : {}}
        >
          {isSidebarOpen === 1 ? (
            <i className="fa-solid fa-bars" onClick={closeSidebar}></i>
          ) : (
            <i className="fa-solid fa-xmark" onClick={openSidebar}></i>
          )}
          <img
            src={logo}
            alt="logo"
            id="logo"
            onClick={() =>
              navigate(userInfo ? `/dashboard/${userInfo?._id}` : "/user/login")
            }
          />
          <div
            className="profile-container"
            style={{ position: "absolute", top: "100px", width: "100%" }}
          >
            <div
              className="menu-items"
              style={isSidebarOpen ? { display: "none" } : {}}
            >
              {menuItems.map((item, index) => (
                <div className="items flex-col" key={index}>
                  {item.subItems ? (
                    <div
                      className="drop-down"
                      onClick={() => handleDropdownClick(index)}
                    >
                      <div className="items">
                        <i className={item.icon}></i>
                        <button
                          className={`dropdown-btn ${
                            activeIndex === index ? "active" : ""
                          }`}
                        >
                          {item.label}
                        </button>
                      </div>
                      {activeIndex === index ? (
                        <i className="fa fa-caret-up"></i>
                      ) : (
                        <i className="fa fa-caret-down"></i>
                      )}
                    </div>
                  ) : (
                    <div
                      className="items"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <i className={item.icon}></i>
                      <p>{item.label}</p>
                    </div>
                  )}
                  {item.subItems && (
                    <div
                      className="dropdown-container"
                      style={{
                        display: activeIndex === index ? "flex" : "none",
                      }}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <p
                          key={subIndex}
                          onClick={() => navigate(subItem.path)}
                        >
                          {subItem.label}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Button
            id="add-btn"
            className="btn-primary"
            style={isSidebarOpen ? { display: "none" } : {}}
          >
            New Task
            <i
              className={icon.plus}
              style={{ color: "#fff", fontWeight: "bold" }}
            ></i>
          </Button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
