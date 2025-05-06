import { FC } from "react";
import { animatedIcon } from "../../../ui-library/Icons";
import { CheckAccess, closeModal } from "../../../utils/commonFunctions";
import { deleteMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";
import Buttons from "../../../ui-library/buttons/Button";
import Modal from "../../../ui-library/Modal";

interface ModalProps {
  setModal: any;
  fetchData: any;
  setLoading: any;
  userData: any;
}

const DeleteModal: FC<ModalProps> = ({
  setModal,
  userData,
  setLoading,
  fetchData,
}) => {
  const handleDelete = async () => {
    if (CheckAccess()?.isDemoAccount) {
      toast.success(message("")?.REQUEST_DELETED);
      return setModal(false);
    } else {
      await deleteMethodAPI(
        serverVariables?.DELETE_LEAVE_REQUEST + userData?._id,
        "",
        setLoading
      );
      fetchData();
      return setModal(false);
    }
  };

  return (
    <Modal
      setModal={setModal}
      className="delete-modal"
      title={`From: ${userData?.from} To: ${userData?.to}`}
    >
      <div
        className="modal-body flex flex-col"
        style={{ alignItems: "center", justifyContent: "center", gap: "1rem" }}
      >
        <i
          className={animatedIcon(
            "warning2",
            "fade",
            "text-4xl text-yellow-300"
          )}
        ></i>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Are You Sure</h2>
        <p style={{ width: "60%", textAlign: "center" }}>
          The Action cannot be undone. All values associated with this field
          will be lost.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Buttons
            icon="delete"
            label="Delete"
            color="danger"
            onPress={handleDelete}
          />
          <Buttons
            icon="Cancel"
            label="Cancel"
            className="btn-ghost"
            onPress={() => closeModal(setModal)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
