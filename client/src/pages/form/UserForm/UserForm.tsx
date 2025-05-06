import "./form.css";
import formSVG from "../../../assets/svg/form-svg.svg";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import {
  AssignRole,
  filterEmptyObj,
  newSessionStorage,
  openModal,
  useSessionStorage,
} from "../../../utils/commonFunctions";
import Loader from "../../../UI-Components/Loader/Loader";
import { loginValidation, validations } from "./FormValidation";
import { useNavigate } from "react-router-dom";
import { icon } from "../../../ui-library/Icons";
import PopupModal from "../../root/home/PopupModal";

const UserForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [sectionID, setSectionID] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [newEmp, setNewEmp] = useState<boolean>(false);
  const [demoModal, setDemoModal] = useState<boolean>(false);
  const navigate = useNavigate();

  type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: string;
    companyEmail: string;
    [key: string]: string;
  };

  const [inputs, setInputs] = useState<FormInputs>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    companyEmail: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (useSessionStorage("userInfo")) {
      setNewEmp(true);
    }
  }, [newEmp]);

  const handleSection = (type: string) => {
    if (type === "next") return setSectionID(sectionID + 1);
    if (type === "back") return setSectionID(sectionID - 1);
  };

  const handleInputChange = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (selectedRole: string) => {
    setInputs({ ...inputs, role: selectedRole });
  };

  const SuccessResponse = (result: any, res: any) => {
    newSessionStorage("userInfo", result);
    newSessionStorage("client-id", AssignRole(inputs?.role));
    newSessionStorage("userTokenID", res?.res?.data?.token);
    setValidated(false);
    navigate(`/dashboard/${result?._id}`);
  };

  const NewEmployee = () =>
    navigate(`/dashboard/${useSessionStorage("userInfo")._id}`);

  const handleRegister = async () => {
    validations(inputs, setValidated);
    if (inputs.role === "Employee") {
      const findHR = useSessionStorage("userInfo");
      if (!findHR?.isHR) {
        setIsRegister(false);
        return toast.error("Please Login As HR To Register New Employee");
      }
    }
    if (validated) {
      const res = await postMethodAPI(
        `${serverVariables.REGISTER_NEW_USER}`,
        inputs,
        setLoading
      );
      if (res instanceof Error) {
        console.error(res.message);
      } else if (res.res.status === 201) {
        const result = res?.res?.data?.result;
        return newEmp ? NewEmployee() : SuccessResponse(result, res);
      }
    } else {
      return;
    }
  };

  const handleLogin = async () => {
    const isValid = loginValidation(inputs);
    setValidated(isValid);
    if (isValid) {
      const res = await postMethodAPI(
        `${serverVariables.LOGIN_USER}`,
        filterEmptyObj(inputs),
        setLoading
      );
      if (res instanceof Error) {
        console.error(res.message);
      } else if (res.res.status === 200) {
        const result = res?.res?.data?.user;
        SuccessResponse(result, res);
      }
    } else {
      return;
    }
  };

  const dropDownItems = [
    {
      key: "HR",
      label: "HR",
    },
    {
      key: "Admin",
      label: "Admin",
    },
    {
      key: "Employee",
      label: "Employee",
    },
  ];

  return (
    <div className="form-main">
      <Button
        className="btn-ghost"
        id="header-btn"
        variant="shadow"
        onPress={() => openModal(setDemoModal)}
      >
        Try Demo
      </Button>
      <Tooltip content="Back to Home" placement="bottom" color="primary">
        <i
          className={icon.house}
          id="home-icon"
          onClick={() => navigate("/home")}
        ></i>
      </Tooltip>

      {loading && <Loader />}
      {demoModal && <PopupModal navigate={navigate} setModal={setDemoModal} />}
      <div className="form-body">
        <div className="form-leftSide">
          <img src={formSVG} alt="svg" />
          <h1>
            Log in to optimize your team's productivity with our intuitive
            management portal.
          </h1>
        </div>
        {!isRegister ? (
          <div className="form-rightSide slideLeft">
            <h1>Hello there!👋</h1>
            <div className="form-data">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="faded">
                    {inputs.role ? inputs.role : "Login As"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dynamic Actions"
                  items={dropDownItems}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      value={inputs.role || ""}
                      onClick={() => handleRoleChange(item.key)}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
              <Input
                type="email"
                label="Company Email"
                name="companyEmail"
                onChange={handleInputChange}
                value={inputs.companyEmail || ""}
              />
              <Input
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                label="Password"
                name="password"
                onChange={handleInputChange}
                value={inputs.password || ""}
                autoComplete="off"
              />
            </div>
            <Button color="primary" onPress={handleLogin}>
              Login
            </Button>
            <h2>
              New to TeamSync?{" "}
              <span onClick={() => setIsRegister(true)}>Register</span>
            </h2>
          </div>
        ) : sectionID === 1 ? (
          <div className="form-rightSide fadeIn">
            <h1>Register</h1>
            <div className="form-data">
              <Input
                type="text"
                label="First Name"
                name="firstName"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                label="Last Name"
                name="lastName"
                onChange={handleInputChange}
              />
              <Input
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
              />
            </div>
            <Button color="primary" onPress={() => handleSection("next")}>
              Next
            </Button>
            <h2>
              Already Registered?
              <span onClick={() => setIsRegister(false)}> Login</span>
            </h2>
          </div>
        ) : (
          <div className="form-rightSide fadeIn">
            <h1>Register</h1>
            <div className="form-data">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="faded">
                    {inputs.role ? inputs.role : "Register As"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dynamic Actions"
                  items={dropDownItems}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      value={inputs.role || ""}
                      onClick={() => handleRoleChange(item.key)}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
              <Input
                type="number"
                name="phone"
                label="Phone"
                onChange={handleInputChange}
              />
              <Input
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <i className="fa-solid fa-eye-slash"></i>
                    ) : (
                      <i className="fa-solid fa-eye"></i>
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                label="Password"
                name="password"
                autoComplete="off"
                value={inputs.password || ""}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="off"
                value={inputs.confirmPassword || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                color="primary"
                className="btn-primary"
                onPress={() => handleSection("back")}
              >
                Back
              </Button>
              <Button color="primary" onPress={handleRegister}>
                Register
              </Button>
            </div>

            <h2>
              Already Registered?
              <span onClick={() => setIsRegister(false)}> Login</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
