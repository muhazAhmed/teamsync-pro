
import { useEffect } from "react";
import "./helpDesk.css";
import { usePageName } from "../../utils/commonFunctions";

const HelpDesk = () => {

  useEffect(() => {
      usePageName("Help Desk")
  }, [])

  return (
    <div className="help-desk">
    </div>
  );
};

export default HelpDesk;
