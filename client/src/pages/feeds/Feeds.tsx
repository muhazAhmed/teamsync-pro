import { useEffect } from "react";
import "./style.css";
import { usePageName } from "../../utils/commonFunctions";
// import Card from "../../UI-Components/Card/Card";
// import { icon } from "../../UI-Components/Icons/Icons";
import Maintenance from "../../components/UnderMaintenance/Maintenance";

const Feeds = () => {
  useEffect(() => {
    usePageName("Feeds");
  }, []);

  return (
    <div className="feeds">
      {/* <div className="posts">
        <h2>Post Something</h2>
        <Card
          boxShadow={false}
          content={
            <div className="new-post">
              <img />
              <input />
              <i className={icon?.image}></i>
            </div>
          }
        />
      </div>
      <div className="suggestions"></div> */}
      <Maintenance/>
    </div>
  );
};

export default Feeds;
