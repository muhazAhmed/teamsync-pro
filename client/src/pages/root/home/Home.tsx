import "./home.css";
import Footer from "../../../components/footer/Footer";
import { useSessionStorage } from "../../../utils/commonFunctions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PopupModal from "./PopupModal";
import RootNavbar from "../../../components/RootNavbar";
import HeroLanding from "./components/HeroLanding";
import HeroServices from "./components/HeroServices";

const Home = () => {
  const [modal, setModal] = useState<boolean>(false);
  const user = useSessionStorage("userInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user._id}`);
    }
  }, []);

  return (
    <div className="home">
      {modal && <PopupModal setModal={setModal} navigate={navigate} />}
      <RootNavbar />
      <div className="home-container">
        <HeroLanding setModal={setModal} navigate={navigate} user={user} />
        <HeroServices />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
