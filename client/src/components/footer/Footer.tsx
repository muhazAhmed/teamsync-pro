import "./footer.css";
import img from "../../assets/images/TS-logo1.png";
import { icon } from "../../UI-Components/Icons/Icons";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { validEmail } from "../../utils/validation";
import toast from "react-hot-toast";
import { message } from "../../utils/Constants";
import { CheckAccess, directWithNewTab } from "../../utils/commonFunctions";
import { postMethodAPI } from "../../utils/apiCallMethods";
import Loader from "../../UI-Components/Loader/Loader";
import { serverVariables } from "../../utils/serverVariables";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubscribeClick = async () => {
    if (validEmail(email)) return toast.error(message("").INVALID_EMAIL);
    if (CheckAccess()?.isDemoAccount || !CheckAccess()?.isLoggedIn) {
      setEmail("");
      return toast.success(message("")?.SUBSCRIPTION_SUCCESS);
    } else {
      await postMethodAPI(
        serverVariables?.NEW_CLIENT_REQUEST,
        { email: email },
        setLoading
      );
      setEmail("");
    }
  };
  return (
    <div className="footer">
      {loading && <Loader />}
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
            <i
              className={icon?.instagram}
              onClick={() =>
                directWithNewTab("https://instagram.com/muhaz_ahmd")
              }
            ></i>
          </Tooltip>
          <Tooltip content="X-Twitter" placement="top" color="primary">
            <i className={icon?.twitter}></i>
          </Tooltip>
          <Tooltip content="GitHub" placement="top" color="primary">
            <i
              className={icon?.gitHub}
              onClick={() => directWithNewTab("https://github.com/muhazAhmed")}
            ></i>
          </Tooltip>
        </div>
      </div>
      <div className="subscribe">
        <Input
          placeholder="abc@gmail.com"
          radius="full"
          name="inputs"
          value={email}
          onChange={(e) => setEmail(e?.target?.value)}
        />
        <Button className="btn-primary" onClick={onSubscribeClick}>
          Subscribe
        </Button>
      </div>
      <p>
        <span>®</span>2023, Muhaz Ahmed, All right reserved
      </p>
    </div>
  );
};

export default Footer;
