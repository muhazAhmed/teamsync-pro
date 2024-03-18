import { useEffect, useState } from "react";
import Modal from "../../../UI-Components/popUp-modal/PopUpModal";
import "./modal.css";
import { Button, Input } from "@nextui-org/react";

interface ModalProps {
  setEditModal: (value: boolean) => void;
  title: string;
  ResponseData: any[];
}

type Inputs = {
  [key: string]: any;
};

const EditProfileModal: React.FC<ModalProps> = ({
  setEditModal,
  title,
  ResponseData,
}) => {
  const [profileInputs, setProfileInputs] = useState<Inputs>({
    firstName: "",
    lastName: "",
    companyEmail: "",
    location: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileInputs((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (ResponseData) {
      setProfileInputs((prev) => ({ ...prev, ...ResponseData }));
    }
  }, [ResponseData]);

  return (
    <>
      <Modal setModal={setEditModal} title={title}>
        <div className="modal-body">
          {Object.keys(profileInputs).map((key) => (
            <Input
              key={key}
              name={key}
              value={profileInputs[key]}
              label={key}
              onChange={handleChange}
              variant="underlined"
            />
          ))}
        </div>
        <div className="modal-footer">
          <Button className="btn-primary text-white">Save</Button>
          <Button className="btn-ghost">Clear</Button>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModal;
