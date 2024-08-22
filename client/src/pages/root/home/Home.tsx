import { Button } from "@nextui-org/react";
import "./home.css";
import mainImg from "../../../assets/images/homeImg.jpg";
import featuresImg from "../../../assets/images/features.jpg";
import Footer from "../../../components/footer/Footer";
import { openModal, useSessionStorage } from "../../../utils/commonFunctions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { icon } from "../../../UI-Components/Icons/Icons";
import PopupModal from "./PopupModal";
import RootNavbar from "../../../components/RootNavbar";

const Home = () => {
  const [modal, setModal] = useState<boolean>(false);
  const user = useSessionStorage("userInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user._id}`);
    }
  }, []);

  const arrayOfFeatures = [
    "Attendance Management",
    "Leave Management",
    "Payroll Management",
    "HR Software",
  ];

  return (
    <div className="home">
      {modal && <PopupModal setModal={setModal} navigate={navigate} />}
      <RootNavbar />
      <div className="home-container">
        <div className="section-1 slideUp">
          <img src={mainImg} alt="Image" />
          <div className="section1-item">
            <h1>
              For your business to grow,
              <br /> your people must grow
            </h1>
            <p>
              Automate your project management processes with teamSync, a
              comprehensive, full-suite project management tool for enhanced
              team collaboration.
            </p>
            <div className="section1-btn">
              <Button
                color="primary"
                onClick={() =>
                  navigate(user ? `/dashboard/${user?._id}` : "/user/form")
                }
              >
                Get Started
              </Button>
              <Button
                color="secondary"
                variant="shadow"
                style={{ color: "#fff !important" }}
                onClick={() => openModal(setModal)}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>

        <div className="section-2 fadeIn">
          <div className="section2-item">
            <h1>Unleash the power of your people</h1>
            {arrayOfFeatures.map((item, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <h2>
                  <i className={icon.checkRounded}></i> {item}
                </h2>
              </div>
            ))}
          </div>
          <img src={featuresImg} alt="Image" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
