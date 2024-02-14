import { useState } from "react";
import "./sidebar.css";
import logo from "../../assets/images/man.png";
import { Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { icon: "fa-solid fa-house", label: "Home", path: "/" },
    { icon: "fa-solid fa-bullhorn", label: "Feeds", path: "/feeds" },
    {
      icon: "fa-regular fa-square-check",
      label: "Attendance",
      subItems: [
        { label: "Add New", path: "/attendance/new" },
        { label: "Manage", path: "/attendance/manage" },
      ],
    },
    {
      icon: "fa-solid fa-list-check",
      label: "To Do",
      subItems: [
        { label: "Tasks", path: "/tasks" },
        { label: "Review", path: "/tasks/manage" },
      ],
    },
    {
      icon: "fa-regular fa-calendar",
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
      icon: "fa-solid fa-book",
      label: "Documentation",
      path: "/documentation",
    },
    {
      icon: "fa-regular fa-circle-question",
      label: "Help Desk",
      path: "/help-desk",
    },
  ];

  const handleDropdownClick = (index: number | null) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="sidebar">
      <img src="" alt="logo" />
      <div className="profile">
        <Avatar src={logo} size="md" className="cursor-pointer" />
        <h1 className="text-primary text-lg font-bold">Hi Muhaz</h1>
        <i className="fa-solid fa-gear cursor-pointer"></i>
      </div>
      <div className="menu-items">
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
                  <p key={subIndex} onClick={() => navigate(subItem.path)}>
                    {subItem.label}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
