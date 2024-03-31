import { useEffect, useState } from "react";
import "./sidebar.css";
import userLogo from "../../assets/images/man.png";
import logo from "../../assets/images/TS-logo1.png";
import { Avatar, Tooltip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { openModal, useSessionStorage } from "../../utils/commonFunctions";
import { icon } from "../../UI-Components/Icons/Icons";
import LogoutPopUpModal from "./SubComponents/LogoutPopUpModal";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(0);
  const [pageName, setPageName] = useState();
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const openSidebar = () => setIsSidebarOpen(1);
  const closeSidebar = () => setIsSidebarOpen(0);
  const userInfo = useSessionStorage("userInfo");

  useEffect(() => {
    if (
      location.href.split("/")[3] === "home" ||
      location.href.split("/")[4] === "form"
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
    { icon: "fa-solid fa-bullhorn", label: "Feeds", path: "/feeds" },
    { icon: icon.user, label: "People", path: "/people" },
    {
      icon: icon.checkSquare,
      label: "Attendance",
      subItems: [
        { label: "Add New", path: "/attendance/new" },
        { label: "Manage", path: "/attendance/manage" },
      ],
    },
    {
      icon: icon.checkList,
      label: "To Do",
      subItems: [
        { label: "Tasks", path: "/tasks" },
        { label: "Review", path: "/tasks/manage" },
      ],
    },
    {
      icon: icon.calendar,
      label: "Leave",
      subItems: [
        { label: "Apply For Leave", path: "/leave/apply" },
        { label: "Leave Balances", path: "/leave/manage" },
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
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
    {logoutModal && <LogoutPopUpModal modalState={setLogoutModal}/>}
    {!isHomePage && (
      <div
        className="toolbar"
        style={
          !isSidebarOpen ? { width: "85%", right: "0px" } : { width: "100%" }
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
          className="flex items-center gap-4"
          style={{ marginRight: "1rem" }}
        >
          <Tooltip content="Notification" color="primary">
            <i className={icon.notification}></i>
          </Tooltip>
          <Tooltip content="Logout" color="danger">
            <i className={icon.logout}  onClick={() => openModal(setLogoutModal)}></i>
          </Tooltip>
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
            style={{ position: "absolute", top: "110px", width: "100%" }}
          >
            <div
              className="profile"
              style={isSidebarOpen ? { display: "none" } : {}}
            >
              <Avatar
                src={userLogo}
                size="md"
                className="cursor-pointer"
                onClick={() => navigate(`/user-info/${userInfo?._id}`)}
              />
              <h1 className="text-primary text-lg font-bold">Hi Muhaz</h1>
              <i
                className="fa-solid fa-gear cursor-pointer"
                onClick={() => navigate(`/user-info/${userInfo?._id}`)}
              ></i>
            </div>
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
                          className={`dropdown-btn ${activeIndex === index ? "active" : ""
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
                    <div className="items" onClick={() => navigate(item.path)}>
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
        </div>
      )}
    </>
  );
};

export default Sidebar;
