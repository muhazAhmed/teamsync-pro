import { FC, useState } from "react";
import "./style.css";
import { ChangePasswordModalProps } from "./props";
import CustomInput from "../../../../../ui-library/inputs/Input";
import {
  CheckAccess,
  closeModal,
  FetchUserIdAndRole,
  logout,
  useToast,
} from "../../../../../utils/commonFunctions";
import { message } from "../../../../../utils/Constants";
import { validPassword } from "../../../../../utils/validation";
import { postMethodAPI } from "../../../../../utils/apiCallMethods";
import { serverVariables } from "../../../../../utils/serverVariables";
import { useNavigate } from "react-router-dom";
import Buttons from "../../../../../ui-library/buttons/Button";
import Modal from "../../../../../ui-library/Modal";

const ChangePassword: FC<ChangePasswordModalProps> = ({
  setLoading,
  setPasswordModal,
}) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const navigate = useNavigate();

  const validation = () => {
    const popupToast = (name: string) => {
      useToast(message(name)?.REQUIRED_FIELD, "error");
    };

    if (!oldPassword) {
      popupToast("Old Password");
      return false;
    }
    if (!newPassword) {
      popupToast("New Password");
      return false;
    }
    if (!confirmNewPassword) {
      popupToast("Confirm Password");
      return false;
    }
    if (validPassword(newPassword)) {
      useToast(message("")?.INVALID_PASSWORD, "error");
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      useToast("Passwords Not Matching", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const payload = {
        oldPassword,
        newPassword,
      };

      if (CheckAccess()?.isDemoAccount) {
        useToast("Password Changed Successfully", "success");
        return logout(navigate);
      } else {
        const res = await postMethodAPI(
          serverVariables?.CHANGE_PASSWORD + FetchUserIdAndRole(),
          payload,
          setLoading
        );

        return res && logout(navigate);
      }
    } else {
      return false;
    }
  };

  return (
    <Modal
      setModal={setPasswordModal}
      title="Change Password"
      className="change-password"
    >
      <div className="modal-body">
        <CustomInput
          name="oldPassword"
          setInputs={setOldPassword}
          type="password"
          value={oldPassword || ""}
          label="Old Password"
          placeholder="Enter Old Password"
          required
          autoComplete="off"
        />
        <CustomInput
          name="newPassword"
          setInputs={setNewPassword}
          type="password"
          value={newPassword || ""}
          label="New Password"
          placeholder="Enter New Password"
          required
          autoComplete="off"
        />
        <CustomInput
          name="confirmNewPassword"
          setInputs={setConfirmNewPassword}
          type="password"
          value={confirmNewPassword || ""}
          label="Confirm New Password"
          placeholder="Confirm New Password"
          required
          autoComplete="off"
        />
        <div className="modal-footer flex">
          <Buttons
            onPress={handleSubmit}
            icon="send"
            label="Update"
            className="btn-ghost"
          />
          <Buttons
            onPress={() => closeModal(setPasswordModal)}
            icon="close"
            label="Cancel"
            color="danger"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChangePassword;
