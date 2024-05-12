import { useEffect, useState } from "react";
import "./style.css";
import { ResponseInstances, usePageName } from "../../../utils/commonFunctions";
import { icon } from "../../../UI-Components/Icons/Icons";
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
import Loader from "../../../UI-Components/Loader/Loader";

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
  useEffect(() => {
    usePageName("HR / Update Requests");
    fetchPriorityCounts();
    fetchAllRequests();
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

  return (
    <div className="update-req">
      {loading && <Loader />}
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
            <i className={icon.bar} style={{ color: "green" }}></i>
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
                  <th>No.</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredListData.length === 0 ? (
                  <tr style={{ width: "100%" }}>
                    <td colSpan={5}>No records found</td>
                  </tr>
                ) : (
                  filteredListData.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item?.firstName} {item?.lastName}
                      </td>
                      <td>{item?.department}</td>
                      <td>
                        <i
                          className={icon.threeBars}
                          style={{ color: "red" }}
                        ></i>
                      </td>
                      <td>
                        <Tooltip
                          content="Update"
                          color="primary"
                          placement="left"
                        >
                          <i className={icon.pencil}></i>
                        </Tooltip>
                        <Tooltip
                          content="Delete"
                          color="danger"
                          placement="right"
                        >
                          <i className={icon.trash}></i>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRequest;
