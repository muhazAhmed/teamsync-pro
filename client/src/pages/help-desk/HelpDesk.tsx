import { useEffect } from "react";
import "./helpDesk.css";
import { usePageName } from "../../utils/commonFunctions";
import { Input } from "@nextui-org/react";
import { Icon } from "../../UI-Components/Icons/Icons";
import Card from "../../UI-Components/Card/Card";
import Maintenance from "../../components/UnderMaintenance/Maintenance";

const HelpDesk = () => {
  useEffect(() => {
    usePageName("Help Desk");
  }, []);

  return (
    <div className="help-desk">
      <div className="header">
        <h1>Search for Resources</h1>
        <div className="search">
          <Input
            startContent={Icon("search")}
            placeholder="Enter your search terms..."
            size="sm"
            radius="full"
            name="searchName"
            endContent={Icon("arrowRightRounded")}
          />
        </div>
      </div>
      <div className="body">
        <h1>Or <span>Browse</span> categories</h1>
        <div className="cards">
          <Card content={(
            <div className="card-body">
              {Icon("rocket")}
              <h1>Getting Started</h1>
              <p>Articles to get you up & running, quickly and easy.</p>
            </div>
          )}/>
          <Card content={(
            <div className="card-body">
              {Icon("checkList")}
              <h1>Managing Tasks</h1>
              <p>Organize, prioritize, and track your tasks efficiently.</p>
            </div>
          )}/>
          <Card content={(
            <div className="card-body">
              {Icon("gears")}
              <h1>Others</h1>
              <p>Discover more features to enhance your experience.</p>
            </div>
          )}/>
        </div>
      </div>
      <div className="ticket">
        <h1>Rise Ticket</h1>
        <Card content={(
          <div className="ticket-card">
            <Maintenance/>
          </div>
        )}/>
      </div>
    </div>
  );
};

export default HelpDesk;
