import { useEffect, useState } from "react";
import "./style.css";
import {
  CheckAccess,
  ResponseInstances,
  openModal,
  usePageName,
} from "../../../utils/commonFunctions";
import { icon } from "../../../ui-library/Icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { getMethodAPI } from "../../../utils/apiCallMethods";
import { serverVariables } from "../../../utils/serverVariables";
import Loader from "../../../ui-library/Loader/Loader";
import toast from "react-hot-toast";
import { message } from "../../../utils/Constants";
import Pagination from "../../../UI-Components/Pagination/Pagination";
import usePagination from "../../../utils/custom-hooks/usePagination";
import { UpdateRequestDemo } from "../../form/Demo";
import DeleteModal from "../SubComponents/DeleteModal";

type ResponseCountData = {
  high: number;
  medium: number;
  normal: number;
};

type ResponseListData = {
  [key: string]: any;
};

const UpdateRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countData, setCountData] = useState<ResponseCountData>();
  const [listData, setListData] = useState<ResponseListData[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [itemsPerPage] = useState<number>(2);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    usePageName("HR / Update Requests");
    if (!CheckAccess().isDemoAccount) {
      fetchPriorityCounts();
      fetchAllRequests();
    } else {
      setListData(UpdateRequestDemo);
      setCountData({ high: 1, medium: 1, normal: 0 });
    }
  }, []);

  const fetchPriorityCounts = async () => {
    const res = await getMethodAPI(
      serverVariables?.FETCH_PRIORITY_COUNTS,
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setCountData(responseData);
    });
  };

  const handleFilterChange = (priority: string) => {
    setPriorityFilter(priority);
    toast.success(message("Priority").FILTER_APPLIED);
  };

  const fetchAllRequests = async () => {
    const res = await getMethodAPI(
      serverVariables?.FETCH_ALL_UPDATE_REQUESTS,
      "",
      setLoading
    );
    ResponseInstances(res, 200, (responseData: any) => {
      setListData(responseData?.fetchData);
    });
  };

  const filteredListData = listData.filter((item) => {
    if (priorityFilter === "all") return true;
    return item.priority === priorityFilter;
  });

  const { currentData, currentPage, totalPages, nextPage, prevPage, goToPage } =
    usePagination({ data: filteredListData, itemsPerPage });

  return (
    <div className="update-req">
      {loading && <Loader />}
      {deleteModal && (
        <DeleteModal setModal={setDeleteModal} userData={selectedUser} />
      )}
      <h1 style={{ paddingLeft: "15px" }}>Overviews</h1>
      <div className="header">
        <div className="overview">
          <div className="items">
            <h3>High Priority</h3>
            <h2>{countData?.high}</h2>
            <i className={icon.threeBars} style={{ color: "red" }}></i>
          </div>
          <div className="items">
            <h3>Medium Priority</h3>
            <h2>{countData?.medium}</h2>
            <i className={icon.twoBars} style={{ color: "yellow" }}></i>
          </div>
          <div className="items">
            <h3>Normal Priority</h3>
            <h2>{countData?.normal}</h2>
            <i className={icon.bar} style={{ color: "#00ba00" }}></i>
          </div>
        </div>
      </div>
      <div className="body">
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            paddingRight: "20px",
          }}
        >
          <h1 style={{ paddingLeft: "10px" }}>Requests</h1>
          <Dropdown>
            <DropdownTrigger aria-label="">
              <Button variant="light">
                Filter Priority <i className={icon.filter}></i>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key: any) => handleFilterChange(key)}
              aria-label="Action event"
            >
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="high">High</DropdownItem>
              <DropdownItem key="medium">Medium</DropdownItem>
              <DropdownItem key="normal">Normal</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="table" style={{ width: "100%" }}>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length === 0 ? (
                  <tr style={{ width: "100%" }}>
                    <td colSpan={5}>No records found</td>
                  </tr>
                ) : (
                  currentData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item?.employeeID}</td>
                      <td>
                        {item?.firstName} {item?.lastName}
                      </td>
                      <td>{item?.department}</td>
                      <td>
                        <Tooltip
                          content={item?.priority.toUpperCase()}
                          color="primary"
                          placement="left"
                        >
                          <i
                            className={
                              item?.priority === "high"
                                ? icon.threeBars
                                : item.priority === "medium"
                                ? icon?.twoBars
                                : icon?.bar
                            }
                            style={
                              item?.priority === "high"
                                ? { color: "red" }
                                : item?.priority === "medium"
                                ? { color: "yellow" }
                                : { color: "#00ba00" }
                            }
                          ></i>
                        </Tooltip>
                      </td>
                      <td>
                        <Tooltip
                          content="View"
                          color="primary"
                          placement="left"
                        >
                          <i className={icon.eye}></i>
                        </Tooltip>
                        <Tooltip
                          content="Update"
                          color="primary"
                          placement="top"
                        >
                          <i className={icon.pencil}></i>
                        </Tooltip>
                        <Tooltip
                          content="Delete"
                          color="danger"
                          placement="right"
                        >
                          <i
                            className={icon.trash}
                            onClick={() => {
                              openModal(setDeleteModal), setSelectedUser(item);
                            }}
                          ></i>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {listData.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateRequest;
