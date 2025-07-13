import { lazy, useEffect, useState } from "react";
import {
  ResponseInstances,
  openModal,
  usePageName,
  useSessionStorage,
} from "../../utils/commonFunctions";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
} from "@nextui-org/react";
import userLogo from "../../assets/images/man.png";
import "./people.css";
import { icon } from "../../ui-library/Icons";
import { Variables } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { getMethodAPI } from "../../utils/apiCallMethods";
import { serverVariables } from "../../utils/serverVariables";
import Loader from "../../ui-library/Loader/Loader";
import { hrDemoData, empDemoData } from "../form/Demo";
const EditModal = lazy(() => import("./SubComponents/EditModal"));
const UserModal = lazy(() => import("./SubComponents/UserModal"));
import Card from "../../ui-library/Card";

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
          fetchAllUsers={fetchAllUsers}
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
              onPress={() => isHr && navigate("/user/form")}
            >
              Register User
            </Button>
            <Button
              className="btn-ghost"
              onPress={() => isHr && navigate("/hr/update-request")}
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
            <Card key={user?._id} className="w-[25vw] cursor-pointer">
              <div
                className="card-body flex flex-col items-center gap-8 relative text-white"
                onClick={() => {
                  handleClick(setOpenViewModal),
                    setSelectedUserDetails({
                      id: user?._id,
                      role: user?.isHR ? "hr" : "employee",
                    });
                }}
              >
                {isHr && (
                  <Tooltip content="Edit User" placement="left" color="primary">
                    <i
                      className={`${icon.pencil} text-gray-500 absolute top-2 right-2 cursor-pointer text-medium`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(setOpenEditModal),
                          setSelectedUserDetails({
                            userId: user?._id,
                            role: user?.isHR ? "hr" : "employee",
                          });
                      }}
                    ></i>
                  </Tooltip>
                )}
                <img src={userLogo} alt="User Avatar" className="w-[5vw]" />
                <div className="user-info flex flex-col gap-1 w-full">
                  <h5 className="text-center">
                    {user.firstName} {user.lastName}
                  </h5>
                  <h6 className="text-gray-500 text-[13px] w-fit">
                    <i className={icon.work}></i>&nbsp;&nbsp;
                    {user.employment?.designation || "-"}
                  </h6>
                  <Tooltip
                    content="Reporting To"
                    placement="left"
                    color="primary"
                  >
                    <h6 className="text-gray-500 text-[13px] w-fit">
                      <i className={icon.user}></i>&nbsp;&nbsp;
                      {user.employment?.reportingManager || "-"}
                    </h6>
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default People;
