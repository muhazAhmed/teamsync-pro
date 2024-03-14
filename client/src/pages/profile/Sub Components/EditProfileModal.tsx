import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import "./modal.css";

interface ModalProps {
  setEditModal: (value: boolean) => void;
  title: string;
}

const EditProfileModal: React.FC<ModalProps> = ({ setEditModal, title }) => {
  return (
    <>
      <Modal setModal={setEditModal} title={title}>
        <div className="modal-body">
          <input placeholder="Enter Name" />
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;
