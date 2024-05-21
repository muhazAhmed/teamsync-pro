import "./footer.css";
import img from "../../assets/images/TS-logo1.png";
import { icon } from "../../UI-Components/Icons/Icons";
import { Button, Input, Tooltip } from "@nextui-org/react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="img">
        <img src={img} alt="logo" />
      </div>

      <div className="social">
        <div className="tags">
          <h5>Privacy Policies</h5>
          <h5>Terms & Conditions</h5>
        </div>
        <div className="mid-section">
          <h5>Powered By</h5>
          <Tooltip content="React" placement="top" color="primary">
            <i className={icon?.react}></i>
          </Tooltip>
          <Tooltip content="NodeJS" placement="top" color="primary">
            <i className={icon?.node}></i>
          </Tooltip>
        </div>
        <div className="icons">
          <Tooltip content="Facebook" placement="top" color="primary">
            <i className={icon?.facebook}></i>
          </Tooltip>
          <Tooltip content="Instagram" placement="top" color="primary">
            <i className={icon?.instagram}></i>
          </Tooltip>
          <Tooltip content="X-Twitter" placement="top" color="primary">
            <i className={icon?.twitter}></i>
          </Tooltip>
          <Tooltip content="GitHub" placement="top" color="primary">
            <i className={icon?.gitHub}></i>
          </Tooltip>
        </div>
      </div>
      <div className="subscribe">
        <Input placeholder="abc@gmail.com" radius="full" />
        <Button className="btn-primary">Subscribe</Button>
      </div>
      <p>
        <span>®</span>2023, Muhaz Ahmed, All right reserved
      </p>
    </div>
  );
};

export default Footer;
