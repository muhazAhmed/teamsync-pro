import { Tooltip } from "@nextui-org/react";
import "./toolbar.css";
import { useState } from "react";
import { openModal } from "../../utils/commonFunctions";
import LogoutPopUpModal from "./SubComponents/LogoutPopUpModal";
import { icon } from "../../UI-Components/Icons/Icons";

const Toolbar = () => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const name =
    location.href.split("/")[3].charAt(0).toUpperCase() +
    location.href.split("/")[3].slice(1);
  const subName =
    location?.href.split("/")[4].charAt(0).toUpperCase() +
    location.href.split("/")[4].slice(1) || "";
  const hasNumber = /\d/.test(subName);

  return (
    <>
      {logoutModal && <LogoutPopUpModal modalState={setLogoutModal}/>}
      <div className="toolbar">
        <h1 style={{ marginLeft: "1rem" }}>
          / {name} {!hasNumber ? `/ ${subName}` : null}
        </h1>
        <div
          className="flex items-center gap-4"
          style={{ marginRight: "1rem" }}
        >
          <Tooltip content="Notification" color="primary">
            <i className={icon.notification}></i>
          </Tooltip>
          <Tooltip content="Logout" color="danger">
            <i
              className={icon.logout}
              onClick={() => openModal(setLogoutModal)}
            ></i>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
