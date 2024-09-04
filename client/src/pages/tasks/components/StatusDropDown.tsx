import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export const statusDropDown = (buttonContent: any) => {
    return (
      <Dropdown>
        <DropdownTrigger style={{ marginRight: "0.5rem" }}>
          {buttonContent}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          style={{
            backgroundColor: "var(--card)",
            color: "#fff",
            borderRadius: "12px",
          }}
        >
          <DropdownItem key="todo" className="text-gray-300">
            TODO
          </DropdownItem>
          <DropdownItem key="inProgress" className="text-yellow-400">
            InProgress
          </DropdownItem>
          <DropdownItem key="completed" className="text-green-400">
            Completed
          </DropdownItem>
          <DropdownItem key="overdue" className="text-blue-400">
            Overdue
          </DropdownItem>
          <DropdownItem key="rejected" className="text-red-500">
            Rejected
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };