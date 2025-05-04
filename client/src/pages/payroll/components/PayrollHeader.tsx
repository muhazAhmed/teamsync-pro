import { useEffect } from "react";
import { usePageName } from "../../../utils/commonFunctions";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { dateFilter } from "../data";
import { Icon } from "../../../UI-Components/Icons/Icons";
import Buttons from "../../../ui-library/buttons/Button";

const PayrollHeader = () => {
  useEffect(() => {
    usePageName("Salary Revision");
  }, []);
  return (
    <div className="w-full flex justify-between px-2 sticky top-0 z-50">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              endContent={Icon("filter")}
              className="btn-ghost"
            >
              Filter Date
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            items={dateFilter}
            style={{
              backgroundColor: "var(--card)",
              color: "#fff",
              borderRadius: "12px",
              margin: "0",
            }}
          >
            {(item) => <DropdownItem key={item.id}>{item.label}</DropdownItem>}
          </DropdownMenu>
        </Dropdown>
        <Buttons
          icon="bug"
          label="Report Error"
          iconPosition="right"
          color="danger"
        />
      </div>
    </div>
  );
};

export default PayrollHeader;
