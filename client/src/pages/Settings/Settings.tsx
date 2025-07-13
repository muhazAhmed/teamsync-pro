import { lazy, useEffect, useState } from "react";
import "./style.css";
import {
  FetchRole,
  fetchUserId,
  usePageName,
} from "../../utils/commonFunctions";
import Card from "../../ui-library/Card";
import { icon } from "../../ui-library/Icons";
import { settingsBreadCrumbs, switchItems } from "./arrayOfSettings";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui-library/Loader/Loader";
const NotificationSettings = lazy(
  () => import("./SubComponents/NotificationSettings/NotificationSettings")
);
const AccountSettings = lazy(
  () => import("./SubComponents/AccountSettings/AccountSettings")
);

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
      navigate(`/user-info/${fetchUserId()}`);
    }
  };

  return (
    <div className="settings">
      {loading && <Loader />}
      <Card id="left-card">
        <div className="switches">
          {switchItems.map((item, index) => {
            if (item.access.includes(FetchRole())) {
              return (
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
              );
            }
          })}
        </div>
      </Card>
      <Card id="right-card">
        <div className="body">
          {selectedItem === 2 && <NotificationSettings />}
          {selectedItem === 3 && <AccountSettings setLoading={setLoading} />}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
