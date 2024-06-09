import { useEffect, useState } from "react";
import {
  ResponseInstances,
  openModal,
  usePageName,
  useSessionStorage,
} from "../../utils/commonFunctions";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
} from "@nextui-org/react";
import userLogo from "../../assets/images/man.png";
import "./people.css";
import { icon } from "../../UI-Components/Icons/Icons";
import { Variables } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { getMethodAPI } from "../../utils/apiCallMethods";
import { serverVariables } from "../../utils/serverVariables";
import Loader from "../../UI-Components/Loader/Loader";
import { hrDemoData, empDemoData } from "../form/Demo";
import EditModal from "./SubComponents/EditModal";
import UserModal from "./SubComponents/UserModal";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  employment: {
    designation: string;
    reportingManager: string;
  };
  isHR?: boolean;
};

type ResponseData = {
  hr: User[];
  employee: User[];
};

const People = () => {
  const [data, setData] = useState<ResponseData>({ hr: [], employee: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openViewModal, setOpenViewModal] = useState<boolean>(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<any>({});
  const [searchName, setSearchName] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const navigate = useNavigate();
  const isHr = useSessionStorage("client-id") == Variables.HR_ROLE;
  const isDemoAccount = useSessionStorage("isDemoAccount");

  useEffect(() => {
    usePageName("People");
    if (!isDemoAccount) {
      fetchAllUsers();
    } else {
      return setData({ hr: [hrDemoData], employee: [empDemoData] });
    }
  }, []);

  const fetchAllUsers = async () => {
    const res = await getMethodAPI(
      `${serverVariables.ADMIN_FETCH_USERS}`,
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setData(responseData);
    });
  };

  // AutoComplete
  const handleSearchChange = async (value: string) => {
    if (isDemoAccount) {
      return;
    }
    setSearchName(value);
    const res = await getMethodAPI(
      `${serverVariables?.ADMIN_FETCH_USERS_BY_NAME}${value}`,
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setData(responseData);
    });
  };

  const handleFilterChange = (value: any) => {
    setFilter(value);
  };

  const filteredUsers = (): User[] => {
    if (!data) return [];
    if (filter === "hr") {
      return data?.hr || [];
    } else if (filter === "employee") {
      return data?.employee || [];
    } else {
      return [...data.hr, ...data.employee];
    }
  };

  useEffect(() => {
    if (searchName.length >= 2) {
      handleSearchChange(searchName);
    }
  }, [searchName]);

  const handleClick = (modalName: any) => {
    openModal(modalName);
  };

  return (
    <div className="people">
      {loading && <Loader />}
      {openViewModal && (
        <UserModal setModal={setOpenViewModal} userId={selectedUserDetails} />
      )}
      {openEditModal && (
        <EditModal
          openEditModal={openEditModal}
          setEditModal={setOpenEditModal}
          userDetails={selectedUserDetails}
          setLoading={setLoading}
        />
      )}
      <div className="search">
        <Input
          label="Search User"
          size="sm"
          radius="full"
          name="searchName"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          endContent={
            <i
              className={icon.search}
              onClick={() => handleSearchChange(searchName)}
            />
          }
        />
      </div>

      <div className="body">
        <div
          className="body-header"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            padding: "0 20px 0 20px",
            position: "sticky",
            top: "20px",
            zIndex: "1",
          }}
        >
          <div
            style={
              isHr
                ? {
                    visibility: "visible",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }
                : { visibility: "hidden" }
            }
          >
            <Button
              className="btn-ghost"
              onClick={() => isHr && navigate("/user/form")}
            >
              Register User
            </Button>
            <Button
              className="btn-ghost"
              onClick={() => isHr && navigate("/hr/update-request")}
            >
              Update Requests
            </Button>
          </div>

          <Dropdown>
            <DropdownTrigger aria-label="">
              <Button variant="light">
                Filter <i className={icon.filter}></i>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => handleFilterChange(key)}
              aria-label="Action event"
            >
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="hr">HR</DropdownItem>
              <DropdownItem key="employee">Employee</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="cards">
          {filteredUsers().map((user) => (
            <Card key={user._id} className="card">
              <CardBody
                className="card-body"
                onClick={() => {
                  handleClick(setOpenViewModal),
                    setSelectedUserDetails({
                      id: user?._id,
                    });
                }}
              >
                {isHr && (
                  <Tooltip content="Edit User" placement="left" color="primary">
                    <i
                      className={icon.pencil}
                      onClick={() => {
                        handleClick(setOpenEditModal),
                          setSelectedUserDetails({
                            userId: user?._id,
                            role: user?.isHR ? "hr" : "employee",
                          });
                      }}
                    ></i>
                  </Tooltip>
                )}

                <img src={userLogo} alt="User Avatar" />
                <div className="user-info">
                  <h5 className="text-center">
                    {user.firstName} {user.lastName}
                  </h5>
                  <h6>
                    <i className={icon.work}></i>
                    {user.employment?.designation || "-"}
                  </h6>
                  <Tooltip
                    content="Reporting To"
                    placement="left"
                    color="primary"
                  >
                    <h6>
                      <i className={icon.user}></i>
                      {user.employment?.reportingManager || "-"}
                    </h6>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
