import { useEffect, useState } from "react";
import "./style.css";
import { fetchUserId, usePageName } from "../../utils/commonFunctions";
import Card from "../../UI-Components/Card/Card";
import { icon } from "../../UI-Components/Icons/Icons";
import { settingsBreadCrumbs, switchItems } from "./arrayOfSettings";
import { useNavigate } from "react-router-dom";
import Loader from "../../UI-Components/Loader/Loader";
import NotificationSettings from "./SubComponents/NotificationSettings/NotificationSettings";
import AccountSettings from "./SubComponents/AccountSettings/AccountSettings";

const selectedItemStyle = {
  color: "var(--secondary)",
};

const Settings = () => {
  const [selectedItem, setSelectedItem] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    usePageName(`Settings / ${settingsBreadCrumbs(selectedItem)}`);
  }, [selectedItem]);

  const handleClick = (index: number) => {
    setSelectedItem(index);
    if (index === 1) {
      navigate(`/user-info/${fetchUserId}`);
    }
  };

  return (
    <div className="settings">
      {loading && <Loader />}
      <Card
        id="left-card"
        content={
          <div className="switches">
            {switchItems.map((item, index) => (
              <div
                className={"switch-item"}
                key={index}
                onClick={() => handleClick(index + 1)}
                style={selectedItem === index + 1 ? selectedItemStyle : {}}
              >
                <h1>
                  <i className={icon[item.icon]}></i>
                  {item?.name}
                </h1>
                <i className={icon?.arrowRightRounded}></i>
              </div>
            ))}
          </div>
        }
      />
      <Card
        id="right-card"
        content={
          <div className="body">
            {selectedItem === 2 && <NotificationSettings />}
            {selectedItem === 3 && <AccountSettings />}
          </div>
        }
      />
    </div>
  );
};

export default Settings;
