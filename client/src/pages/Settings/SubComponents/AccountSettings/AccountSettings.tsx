import { FC, useState } from "react";
import "./style.css";
import { openModal } from "../../../../utils/commonFunctions";
import ChangePassword from "./components/ChangePassword";
import Buttons from "../../../../ui-library/buttons/Button";

interface AccountSettingsProps {
  setLoading: any;
}

const AccountSettings: FC<AccountSettingsProps> = ({ setLoading }) => {
  const [passwordChangeModal, setPasswordChangeModal] =
    useState<boolean>(false);

  const handleModal = (name: string) => {
    if (name === "changePassword") return openModal(setPasswordChangeModal);
  };

  return (
    <div className="account-settings">
      {passwordChangeModal && (
        <ChangePassword
          setLoading={setLoading}
          setPasswordModal={setPasswordChangeModal}
        />
      )}
      <h1>Account Settings</h1>
      <div className="item-set">
        <div className="item">
          <h3>Change / Update Password</h3>
          <Buttons
            icon="key"
            label="Reset"
            color="danger"
            iconPosition="right"
            onPress={() => handleModal("changePassword")}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
