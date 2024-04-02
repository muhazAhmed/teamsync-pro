import { useEffect } from "react";
import "./helpDesk.css";
import { usePageName } from "../../utils/commonFunctions";
import Maintenance from "../../components/UnderMaintenance/Maintenance";

const HelpDesk = () => {

  useEffect(() => {
      usePageName("Help Desk")
  }, [])

  return (
    <div className="help-desk">
      <Maintenance/>
    </div>
  );
};

export default HelpDesk;
