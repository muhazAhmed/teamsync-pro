import { FC, useState } from "react";
import "./style.css";
import { Switch } from "@nextui-org/react";

interface NotificationSettingsProps { }

const NotificationSettings: FC<NotificationSettingsProps> = ({ }) => {
  const [inputs, setInputs] = useState<any>({
    notification: true,
    mentions: true,
    newsletter: false,
    sound: true,
  });

  const toggleChange = (state: any) => {
    setInputs((prev: any) => ({ ...prev, [state]: !prev[state] }));
  };

  return (
    <div className="notification-settings">
      <h1>Notification Settings</h1>
      <div className="item-set">
        <div className="item">
          <h3>Popup notification on desktop</h3>
          <Switch
            size="sm"
            isSelected={inputs?.notification}
            onValueChange={() => toggleChange("notification")}
          />
        </div>
        <div className="item">
          <h3>Enable notifications for mentions</h3>
          <Switch
            size="sm"
            isSelected={inputs?.mentions}
            onValueChange={() => toggleChange("mentions")}
          />
        </div>
        <div className="item">
          <h3>Enable newsletter notifications</h3>
          <Switch
            size="sm"
            isSelected={inputs?.newsletter}
            onValueChange={() => toggleChange("newsletter")}
          />
        </div>
        <div className="item">
          <h3>Play notification sound</h3>
          <Switch
            size="sm"
            isSelected={inputs?.sound}
            onValueChange={() => toggleChange("sound")}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
