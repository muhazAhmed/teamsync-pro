import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  NavbarItem,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import logo from "../assets/images/TS-logo1.png";
import { icon } from "../ui-library/Icons";
import { logout, useSessionStorage } from "../utils/commonFunctions";
import { useNavigate } from "react-router-dom";

const RootNavbar = () => {
  const user = useSessionStorage("userInfo");
  const navigate = useNavigate();

  const icons = {
    Arrow: <i className="fa-solid fa-angle-down"></i>,
    HR: <i className={icon.user}></i>,
    AttendanceManagement: <i className={icon.calendar}></i>,
    LeaveManagement: <i className="fa-solid fa-umbrella-beach"></i>,
    PayRole: <i className="fa-solid fa-hand-holding-dollar"></i>,
    SelfServe: <i className="fa-brands fa-sellcast"></i>,
  };
  return (
    <Navbar>
      <NavbarBrand>
        <img
          src={logo}
          id="logo"
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        />
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
            style={{
              backgroundColor: "var(--card)",
              color: "#fff",
              borderRadius: "12px",
              margin: "0",
            }}
          >
            <DropdownItem
              key="HR"
              startContent={icons.HR}
              onClick={() => navigate("/user/form")}
            >
              HR Management
            </DropdownItem>
            <DropdownItem
              key="autoscaling"
              startContent={icons.AttendanceManagement}
              onClick={() => navigate("/user/form")}
            >
              Attendance Management
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              startContent={icons.LeaveManagement}
              onClick={() => navigate("/user/form")}
            >
              Leave Management
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              startContent={icons.PayRole}
              onClick={() => navigate("/user/form")}
            >
              Pay Role Management
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              startContent={icons.SelfServe}
              onClick={() => navigate("/user/form")}
            >
              Employee Self Serve
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem onClick={() => navigate("/product/about")}>
          <h1>About</h1>
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
            onPress={() => {
              if (user) logout(navigate, "");
              else navigate("/user/form");
            }}
          >
            {user
              ? [<i key="icon" className={icon.logout}></i>, " Logout"]
              : "Login"}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default RootNavbar;
