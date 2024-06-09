import { FC } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import userLogo from "../../../assets/images/man.png";
import "./style.css";
import { closeModal } from "../../../utils/commonFunctions";

interface ModalProps {
  setModal: any;
  userId: any;
}

const UserModal: FC<ModalProps> = ({ setModal, userId }) => {
  return (
    <Modal
      setModal={setModal}
      header={false}
      className="user-modal"
      footer={[
        {
          label: "Close",
          color: "primary",
          action: () => closeModal(setModal),
          icon: "close",
        },
      ]}
    >
      <img src={userLogo} alt="User Avatar" />
      <div className="user-modal-body">
        <div className="item">
          <h1>Name</h1>
          <p>Muhaz Ahmed</p>
        </div>
        <div className="item">
          <h1>Employee ID</h1>
          <p>EM02024</p>
        </div>
        <div className="item">
          <h1>Department</h1>
          <p>Frontend Developer</p>
        </div>
        <div className="item">
          <h1>Date of Birth</h1>
          <p>25-03-2001</p>
        </div>
        <div className="item">
          <h1>Location</h1>
          <p>Mumbai</p>
        </div>
        <div className="item">
          <h1>Phone</h1>
          <p>7996724318</p>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
