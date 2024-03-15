import "./form.css";
import formSVG from "../../../assets/svg/form-svg.svg";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { postMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import {
  AssignRole,
  newLocalStorage,
  newSessionStorage,
  useLocalStorage,
} from "../../../utils/commonFunctions";
import Loader from "../../../UI-Components/Loader/Loader";
import { loginValidation, validations } from "./FormValidation";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [sectionID, setSectionID] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    [key: string]: string;
  };

  const [inputs, setInputs] = useState<FormInputs>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

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

  const SuccessResponse = (result:any, res:any) => {
    newLocalStorage("userInfo", result);
    newLocalStorage("client-id", AssignRole(inputs?.role))
    newSessionStorage("userTokenID", res?.res?.data?.token);
    setValidated(false);
    navigate(`/dashboard/${result?._id}`);
  }

  const handleRegister = async () => {
    validations(inputs, setValidated);
    if (inputs.role === "Employee") {
      const findHR = useLocalStorage("userInfo");
      if (!findHR?.isHR) {
        setIsRegister(false);
        return toast.error("Please Login As HR To Register New Employee");
      }
    }
    if (validated) {
      const res = await postMethodAPI(
        `${inputs?.role}${serverVariables.REGISTER_NEW_USER}`,
        inputs,
        setLoading
      );
      if (res instanceof Error) {
        console.error(res.message);
      } else if (res.res.status === 201) {
        const result = res?.res?.data?.result;
        SuccessResponse(result, res);
      }
    } else {
      return;
    }
  };

  const handleLogin = async () => {
    loginValidation(inputs, setValidated);
    if (validated) {
      const res = await postMethodAPI(
        `${inputs?.role}${serverVariables.LOGIN_USER}`,
        inputs,
        setLoading
      );
      if (res instanceof Error) {
        console.error(res.message);
      } else if (res.res.status === 200) {
        const result = res?.res?.data?.User;
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
      {loading && <Loader />}
      <div className="form-body">
        <div className="form-leftSide">
          <img src={formSVG} alt="svg" />
          <h1>
            Log in to empower your HR journey with our streamlined HR Management
            Portal.
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
                label="Email"
                name="email"
                onChange={handleInputChange}
                value={inputs.email || ""}
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
            <Button color="primary" onClick={handleLogin}>
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
            <Button color="primary" onClick={() => handleSection("next")}>
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
                onClick={() => handleSection("back")}
              >
                Back
              </Button>
              <Button color="primary" onClick={handleRegister}>
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
