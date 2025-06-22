import { useState } from "react";
import Card from "../../../ui-library/Card";
import Grid from "../../../ui-library/Grid";
import svg from "../../../assets/svg/about.svg";
import RootNavbar from "../../../components/RootNavbar";
import "./style.css";
import { icon } from "../../../ui-library/Icons";
import { useNavigate } from "react-router-dom";
import { CheckAccess, fetchUserId } from "../../../utils/commonFunctions";

const About = () => {
  const [buttonAction, setButtonAction] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (CheckAccess()?.isLoggedIn)
      return navigate("/dashboard/" + fetchUserId());
    return navigate("/user/form");
  };

  return (
    <div className="about">
      <RootNavbar />
      <Card className="about-container">
        <div className="main">
          {!buttonAction ? (
            <button
              onClick={handleClick}
              onMouseEnter={() => setButtonAction(!buttonAction)}
              className="initial slideRight"
            >
              <i className={icon?.arrowRight}></i>
            </button>
          ) : (
            <button
              onClick={handleClick}
              onMouseLeave={() => setButtonAction(!buttonAction)}
              className="final"
            >
              <i className={`${icon?.arrowRight} fa-fade`}></i> Get Started
            </button>
          )}
          <div className="main-body">
            <h6>About Us</h6>
            <h1 className="slideUp">
              Our Architectural <br />
              Journey
            </h1>
            <p className="slideUp">
              Founded with a belief in the transformation power of architecture,
              TeamSync Group traces its roots back to a small team with big
              dreams.
            </p>
            <Grid className="about-grid gridRowGap-[1rem] gridTemplateColumns-[1fr_1fr]">
              <div className="items slideLeft">
                <h1>50+ years</h1>
                <p>of Shaping architectural landscapes</p>
              </div>
              <div className="items slideRight">
                <h1>100+ Projects</h1>
                <p>Successfully delivered with excellence</p>
              </div>
              <div className="items slideLeft">
                <h1>20+ Awards</h1>
                <p>won, underscoring our dedication to innovative</p>
              </div>
              <div className="items slideRight">
                <h1>99% Success</h1>
                <p>reflects our client centric approach</p>
              </div>
            </Grid>
          </div>
          <img src={svg} className="fadeIn" />
        </div>
      </Card>
    </div>
  );
};

export default About;
