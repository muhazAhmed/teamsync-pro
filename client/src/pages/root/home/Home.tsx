import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import "./home.css";
import logo from "../../../assets/images/TS-logo1.png";
import mainImg from "../../../assets/images/homeImg.jpg";
import featuresImg from "../../../assets/images/features.jpg";
import Footer from "../../../components/footer/Footer";
import { logout, useSessionStorage } from "../../../utils/commonFunctions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const user = useSessionStorage("userInfo");
  const navigate = useNavigate();

  const icons = {
    Arrow: <i className="fa-solid fa-angle-down"></i>,
    HR: <i className="fa-solid fa-user-group"></i>,
    AttendanceManagement: <i className="fa-regular fa-calendar"></i>,
    LeaveManagement: <i className="fa-solid fa-umbrella-beach"></i>,
    PayRole: <i className="fa-solid fa-hand-holding-dollar"></i>,
    SelfServe: <i className="fa-brands fa-sellcast"></i>,
  };

  return (
    <div className="home">
      <Navbar>
        <NavbarBrand>
          <img src={logo} />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-5" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.Arrow}
                  radius="sm"
                  variant="light"
                >
                  Products
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem key="HR" startContent={icons.HR}>
                HR Management
              </DropdownItem>
              <DropdownItem
                key="autoscaling"
                startContent={icons.AttendanceManagement}
              >
                Attendance Management
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                startContent={icons.LeaveManagement}
              >
                Leave Management
              </DropdownItem>
              <DropdownItem key="production_ready" startContent={icons.PayRole}>
                Pay Role Management
              </DropdownItem>
              <DropdownItem key="99_uptime" startContent={icons.SelfServe}>
                Employee Self Serve
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem onClick={() => navigate("/product/pricing")}>
            <h1>Pricing</h1>
          </NavbarItem>
          <NavbarItem onClick={() => navigate("/product/contact")}>
            <h1>Contact Us</h1>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="primary"
              className="btn-ghost"
              variant="flat"
              onClick={() => {
                if (user) logout();
                else navigate("/user/form");
              }}
            >
              {user ? "Logout" : "Login"}
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="home-container">
        <div className="section-1 fadeIn">
          <img src={mainImg} alt="Image" />
          <div className="section1-item">
            <h1>
              For your business to grow,
              <br /> your people must grow
            </h1>
            <p>
              Automate your HR processes with greytHR, a comprehensive,
              full-suite HRMS platform for enhanced people management.
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
                onClick={() => toast.error("Temporarily Unavailable")}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>

        <div className="section-2 fadeIn">
          <div className="section2-item">
            <h1>Unleash the power of your people</h1>
            <div className="flex flex-col gap-2">
              <h2>
                <i className="fa-solid fa-circle-check"></i> Attendance
                Management
              </h2>
              <h2>
                <i className="fa-solid fa-circle-check"></i> Leave Management
              </h2>
              <h2>
                <i className="fa-solid fa-circle-check"></i> PayRole Management
              </h2>
              <h2>
                <i className="fa-solid fa-circle-check"></i> HR Software
              </h2>
            </div>
          </div>
          <img src={featuresImg} alt="Image" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
