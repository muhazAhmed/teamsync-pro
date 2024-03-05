import { closeModal } from "../../utils/commonFunctions";
import "./modal.css";

interface PopUpModalProps {
  setModal: any;
  dimension: string;
}

const PopUpModal: React.FC<PopUpModalProps> = ({
  setModal,
  dimension,
}) => {
  const height = dimension.toLowerCase().split("x")[0] + "vh";
  const width = dimension.toLowerCase().split("x")[1] + "vw";

  return (
    <div className="blur-bg">
      <div className="modal" style={{ height, width }}>
        <i
          className="fa-solid fa-circle-xmark"
          onClick={() => closeModal(setModal)}
        ></i>
      </div>
      <ModalBody/>
    </div>
  );
};

const ModalBody = () => {
  return (
    <div></div>
  )
}

export default PopUpModal;
