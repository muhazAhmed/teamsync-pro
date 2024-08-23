import { useEffect, useState } from "react";
import { openModal, usePageName } from "../../utils/commonFunctions";
import "./style.css";
import ButtonIcon from "../../UI-Components/Buttons/ButtonIcon";
import { icon } from "../../UI-Components/Icons/Icons";
import { loanData } from "../form/Demo";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import ApplyLoan from "./components/ApplyLoan";
import Loader from "../../UI-Components/Loader/Loader";

const Loan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newLoan, setNewLoan] = useState<boolean>(false);
  useEffect(() => {
    usePageName("Loan Management");
  }, []);

  return (
    <div className="loan">
      {loading && <Loader />}
      {newLoan && <ApplyLoan setModal={setNewLoan} setLoading={setLoading} />}
      <div className="header">
        <ButtonIcon
          icon="pencil"
          label="New Loan"
          className="btn-primary"
          action={() => openModal(setNewLoan)}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button
              color="secondary"
              endContent={<i className={icon?.chevronDown}></i>}
            >
              Action
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            style={{
              backgroundColor: "var(--card)",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Date</th>
              <th>Loan Amount</th>
              <th>Loan Status</th>
              <th>Reporter</th>
              <th>Repayment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loanData?.map((item: any) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.date}</td>
                <td>{item?.amount}</td>
                <td>{item?.loanStatus}</td>
                <td>{item?.reporter}</td>
                <td>{item?.repaymentStatus}</td>
                <td>
                  <Tooltip content="Action" className="btn-primary">
                    <i className={icon?.ellipse}></i>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Loan;
