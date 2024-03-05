import { useEffect, useState } from "react";
import "./sidebar.css";
import userLogo from "../../assets/images/man.png";
import logo from "../../assets/images/TS-logo1.png";
import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/commonFunctions";
import { icon } from "../../UI-Components/Icons/Icons";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(0);
  const navigate = useNavigate();
  const openSidebar = () =>  setIsSidebarOpen(1);
  const closeSidebar = () => setIsSidebarOpen(0);
  const userInfo = useLocalStorage("userInfo");

  useEffect(() => {
    if (
      location.href.split("/")[3] === "home" ||
      location.href.split("/")[4] === "form"
    ) {
      setIsHomePage(true);
    } else return setIsHomePage(false);
  });

  const menuItems = [
    { icon: icon.house, label: "Home", path: `/dashboard/${userInfo?._id}` },
    { icon: "fa-solid fa-bullhorn", label: "Feeds", path: "/feeds" },
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
              <Avatar src={userLogo} size="md" className="cursor-pointer" />
              <h1 className="text-primary text-lg font-bold">Hi Muhaz</h1>
              <i className="fa-solid fa-gear cursor-pointer"></i>
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
