import React, { FC, useState } from "react";
import Card from "../../UI-Components/Card/Card";
import "./style.css";
import notificationLogo from "../../assets/images/notificationLogo.png";
import { icon } from "../../ui-library/Icons";
// import { fetchWebSocketNotification } from "./webSocket";
import { openModal } from "../../utils/commonFunctions";
import Loader from "../../UI-Components/Loader/Loader";
const ConfirmationModal = React.lazy(() => import("./ConfirmationModal"));

interface NotificationProps {
  setOpenNotification: any;
}

const selectedItemStyle = {
  border: "1px solid var(--secondary)",
  color: "var(--secondary)",
  borderRadius: "8px",
};

const Notifications: FC<NotificationProps> = ({ setOpenNotification }) => {
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  let loading = false;
  // const [loading, setLoading] = useState<boolean>(false);

  const handleSwitch = (id: number) => {
    setSelectedItem(id);
  };
  // useEffect(() => {
  //   fetchWebSocketNotification();
  // }, []);

  const handleMarkAsReadClick = () => {
    openModal(setConfirmationModal);
  };

  const handleClosePopup = () => {
    if (confirmationModal) return;
    setTimeout(() => {
      setOpenNotification(false);
    }, 4000);
  };

  return (
    <div className="notification slideDown" onMouseLeave={handleClosePopup}>
      {loading && <Loader />}
      <Card
        content={
          <CardContent
            selectedItem={selectedItem}
            handleSwitch={handleSwitch}
            handleMarkAsReadClick={handleMarkAsReadClick}
            confirmationModal={confirmationModal}
            setConfirmationModal={setConfirmationModal}
          />
        }
      />
    </div>
  );
};

interface contentProps {
  selectedItem: number;
  handleSwitch: any;
  handleMarkAsReadClick: any;
  confirmationModal: boolean;
  setConfirmationModal: any;
}

const CardContent: FC<contentProps> = ({
  selectedItem,
  handleSwitch,
  handleMarkAsReadClick,
  confirmationModal,
  setConfirmationModal,
}) => {
  return (
    <div className="notification-body">
      {confirmationModal && (
        <ConfirmationModal setModal={setConfirmationModal} />
      )}
      <div className="header">
        <h1>Notifications</h1>
        <button onClick={handleMarkAsReadClick}>
          <i className={icon.doubleCheck}></i> Mark all as read
        </button>
      </div>
      <div className="switches">
        <button
          style={selectedItem === 1 ? selectedItemStyle : undefined}
          onClick={() => handleSwitch(1)}
        >
          All (8)
        </button>
        <button
          style={selectedItem === 2 ? selectedItemStyle : undefined}
          onClick={() => handleSwitch(2)}
        >
          Unread (6)
        </button>
        <button
          style={selectedItem === 3 ? selectedItemStyle : undefined}
          onClick={() => handleSwitch(3)}
        >
          @mention (2)
        </button>
      </div>
      <div className="main-content">
        <NoContent />
      </div>
    </div>
  );
};

const NoContent = () => {
  return (
    <div className="no-content">
      <img src={notificationLogo} />
      <h1>No notifications yet</h1>
      <p>You'll see notifications here when they are available</p>
    </div>
  );
};

export default Notifications;
